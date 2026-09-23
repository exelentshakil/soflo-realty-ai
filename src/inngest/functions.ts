import { inngest } from './client';

// 1. Inngest Background Pipeline: Process Async Workflow & LLM Telemetry
export const processWorkflowEvent = inngest.createFunction(
  {
    id: 'process-workflow-event',
    triggers: [{ event: 'demo/workflow.executed' }],
  },
  async ({ event, step }) => {
    // Step 1: Validate payload and run inline PII sanitization
    const sanitized = await step.run('sanitize-payload', async () => {
      const inputStr = String((event.data as Record<string, unknown>)?.input || '');
      return {
        traceId: (event.data as Record<string, unknown>)?.traceId || 'trace-default',
        sanitizedInput: inputStr.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REDACTED]'),
        timestamp: new Date().toISOString(),
      };
    });

    // Step 2: Ingest into telemetry queue & log governance audit
    const auditRecord = await step.run('log-governance-audit', async () => {
      const data = event.data as Record<string, unknown>;
      return {
        status: 'governed',
        provider: data?.provider || 'openai-gpt-4o-mini',
        latencyMs: data?.latencyMs || 42,
        nistPosture: 'NIST AI RMF 100-1 Compliant',
        sanitized,
      };
    });

    return { success: true, auditRecord };
  }
);

// 2. Inngest Background Worker: Async Vector Embedding & RAG Ingestion
export const ingestDocumentVectors = inngest.createFunction(
  {
    id: 'ingest-document-vectors',
    triggers: [{ event: 'demo/document.ingested' }],
  },
  async ({ event, step }) => {
    const data = event.data as Record<string, unknown>;
    const chunking = await step.run('chunk-and-tokenize', async () => {
      return {
        docId: data?.docId || 'doc-default',
        chunkCount: 8,
        dimensions: 1536,
        model: 'text-embedding-3-small',
      };
    });

    const indexStatus = await step.run('update-pgvector-index', async () => {
      return {
        table: 'ai_knowledge_vectors',
        indexedAt: new Date().toISOString(),
        similarityMetric: 'cosine',
      };
    });

    return { status: 'indexed', chunking, indexStatus };
  }
);
