import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import { processWorkflowEvent, ingestDocumentVectors } from '@/inngest/functions';

// Next.js App Router route handler for Inngest Webhooks & Background Workflows
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processWorkflowEvent,
    ingestDocumentVectors,
  ],
});
