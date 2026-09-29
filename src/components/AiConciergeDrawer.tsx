'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  X,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  Building,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { luxuryListings, type LuxuryListing } from '@/config/listings';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    prospect_name?: string;
    email?: string;
    phone?: string;
    budget?: string;
    locations?: string[];
    intent_score?: number;
    timeline?: string;
    proof_of_funds_status?: string;
    prospect_type?: string;
    matched_property_ids?: string[];
  };
}

interface AiConciergeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadCaptured: (lead: any) => void;
  onGhlLogUpdated: (log: any) => void;
  simulatedOutage?: boolean;
}

export function AiConciergeDrawer({
  open,
  onOpenChange,
  onLeadCaptured,
  onGhlLogUpdated,
  simulatedOutage = false,
}: AiConciergeDrawerProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to South Florida. I am Valeria's AI Concierge, her specialized virtual associate. I help select ultra-exclusive residences across Sunny Isles Beach, Brickell, and Coral Gables, and schedule private viewings directly on Valeria's calendar. What style of luxury home are you seeking today?",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync textarea height synchronously on mount or when input clears
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (input) {
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 56), 140)}px`;
        textareaRef.current.style.overflowY = scrollHeight > 140 ? 'auto' : 'hidden';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(Math.max(scrollHeight, 56), 140)}px`;
    textarea.style.overflowY = scrollHeight > 140 ? 'auto' : 'hidden';
  };

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: Message = { id: userMsgId, role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);

    try {
      // Keep history limited to prevent payload bloating
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));
      chatHistory.push({ role: 'user', content: trimmed });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          simulatedOutage,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: Message = {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          metadata: data.metadata,
        };
        setMessages(prev => [...prev, assistantMsg]);

        // Lead capture sync trigger
        if (data.metadata && (data.metadata.email || data.metadata.phone || data.metadata.intent_score > 6)) {
          const isLeadComplete = !!(data.metadata.email || data.metadata.phone);
          const leadPayload = {
            id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
            entityName: data.metadata.prospect_name !== 'Guest' ? data.metadata.prospect_name : 'Valeria Website Prospect',
            category: data.metadata.prospect_type || 'Luxury Buyer',
            status: isLeadComplete ? 'verified' : 'active',
            latency: data.metadata.budget !== 'Not Specified' ? data.metadata.budget : '$2.0M+ Tier',
            provider: `${data.provider} (${data.model || 'live-model'})`,
            updatedAt: 'Just now',
            payload: {
              client: data.metadata.prospect_name !== 'Guest' ? data.metadata.prospect_name : 'Anonymous Prospect',
              budget: data.metadata.budget,
              phone: data.metadata.phone || 'Pending capture',
              email: data.metadata.email || 'Pending capture',
              target_locations: data.metadata.locations,
              timeline: data.metadata.timeline,
              proof_of_funds_status: data.metadata.proof_of_funds_status,
              intent_score: data.metadata.intent_score,
              chat_history_length: chatHistory.length + 1,
              inngest_status: 'demo/workflow.executed queued',
              crm_status: 'GoHighLevel Webhook Enqueued',
              chat_history: chatHistory.map((m, idx) => ({
                id: `msg-hist-${idx}-${Date.now()}`,
                role: m.role,
                content: m.content
              })),
            },
          };
          onLeadCaptured(leadPayload);

          // Dispatch CRM integration logs
          onGhlLogUpdated({
            timestamp: new Date().toISOString(),
            webhookUrl: 'https://services.gohighlevel.com/v1/webhooks/leads/valeria-co',
            status: 201,
            statusText: 'Created',
            leadId: leadPayload.id,
            payload: {
              name: leadPayload.entityName,
              email: data.metadata.email,
              phone: data.metadata.phone,
              customFields: {
                budget_tier: data.metadata.budget,
                showing_neighborhoods: data.metadata.locations.join(', '),
                buyer_intent_score: data.metadata.intent_score,
                move_timeline: data.metadata.timeline,
                pof_status: data.metadata.proof_of_funds_status,
                lead_classification: data.metadata.prospect_type,
              },
              tags: [
                '#AI-Captured',
                data.metadata.intent_score > 8 ? '#VIP-Priority' : '#Standard-Nurture',
                data.metadata.proof_of_funds_status === 'High / Cash' ? '#Cash-Buyer' : '#Financed'
              ]
            }
          });
        }
      }
    } catch (err) {
      // Handle fallback message
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but my connections are slightly delayed. Let me provide you with direct concierge access: Valeria is ready to assist you. Would you like to schedule an instant weekend showing via Valeria\'s calendar?',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderPropertyCards = (propertyIds: string[]) => {
    const matched = luxuryListings.filter(l => propertyIds.includes(l.id));
    if (matched.length === 0) return null;

    return (
      <div className="mt-4 grid grid-cols-1 gap-3.5 w-full">
        {matched.map(property => (
          <div
            key={property.id}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row group"
          >
            <div className="relative w-full sm:w-28 h-28 sm:h-auto shrink-0 overflow-hidden">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between space-y-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[13px] text-[var(--color-text-primary)] truncate max-w-[140px]">
                    {property.name}
                  </span>
                  <Badge variant="outline" className="bg-[#E31B23]/10 text-[#E31B23] border-[#E31B23]/20 text-[10px] font-mono whitespace-nowrap px-1.5 py-0">
                    VIP Matching
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-[var(--color-text-muted)] text-[10px]">
                  <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                  <span className="truncate">{property.neighborhood}</span>
                </div>
                <p className="text-[var(--color-text-secondary)] leading-normal line-clamp-2 text-[11px] pt-1">
                  {property.description}
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-[#057A55]">
                  {property.priceRange}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6.5 text-[10px] font-semibold border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] rounded-[4px] px-2 cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Book Showing</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

return (
<Sheet open={open} onOpenChange={onOpenChange}>
<SheetContent
side="right"
className="w-full sm:w-[460px] p-0 border-l border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl flex flex-col h-full"
>
{/* Header Branding */}
<SheetHeader className="p-4 border-b border-[var(--color-border)] flex flex-row items-center justify-between shrink-0 bg-[var(--color-panel-subtle)]">
<div className="flex items-center gap-2.5">
<div className="h-9 w-9 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-slate-100">
  <img
    src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
    alt="Valeria Avatar"
    className="h-full w-full object-cover object-top"
  />
</div>
<div className="text-left">
<SheetTitle className="text-[13.5px] font-bold tracking-tight text-[var(--color-text-primary)]">
Valeria's AI Concierge
</SheetTitle>
<div className="flex items-center gap-1.5 text-[10.5px] text-[#057A55] font-mono">
<span className="h-1.5 w-1.5 rounded-full bg-[#00D924] animate-pulse"></span>
<span>Qualified Real Estate Assistant</span>
</div>
</div>
</div>
</SheetHeader>

{/* Chat Messages */}
<div className="flex-1 min-h-0 bg-[var(--color-canvas)]">
<ScrollArea className="h-full px-4 py-4">
<div className="space-y-5">
{messages.map(msg => (
<div
key={msg.id}
className={`flex w-full ${
msg.role === 'user' ? 'justify-end' : 'justify-start'
}`}
>
<div className="flex gap-2.5 max-w-[88%]">
{msg.role === 'assistant' && (
  <div className="h-8.5 w-8.5 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-3xs mt-1 bg-slate-100">
    <img
      src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
      alt="Valeria Assistant"
      className="h-full w-full object-cover object-top"
    />
  </div>
)}
<div className="flex flex-col space-y-1">
<div
className={`rounded-xl px-4 py-3 text-[15.5px] leading-[1.6] shadow-3xs tracking-tight ${
msg.role === 'user'
? 'bg-[#E31B23] text-white border border-[#E31B23]/20 rounded-tr-xs font-semibold'
: 'bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-slate-800 dark:text-slate-100 font-normal rounded-tl-xs'
}`}
style={{ fontFamily: "'sohne-var', 'Sohne', 'SF Pro Display', -apple-system, sans-serif", letterSpacing: "-0.015em" }}
>
<p className="whitespace-pre-wrap">{msg.content}</p>
</div>
{msg.role === 'assistant' && msg.metadata?.matched_property_ids && (
<div className="w-full">
{renderPropertyCards(msg.metadata.matched_property_ids)}
</div>
)}
</div>
</div>
</div>
))}
{loading && (
<div className="flex w-full justify-start">
<div className="flex gap-2.5 max-w-[88%]">
<div className="h-8.5 w-8.5 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-3xs mt-1 animate-pulse bg-slate-100">
  <img
    src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
    alt="Valeria Assistant"
    className="h-full w-full object-cover object-top"
  />
</div>
<div
className="rounded-xl px-4 py-3 text-[14px] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] text-slate-800 dark:text-slate-200 rounded-tl-xs shadow-3xs flex items-center gap-2 font-normal"
style={{ fontFamily: "'sohne-var', 'Sohne', 'SF Pro Display', -apple-system, sans-serif", letterSpacing: "-0.015em" }}
>
<span className="h-2 w-2 rounded-full bg-slate-500 animate-ping"></span>
<span>AI is typing...</span>
</div>
</div>
</div>
)}
<div ref={scrollRef} />
</div>
</ScrollArea>
</div>

{/* Input Form Footer */}
<form
onSubmit={handleSend}
className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex gap-2.5 items-center shrink-0"
>
<div className="flex-1 relative">
  <textarea
    ref={textareaRef}
    rows={1}
    value={input}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
    placeholder="Ask about Sunny Isles Beach, budget..."
    className="w-full min-h-[56px] max-h-[140px] text-[15px] sm:text-[15px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] focus:bg-[var(--color-surface)] focus:ring-1 focus:ring-[#E31B23] focus:border-[#E31B23] rounded-[10px] px-4 py-3.5 pr-3 shadow-2xs text-slate-900 dark:text-slate-100 leading-normal resize-none overflow-x-hidden overflow-y-hidden whitespace-pre-wrap break-words outline-none transition-all"
    style={{ fontFamily: "'sohne-var', 'Sohne', 'SF Pro Display', -apple-system, sans-serif", letterSpacing: "-0.015em" }}
    disabled={loading}
  />
</div>
<Button
type="submit"
size="sm"
disabled={loading || !input.trim()}
className="h-11 w-11 p-0 bg-[#E31B23] hover:bg-[#C62828] text-white rounded-[10px] shadow-2xs cursor-pointer shrink-0 flex items-center justify-center"
>
<Send className="h-4.5 w-4.5" />
</Button>
</form>
</SheetContent>
</Sheet>
);
}

