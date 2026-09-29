'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ClientPortal } from '@/components/ClientPortal';
import { AiConciergeDrawer } from '@/components/AiConciergeDrawer';
import { Footer } from '@/components/Footer';
import { siteConfig, type TableRow as RowType } from '@/config/site';

export default function HomePage() {
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // States with localStorage synchronization so lead captures immediately sync to /admin
  const [leads, setLeads] = useState<RowType[]>([]);
  const [ghlLogs, setGhlLogs] = useState<any[]>([]);
  const [simulatedOutage, setSimulatedOutage] = useState(false);

  // Load baseline values on mount
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
      console.error('Failed to initialize local states on mount', err);
    }
  }, []);

  const handleLeadCaptured = (newLead: any) => {
    setLeads(prev => {
      // Prevent duplicates in current view
      if (prev.some(lead => lead.payload.email === newLead.payload.email && lead.payload.email !== 'Pending capture')) {
        return prev;
      }
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem('soflo_leads', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to write leads to localStorage', err);
      }
      return updated;
    });
  };

  const handleGhlLogUpdated = (newLog: any) => {
    setGhlLogs(prev => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem('soflo_ghl_logs', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to write GHL logs to localStorage', err);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] flex flex-col justify-between">
      <div>
        <Header
          onOpenConcierge={() => setConciergeOpen(true)}
          isAdmin={false}
        />

        <main className="w-full max-w-full min-w-0 overflow-x-hidden">
          <ClientPortal
            onOpenConcierge={() => setConciergeOpen(true)}
            onShowlisting={(property) => {
              setConciergeOpen(true);
            }}
          />
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
    </div>
  );
}
