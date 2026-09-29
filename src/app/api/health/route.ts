import { NextResponse } from 'next/server';

export async function GET() {
  const hasOpenAi = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasSupabase = !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    status: 'healthy',
    system: 'SoFlo Realty AI • Luxury Lead & Showing Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    providers: {
      openai: {
        active: hasOpenAi,
        model: 'gpt-4o-mini',
        role: 'primary-completion',
      },
      gemini: {
        active: hasGemini,
        model: 'gemini-2.0-flash',
        role: 'failover-completion',
      },
      deterministic: {
        active: true,
        model: 'rule-engine-v1',
        role: 'zero-dependency-fallback',
      },
      supabase: {
        active: hasSupabase,
        role: 'persistent-data-store',
      },
    },
    capabilities: [
      'autonomous-luxury-qualification',
      'dual-provider-failover-inference',
      'gohighlevel-crm-realtime-sync',
      'generative-engine-optimization-ld',
      'inline-llm-firewall-owasp-nist',
      'realtime-in-memory-telemetry',
    ],
  });
}

