'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AgentCockpit } from '@/components/AgentCockpit';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { siteConfig, type TableRow as RowType } from '@/config/site';

export default function AdminPage() {
  const [viewMode, setViewMode] = useState<'portal' | 'cockpit'>('cockpit');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);

  // In-memory data states with localStorage synchronization for live testing
  const [leads, setLeads] = useState<RowType[]>([]);
  const [ghlLogs, setGhlLogs] = useState<any[]>([]);
  const [simulatedOutage, setSimulatedOutage] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedLeads = localStorage.getItem('soflo_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      } else {
        setLeads(siteConfig.table.rows);
        localStorage.setItem('soflo_leads', JSON.stringify(siteConfig.table.rows));
      }

      const storedLogs = localStorage.getItem('soflo_ghl_logs');
      if (storedLogs) {
        setGhlLogs(JSON.parse(storedLogs));
      }

      const storedOutage = localStorage.getItem('soflo_outage');
      if (storedOutage) {
        setSimulatedOutage(JSON.parse(storedOutage));
      }
    } catch (err) {
      console.error('Failed to parse localStorage on admin dashboard mount', err);
      setLeads(siteConfig.table.rows);
    }
  }, []);

  // Listen to cross-tab storage changes (if the user opens / in another tab and chats with the AI)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'soflo_leads' && e.newValue) {
          setLeads(JSON.parse(e.newValue));
        }
        if (e.key === 'soflo_ghl_logs' && e.newValue) {
          setGhlLogs(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Failed to parse storage update in admin view', err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleToggleOutage = () => {
    const newVal = !simulatedOutage;
    setSimulatedOutage(newVal);
    localStorage.setItem('soflo_outage', JSON.stringify(newVal));
  };

  const handleViewModeChange = (mode: 'portal' | 'cockpit') => {
    if (mode === 'portal') {
      window.location.href = '/';
    } else {
      setViewMode('cockpit');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col justify-between">
      <div>
        <Header
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onOpenChaosModal={() => setChaosModalOpen(true)}
          onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
          onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
          isAdmin={true}
        />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Header section in dashboard */}
          <div className="flex flex-col space-y-1 text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A880]">
              Operational Command Center
            </span>
            <h2 className="text-2xl font-serif font-extrabold tracking-tight text-[#0A2E2B] dark:text-white">
              Real-Time Lead Telemetry & SEO Metrics
            </h2>
          </div>

          <AgentCockpit
            leads={leads}
            ghlLogs={ghlLogs}
            simulatedOutage={simulatedOutage}
            onToggleOutage={handleToggleOutage}
          />
        </main>
      </div>

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
