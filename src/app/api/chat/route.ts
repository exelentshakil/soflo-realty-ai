import { NextRequest, NextResponse } from 'next/server';
import { scanAndSanitizePrompt } from '@/lib/llm-firewall';
import { luxuryListings } from '@/config/listings';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const lastMessage = messages[messages.length - 1]?.content || '';

    // 1. Run LLM Firewall Guardrails (NIST / OWASP LLM01 & LLM02)
    const firewallCheck = scanAndSanitizePrompt(lastMessage);
    if (!firewallCheck.passed) {
      return NextResponse.json({
        message: 'Security Notice: Potential prompt injection or threat signature detected. Session secured.',
        metadata: {
          prospect_type: 'Spam / Low Intent',
          intent_score: 1,
          firewall_passed: false,
        },
        latencyMs: Date.now() - startTime,
        provider: 'FIREWALL_INTERCEPT',
      });
    }

    const promptText = firewallCheck.sanitizedText || lastMessage;

    const systemPrompt = `You are Valeria's Elite AI Luxury Concierge, representing Valeria Afanasieva, the top South Florida luxury real estate agent.
Your goal is to converse with clients, help them find premium listings, and qualify them (budget, timeline, neighborhood, buyer vs renter, proof of funds) before scheduling a showing.

We have 4 active luxury developments you can recommend:
1. Armani Casa Residences (Sunny Isles Beach, price $2.95M - $8.2M, 2-4 beds) - ID: "list-armani"
2. Porsche Design Tower (Sunny Isles Beach, price $4.5M - $16M, 3-5 beds, has car elevator) - ID: "list-porsche"
3. Waldorf Astoria Residences (Downtown Miami, price $1.8M - $11M, 1-4 beds, supertall architecture) - ID: "list-waldorf"
4. Cipriani Residences (Brickell, price $1.4M - $6.5M, 1-4 beds, classic Italian service) - ID: "list-cipriani"

Be warm, sophisticated, professional, and bilingual (English/Spanish). Speak with prestige.
Do not use markdown lists. Keep paragraphs short and elegant.

CRITICAL: You must output a structured JSON block at the very end of your response inside a <lead_extract> tag ONLY when the user mentions their name, email, or phone, or when they are qualified. The JSON must follow this exact schema:
{
  "prospect_name": "string (name if found, else Guest)",
  "email": "string (email if found, else empty)",
  "phone": "string (phone if found, else empty)",
  "budget": "string (budget stated, e.g. $3M Cash or $15k/mo)",
  "locations": ["Neighborhoods mentioned, e.g. Sunny Isles Beach, Brickell"],
  "intent_score": number between 1 and 10,
  "timeline": "Immediate (< 14 days) | Medium (30-60 days) | Long-term (90+ days) | Casual",
  "proof_of_funds_status": "High / Cash | Pre-Approved | Needs Pre-Approval | Unknown",
  "prospect_type": "Luxury Buyer | Luxury Renter | Investor / 1031 Exchange | General Inquiry",
  "matched_property_ids": ["array of matching IDs from lists: list-armani, list-porsche, list-waldorf, list-cipriani"]
}

Example response format:
"Welcome to Miami. [Sophisticated conversational reply recommending suitable developments...]
<lead_extract>
{
  "prospect_name": "John Doe",
  "email": "john@example.com",
  "phone": "305-555-1234",
  "budget": "$3.5M Cash",
  "locations": ["Sunny Isles Beach"],
  "intent_score": 9,
  "timeline": "Immediate (< 14 days)",
  "proof_of_funds_status": "High / Cash",
  "prospect_type": "Luxury Buyer",
  "matched_property_ids": ["list-armani", "list-porsche"]
}
</lead_extract>"`;

    // Assemble API messages
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      }))
    ];

    // --- PROVIDER 1: OPENAI ---
    if (process.env.OPENAI_API_KEY && !body.simulatedOutage) {
      try {
        const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: apiMessages,
            temperature: 0.3,
            max_tokens: 800,
          }),
        });

        if (openAiRes.ok) {
          const data = await openAiRes.json();
          const content = data.choices[0]?.message?.content || '';
          const parsed = parseAIResponse(content);

          return NextResponse.json({
            message: parsed.message,
            metadata: parsed.metadata,
            latencyMs: Date.now() - startTime,
            provider: 'OPENAI',
            model: 'gpt-4o-mini',
            firewall_passed: true,
          });
        }
      } catch (err) {
        // Silently fall through to Gemini on error
      }
    }

    // --- PROVIDER 2: GOOGLE GEMINI (FAILOVER) ---
    if (process.env.GEMINI_API_KEY) {
      try {
        // Map chat format to Gemini contents
        const geminiContents = [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          ...messages.slice(-6).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          }))
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: geminiContents,
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const content = data.candidates[0]?.content?.parts[0]?.text || '';
          const parsed = parseAIResponse(content);

          return NextResponse.json({
            message: parsed.message,
            metadata: parsed.metadata,
            latencyMs: Date.now() - startTime,
            provider: 'GEMINI',
            model: 'gemini-2.0-flash',
            firewall_passed: true,
          });
        }
      } catch (err) {
        // Fall through to deterministic fallback
      }
    }

    // --- PROVIDER 3: DETERMINISTIC RULE-BASED FALLBACK ---
    const fallbackParsed = runDeterministicFallback(promptText);
    return NextResponse.json({
      message: fallbackParsed.message,
      metadata: fallbackParsed.metadata,
      latencyMs: Date.now() - startTime,
      provider: 'DETERMINISTIC_RULES',
      model: 'Rule-Engine-v1',
      firewall_passed: true,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown chat error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Helper to extract JSON from <lead_extract> tags
function parseAIResponse(rawText: string) {
  const extractRegex = /<lead_extract>([\s\S]*?)<\/lead_extract>/i;
  const match = rawText.match(extractRegex);

  let cleanMessage = rawText.replace(extractRegex, '').trim();
  let metadata: Record<string, any> = {
    prospect_name: 'Guest',
    email: '',
    phone: '',
    budget: 'Not Specified',
    locations: [],
    intent_score: 3,
    timeline: 'Casual',
    proof_of_funds_status: 'Unknown',
    prospect_type: 'General Inquiry',
    matched_property_ids: []
  };

  if (match && match[1]) {
    try {
      const parsed = JSON.parse(match[1].trim());
      metadata = { ...metadata, ...parsed };
    } catch (e) {
      // Squelch JSON parse errors
    }
  }

  return {
    message: cleanMessage,
    metadata
  };
}

// Simple local keyword-based fallback if offline
function runDeterministicFallback(text: string) {
  const t = text.toLowerCase();
  let matched_property_ids: string[] = [];
  let budget = 'Not Specified';
  let locations: string[] = [];
  let intent_score = 5;
  let prospect_type = 'General Inquiry';
  let proof_of_funds_status = 'Unknown';

  if (t.includes('armani') || t.includes('isles') || t.includes('ocean')) {
    matched_property_ids.push('list-armani');
    locations.push('Sunny Isles Beach');
  }
  if (t.includes('porsche') || t.includes('car') || t.includes('elevator')) {
    matched_property_ids.push('list-porsche');
    locations.push('Sunny Isles Beach');
  }
  if (t.includes('waldorf') || t.includes('downtown') || t.includes('supertall')) {
    matched_property_ids.push('list-waldorf');
    locations.push('Downtown Miami');
  }
  if (t.includes('cipriani') || t.includes('brickell') || t.includes('italian')) {
    matched_property_ids.push('list-cipriani');
    locations.push('Brickell');
  }

  // Basic intent scoring
  if (t.includes('buy') || t.includes('million') || t.includes('cash') || t.includes('purchase')) {
    intent_score = 9;
    prospect_type = 'Luxury Buyer';
  } else if (t.includes('rent') || t.includes('month') || t.includes('lease')) {
    intent_score = 7;
    prospect_type = 'Luxury Renter';
  }

  if (t.includes('cash')) {
    proof_of_funds_status = 'High / Cash';
  } else if (t.includes('pre-approved') || t.includes('preapproved')) {
    proof_of_funds_status = 'Pre-Approved';
  }

  // Budget detection
  const millionMatch = text.match(/\$?(\d+(\.\d+)?)\s*m(illion)?/i);
  if (millionMatch) {
    budget = `$${millionMatch[1]}M`;
  }

  let msg = `Thank you for reaching out. Valeria is the leading luxury specialist for South Florida real estate. Based on your interest in ${locations.join(', ') || 'Miami luxury developments'}, we have outstanding curated listings available. For instance, the legendary ${matched_property_ids.length > 0 ? luxuryListings.find(l => l.id === matched_property_ids[0])?.name : 'Armani Casa and Porsche Design Tower'} represent the absolute peak of coastal living. Would you like to schedule a private call or private showing this weekend?`;

  return {
    message: msg,
    metadata: {
      prospect_name: 'Guest',
      email: '',
      phone: '',
      budget,
      locations,
      intent_score,
      timeline: 'Immediate (< 14 days)',
      proof_of_funds_status,
      prospect_type,
      matched_property_ids,
    }
  };
}

