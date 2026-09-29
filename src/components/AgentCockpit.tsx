'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
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

              {/* Metadata details */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase">Budget Range</div>
<div className="font-semibold text-emerald-600 mt-0.5">{selectedRow.latency}</div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase">Intent Category</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{selectedRow.category}</div>
                </div>
              </div>

              {/* Raw JSON block */}
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
                <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-96 leading-relaxed">
                  {JSON.stringify(selectedRow.payload, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

