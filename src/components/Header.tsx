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
  Menu,
  X,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  viewMode?: 'portal' | 'cockpit';
  onViewModeChange?: (mode: 'portal' | 'cockpit') => void;
  onOpenChaosModal?: () => void;
  onOpenGovernanceDrawer?: () => void;
  onOpenLogsDrawer?: () => void;
  isAdmin?: boolean;
  onOpenConcierge?: () => void;
}

export function Header({
  viewMode = 'portal',
  onViewModeChange,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  isAdmin = false,
  onOpenConcierge,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <a
          href={isAdmin ? "/admin" : "/"}
          className="flex flex-col items-start shrink-0 cursor-pointer select-none text-left no-underline group"
        >
          <span className="text-[14px] font-serif font-extrabold tracking-widest text-[var(--color-text-primary)] leading-none uppercase group-hover:text-[#C5A880] transition-colors">
            Valeria Afanasieva
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#C5A880] uppercase mt-1 leading-none">
            Luxury Real Estate
          </span>
        </a>

        {/* CENTER SECTION */}
        {isAdmin ? (
          /* Admin View Mode Toggle */
          <div className="flex items-center">
            <div className="relative flex items-center p-0.5 bg-[var(--color-panel-subtle)] border border-[var(--color-border)] rounded-full shadow-2xs">
              <div
                className={`absolute top-0.5 bottom-0.5 rounded-full bg-white dark:bg-slate-800 border border-[var(--color-border-strong)]/10 shadow-xs transition-all duration-300 ease-out ${
                  viewMode === 'portal'
                    ? 'left-0.5 w-[112px]'
                    : 'left-[116px] w-[114px]'
                }`}
              />
              <button
                onClick={() => onViewModeChange?.('portal')}
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
                onClick={() => onViewModeChange?.('cockpit')}
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
        ) : (
          /* Public Consumer Menu Links (Hidden on mobile) */
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold uppercase tracking-widest">
            <a href="#portfolio" className="text-[var(--color-text-primary)] hover:text-[#C5A880] transition-colors">
              Residences
            </a>
            <a href="#submarkets" className="text-[var(--color-text-primary)] hover:text-[#C5A880] transition-colors">
              Neighborhoods
            </a>
            <a href="#about" className="text-[var(--color-text-primary)] hover:text-[#C5A880] transition-colors">
              About Valeria
            </a>
            <button
              onClick={onOpenConcierge}
              className="text-[#C5A880] hover:text-[#134441] dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 uppercase font-mono font-bold"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>VIP AI Concierge</span>
            </button>
          </nav>
        )}

        {/* RIGHT SECTION: Controls & Themes */}
        <div className="flex items-center gap-2 shrink-0">

          {isAdmin ? (
            /* Admin Advanced Telemetry Controls */
            <div className="flex items-center gap-2">
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
                          onOpenGovernanceDrawer?.();
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
                          onOpenLogsDrawer?.();
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

              <Button
                size="sm"
                onClick={onOpenChaosModal}
                className="h-8 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-[4px] cursor-pointer shadow-3xs"
              >
                <Zap className="h-3 w-3 mr-1 text-white" />
                <span className="hidden sm:inline">Chaos Test</span>
              </Button>
            </div>
          ) : (
            /* Consumer VIP Request Button */
            <Button
              onClick={onOpenConcierge}
              className="hidden sm:flex h-8 text-[10.5px] font-bold tracking-widest uppercase bg-[#0A2E2B] hover:bg-[#134441] text-white border border-[#C5A880]/30 rounded-[4px] px-3.5 shadow-xs cursor-pointer items-center gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Inquire VIP</span>
            </Button>
          )}

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

          {/* Mobile Menu Toggle (Only in Public view) */}
          {!isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 p-0 md:hidden border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-[4px]"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          )}

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && !isAdmin && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 space-y-2.5 text-left flex flex-col">
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-primary)] py-1 hover:text-[#C5A880] transition-colors"
          >
            Residences
          </a>
          <a
            href="#submarkets"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-primary)] py-1 hover:text-[#C5A880] transition-colors"
          >
            Neighborhoods
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-primary)] py-1 hover:text-[#C5A880] transition-colors"
          >
            About Valeria
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConcierge?.();
            }}
            className="text-left text-[11px] font-mono font-bold uppercase tracking-widest text-[#C5A880] py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>VIP AI Concierge</span>
          </button>
        </div>
      )}
    </header>
  );
}
