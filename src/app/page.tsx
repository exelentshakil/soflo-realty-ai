'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ClientPortal } from '@/components/ClientPortal';
import { AgentCockpit } from '@/components/AgentCockpit';
import { AiConciergeDrawer } from '@/components/AiConciergeDrawer';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { Footer } from '@/components/Footer';
import { siteConfig, type TableRow as RowType } from '@/config/site';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'portal' | 'cockpit'>('portal');
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);

  // In-memory data states for live synchronization
  const [leads, setLeads] = useState<RowType[]>(siteConfig.table.rows);
  const [ghlLogs, setGhlLogs] = useState<any[]>([]);
  const [simulatedOutage, setSimulatedOutage] = useState(false);

  const handleLeadCaptured = (newLead: any) => {
    setLeads(prev => {
      // Prevent duplicates if captured in same session
      if (prev.some(lead => lead.payload.email === newLead.payload.email && lead.payload.email !== 'Pending capture')) {
        return prev;
      }
      return [newLead, ...prev];
    });
  };

  const handleGhlLogUpdated = (newLog: any) => {
    setGhlLogs(prev => [newLog, ...prev]);
  };

  const handleToggleOutage = () => {
    setSimulatedOutage(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col justify-between">
      <div>
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenChaosModal={() => setChaosModalOpen(true)}
          onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
          onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        />

        <main className="w-full max-w-full min-w-0 overflow-x-hidden">
          {viewMode === 'portal' ? (
            <ClientPortal
              onOpenConcierge={() => setConciergeOpen(true)}
              onShowlisting={(property) => {
                setConciergeOpen(true);
              }}
            />
          ) : (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              {/* Header section in dashboard */}
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#533AFD]">
                  Operational Command Center
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                  Real-Time Lead Telemetry & SEO Metrics
                </h2>
              </div>
              <AgentCockpit
                leads={leads}
                ghlLogs={ghlLogs}
                simulatedOutage={simulatedOutage}
                onToggleOutage={handleToggleOutage}
              />
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Floating Side Drawer AI Concierge */}
      <AiConciergeDrawer
        open={conciergeOpen}
        onOpenChange={setConciergeOpen}
        onLeadCaptured={handleLeadCaptured}
        onGhlLogUpdated={handleGhlLogUpdated}
        simulatedOutage={simulatedOutage}
      />

      {/* Supplementary dialog overlays */}
      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />
    </div>
  );
}

