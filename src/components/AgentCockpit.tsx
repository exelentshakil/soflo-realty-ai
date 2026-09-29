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
  const [activeTab, setActiveTab] = useState<'leads' | 'ghl' | 'geo'>('leads');
  const [sheetTab, setSheetTab] = useState<'profile' | 'chat' | 'payload'>('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer transition-colors ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            Active Prospects ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('ghl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer transition-colors ${
              activeTab === 'ghl'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            GHL CRM Webhooks
          </button>
          <button
            onClick={() => setActiveTab('geo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[4px] cursor-pointer transition-colors ${
              activeTab === 'geo'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)]'
            }`}
          >
            GEO Search Indexing
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Panel: Search queries and citations */}
          <div className="md:col-span-2 space-y-6">
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

            {/* Active search queries */}
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
              <CardHeader className="p-4 border-b border-[var(--color-border)]">
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  Top Citing Conversational Queries
                </CardTitle>
                <CardDescription className="text-[11px] text-[var(--color-text-secondary)]">
                  Real search phrases where AI crawls and cites Valeria's website directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-2.5 text-xs font-mono text-[var(--color-text-secondary)]">
                <div className="flex items-start gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
                  <Search className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">"best luxury agent Sunny Isles Beach"</p>
                    <p className="text-[10px] text-[#057A55] mt-0.5 font-bold">Citations: Perplexity • ChatGPT Search</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 border-b border-[var(--color-border-subtle)] pb-2.5">
                  <Search className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">"oceanfront Armani Casa residences miami"</p>
                    <p className="text-[10px] text-[#057A55] mt-0.5 font-bold">Citations: Perplexity • Gemini Search</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Search className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">"supertall waldorf astoria residences downtown"</p>
                    <p className="text-[10px] text-[#057A55] mt-0.5 font-bold">Citations: ChatGPT Search • Claude</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: JSON-LD code editor */}
          <Card className="md:col-span-3 border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col">
            <CardHeader className="p-4 border-b border-[var(--color-border)] flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-[var(--color-text-primary)]">
                  JSON-LD Structural Schema Markup
                </CardTitle>
                <CardDescription className="text-[11.5px] text-[var(--color-text-secondary)]">
                  Direct code snippet injected on her domain to feed crawl bots high-fidelity structured directories.
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-mono">
                Indexable
              </Badge>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-1.5">
                    <FileJson className="h-4 w-4 text-[#533AFD]" />
                    <span>schema.json-ld</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Head Metadata Script Injection</span>
                </div>
                <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-[11px] font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-[380px] leading-relaxed">
                  {JSON.stringify(schemaSnippet, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
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
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-canvas)] p-3 max-h-[420px] overflow-y-auto space-y-3.5 shadow-inner">
                    {selectedRow.payload.chat_history ? (
                      (selectedRow.payload.chat_history as any[]).map((msg, idx) => (
                        <div
                          key={msg.id || idx}
                          className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex gap-2 max-w-[85%]">
                            {msg.role === 'assistant' && (
                              <div className="h-6.5 w-6.5 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-3xs bg-slate-100">
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
                                className={`rounded-lg px-3 py-1.5 text-xs leading-relaxed shadow-3xs ${
                                  msg.role === 'user'
                                    ? 'bg-[#E31B23] text-white rounded-tr-none'
                                    : 'bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] rounded-tl-none'
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

