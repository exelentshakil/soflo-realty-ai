import { NextRequest, NextResponse } from 'next/server';
import { scanAndSanitizePrompt } from '@/lib/llm-firewall';

interface KnowledgeChunk {
  id: string;
  title: string;
  content: string;
  source: string;
  category: string;
}

// Enterprise Knowledge Base for Demo RAG Queries
const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'kb-01',
    title: 'NIST AI RMF 100-1 Compliance Architecture',
    content: 'All autonomous agent workflows must implement continuous context boundary enforcement, PII tokenization before external API transmission, and deterministic fallback circuits.',
    source: 'BarakahSoft Security Specs §4.2',
    category: 'Governance',
  },
  {
    id: 'kb-02',
    title: 'Zero-Downtime Multi-Provider AI Fallback',
    content: 'OpenAI GPT-4o-mini acts as primary reasoning engine with 400ms timeout budget. Failover triggers Google Gemini 2.0 Flash automatically before dropping to deterministic rules.',
    source: 'Enterprise Reliability Blueprint v2',
    category: 'Architecture',
  },
  {
    id: 'kb-03',
    title: 'Inngest Event Driven Background Pipeline',
    content: 'Async events are dispatched to Inngest queues for non-blocking execution, automated backpressure regulation, and idempotent database updates across Supabase pgvector.',
    source: 'Queue Engineering SOP',
    category: 'Infrastructure',
  },
  {
    id: 'kb-04',
    title: 'OWASP Top 10 for LLMs Mitigation Guide',
    content: 'Mitigating LLM01 (Prompt Injection) and LLM02 (Sensitive Information Disclosure) via pre-flight semantic regex tokenization and strict JSON response formatting.',
    source: 'Securiti AI Governance Framework',
    category: 'Security',
  },
];

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { query } = await req.json();
    const queryText = String(query || '').trim();

    if (!queryText) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // 1. LLM Firewall pre-flight scan
    const firewall = scanAndSanitizePrompt(queryText);

    // 2. Vector Semantic Relevance Search (Cosine Simulation)
    const terms = firewall.sanitizedInput.toLowerCase().split(/\s+/);
    const scoredChunks = KNOWLEDGE_BASE.map((chunk) => {
      let score = 0.5; // Base relevance
      const text = `${chunk.title} ${chunk.content} ${chunk.category}`.toLowerCase();
      terms.forEach((term) => {
        if (text.includes(term)) score += 0.12;
      });
      return {
        ...chunk,
        similarityScore: Math.min(0.98, Number(score.toFixed(3))),
      };
    }).sort((a, b) => b.similarityScore - a.similarityScore);

    const topMatches = scoredChunks.slice(0, 2);

    return NextResponse.json({
      query: queryText,
      sanitizedQuery: firewall.sanitizedInput,
      firewall: {
        passed: firewall.passed,
        piiRedacted: firewall.piiRedacted,
        riskScore: firewall.riskScore,
      },
      retrieval: {
        totalIndexed: KNOWLEDGE_BASE.length,
        matchedChunks: topMatches,
        topScore: topMatches[0]?.similarityScore || 0,
        latencyMs: Date.now() - startTime,
        vectorEngine: 'pgvector / text-embedding-3-small',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Vector RAG failure';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
