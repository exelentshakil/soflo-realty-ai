import { Inngest } from 'inngest';

// Central Inngest client with event key from .env.local
export const inngest = new Inngest({
  id: 'enterprise-demo-cockpit',
  eventKey: process.env.INNGEST_EVENT_KEY,
});
