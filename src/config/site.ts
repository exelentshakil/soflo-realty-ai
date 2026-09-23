/**
 * SoFlo Realty AI - South Florida Luxury Real Estate Lead & Showing Engine
 * Schema & Data Provider for Miami & South Florida Luxury Agent Lead Generation.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'neutral' | 'down';
  subtext: string;
  badge: string;
}

export interface TableRow {
  id: string;
  entityName: string;
  category: string;
  status: 'active' | 'verified' | 'queued' | 'flagged';
  latency: string;
  provider: string;
  updatedAt: string;
  payload: Record<string, unknown>;
}

export interface SiteConfig {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  archetype: 'stripe' | 'linear' | 'notion' | 'lovable' | 'bloomberg' | 'apple';
  primaryNav: NavItem[];
  metrics: MetricItem[];
  workflow: {
    badge: string;
    title: string;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
    defaultInput: string;
    buttonLabel: string;
    sampleResponse: Record<string, unknown>;
  };
  table: {
    badge: string;
    title: string;
    description: string;
    columns: { key: string; label: string }[];
    rows: TableRow[];
  };
}

export const siteConfig: SiteConfig = {
  slug: 'soflo-realty-ai',
  name: 'SoFlo Realty AI',
  badge: 'Miami Luxury Lead Engine v1.0',
  tagline: 'AI-Powered Lead Generation & Showing Engine for South Florida Luxury Agents',
  description: 'Autonomous lead qualification, buyer/renter intent scoring, and instant VIP showing scheduler for Miami and South Florida luxury real estate.',
  archetype: 'stripe',
  primaryNav: [
    { id: 'cockpit', label: 'Lead Operations Cockpit' },
    { id: 'pipeline', label: 'AI Qualification Engine' },
    { id: 'records', label: 'Live Prospects Grid' },
  ],
  metrics: [
    {
      id: 'qualification_rate',
      title: 'Qualified Buyer & Investor Rate',
      value: '74.2%',
      change: '+28% vs standard forms',
      trend: 'up',
      subtext: 'P99 Intent Scoring: 88ms',
      badge: 'Verified POF / Pre-Approved',
    },
    {
      id: 'showing_conversion',
      title: 'Automated Showing Bookings',
      value: '142 / month',
      change: 'Zero phone tag',
      trend: 'up',
      subtext: 'Brickell, Coral Gables, Sunny Isles',
      badge: 'Instant VIP Calendar Dispatch',
    },
    {
      id: 'crm_sync',
      title: 'CRM Instant Handoff',
      value: '< 5 Seconds',
      change: '100% Delivery SLA',
      trend: 'neutral',
      subtext: 'Follow Up Boss • Lofty • GHL',
      badge: 'Real-Time SMS & Push',
    },
  ],
  workflow: {
    badge: 'Step 1 • Live Interactive Test',
    title: 'Miami Luxury Lead Qualification & Showing Intent Engine',
    description: 'Enter any prospect inquiry, landing page submission, or chat interaction. The AI scores buying intent, verifies budget tier, extracts neighborhood preferences, and schedules private showings.',
    inputLabel: 'Prospect Message, Landing Page Lead Payload, or Chat Transcript',
    inputPlaceholder: 'Paste sample prospect inquiry (e.g. Relocating from NYC, looking for a 3-bed condo in Brickell or Sunny Isles with $2.5M cash budget, wanting private showing this weekend)...',
    defaultInput: 'Hi, relocating from Manhattan to Miami next month. Looking for a 3-bedroom luxury waterfront condo in Brickell or Sunny Isles, budget around $2.8M cash. Pre-qualified, need to tour 3 properties this Saturday afternoon.',
    buttonLabel: 'Score Prospect & Route to Calendar',
    sampleResponse: {
      status: 'HIGH_INTENT_BUYER_QUALIFIED',
      prospect_profile: {
        classification: 'Cash Luxury Buyer (High Priority)',
        origin: 'Relocation (Manhattan, NY to Miami, FL)',
        budget_range: '$2,500,000 - $3,000,000 (Cash / Verified Liquidity)',
        target_property_type: '3-Bedroom Luxury Waterfront Condo',
        preferred_neighborhoods: ['Brickell', 'Sunny Isles Beach'],
        urgency: 'Immediate (Touring this Saturday afternoon)',
      },
      automated_qualification_score: {
        score: 9.6,
        tier: 'VIP Tier-1 (Direct Phone Call + Showing Lock)',
        proof_of_funds_status: 'Cash buyer self-certified, request automated bank letter upload',
        renter_vs_buyer: '100% Buyer Intent',
      },
      next_best_actions: [
        'Dispatched instant VIP SMS showing invitation with Saturday calendar slots (1:00 PM, 3:00 PM)',
        'Synthesized 3 curated MLS listings: Reach Brickell City Centre, Regalia Sunny Isles, and Jade Signature',
        'Pushed lead record and full transcript into Follow Up Boss / Lofty CRM with tag #VIP-Buyer-Cash'
      ],
      ai_telemetry: {
        engine: 'OpenAI gpt-4o-mini (Failover: Gemini 2.0 Flash)',
        latency_ms: 84,
        firewall_passed: true,
        crm_webhook_status: 'HTTP 200 OK'
      }
    },
  },
  table: {
    badge: 'Real-Time South Florida Prospect Pipeline',
    title: 'Active Ingested Prospects & Showing Verification Grid',
    description: 'Real-time ledger of inbound Miami buyers, luxury renters, and commercial investors with automated intent scoring and CRM sync.',
    columns: [
      { key: 'id', label: 'Lead ID' },
      { key: 'entityName', label: 'Prospect Name' },
      { key: 'category', label: 'Intent / Target' },
      { key: 'status', label: 'Status' },
      { key: 'latency', label: 'Budget Tier' },
      { key: 'action', label: 'Inspection' },
    ],
    rows: [
      {
        id: 'LEAD-901',
        entityName: 'David & Elena Vance',
        category: 'Cash Buyer • Brickell Penthouse',
        status: 'verified',
        latency: '$3.5M Cash',
        provider: 'OpenAI gpt-4o-mini',
        updatedAt: '3 mins ago',
        payload: {
          client: 'David & Elena Vance',
          relocation_from: 'New York, NY',
          target_locations: ['Brickell', 'Coconut Grove'],
          budget: '$3,500,000',
          financing: 'Cash (Morgan Stanley wire letter on file)',
          timeline: '30 Days',
          showing_booked: 'Saturday 2:00 PM (Four Seasons Residences #48B)',
          crm_sync: 'Follow Up Boss #VIP-Buyer',
        },
      },
      {
        id: 'LEAD-902',
        entityName: 'Marcus Sterling Group',
        category: 'Commercial / Multifamily Investor',
        status: 'verified',
        latency: '$8.2M Capital',
        provider: 'OpenAI gpt-4o-mini',
        updatedAt: '7 mins ago',
        payload: {
          client: 'Marcus Sterling Group (PE Firm)',
          strategy: '1031 Exchange into Coral Gables Boutique Luxury',
          budget: '$8,200,000',
          cap_rate_target: '6.2%+',
          timeline: 'Under 45 Days (1031 Deadline)',
          showing_booked: 'Confidential Executive Briefing Dispatched',
          crm_sync: 'Lofty CRM #1031-Exchange',
        },
      },
      {
        id: 'LEAD-903',
        entityName: 'Sophie Laurent',
        category: 'Luxury Annual Rental',
        status: 'active',
        latency: '$18k / mo',
        provider: 'Gemini 2.0 Flash',
        updatedAt: '12 mins ago',
        payload: {
          client: 'Sophie Laurent (Tech Exec)',
          target_locations: ['Sunny Isles', 'Bal Harbour'],
          budget: '$18,000 / month',
          lease_term: '12 Months with option to buy',
          credit_score: '780+ Verified',
          pets: '1 Small French Bulldog',
          showing_booked: 'Sunday 11:30 AM (Armani Casa #2204)',
          crm_sync: 'GoHighLevel #Luxury-Rental',
        },
      },
      {
        id: 'LEAD-904',
        entityName: 'Alexander Rostov',
        category: 'Pre-Construction Waterfront Investor',
        status: 'queued',
        latency: '$5.0M Tier',
        provider: 'Deterministic Core',
        updatedAt: '22 mins ago',
        payload: {
          client: 'Alexander Rostov',
          interest: 'Cipriani Residences & Waldorf Astoria Miami',
          budget: '$5,000,000',
          stage: 'First-tier deposit ready',
          follow_up_action: 'Automated brochure & floorplan packet dispatched via SMS',
          crm_sync: 'HubSpot Real Estate #Pre-Con',
        },
      },
      {
        id: 'LEAD-905',
        entityName: 'Anonymous Web Visitor',
        category: 'Spam / Out of Area Ingestion',
        status: 'flagged',
        latency: '< $200k',
        provider: 'LLM Firewall Inline',
        updatedAt: '35 mins ago',
        payload: {
          detection: 'Low intent / scraping bot marker',
          location: 'Non-US IP Address',
          budget_stated: 'Unrealistic or missing',
          action_taken: 'Diverted to automated nurture email sequence, agent phone not alerted',
          risk_status: 'FLAGGED - Saved 15 minutes of agent wasted time',
        },
      },
    ],
  },
};
