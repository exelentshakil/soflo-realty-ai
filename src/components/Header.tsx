'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Zap,
  ShieldCheck,
  Terminal,
  MoreHorizontal,
  Sparkles,
  Monitor,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  viewMode: 'portal' | 'cockpit';
  onViewModeChange: (mode: 'portal' | 'cockpit') => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
}

export function Header({
  viewMode,
  onViewModeChange,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set theme to light by default on first load
    if (theme !== 'light' && !localStorage.getItem('theme')) {
      setTheme('light');
    }
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isDark = mounted ? currentTheme === 'dark' : false;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left: Elite Rebrand Brand Text (Never overflows) */}
        <div
          onClick={() => onViewModeChange('portal')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onViewModeChange('portal')}
          className="flex flex-col items-start shrink-0 cursor-pointer select-none text-left"
        >
          <span className="text-[14px] font-serif font-extrabold tracking-widest text-[var(--color-text-primary)] leading-none uppercase">
            Valeria Afanasieva
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5 leading-none">
            Luxury Real Estate
          </span>
        </div>

        {/* Center: Breathtaking Sliding Dual-Mode Switch Switch */}
        <div className="flex items-center">
          <div className="relative flex items-center p-0.5 bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-full shadow-2xs">
            {/* Sliding background pill */}
            <div
              className={`absolute top-0.5 bottom-0.5 rounded-full bg-white dark:bg-slate-800 border border-[var(--color-border-strong)]/10 shadow-xs transition-all duration-300 ease-out ${
                viewMode === 'portal'
                  ? 'left-0.5 w-[112px]'
                  : 'left-[116px] w-[114px]'
              }`}
            />
            <button
              onClick={() => onViewModeChange('portal')}
              className={`relative z-10 w-[112px] h-7.5 text-[11.5px] font-bold tracking-tight text-center rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                viewMode === 'portal'
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-slate-400 hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
<span>Client Portal</span>
            </button>
            <button
              onClick={() => onViewModeChange('cockpit')}
              className={`relative z-10 w-[114px] h-7.5 text-[11.5px] font-bold tracking-tight text-center rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                viewMode === 'cockpit'
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-slate-400 hover:text-[var(--color-text-secondary)]'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Agent Cockpit</span>
            </button>
          </div>
        </div>

        {/* Right: Premium utility options */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Secondary Drawers Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="h-8 w-8 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-3xs rounded-[4px] cursor-pointer"
              title="System Settings"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {moreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-10 z-50 w-52 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-xl space-y-1 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onOpenGovernanceDrawer();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] cursor-pointer text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#057A55]" />
                    <span>NIST Security Blueprint</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onOpenLogsDrawer();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] cursor-pointer text-left"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#533AFD]" />
                    <span>Inngest Queue Logs</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Chaos Simulator */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-[4px] cursor-pointer shadow-3xs"
          >
            <Zap className="h-3 w-3 mr-1 text-white" />
            <span className="hidden sm:inline">Chaos Test</span>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-3xs rounded-[4px] cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-700" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

