'use client';

import React, { useState } from 'react';
import {
  MapPin,
  TrendingUp,
  Calendar,
  ShieldCheck,
  MessageSquare,
  Share2,
  Zap,
  CheckCircle2,
  RefreshCw,
  Check,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export function StripeInteractiveShowcase() {
  // Card 1: Neighborhood Filter
  const [selectedArea, setSelectedArea] = useState<'brickell' | 'gables' | 'sunny_isles'>('brickell');

  // Card 2: Intent Classification Tier
  const [leadTier, setLeadTier] = useState<'buyer' | 'renter' | 'investor'>('buyer');

  // Card 3: Showing Booking State
  const [showingBooked, setShowingBooked] = useState(false);

  // Card 4: POF Guardrail
  const [pofVerified, setPofVerified] = useState(true);

  // Card 5: SMS Dialogue Simulation
  const [smsAnswerSent, setSmsAnswerSent] = useState(false);

  // Card 6: CRM Dispatch Simulation
  const [crmSynced, setCrmSynced] = useState(false);

  const handleBookShowing = () => {
    setShowingBooked(true);
    setTimeout(() => setShowingBooked(false), 3000);
  };

  const handleSendSms = () => {
    setSmsAnswerSent(true);
    setTimeout(() => setSmsAnswerSent(false), 2500);
  };

  const handleSyncCrm = () => {
    setCrmSynced(true);
    setTimeout(() => setCrmSynced(false), 2500);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--color-border)] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#533AFD]/20 bg-[#533AFD]/8 px-3 py-1 text-xs font-mono text-[#533AFD] dark:text-[#7A68FF] mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>South Florida Real Estate Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-[var(--color-text-primary)] leading-tight">
            Six pillars of luxury lead conversion.{' '}
            <span className="text-[var(--color-text-secondary)] opacity-75 font-normal">
              Autonomous qualification, verified intent scoring, and instant private showing scheduling.
            </span>
          </h2>
        </div>

        {/* 6-Card Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Neighborhood & Inventory Matcher */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 1 • Targeted Intake
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <MapPin className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Miami neighborhood matching
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Routes high-intent buyers into dedicated micro-funnels for Brickell, Coral Gables, or Sunny Isles.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="grid grid-cols-3 gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-[6px] border border-[var(--color-border)]">
                {[
                  { id: 'brickell', label: 'Brickell' },
                  { id: 'gables', label: 'Coral Gables' },
                  { id: 'sunny_isles', label: 'Sunny Isles' },
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedArea(area.id as any)}
                    className={`text-[10px] font-mono py-1 rounded-[4px] capitalize font-medium transition-all cursor-pointer ${
                      selectedArea === area.id
                        ? 'bg-[var(--color-surface)] text-[#533AFD] dark:text-[#7A68FF] shadow-xs font-bold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>

              <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-1">
                  <span>Matched Properties</span>
                  <span className="text-[#057A55]">3 Active Units</span>
                </div>
                <div className="truncate text-slate-700 dark:text-slate-300">
                  📍 {selectedArea === 'brickell' ? 'Four Seasons Residences #48B ($3.5M)' : selectedArea === 'gables' ? 'Gables Estates Waterfront Villa ($8.2M)' : 'Regalia Sunny Isles Penthouse ($9.8M)'}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)]">
                  HOA verified • Waterfront balcony • 2 Valet spots
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Buyer Intent & Budget Classifier */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 2 • Intent Classifier
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Separate buyers from renters
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Determines purchasing power, financing pre-approval, and investment horizons in under 100ms.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="grid grid-cols-3 gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-[6px] border border-[var(--color-border)]">
                {[
                  { id: 'buyer', label: 'Cash Buyer' },
                  { id: 'renter', label: 'Luxury Renter' },
                  { id: 'investor', label: '1031 Investor' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setLeadTier(tier.id as any)}
                    className={`text-[10px] font-mono py-1 rounded-[4px] capitalize font-medium transition-all cursor-pointer ${
                      leadTier === tier.id
                        ? 'bg-[var(--color-surface)] text-[#533AFD] dark:text-[#7A68FF] shadow-xs font-bold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 font-mono text-[10.5px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Intent Score:</span>
                  <span className="font-bold text-[#057A55] dark:text-emerald-400">
                    {leadTier === 'buyer' ? '9.8 / 10 (VIP)' : leadTier === 'renter' ? '8.4 / 10 (Annual)' : '9.9 / 10 (Capital)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Expected Budget:</span>
                  <span className="font-bold text-[var(--color-text-primary)]">
                    {leadTier === 'buyer' ? '$2.5M - $5.0M' : leadTier === 'renter' ? '$15k - $30k/mo' : '$5.0M - $12M'}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Routing:</span>
                  <span className="text-[#533AFD] font-semibold">Direct Agent Phone Alert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Instant VIP Showing Scheduler */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 3 • VIP Showing Scheduler
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Automated private tour booking
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Prospects pick convenient tour times instantly, eliminating weeks of back-and-forth messages.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-2.5">
              <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 font-mono text-[10.5px] space-y-1.5">
                <div className="flex justify-between font-bold text-[var(--color-text-primary)]">
                  <span>Calendar Slot Selected</span>
                  <span className="text-emerald-600 font-semibold">{showingBooked ? 'Locked' : 'Available'}</span>
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300">
                  🗓️ Saturday, 2:00 PM • Brickell Penthouse Tour
                </div>
                <div className="text-[9px] text-slate-400">
                  Gate code &amp; building security clearance auto-dispatched
                </div>
              </div>

              <button
                type="button"
                onClick={handleBookShowing}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-[4px] bg-[#533AFD] hover:bg-[#432DE0] text-white transition-all cursor-pointer"
              >
                {showingBooked ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Showing Confirmed (SMS Sent)</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3 h-3" />
                    <span>Lock Saturday Showing Slot</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 4: POF & Financial Verification */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 4 • POF Verification
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Proof-of-funds gatekeeper
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Screens bank letters and mortgage pre-approvals to safeguard the agent’s time for verified buyers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="flex items-center justify-between p-2 rounded-[6px] bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                <span className="text-xs font-medium text-[var(--color-text-primary)]">Strict POF Gate</span>
                <button
                  type="button"
                  onClick={() => setPofVerified(!pofVerified)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    pofVerified ? 'bg-[#533AFD]' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      pofVerified ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-2.5 font-mono text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Bank Letter:</span>
                  <span className="font-bold text-[#057A55]">Morgan Stanley Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Liquidity Check:</span>
                  <span className="font-bold text-[#057A55]">$3.5M Confirmed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Unqualified Leads:</span>
                  <span className="font-bold text-[#533AFD]">Diverted to Nurture</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Two-Way Conversational SMS */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 5 • Two-Way SMS Nurture
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <MessageSquare className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                24/7 AI conversational follow-up
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Engages prospects in natural dialogue, answers HOA questions, and handles property objections instantly.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-2.5">
              <div className="rounded-[6px] bg-[#0A0D14] text-slate-200 p-2.5 font-mono text-[10px] space-y-1.5 border border-slate-800">
                <div className="text-slate-400">Prospect (SMS):</div>
                <div className="text-purple-300">"Does the building allow 2 parking spaces for my vehicles?"</div>
                <div className="text-emerald-400 pt-1">AI Assistant:</div>
                <div className="text-slate-300">"Yes, unit #48B comes with 2 deeded valet spaces + EV charging."</div>
              </div>

              <button
                type="button"
                onClick={handleSendSms}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] transition-all cursor-pointer"
              >
                <MessageSquare className="w-3 h-3 text-[#533AFD]" />
                <span>{smsAnswerSent ? 'Response Delivered!' : 'Simulate Prospect Question'}</span>
              </button>
            </div>
          </div>

          {/* Card 6: Direct CRM Webhook Integration */}
          <div className="rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
                  Step 6 • Direct CRM Delivery
                </span>
                <span className="p-1 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)]">
                  <Share2 className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                Follow Up Boss &amp; Lofty sync
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] opacity-85 leading-relaxed">
                Pushes fully qualified lead records with budget tags and showing notes directly to the agent’s CRM.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)]/70 space-y-3">
              <div className="rounded-[6px] bg-[#0A0D14] text-slate-200 p-2.5 font-mono text-[10px] space-y-1.5 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400">
                  <span>POST /api/crm/lead-handoff</span>
                  <span className="text-emerald-400 font-semibold">200 OK</span>
                </div>
                <div className="text-slate-300 truncate">tag: #VIP-Buyer-Cash #Brickell #ShowingSat</div>
                <div className="text-slate-500 text-[9px]">Follow Up Boss contact created: ID #CUST-901</div>
              </div>

              <button
                type="button"
                onClick={handleSyncCrm}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-[4px] bg-emerald-600 hover:bg-emerald-700 text-white transition-all cursor-pointer"
              >
                {crmSynced ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Dispatched to Agent Phone!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3" />
                    <span>Test CRM Handoff Webhook</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
