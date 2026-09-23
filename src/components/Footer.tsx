'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Workflow,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  Award,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { BrandLogoMark } from '@/components/BrandLogo';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-7xl">
        {/* Balanced 3-Pillar Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 items-stretch">
          {/* Pillar 1: Platform & Systems Mission */}
          <div className="space-y-2.5 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Systems Platform
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between flex-1 space-y-3.5 text-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <BrandLogoMark className="h-8 w-8" />
                  <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <span className="text-base font-extrabold tracking-tight text-[var(--color-text-primary)] whitespace-nowrap">
                      {siteConfig.name}
                    </span>
                    <span className="rounded-full bg-[#533AFD]/10 dark:bg-[#7A68FF]/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#533AFD] dark:text-[#7A68FF] border border-[#533AFD]/20 dark:border-[#7A68FF]/30 whitespace-nowrap shrink-0">
                      {siteConfig.badge}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {siteConfig.description}
                </p>
              </div>

              {/* Verified Platform Status Strip */}
              <div className="pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap min-w-0">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="text-[11px] font-semibold truncate">Multi-Provider Fallback Ready</span>
                </div>
                <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                  100% Codebase Ownership
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Systems Architecture & Technical Specs */}
          <div className="space-y-2.5 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Systems Architecture
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between flex-1 space-y-3.5 text-xs">
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 text-[11px] font-mono text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1.5 shadow-2xs">
                    <Terminal className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">Next.js 15 Core</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1.5 shadow-2xs">
                    <Cpu className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">Dual-Model AI Fallback</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1.5 shadow-2xs">
                    <Workflow className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">Inngest / Event Queues</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1.5 shadow-2xs">
                    <Code2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">TypeScript / Python</span>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed pt-1">
                  Engineered with strict separation of concerns: deterministic math, schema enforcement, zero-downtime AI routing, and sub-50ms database operations.
                </p>
              </div>

              <div className="pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                <span>Deployment: Vercel Edge</span>
                <span>Database: Supabase / RDS</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Principal Architect Verification */}
          <div className="space-y-2.5 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
              Principal Architect
            </h4>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between flex-1 space-y-3 text-xs">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/headshot.jpeg"
                      alt="Shakil Ahmed"
                      className="h-10 w-10 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                      onError={(e) => {
                        // Fallback avatar if headshot not copied
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[var(--color-text-primary)]">
                      Shakil Ahmed
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Founder, BarakahSoft LLC
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  12+ Years Enterprise Systems Engineering. Former Lead Engineer at Legiit ($1M ARR Command Center). Securiti Certified AI Security &amp; Governance Architect (Cert ID: 14B411BCE-14B411A3D-1451CFE76).
                </p>

              </div>

              <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Verified Upwork Partner
                </span>
                <span className="text-[var(--color-text-muted)]">
                  100% Job Success • 5.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--color-text-muted)]">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Engineered by BarakahSoft LLC.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              NIST AI RMF & OWASP LLM Aligned
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
