'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ClientPortal } from '@/components/ClientPortal';
import { AiConciergeDrawer } from '@/components/AiConciergeDrawer';
import { BackboneStats } from '@/components/BackboneStats';
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
      } else {
        const defaultLogs = [
          {
            timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
            webhookUrl: 'https://services.gohighlevel.com/v1/webhooks/leads/valeria-co',
            status: 201,
            statusText: 'Created',
            leadId: 'LEAD-901',
            payload: {
              name: 'David & Elena Vance',
              email: 'david.vance@vancetech.com',
              phone: '+1 (305) 555-0199',
              customFields: {
                budget_tier: '$3.5M Cash',
                showing_neighborhoods: 'Brickell, Coconut Grove',
                buyer_intent_score: 9.6,
                move_timeline: '30 Days',
                pof_status: 'Verified Cash (Morgan Stanley letter)',
                lead_classification: 'Cash Luxury Buyer',
              },
              tags: ['#AI-Captured', '#VIP-Priority', '#Cash-Buyer']
            }
          },
          {
            timestamp: new Date(Date.now() - 7 * 60000).toISOString(),
            webhookUrl: 'https://services.gohighlevel.com/v1/webhooks/leads/valeria-co',
            status: 201,
            statusText: 'Created',
            leadId: 'LEAD-902',
            payload: {
              name: 'Marcus Sterling Group',
              email: 'm.sterling@sterlingcap.com',
              phone: '+1 (305) 555-0211',
              customFields: {
                budget_tier: '$8.2M Capital',
                showing_neighborhoods: 'Coral Gables',
                buyer_intent_score: 9.8,
                move_timeline: '45 Days',
                pof_status: 'Verified Capital (1031 Exchange)',
                lead_classification: 'PE Multifamily Investor',
              },
              tags: ['#AI-Captured', '#VIP-Priority', '#Cash-Buyer']
            }
          },
          {
            timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
            webhookUrl: 'https://services.gohighlevel.com/v1/webhooks/leads/valeria-co',
            status: 201,
            statusText: 'Created',
            leadId: 'LEAD-903',
            payload: {
              name: 'Sophie Laurent',
              email: 'sophie.l@techfinance.io',
              phone: '+1 (305) 555-0322',
              customFields: {
                budget_tier: '$18k / mo',
                showing_neighborhoods: 'Sunny Isles, Bal Harbour',
                buyer_intent_score: 8.5,
                move_timeline: '30 Days',
                pof_status: 'Verified Credit (780+)',
                lead_classification: 'Luxury Annual Rental',
              },
              tags: ['#AI-Captured', '#Standard-Nurture']
            }
          },
          {
            timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
            webhookUrl: 'https://services.gohighlevel.com/v1/webhooks/leads/valeria-co',
            status: 201,
            statusText: 'Created',
            leadId: 'LEAD-904',
            payload: {
              name: 'Alexander Rostov',
              email: 'a.rostov@rostovholdings.com',
              phone: '+1 (305) 555-0455',
              customFields: {
                budget_tier: '$5.0M Tier',
                showing_neighborhoods: 'Downtown, Brickell',
                buyer_intent_score: 9.0,
                move_timeline: 'Immediate Pre-Con',
                pof_status: 'Self-Certified Liquid',
                lead_classification: 'Pre-Construction Investor',
              },
              tags: ['#AI-Captured', '#VIP-Priority', '#Cash-Buyer']
            }
          }
        ];
        setGhlLogs(defaultLogs);
        localStorage.setItem('soflo_ghl_logs', JSON.stringify(defaultLogs));
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
          <BackboneStats />
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
