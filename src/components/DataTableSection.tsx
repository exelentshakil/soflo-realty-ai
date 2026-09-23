'use client';

import React, { useState } from 'react';
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
import { Terminal, Copy, Check, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig, type TableRow as RowType } from '@/config/site';

export function DataTableSection() {
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [copied, setCopied] = useState(false);

  const getStatusBadge = (status: RowType['status']) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-mono">
            Verified
          </Badge>
        );
      case 'active':
        return (
          <Badge variant="outline" className="bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800 text-[11px] font-mono">
            Active
          </Badge>
        );
      case 'queued':
        return (
          <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-[11px] font-mono">
            Queued
          </Badge>
        );
      case 'flagged':
        return (
          <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800 text-[11px] font-mono">
            Intercepted
          </Badge>
        );
    }
  };

  const handleCopy = (data: Record<string, unknown>) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-mono">
                {siteConfig.table.badge}
              </Badge>
              <CardTitle className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.table.title}
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              {siteConfig.table.description}
            </CardDescription>
          </div>
          <div className="text-xs font-mono text-[var(--color-text-muted)]">
            Click any row to inspect deep schema
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[var(--color-panel-subtle)]">
              <TableRow className="border-b border-[var(--color-border)] hover:bg-transparent">
                {siteConfig.table.columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-3 px-4"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {siteConfig.table.rows.map((row) => (
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
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {row.updatedAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--color-text-secondary)] py-3 px-4">
                    {row.category}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium py-3 px-4">
                    {row.latency}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(row);
                      }}
                      className="h-7 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 p-1 px-2"
                    >
                      Inspect
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Slide-Out Inspection Sheet */}
      <Sheet open={!!selectedRow} onOpenChange={(open) => !open && setSelectedRow(null)}>
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
                  Engine: {selectedRow.provider} • Processed in {selectedRow.latency}
                </SheetDescription>
              </SheetHeader>

              {/* Metadata Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase">Classification</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{selectedRow.category}</div>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase">Updated</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{selectedRow.updatedAt}</div>
                </div>
              </div>

              {/* Raw JSON Payload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-text-primary)]">
                    <Terminal className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Raw JSON Record Payload</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(selectedRow.payload)}
                    className="h-7 text-xs font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Payload
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
    </Card>
  );
}
