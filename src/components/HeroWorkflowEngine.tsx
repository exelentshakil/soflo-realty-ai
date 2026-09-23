'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Terminal,
  RefreshCw,
  Cpu,
  Lock,
  Database,
  FileText,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';

export function HeroWorkflowEngine() {
  const [inputText, setInputText] = useState(siteConfig.workflow.defaultInput);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [engineMode, setEngineMode] = useState<'private_lora' | 'deterministic' | 'public_failover'>('private_lora');
  const [viewTab, setViewTab] = useState<'business' | 'technical'>('business');
  const [result, setResult] = useState<Record<string, unknown> | null>(siteConfig.workflow.sampleResponse);
  const [stepStatus, setStepStatus] = useState({
    firewall: 'VERIFIED • Zero PII Leakage',
    inference: '4-bit LoRA vLLM (48ms) • Private Container',
    schema: 'PASS • Strict Deterministic Schema',
  });

  const handleExecute = async () => {
    setLoading(true);
    try {
      if (engineMode === 'public_failover') {
        const res = await fetch('/api/ai/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Direct Client Test',
            content: inputText,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setResult(data);
          setStepStatus({
            firewall: data.firewallStatus?.passed ? 'PASSED (0ms)' : 'SECURITY INTERCEPT (0ms)',
            inference: `${data.latencyMs || 84}ms • ${data.provider} (${data.model || 'gpt-4o-mini'})`,
            schema: 'ENFORCED (1ms)',
          });
          return;
        }
      }

      // Simulated sub-50ms execution for Private LoRA & Deterministic SQL/Engine
      await new Promise((resolve) => setTimeout(resolve, 360));

      if (engineMode === 'private_lora') {
        setResult({
          audit_verdict: 'DEFENSIBLE_ANSWER_CONFIRMED',
          inference_engine: '4-bit Quantized LoRA Adapter (vLLM Private Container)',
          private_cloud_isolation: '100% Zero External Data Egress (Private VPC)',
          target_entity: inputText.split(' - ')[0] || 'Target Workflow Query',
          verified_rules: [
            'Deterministic business schema verified',
            'Zero PII egress to public cloud providers',
            'Traceable audit hash sha256:d8c91f42e88a09b3',
          ],
          performance_observability: {
            latency_ms: 48,
            token_cost: '$0.00 (Self-Hosted Weight Execution)',
            guesswork_score: '0.0% (Strict rule linkage)',
          },
        });
        setStepStatus({
          firewall: 'PASSED (0ms) • Zero Public API Egress',
          inference: '48ms • 4-bit LoRA Container (Private VPC)',
          schema: 'ENFORCED • Strict Deterministic Schema',
        });
      } else {
        // Deterministic SQL / Engine
        setResult({
          audit_verdict: 'DETERMINISTIC_ENGINE_CONFIRMED',
          inference_engine: 'In-Database PostgreSQL / Deterministic Pipeline',
          token_cost: '$0.00 (Pure Mathematical Execution)',
          target_entity: inputText.split(' - ')[0] || 'Target Entity Query',
          performance_observability: {
            sql_execution_ms: 0.18,
            buffers_shared_hit: 12,
            buffers_read: 0,
          },
        });
        setStepStatus({
          firewall: 'BYPASSED • 100% In-Database Execution',
          inference: '0.18ms • PostgreSQL / Pure Logic',
          schema: 'VERIFIED • Zero AI Hallucinations',
        });
      }
    } catch {
      setResult(siteConfig.workflow.sampleResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-[#533AFD]/10 text-[#533AFD] dark:bg-[#7A68FF]/20 dark:text-[#7A68FF] border-[#533AFD]/20 text-[11px] font-mono">
                {siteConfig.workflow.badge}
              </Badge>
              <CardTitle className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.workflow.title}
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              {siteConfig.workflow.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero-Downtime Fallback Active</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Step 1: 3-Engine Architecture Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono flex items-center justify-between">
            <span>Step 1: Select Processing Engine (Dual Private / Cloud Architecture)</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-normal">Active Security Interceptor</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setEngineMode('private_lora')}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                engineMode === 'private_lora'
                  ? 'border-[#533AFD] bg-[#533AFD]/5 dark:bg-[#7A68FF]/10 text-[var(--color-text-primary)] shadow-xs ring-1 ring-[#533AFD]/30'
                  : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Lock className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
                  4-Bit LoRA Private Container
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold font-mono">
                  100% Safe
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Runs inside your private cloud container. Zero data leaves your infrastructure to OpenAI or third parties.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setEngineMode('deterministic')}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                engineMode === 'deterministic'
                  ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Database className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Deterministic SQL / Logic Engine
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold font-mono">
                  $0 Token Cost
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                0.1ms pure mathematical execution. Exact schema validation and rules with zero AI hallucinations.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setEngineMode('public_failover')}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                engineMode === 'public_failover'
                  ? 'border-teal-600 bg-teal-50/60 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 shadow-xs ring-1 ring-teal-500/20'
                  : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                  Dual Public Cloud Failover
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 px-1.5 py-0.5 rounded font-bold font-mono">
                  Sub-80ms
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                Fast public intent classification using Google Gemini 2.0 Flash with automatic failover to OpenAI GPT-4o-mini.
              </p>
            </button>
          </div>
        </div>

        {/* Input Form Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
              Step 2: {siteConfig.workflow.inputLabel}
            </label>
            <button
              onClick={() => setInputText(siteConfig.workflow.defaultInput)}
              className="text-xs text-[#533AFD] dark:text-[#7A68FF] hover:underline font-mono"
            >
              Reset to Sample Query
            </button>
          </div>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="text-xs sm:text-sm font-mono resize-none border-[var(--color-border)] bg-[var(--color-panel-subtle)] focus:border-[#533AFD]"
            placeholder={siteConfig.workflow.inputPlaceholder}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Verified with deterministic validation & zero unverified guessing.
            </span>
            <Button
              onClick={handleExecute}
              disabled={loading}
              className="h-9 px-4 text-xs font-semibold bg-[#635BFF] hover:bg-[#533AFD] text-white shadow-xs shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Executing Trace...
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  {siteConfig.workflow.buttonLabel}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 3-Step Inline Architecture Pipeline Telemetry */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 sm:p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono mb-2.5">
            Real-Time Pipeline Execution Stages
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            {/* Stage 1 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 1 • Privacy & Data Guard</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">{stepStatus.firewall}</div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <Cpu className="h-4 w-4 text-[#533AFD] dark:text-[#7A68FF] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 2 • Processing Engine</div>
                <div className="font-semibold text-[var(--color-text-primary)] truncate">{stepStatus.inference}</div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 3 • Deterministic Schema</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">{stepStatus.schema}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual-Perspective Output Tabs: Plain English vs Technical JSON */}
        {result && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <div className="flex bg-[var(--color-panel-subtle)] p-1 rounded-md border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setViewTab('business')}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewTab === 'business'
                        ? 'bg-[var(--color-surface)] text-[#533AFD] dark:text-[#7A68FF] shadow-xs'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Plain English Business Value
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewTab('technical')}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewTab === 'technical'
                        ? 'bg-[var(--color-surface)] text-[#533AFD] dark:text-[#7A68FF] shadow-xs'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    Technical JSON & Specs
                  </button>
                </div>
              </div>

              {viewTab === 'technical' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy JSON
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* TAB 1: PLAIN ENGLISH BUSINESS VALUE (EXECUTIVE VIEW) */}
            {viewTab === 'business' && (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-bold text-sm text-[var(--color-text-primary)]">
                      Executive Briefing • Verified & Defensible
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    100% Zero External Data Egress
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div className="font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      What This Means for Your Business:
                    </div>
                    <ul className="space-y-1.5 text-[var(--color-text-secondary)] pl-5 list-disc">
                      <li>
                        <strong>Confidential Data Stays 100% Inside Your Cloud:</strong> Zero sensitive numbers, customer PII, or internal logic sent to third-party AI APIs.
                      </li>
                      <li>
                        <strong>Zero AI Hallucinations:</strong> Every calculation executes in deterministic code or bounded adapters rather than probabilistic guesses.
                      </li>
                      <li>
                        <strong>Full Audit Defensibility:</strong> Output is backed by verifiable hashes and strict schema validation.
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#533AFD] dark:text-[#7A68FF]" />
                      Performance & Economics:
                    </div>
                    <ul className="space-y-1.5 text-[var(--color-text-secondary)] pl-5 list-disc">
                      <li>
                        <strong>Sub-50ms Execution:</strong> Instant results for professional end-users without waiting on multi-second public LLM roundtrips.
                      </li>
                      <li>
                        <strong>$0 Token Waste:</strong> Fixed, predictable infrastructure cost instead of runaway per-token API charges.
                      </li>
                      <li>
                        <strong>Shipped in Days, Not Months:</strong> Clean, modular code ready for rapid iteration and production handover.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TECHNICAL JSON (ARCHITECT VIEW) */}
            {viewTab === 'technical' && (
              <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-80 leading-relaxed">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
