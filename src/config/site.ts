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
  name: 'Valeria Afanasieva Group',
  badge: 'Valeria Afanasieva Luxury Portfolio',
  tagline: 'South Florida Luxury Beachfront Real Estate Portfolio',
  description: 'Discover and consult on active luxury penthouses, beachfront vertical estates, and elite developments across Sunny Isles, Brickell, and Coral Gables with Global Luxury Advisor Valeria Afanasieva.',
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
          chat_history: [
            { id: 'h1_1', role: 'assistant', content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?" },
            { id: 'h1_2', role: 'user', content: "Hi! My wife Elena and I are looking to relocate from New York to Miami. We want a high-floor modern penthouse in Brickell or Coconut Grove. Budget is around 3.5M cash. We need something with high ceilings and ocean views." },
            { id: 'h1_3', role: 'assistant', content: "Welcome to Miami, David and Elena! Brickell and Coconut Grove represent the absolute pinnacle of high-rise living and lush coastal elegance. For a 3.5M cash budget, you can secure phenomenal top-floor vertical estates with unobstructed bay views.\n\nI highly recommend either Four Seasons Residences in Brickell (unmatched luxury services) or a custom property in Coconut Grove. Are you looking to move immediately, and would you like to schedule private showings for this weekend?" },
            { id: 'h1_4', role: 'user', content: "Yes! Saturday afternoon is perfect. We have our Morgan Stanley proof of funds ready. We want to lock a place down in 30 days. Contact me: david.vance@vancetech.com, +1 (305) 555-0199." },
            { id: 'h1_5', role: 'assistant', content: "Perfect, David. I have logged your proof of funds self-certification and verified your high intent. I am booking a private tour for you this Saturday at 2:00 PM at the stunning Four Seasons Residences #48B.\n\nYour complete profile and CRM card have been synced to GoHighLevel under tags #VIP-Buyer and #Cash-Buyer. Valeria has been alerted on her mobile, and she will send over the private entry details and brochure shortly. Welcome to Miami!" }
          ]
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
          chat_history: [
            { id: 'h2_1', role: 'assistant', content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?" },
            { id: 'h2_2', role: 'user', content: "Hello. I'm Marcus Sterling, representing a private equity group. We need to identify a boutique luxury multifamily package or high-end commercial property in Coral Gables for a 1031 Exchange. Budget is $8.2M." },
            { id: 'h2_3', role: 'assistant', content: "Hello Marcus. Coral Gables is an exceptional enclave with incredibly stable historical yields and rich Mediterranean architecture. For an $8.2M budget, we maintain exclusive access to off-market boutique portfolios that meet institutional standards.\n\nSince this is for a 1031 Exchange, what is your specific timeline, and do you have a target cap rate in mind?" },
            { id: 'h2_4', role: 'user', content: "We are on a strict 45-day 1031 identifier deadline. We need a target cap rate of 6.2% or higher. We are ready to execute immediately once the asset is qualified." },
            { id: 'h2_5', role: 'assistant', content: "Understood, Marcus. A 45-day deadline is absolute. I have registered your parameters in our private client ledger under active 1031-Exchange criteria.\n\nValeria is immediately dispatching our Confidential Executive Briefing for Coral Gables, which contains three off-market boutique luxury multi-family packages yielding 6.4% and 6.6% cap rates. We will follow up via your institutional email on file to coordinate a private conference call." }
          ]
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
          chat_history: [
            { id: 'h3_1', role: 'assistant', content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?" },
            { id: 'h3_2', role: 'user', content: "Hi, I'm looking for a premium high-end annual rental in Sunny Isles or Bal Harbour. My budget is up to $18,000/month. The most important thing is that the building must be pet friendly as I have a small French Bulldog." },
            { id: 'h3_3', role: 'assistant', content: "Welcome, Sophie! Sunny Isles Beach and Bal Harbour host some of the world's most luxurious oceanfront high-rises. Buildings like Residences by Armani Casa and Jade Signature offer incredible resort-style amenities and are highly welcoming to beloved pets.\n\nFor an $18k/month budget, we can secure an exquisite 2 or 3-bedroom flow-through unit with direct ocean views. Are you looking for a standard 12-month lease, and when is your target move date?" },
            { id: 'h3_4', role: 'user', content: "Yes, a 12-month lease starting next month. I would also love an option to buy the unit if possible. I'm a tech executive, credit is 780+ verified, and I want to view a unit this Sunday morning." },
            { id: 'h3_5', role: 'assistant', content: "Fantastic, Sophie. Your tech executive profile and stellar credit have been logged. I have scheduled a private viewing for you this Sunday at 11:30 AM at the spectacular Armani Casa Residences #2204, which is pet-friendly and includes an open option-to-purchase clause.\n\nYour GHL lead card has been updated and synced. Valeria will message you via your mobile shortly to confirm arrival and parking coordinates at the lobby. Have a wonderful weekend!" }
          ]
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
          chat_history: [
            { id: 'h4_1', role: 'assistant', content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?" },
            { id: 'h4_2', role: 'user', content: "Hello. I'm looking to invest in a pre-construction waterfront development in Miami. I am heavily considering Cipriani Residences and the Waldorf Astoria supertall. Budget around $5M." },
            { id: 'h4_3', role: 'assistant', content: "An exceptional strategy, Alexander. The Waldorf Astoria supertall will forever redefine the Miami skyline as its tallest structure, while Cipriani Residences Brickell delivers timeless Milanese hospitality and stunning lagoon decks. Investing at this stage maximizes early equity appreciation.\n\nAre you looking to secure a primary residence or a high-yield investment unit, and do you have liquid deposit funds ready to execute?" },
            { id: 'h4_4', role: 'user', content: "This is a pure investment. Yes, I have $5M liquid ready for the first-tier contract deposits. Send me the floorplans and brochures." },
            { id: 'h4_5', role: 'assistant', content: "Perfect, Alexander. Being liquid and deposit-ready positions you to secure the most coveted corner flow-through floorplans with optimal view lines.\n\nI have triggered our automated pre-construction portal to instantly dispatch the full brochure package, structural floorplans, and current price lists for both Cipriani and Waldorf Astoria straight to your phone. Valeria is preparing a private developer-allocation analysis for you, which will be sent shortly." }
          ]
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
          chat_history: [
            { id: 'h5_1', role: 'assistant', content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?" },
            { id: 'h5_2', role: 'user', content: "hey can i rent a beachfront mansion for like 200 bucks a night or do u sell cheap houses under 100k near the beach" },
            { id: 'h5_3', role: 'assistant', content: "Our advisory group specializes exclusively in premier coastal luxury residences starting at $2.0M+ and annual luxury leases from $10,000/month across South Florida's elite enclaves. Cheap daily rentals or low-tier properties fall outside our focus. I can assist if you are interested in luxury beachfront estates, or I can direct you to generic listing websites." },
            { id: 'h5_4', role: 'user', content: "lol what a joke fine bye" },
            { id: 'h5_5', role: 'assistant', content: "Understood. Please feel free to reach out in the future if your search expands to premium coastal real estate. Wishing you a pleasant day." }
          ]
        },
      },
    ],
  },
};

