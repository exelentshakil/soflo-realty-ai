'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { siteConfig } from '@/config/site';

// 4 Distinct Dope Wavy Sparkline Datasets for High-Signal Visual Fluidity
const inventoryValuationTrend = [
  { t: 'Jan', v: 24.2 },
  { t: 'Mar', v: 28.5 },
  { t: 'May', v: 26.8 },
  { t: 'Jul', v: 33.4 },
  { t: 'Sep', v: 38.1 },
  { t: 'Nov', v: 36.5 },
  { t: 'Dec', v: 42.8 },
];

const contractedPipelineTrend = [
  { t: 'W1', v: 4.8 },
  { t: 'W2', v: 7.2 },
  { t: 'W3', v: 6.5 },
  { t: 'W4', v: 9.8 },
  { t: 'W5', v: 12.4 },
  { t: 'W6', v: 11.9 },
  { t: 'W7', v: 14.2 },
];

const obligationDeliverySla = [
  { t: 'Mon', v: 98.4 },
  { t: 'Tue', v: 99.3 },
  { t: 'Wed', v: 98.8 },
  { t: 'Thu', v: 99.6 },
  { t: 'Fri', v: 99.1 },
  { t: 'Sat', v: 99.7 },
  { t: 'Sun', v: 99.4 },
];

const turnaroundVelocityTrend = [
  { t: 'Run 1', v: 48.0 },
  { t: 'Run 2', v: 34.5 },
  { t: 'Run 3', v: 24.1 },
  { t: 'Run 4', v: 16.8 },
  { t: 'Run 5', v: 9.4 },
  { t: 'Run 6', v: 6.1 },
  { t: 'Run 7', v: 4.8 },
];

// High-Density Multi-Agent Context Bus Telemetry Timeline (Dope Fluid Waves)
const telemetryStream = [
  { time: '09:00', ops: 3820, latency: 14.8, stage: 'Lead Intake & Verification' },
  { time: '10:00', ops: 4790, latency: 14.1, stage: 'Intent & Budget Scoring' },
  { time: '11:00', ops: 4210, latency: 13.9, stage: 'Neighborhood Matching' },
  { time: '12:00', ops: 5680, latency: 14.4, stage: 'Proof of Funds Screening' },
  { time: '13:00', ops: 5120, latency: 13.8, stage: 'VIP Showing Booking' },
  { time: '14:00', ops: 6450, latency: 13.2, stage: 'CRM Pipeline Handoff' },
  { time: '15:00', ops: 5890, latency: 13.5, stage: 'SMS Auto-Nurture Dispatch' },
  { time: '16:00', ops: 6820, latency: 12.8, stage: 'Agent Instant Alert' },
  { time: '17:00', ops: 6180, latency: 13.4, stage: 'Closed Transaction Sync' },
  { time: '18:00', ops: 6450, latency: 13.2, stage: 'Human Signoff Confirmed' },
];

export function MetricsGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icons = [Layers, Sparkles, ShieldCheck, Cpu];
  const badgeStyles = [
    'bg-[#533AFD]/8 text-[#533AFD] dark:bg-[#7A68FF]/15 dark:text-[#7A68FF] border-[#533AFD]/20 dark:border-[#7A68FF]/30',
    'bg-emerald-50/80 dark:bg-emerald-950/30 text-[#057A55] dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/40',
    'bg-amber-50/80 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/40',
    'bg-teal-50/80 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-800/40',
  ];

  // Dynamic grid: 4 columns for 4 metrics on desktop
  const gridColsClass =
    siteConfig.metrics.length === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : siteConfig.metrics.length === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-3';

  // Render varied, custom wavy progress sparklines per card index
  const renderCardChart = (idx: number) => {
    if (!mounted) return null;

    if (idx === 0) {
      // Card 0: Qualified real estate pipeline volume (Stripe Blurple wavy gradient area)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={inventoryValuationTrend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#533AFD" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#533AFD" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={['dataMin - 3', 'dataMax + 2']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium shadow-xs text-[var(--color-text-primary)]">
                      <span className="font-bold text-[#533AFD] dark:text-[#7A68FF]">${payload[0].value}M</span> Qualified Pipeline
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#533AFD"
              strokeWidth={2}
              fill="url(#leadGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (idx === 1) {
      // Card 1: Contracted Pipeline Velocity (Emerald wavy gradient area)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={contractedPipelineTrend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#057A55" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#057A55" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium shadow-xs text-[var(--color-text-primary)]">
                      <span className="font-bold text-[#057A55] dark:text-emerald-400">${payload[0].value}M</span> Pipeline
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#057A55"
              strokeWidth={2}
              fill="url(#pipeGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (idx === 2) {
      // Card 2: Contract Obligation Delivery SLA (Amber wavy gradient area)
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={obligationDeliverySla} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D97706" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={[97.8, 100]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium shadow-xs text-[var(--color-text-primary)]">
                      {data.t}: <span className="font-bold text-amber-600 dark:text-amber-400">{data.v}%</span> SLA
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke="#D97706"
              strokeWidth={2}
              fill="url(#slaGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    // Card 3: Agent Turnaround Acceleration (Teal wavy gradient area)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={turnaroundVelocityTrend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
          <defs>
            <linearGradient id="agentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={[0, 52]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium shadow-xs text-[var(--color-text-primary)]">
                    {data.t}: <span className="font-bold text-teal-600 dark:text-teal-400">{data.v} min</span> Turnaround
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke="#0d9488"
            strokeWidth={2}
            fill="url(#agentGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* 4-Column High-Density KPI Cards with Balanced Stripe Hierarchy */}
      <div className={`grid ${gridColsClass} gap-3 sm:gap-4`}>
        {siteConfig.metrics.map((metric, idx) => {
          const Icon = icons[idx % icons.length];
          const badgeStyle = badgeStyles[idx % badgeStyles.length];

          return (
            <div
              key={metric.id}
              className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between overflow-hidden"
            >
              {/* Card Header: Category Eyebrow + Badge (Anti-Collision Isolated) */}
              <div className="p-4 pb-2 flex items-center justify-between gap-2 min-w-0">
                <span 
                  className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] truncate min-w-0"
                  title={metric.title}
                >
                  {metric.title}
                </span>
                <span
                  className={`inline-flex items-center rounded-[4px] px-2 py-0.5 text-[11px] font-semibold border ${badgeStyle} shrink-0 whitespace-nowrap`}
                >
                  <Icon className="h-3 w-3 mr-1 shrink-0" />
                  {metric.badge}
                </span>
              </div>

              {/* Card Body: Primary Bold Metric & Dope Wavy Sparkline */}
              <div className="p-4 pt-1 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    {metric.value}
                  </span>
                  <span className="inline-flex items-center text-xs sm:text-[13px] font-bold text-[#057A55] dark:text-emerald-400">
                    <ArrowUpRight className="h-3 w-3 mr-0.5 shrink-0" />
                    {metric.change}
                  </span>
                </div>

                {/* Embedded Dope Wavy Sparkline */}
                <div className="h-12 w-full pt-1">
                  {renderCardChart(idx)}
                </div>

                {/* Subtext Footer with separator and live pulse indicator */}
                <div className="text-xs text-[var(--color-text-secondary)] font-medium border-t border-[var(--color-border)]/70 pt-2 flex items-center justify-between">
                  <span className="truncate pr-2">{metric.subtext}</span>
                  <span className="h-2 w-2 rounded-full bg-[#00D924] animate-pulse shrink-0" title="Active telemetry node" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Sub-50ms Telemetry Stream Strip (Rich Wavy Context Bus) */}
      <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#00D924] animate-pulse shrink-0" />
              <span className="text-sm sm:text-[15px] font-bold tracking-tight text-[var(--color-text-primary)]">
                Multi-Agent Context Bus • Sub-50ms Handoff Telemetry
              </span>
              <span className="rounded-[4px] bg-[#533AFD]/8 text-[#533AFD] border border-[#533AFD]/20 dark:bg-[#7A68FF]/15 dark:text-[#7A68FF] dark:border-[#7A68FF]/30 px-2.5 py-0.5 text-xs font-semibold">
                Live Stream
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
              Real-time context serialization &amp; throughput across Asset Audit → Brand Match → Deck Synth → Obligation Guard
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-[13px] text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#533AFD]" />
              Handoffs: <strong className="text-[var(--color-text-primary)]">6,450 / min</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#057A55]" />
              P99: <strong className="text-[#057A55] dark:text-emerald-400">13.2ms</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
              Zero Loss: <strong className="text-[#00D4FF] dark:text-[#00D4FF]">100%</strong>
            </span>
          </div>
        </div>

        {/* Detailed Horizontal Telemetry Area Wave */}
        <div className="h-44 sm:h-52 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryStream} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#533AFD" stopOpacity={0.32} />
                    <stop offset="60%" stopColor="#533AFD" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#533AFD" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.35} vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
                  domain={['dataMin - 800', 'dataMax + 400']}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 shadow-lg text-xs font-mono space-y-1 backdrop-blur-md">
                          <div className="font-bold text-[var(--color-text-primary)] flex items-center justify-between gap-4">
                            <span>{data.time} UTC</span>
                            <span className="text-[10px] text-[#057A55] dark:text-emerald-400 font-normal">Active</span>
                          </div>
                          <div className="text-[11px] text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/60 pb-1">
                            {data.stage}
                          </div>
                          <div className="text-[#533AFD] dark:text-[#7A68FF] flex items-center justify-between gap-4 pt-0.5">
                            <span>Throughput:</span>
                            <span className="font-bold">{data.ops?.toLocaleString()} handoffs/min</span>
                          </div>
                          <div className="text-[#057A55] dark:text-emerald-400 flex items-center justify-between gap-4">
                            <span>P99 Latency:</span>
                            <span className="font-bold">{data.latency}ms</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ops"
                  stroke="#533AFD"
                  strokeWidth={2.2}
                  fillOpacity={1}
                  fill="url(#telemetryGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
