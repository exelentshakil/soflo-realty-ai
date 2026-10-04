'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Copy,
  Check,
  TrendingUp,
  Database,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Smartphone,
  Mail,
  DollarSign,
  Clock,
  Bot,
  Zap,
  RefreshCw,
  FileJson,
  Search,
  User,
  MessageSquare,
  Sparkles,
  Activity,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { siteConfig, type TableRow as RowType } from '@/config/site';
import { luxuryListings } from '@/config/listings';

interface AgentCockpitProps {
  leads: RowType[];
  ghlLogs: any[];
  simulatedOutage: boolean;
  onToggleOutage: () => void;
}

export function AgentCockpit({
  leads,
  ghlLogs,
  simulatedOutage,
  onToggleOutage,
}: AgentCockpitProps) {
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'ghl' | 'geo' | 'roi'>('leads');
  const [sheetTab, setSheetTab] = useState<'profile' | 'chat' | 'payload'>('profile');
  const [mounted, setMounted] = useState(false);

  // States for Conversational GEO Search Simulator
  const [geoQuery, setGeoQuery] = useState<string | null>(null);
  const [geoLogs, setGeoLogs] = useState<string[]>([]);
  const [geoResult, setGeoResult] = useState<any | null>(null);
  const [geoSimulating, setGeoSimulating] = useState(false);

  // States for ROI Savings Calculator
  const [weeklyLeads, setWeeklyLeads] = useState<number>(40);
  const [manualCost, setManualCost] = useState<number>(45);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runGeoCrawl = (query: string, listingId: string) => {
    if (geoSimulating) return;
    setGeoQuery(query);
    setGeoResult(null);
    setGeoSimulating(true);
    setGeoLogs([]);

    const steps = [
      { delay: 0, text: `[INFO] Parsing NLP Query: "${query}" using text-embedding-3-small...` },
      { delay: 400, text: `[SUCCESS] Contextual intent matched to: LUXURY_RESIDENTIAL_INDEX` },
      { delay: 800, text: `[INFO] Extracted search weights:\n   - Query Term: "${query}"\n   - Cosine threshold: >= 0.85` },
      { delay: 1200, text: `[INFO] Accessing local vectorized property index...` },
      { delay: 1600, text: `[INFO] Executing ST_DWithin PostGIS boundary proximity calculations...` },
      { delay: 2000, text: `[SUCCESS] Matched 1 property with similarity 0.963.\n[INFO] Synchronizing records & dispatching live card...` }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setGeoLogs(prev => [...prev, step.text]);
        if (step.delay === 2000) {
          const matched = luxuryListings.find(l => l.id === listingId);
          setGeoResult(matched || null);
          setGeoSimulating(false);
        }
      }, step.delay);
    });
  };

  useEffect(() => {
    if (selectedRow) {
      setSheetTab('profile');
    }
  }, [selectedRow]);

  const getStatusBadge = (status: RowType['status']) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-mono px-1.5 py-0">
            Verified POF
          </Badge>
        );
      case 'active':
        return (
          <Badge variant="outline" className="bg-teal-50 text-teal-800 border-teal-200 text-[10px] font-mono px-1.5 py-0">
            Chatting
          </Badge>
        );
      case 'queued':
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-800 border-indigo-200 text-[10px] font-mono px-1.5 py-0">
            Webhook Sent
          </Badge>
        );
      case 'flagged':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 text-[10px] font-mono px-1.5 py-0">
            Redacted / Spam
          </Badge>
        );
    }
  };

  const handleCopy = (data: Record<string, unknown>) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const schemaSnippet = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Valeria Afanasieva Luxury Real Estate",
    "image": "https://valeria-miami.com/headshot.jpeg",
    "@id": "https://valeria-miami.com/#agent",
    "url": "https://valeria-miami.com",
    "telephone": "+1-754-276-7313",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "800 Brickell Avenue, Penthouse B",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "postalCode": "33131",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.7617,
      "longitude": -80.1918
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Sunny Isles Beach" },
      { "@type": "AdministrativeArea", "name": "Brickell" },
      { "@type": "AdministrativeArea", "name": "Coral Gables" }
    ],
    "knowsAbout": [
      "Armani Casa Residences",
      "Porsche Design Tower Sky Residences",
      "Waldorf Astoria Residences Miami",
      "Cipriani Residences Brickell"
    ]
  };

  // Dynamic Chart Computations from Live Leads
  const baseTimeline = [
    { day: 'Mon', leads: 4, verified: 3 },
    { day: 'Tue', leads: 6, verified: 4 },
    { day: 'Wed', leads: 5, verified: 4 },
    { day: 'Thu', leads: 8, verified: 6 },
    { day: 'Fri', leads: 7, verified: 5 },
    { day: 'Sat', leads: 12, verified: 9 },
    { day: 'Sun', leads: 10, verified: 8 },
  ];

  const submarketCounts = {
    'Sunny Isles': 4,
    'Brickell': 5,
    'Coral Gables': 3,
    'Coconut Grove': 2,
  };

  leads.forEach(lead => {
    const locs = (lead.payload?.target_locations || lead.payload?.preferred_neighborhoods || []) as any;
    if (Array.isArray(locs)) {
      locs.forEach((loc: any) => {
        const name = String(loc);
        if (name.includes('Sunny') || name.includes('Isles')) submarketCounts['Sunny Isles']++;
        else if (name.includes('Brickell')) submarketCounts['Brickell']++;
        else if (name.includes('Coral') || name.includes('Gables')) submarketCounts['Coral Gables']++;
        else if (name.includes('Coconut') || name.includes('Grove')) submarketCounts['Coconut Grove']++;
      });
    }
  });

  const submarketChartData = [
    { name: 'Sunny Isles Beach', value: submarketCounts['Sunny Isles'], color: '#E31B23' }, // Valeria Red
    { name: 'Brickell Penthouse', value: submarketCounts['Brickell'], color: '#111827' }, // Slate Charcoal
    { name: 'Coral Gables Mediterranean', value: submarketCounts['Coral Gables'], color: '#C5A880' }, // Gold
    { name: 'Coconut Grove Luxury', value: submarketCounts['Coconut Grove'], color: '#64748B' }, // Slate
  ];

  const statusCounts = {
    verified: 0,
    active: 0,
    queued: 0,
    flagged: 0,
  };
  leads.forEach(lead => {
    if (statusCounts[lead.status] !== undefined) {
      statusCounts[lead.status]++;
    }
  });

  const intentDistributionData = [
    { name: 'Verified POF', count: statusCounts.verified, color: '#10B981' }, // Emerald
    { name: 'Active Chatting', count: statusCounts.active, color: '#14B8A6' }, // Teal
    { name: 'Webhook Sent', count: statusCounts.queued, color: '#6366F1' }, // Indigo
    { name: 'Redacted / Spam', count: statusCounts.flagged, color: '#F59E0B' }, // Amber
  ];

  return (
    <div className="space-y-6">
      {/* Real-time KPI summary bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
          <CardContent className="p-4.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span>CONVERSION EFFICIENCY</span>
              <TrendingUp className="h-4 w-4 text-[#057A55]" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">74.2%</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-tight">
                Qualified Buyer & Investor Rate with automated POF self-certification.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
          <CardContent className="p-4.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span>DISPATCH LATENCY</span>
              <Clock className="h-4 w-4 text-[#533AFD]" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">&lt; 5 Seconds</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-tight">
                Median webhook post time to GoHighLevel CRM and automated SMS trigger.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
          <CardContent className="p-4.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
              <span>DUAL FAILOVER UPTIME</span>
              <Database className="h-4 w-4 text-[#057A55]" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">100.00%</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 leading-tight">
                OpenAI primary active with immediate Google Gemini API hot failover.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SaaS Operational Analytics Cockpit */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Conversion Timeline Area Chart */}
          <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
            <CardHeader className="p-4.5 pb-2 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#E31B23]" />
                <CardTitle className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Luxury Ingestion Timeline
                </CardTitle>
              </div>
              <CardDescription className="text-[10.5px] text-[var(--color-text-muted)] mt-0.5">
                Weekly leads qualified vs total inbound inquiries
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4.5 pt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={baseTimeline} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="timelineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E31B23" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#E31B23" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="verifiedAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.25} vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-sm text-[10.5px] font-mono space-y-0.5">
                            <p className="font-bold text-[var(--color-text-primary)]">{payload[0].payload.day}</p>
                            <p className="text-[#E31B23]">Inbound: {payload[0].value}</p>
                            <p className="text-[#10B981]">Qualified: {payload[1]?.value || 0}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#E31B23" strokeWidth={1.8} fill="url(#timelineAreaGrad)" />
                  <Area type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={1.8} fill="url(#verifiedAreaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Chart 2: Submarket Demand Share Pie Chart */}
          <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
            <CardHeader className="p-4.5 pb-2 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                <CardTitle className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Submarket Demand Distribution
                </CardTitle>
              </div>
              <CardDescription className="text-[10.5px] text-[var(--color-text-muted)] mt-0.5">
                Proportional inquiry volume by neighborhood
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4.5 pt-4 h-44 flex items-center justify-between gap-2">
              <div className="w-[45%] h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={submarketChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={44}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {submarketChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-[55%] flex flex-col space-y-1.5 text-[10px] font-mono justify-center">
                {submarketChartData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1.5 min-w-0">
                    <span className="h-2 w-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: entry.color }} />
                    <span className="text-[var(--color-text-secondary)] truncate flex-1 leading-none">{entry.name}</span>
                    <span className="font-bold text-[var(--color-text-primary)] shrink-0">{entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chart 3: Intent Classification Bar Chart */}
          <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
            <CardHeader className="p-4.5 pb-2 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                <CardTitle className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Intent Score Classification
                </CardTitle>
              </div>
              <CardDescription className="text-[10.5px] text-[var(--color-text-muted)] mt-0.5">
                Live prospects bucketed by verification status
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4.5 pt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={intentDistributionData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.25} vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={8} tickLine={false} axisLine={false} tickFormatter={(val) => val.split(' ')[0]} />
                  <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-xs text-[10.5px] font-mono">
                            <p className="font-bold text-[var(--color-text-primary)]">{payload[0].payload.name}</p>
                            <p style={{ color: payload[0].payload.color }} className="font-semibold">Volume: {payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {intentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Command Control Subheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--color-border)] pb-3.5 gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            Active Prospects ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('ghl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'ghl'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            GHL CRM Webhooks
          </button>
          <button
            onClick={() => setActiveTab('geo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'geo'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            GEO Search Indexing
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer whitespace-nowrap transition-colors ${
              activeTab === 'roi'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            ROI & Savings Calculator
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleOutage}
            className={`h-7 px-2.5 text-[10.5px] font-mono border-[var(--color-border)] rounded-[4px] cursor-pointer flex items-center gap-1.5 ${
              simulatedOutage
                ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                : 'hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]'
            }`}
          >
            <Zap className={`h-3 w-3 ${simulatedOutage ? 'text-red-600' : 'text-slate-400'}`} />
            <span>{simulatedOutage ? 'Simulating OpenAI Outage (Gemini Active)' : 'Simulate OpenAI Outage'}</span>
          </Button>
        </div>
      </div>

      {/* View 1: Active Ingested Prospects */}
      {activeTab === 'leads' && (
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <CardHeader className="p-4 border-b border-[var(--color-border)] flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                Live Ingested Prospects Pipeline
              </CardTitle>
              <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)] mt-0.5">
                Automated matching table showing live user-chat conversions in client view.
              </CardDescription>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Click any row to inspect deep schema</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[var(--color-panel-subtle)]">
                  <TableRow className="border-b border-[var(--color-border)] hover:bg-transparent">
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4 w-[110px]">Lead ID</TableHead>
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4">Prospect Name</TableHead>
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4">Intent Classification</TableHead>
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4">Status</TableHead>
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4">Budget Tier</TableHead>
                    <TableHead className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-2.5 px-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map(row => (
                    <TableRow
                      key={row.id}
                      onClick={() => setSelectedRow(row)}
                      className="border-b border-[var(--color-border)]/60 cursor-pointer hover:bg-[var(--color-panel-subtle)]/70 transition-colors"
                    >
                      <TableCell className="font-mono text-xs font-semibold text-[var(--color-text-primary)] py-3 px-4">
                        {row.id}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <div className="font-medium text-xs text-[var(--color-text-primary)]">
                          {row.entityName}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)] font-mono mt-0.5">
                          {row.updatedAt}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-[var(--color-text-secondary)] py-3 px-4 font-sans">
                        {row.category}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        {getStatusBadge(row.status)}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-emerald-600 font-medium py-3 px-4">
                        {row.latency}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedRow(row);
                          }}
                          className="h-6 text-[10.5px] font-mono text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1 px-2.5 cursor-pointer rounded-[3px]"
                        >
                          <span>Inspect Payload</span>
                          <ArrowRight className="h-3 w-3 ml-1 shrink-0" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View 2: GoHighLevel CRM Webhooks */}
      {activeTab === 'ghl' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Webhook Stream Logs */}
          <Card className="md:col-span-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col">
            <CardHeader className="p-4 border-b border-[var(--color-border)]">
              <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                GoHighLevel CRM Webhook Event Log
              </CardTitle>
              <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)]">
                P99 real-time transmission of parsed AI metadata payloads directly to GHL lead APIs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <div className="space-y-4">
                {ghlLogs.length === 0 ? (
                  <div className="rounded-lg border border-[var(--color-border)] p-8 text-center text-[var(--color-text-muted)] space-y-2 bg-[var(--color-panel-subtle)]">
                    <Terminal className="h-8 w-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-mono">No webhooks captured yet.</p>
                    <p className="text-[11px] leading-normal text-slate-400 max-w-xs mx-auto">
                      Open Valeria's AI Concierge in the Client Portal view, start a conversation, and provide contact details (email/phone) to trigger live webhooks!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                    {ghlLogs.map((log, idx) => (
                      <div key={idx} className="rounded-lg border border-[var(--color-border)] bg-slate-950 text-slate-200 p-4 font-mono text-[11px] space-y-2.5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] px-1 py-0 rounded-[3px]">
                              POST {log.status} {log.statusText}
                            </Badge>
                            <span className="text-[10px] text-slate-400">Webhook Dispatch</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="space-y-1 text-slate-300">
                          <div><span className="text-slate-500">Endpoint:</span> {log.webhookUrl}</div>
                          <div><span className="text-slate-500">Lead ID:</span> {log.leadId}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500">JSON Payload:</span>
                          <pre className="p-2.5 rounded bg-slate-900 border border-slate-800/80 text-slate-300 overflow-x-auto text-[10.5px] max-h-48 leading-relaxed">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* GHL Config Info */}
          <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
            <CardHeader className="p-4 border-b border-[var(--color-border)]">
              <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                CRM Sync Status
              </CardTitle>
              <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)]">
                State-machine credentials mapping.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-xs">
              <div className="space-y-2">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[var(--color-text-primary)]">Custom Fields Tracked</span>
                <div className="space-y-1.5 font-mono text-[11px] text-[var(--color-text-secondary)]">
                  <div className="flex justify-between">
                    <span>budget_tier:</span>
                    <span className="text-[var(--color-text-primary)] font-semibold">String (e.g. $4.5M)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>showing_neighborhoods:</span>
                    <span className="text-[var(--color-text-primary)] font-semibold">String (comma-separated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>buyer_intent_score:</span>
                    <span className="text-[var(--color-text-primary)] font-semibold">Integer (1 to 10)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>move_timeline:</span>
                    <span className="text-[var(--color-text-primary)] font-semibold">String (Immediate / Casual)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>pof_status:</span>
                    <span className="text-[var(--color-text-primary)] font-semibold">String (Verified Cash)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)]">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[var(--color-text-primary)]">Tag Taxonomy Applied</span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="bg-[#533AFD]/5 text-[#533AFD] border-[#533AFD]/10 text-[10px] font-mono whitespace-nowrap">#AI-Captured</Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px] font-mono whitespace-nowrap">#VIP-Priority</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-[10px] font-mono whitespace-nowrap">#Cash-Buyer</Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-100 text-[10px] font-mono whitespace-nowrap">#Financed</Badge>
                </div>
              </div>

              <div className="p-3.5 rounded bg-[var(--color-panel-subtle)] border border-[var(--color-border)] space-y-1.5 leading-normal text-slate-500 text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                  <ShieldCheck className="h-4 w-4 text-[#057A55]" />
                  <span>NIST Security Firewall Active</span>
                </div>
                <p>
                  AI firewall sanitizes and redacts all raw user inputs before transmission, removing unverified parameters and blocking cross-session prompt injection vectors automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* View 3: GEO Traffic Search Indexing */}
      {activeTab === 'geo' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel: SEO metrics and Schema */}
          <div className="lg:col-span-2 space-y-6">
            {/* Share of Voice */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <CardHeader className="p-4 border-b border-[var(--color-border)]">
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  AI Search Engine Share of Voice
                </CardTitle>
                <CardDescription className="text-[11px] text-[var(--color-text-secondary)]">
                  Percentage of luxury search bots citing Valeria's portfolio first in South Florida.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4.5 space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)]">Perplexity Search</span>
                    <span className="font-bold text-[#057A55]">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-slate-100 [&>div]:bg-[#057A55]" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)]">ChatGPT Search</span>
                    <span className="font-bold text-[#533AFD]">38%</span>
                  </div>
                  <Progress value={38} className="h-2 bg-slate-100 [&>div]:bg-[#533AFD]" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)]">Google Gemini (Search)</span>
                    <span className="font-bold text-slate-700">12%</span>
                  </div>
                  <Progress value={12} className="h-2 bg-slate-100 [&>div]:bg-slate-700" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)]">Other / Anthropic Claude</span>
                    <span className="font-bold text-slate-500">8%</span>
                  </div>
                  <Progress value={8} className="h-2 bg-slate-100 [&>div]:bg-slate-500" />
                </div>
              </CardContent>
            </Card>

            {/* JSON-LD Schema Card */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <CardHeader className="p-4 border-b border-[var(--color-border)] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                    SEO Structured Schema
                  </CardTitle>
                  <CardDescription className="text-[11px] text-[var(--color-text-secondary)]">
                    JSON-LD metadata injected to feed active search crawlers.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-mono px-1.5 py-0">
                  Live
                </Badge>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--color-text-primary)]">
                    <div className="flex items-center gap-1.5">
                      <FileJson className="h-4 w-4 text-[#533AFD]" />
                      <span>schema.json-ld</span>
                    </div>
                  </div>
                  <pre className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 text-[10.5px] font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-[180px] leading-relaxed scrollbar-thin">
                    {JSON.stringify(schemaSnippet, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Interactive MLS Indexing and Search Crawler Simulator */}
          <Card className="lg:col-span-3 border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col">
            <CardHeader className="p-4 border-b border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                    MLS Vector Index & Crawler Simulator
                  </CardTitle>
                  <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)]">
                    Simulate real-time conversational search queries crawling and matching indexed luxury listings.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-mono px-1.5 py-0">
                  Ready
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3.5">
                {/* Query Selector */}
                <div>
                  <label className="text-[11px] font-mono font-bold uppercase text-[var(--color-text-secondary)] tracking-wider">
                    Select Sample Conversational Query
                  </label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    <button
                      onClick={() => runGeoCrawl('beachfront 3-bed with private car lift', 'list-porsche')}
                      disabled={geoSimulating}
                      className={`w-full text-left px-3.5 py-2.5 rounded-[6px] border text-xs font-mono transition-all flex items-center justify-between group cursor-pointer ${
                        geoQuery === 'beachfront 3-bed with private car lift'
                          ? 'bg-[#E31B23]/5 border-[#E31B23]/30 text-[#E31B23]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#E31B23]" />
                        <span>"beachfront 3-bed with private car lift"</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => runGeoCrawl('Brickell penthouse under $5M with bay views', 'list-cipriani')}
                      disabled={geoSimulating}
                      className={`w-full text-left px-3.5 py-2.5 rounded-[6px] border text-xs font-mono transition-all flex items-center justify-between group cursor-pointer ${
                        geoQuery === 'Brickell penthouse under $5M with bay views'
                          ? 'bg-[#E31B23]/5 border-[#E31B23]/30 text-[#E31B23]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#E31B23]" />
                        <span>"Brickell penthouse under $5M with bay views"</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => runGeoCrawl('oceanfront 2 to 4 bed Sunny Isles Beach', 'list-armani')}
                      disabled={geoSimulating}
                      className={`w-full text-left px-3.5 py-2.5 rounded-[6px] border text-xs font-mono transition-all flex items-center justify-between group cursor-pointer ${
                        geoQuery === 'oceanfront 2 to 4 bed Sunny Isles Beach'
                          ? 'bg-[#E31B23]/5 border-[#E31B23]/30 text-[#E31B23]'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#E31B23]" />
                        <span>"oceanfront 2 to 4 bed Sunny Isles Beach"</span>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Terminal Console Output */}
                {(geoLogs.length > 0 || geoSimulating) && (
                  <div className="rounded-[8px] overflow-hidden border border-slate-800 bg-slate-950 font-mono shadow-md text-slate-300">
                    <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                      </div>
                      <span>conversational-crawler-terminal</span>
                    </div>
                    <div className="p-3.5 text-[11px] leading-relaxed space-y-1.5 max-h-[160px] overflow-y-auto font-mono scrollbar-thin">
                      {geoLogs.map((log, index) => (
                        <div key={index} className="whitespace-pre-wrap">
                          {log.startsWith('[SUCCESS]') ? (
                            <span className="text-emerald-400 font-bold">{log}</span>
                          ) : log.startsWith('[ERROR]') ? (
                            <span className="text-red-400 font-bold">{log}</span>
                          ) : (
                            <span className="text-slate-300">{log}</span>
                          )}
                        </div>
                      ))}
                      {geoSimulating && (
                        <div className="flex items-center gap-1 text-[#E31B23] animate-pulse">
                          <span>$</span>
                          <span className="h-3.5 w-1 bg-[#E31B23] animate-ping"></span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Matched Property Card Output */}
              {geoResult && !geoSimulating && (
                <div className="mt-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xs flex flex-col sm:flex-row animate-fadeIn">
                  <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 overflow-hidden bg-slate-100">
                    <img
                      src={geoResult.image}
                      alt={geoResult.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-extrabold text-[15px] text-[#0A2E2B] dark:text-white leading-tight">
                          {geoResult.name}
                        </h4>
                        <Badge className="bg-[#E31B23] hover:bg-[#E31B23] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                          Matched citation
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-[var(--color-text-secondary)] text-[10px] font-mono">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{geoResult.neighborhood}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                        {geoResult.description}
                      </p>
                      <div className="pt-1.5 flex flex-wrap gap-1.5">
                        {geoResult.amenities.slice(0, 3).map((amenity: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="border-slate-200 text-slate-600 text-[9.5px] font-mono bg-slate-50 px-1.5 py-0">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase tracking-wider block leading-none">Price Range</span>
                        <span className="font-mono font-bold text-sm text-[#057A55]">
                          {geoResult.priceRange}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="h-7 text-[10.5px] bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-[4px] px-2.5 cursor-pointer flex items-center gap-1 shrink-0"
                        onClick={() => {
                          alert(`Custom simulation citation dispatched. In an actual client deployment, selecting this property automatically pulls lead qualification parameters and schedules a private tour directly on your FUB / Lofty calendar.`);
                        }}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Schedule FUB Tour</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!geoResult && !geoSimulating && (
                <div className="rounded-[8px] border border-dashed border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-8 text-center flex flex-col items-center justify-center space-y-2 mt-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-xs font-semibold text-[var(--color-text-primary)]">No query simulated yet</p>
                  <p className="text-[10.5px] text-[var(--color-text-secondary)] max-w-sm leading-normal">
                    Select one of the conversational NLP searches above to run the real-time crawl, semantic scoring, and index matching engine.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* View 4: ROI & Savings Calculator */}
      {activeTab === 'roi' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel: Inputs and Sliders */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <CardHeader className="p-4.5 border-b border-[var(--color-border)]">
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  Volume & Overhead Settings
                </CardTitle>
                <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)] mt-0.5">
                  Adjust inputs to see how automated qualification eliminates agency labor and increases conversions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5.5 space-y-6.5">
                {/* Weekly Leads Slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Weekly Inbound Leads</span>
                    <span className="font-bold text-[#E31B23] text-sm bg-[#E31B23]/5 border border-[#E31B23]/10 rounded px-2.5 py-0.5">
                      {weeklyLeads} leads / week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={weeklyLeads}
                    onChange={(e) => setWeeklyLeads(Number(e.target.value))}
                    className="w-full accent-[#E31B23] cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>5 leads</span>
                    <span>100 leads</span>
                    <span>200 leads</span>
                  </div>
                </div>

                {/* Manual Cost Slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)] uppercase tracking-wider">Manual Qualification Overhead</span>
                    <span className="font-bold text-[#057A55] text-sm bg-emerald-50 border border-emerald-100 rounded px-2.5 py-0.5">
                      ${manualCost} / lead
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={manualCost}
                    onChange={(e) => setManualCost(Number(e.target.value))}
                    className="w-full accent-[#057A55] cursor-pointer h-1.5 bg-slate-100 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>$10 / lead</span>
                    <span>$80 / lead</span>
                    <span>$150 / lead</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explanatory Context Card */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <CardHeader className="p-4 border-b border-[var(--color-border)]">
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  Why Manual Qualification Voids Commission
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  High-volume agents and teams waste dozens of hours playing cold phone tag, vetting buyer timelines, and chasing down proof of funds. This leads to massive overhead, missed VIP prospects, and leaked commissions.
                </p>
                <p>
                  Our bespoke AI Concierge sits on high-end real estate web applications and runs 24/7. It qualifies buyers, verifies budgets, handles proof-of-funds self-certification, and schedules showings directly in your Follow Up Boss calendar. You get qualified, verified leads sent straight to your CRM without the manual grind.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Financial Output and Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between">
              <CardHeader className="p-4 border-b border-[var(--color-border)]">
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  Simulated Financial Return
                </CardTitle>
                <CardDescription className="text-[11px] text-[var(--color-text-secondary)]">
                  Comparing current manual labor against automated AI Concierge subscription.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4.5 space-y-4">
                {/* Net Savings Box */}
                <div className="rounded-[8px] bg-[#057A55]/10 border border-[#057A55]/20 p-4 text-center space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#057A55] uppercase tracking-wider">
                    Net Monthly Savings
                  </span>
                  <div className="text-3xl font-bold font-serif text-[#057A55]">
                    ${(Math.round(weeklyLeads * 4.33) * manualCost - (300 + Math.round(weeklyLeads * 4.33 * 0.12))).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    Saved from manual filtering overhead
                  </span>
                </div>

                {/* KPI Breakdown */}
                <div className="space-y-3.5 font-mono pt-2">
                  <div className="flex justify-between items-center text-xs border-b border-[var(--color-border-subtle)] pb-2.5">
                    <span className="text-[var(--color-text-secondary)]">Estimated Volume</span>
                    <span className="font-bold text-[var(--color-text-primary)]">
                      {Math.round(weeklyLeads * 4.33)} leads / mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-[var(--color-border-subtle)] pb-2.5">
                    <span className="text-[var(--color-text-secondary)]">Current Manual Cost</span>
                    <span className="font-bold text-red-600">
                      ${(Math.round(weeklyLeads * 4.33) * manualCost).toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-[var(--color-border-subtle)] pb-2.5">
                    <span className="text-[var(--color-text-secondary)]">AI Concierge Cost</span>
                    <span className="font-bold text-[#533AFD]">
                      ${(300 + Math.round(weeklyLeads * 4.33 * 0.12)).toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pb-1">
                    <span className="text-[var(--color-text-secondary)]">Estimated ROI</span>
                    <div className="flex items-center gap-1 font-bold text-[#057A55]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>
                        {Math.round(
                          ((Math.round(weeklyLeads * 4.33) * manualCost - (300 + Math.round(weeklyLeads * 4.33 * 0.12))) /
                            (300 + Math.round(weeklyLeads * 4.33 * 0.12))) *
                            100
                        ).toLocaleString()}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Call to Action Pitch Button */}
                <div className="pt-3.5">
                  <Button
                    onClick={() => {
                      alert(`Inbound demonstration request captured! This button links directly to your strategy scheduler or GoHighLevel lead capture sequence, letting luxury real estate prospects book their onboarding session instantly.`);
                    }}
                    className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-[6px] tracking-wider uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Deploy Pilot Trial</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Deep Inspection Modal (Sheet) */}
      <Sheet open={!!selectedRow} onOpenChange={open => !open && setSelectedRow(null)}>
        <SheetContent className="w-full sm:max-w-xl bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 overflow-y-auto">
          {selectedRow && (
            <div className="space-y-6">
              <SheetHeader className="text-left space-y-2 border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
                    {selectedRow.id}
                  </span>
                  {getStatusBadge(selectedRow.status)}
                </div>
                <SheetTitle className="text-lg font-bold text-[var(--color-text-primary)]">
                  {selectedRow.entityName}
                </SheetTitle>
                <SheetDescription className="text-xs font-mono text-[var(--color-text-secondary)]">
                  Provider: {selectedRow.provider}
                </SheetDescription>
              </SheetHeader>

              {/* Sheet Navigation Tabs */}
              <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] pb-2.5">
                <button
                  onClick={() => setSheetTab('profile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer ${
                    sheetTab === 'profile'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
                  }`}
                >
                  Lead Profile
                </button>
                <button
                  onClick={() => setSheetTab('chat')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer flex items-center gap-1 ${
                    sheetTab === 'chat'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
                  }`}
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>Conversation Log</span>
                </button>
                <button
                  onClick={() => setSheetTab('payload')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] transition-colors cursor-pointer ${
                    sheetTab === 'payload'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
                  }`}
                >
                  Sync Payload
                </button>
              </div>

              {/* Tab 1: Lead Profile & Extracted Metadata */}
              {sheetTab === 'profile' && (
                <div className="space-y-4 pt-1">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Budget Tier</div>
                      <div className="font-semibold text-emerald-600 mt-1 text-sm">{selectedRow.latency}</div>
                    </div>
                    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                      <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Intent Profile</div>
                      <div className="font-semibold text-[var(--color-text-primary)] mt-1 text-xs truncate" title={selectedRow.category}>
                        {selectedRow.category}
                      </div>
                    </div>
                  </div>

                  {/* Deep Extraction Fields */}
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-3xs">
                    <div className="bg-[var(--color-panel-subtle)] px-4 py-2 border-b border-[var(--color-border)] flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-primary)] font-mono">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span>Extracted CRM Entity Metadata</span>
                    </div>
                    <div className="p-4 space-y-3 text-xs">
                      {Object.entries(selectedRow.payload)
                        .filter(([key]) => key !== 'chat_history')
                        .map(([key, value]) => (
                          <div key={key} className="flex flex-col sm:flex-row sm:items-start justify-between py-1.5 border-b border-[var(--color-border-subtle)]/50 last:border-0 gap-1.5">
                            <span className="font-mono text-slate-500 font-medium shrink-0 min-w-[150px]">
                              {key.replace(/_/g, ' ')}:
                            </span>
                            <span className="font-sans text-[var(--color-text-primary)] font-semibold text-left sm:text-right">
                              {Array.isArray(value) ? value.join(', ') : String(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Sync Details */}
                  <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-slate-950 text-slate-300 font-mono text-[10.5px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>CRM Integration Active</span>
                    </div>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                      Lead ID: {selectedRow.id} • API Provider: {selectedRow.provider} • Auto-Scored.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Conversation Log / Transcript */}
              {sheetTab === 'chat' && (
                <div className="space-y-4 pt-1">
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] p-3.5 max-h-[440px] overflow-y-auto space-y-4 shadow-inner">
                    {selectedRow.payload.chat_history ? (
                      (selectedRow.payload.chat_history as any[]).map((msg, idx) => (
                        <div
                          key={msg.id || idx}
                          className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex gap-2.5 max-w-[88%]">
                            {msg.role === 'assistant' && (
                              <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-3xs mt-1 bg-slate-100">
                                <img
                                  src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
                                  alt="Valeria Assistant"
                                  className="h-full w-full object-cover object-top"
                                />
                              </div>
                            )}
                            <div className="flex flex-col space-y-0.5">
                              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider text-left">
                                {msg.role === 'user' ? 'Prospect' : "Valeria's AI Concierge"}
                              </span>
                              <div
                                className={`rounded-xl px-3.5 py-2 text-[14.5px] leading-relaxed shadow-3xs ${
                                  msg.role === 'user'
                                    ? 'bg-[#E31B23] text-white rounded-tr-none font-semibold'
                                    : 'bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-slate-900 dark:text-white font-medium rounded-tl-none'
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <MessageSquare className="h-8 w-8 text-slate-200 mx-auto" />
                        <p className="text-xs font-mono">No chat transcript available for this lead.</p>
                        <p className="text-[11px] leading-relaxed max-w-xs mx-auto text-slate-400">
                          This prospect record was imported from custom legacy sync adapters. New leads qualified through the live chat interface will automatically embed full real-time conversations here.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RAG Refinement Banner */}
                  <div className="p-3.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[11px] leading-relaxed text-slate-500">
                    <div className="flex items-center gap-1.5 font-bold text-[var(--color-text-primary)]">
                      <Activity className="h-4 w-4 text-[#C5A880]" />
                      <span>RAG Training Extraction Block</span>
                    </div>
                    <p className="mt-1">
                      This transcription is securely indexed for Retrieval-Augmented Generation (RAG). Valeria can review these logs to inject specific property and neighborhood corrections into her vector storage.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Raw Sync Payload JSON */}
              {sheetTab === 'payload' && (
                <div className="space-y-4 pt-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--color-text-primary)]">In-Memory Sync Payload</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(selectedRow.payload)}
                        className="h-7 text-xs font-mono"
                      >
                        {copiedPayload ? (
                          <>
                            <Check className="h-3 w-3 mr-1 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy JSON
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-[380px] leading-relaxed">
                      {JSON.stringify(selectedRow.payload, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

