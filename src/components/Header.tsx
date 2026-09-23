'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Command,
  Sun,
  Moon,
  Zap,
  Bot,
  MoreHorizontal,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { BrandLogoMark } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;
  const isDark = mounted ? currentTheme === 'dark' : false;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };



  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Clean Brand Mark (Never overflows: Logo + Name Only) */}
        <div
          onClick={() => onNavigate('hero')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('hero')}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
        >
          <BrandLogoMark className="h-7 w-7" />
          <span className="text-[15px] font-bold tracking-tight text-[var(--color-text-primary)] font-sans">
            {siteConfig.name}
          </span>
        </div>

        {/* Center: Stripe/Linear Authentic Text Navigation (High-Density, Zero Bulk) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {siteConfig.primaryNav.map((item) => {
            const isActive = activeSection === item.id;
            const label = item.label;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[14.5px] tracking-tight transition-colors whitespace-nowrap cursor-pointer relative py-1 font-medium ${
                  isActive
                    ? 'text-[var(--color-text-primary)] font-semibold'
                    : 'text-[#425466] dark:text-[#ADBDCC] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <span>{label}</span>
                {isActive && (
                  <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-[#635BFF] dark:bg-[#7A68FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Essential High-Signal Action Suite (Fits Every Display Perfectly) */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Command Palette (⌘K) */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCommandMenu}
            className="h-8.5 items-center gap-1.5 px-3 text-xs sm:text-[13px] font-medium text-[var(--color-text-secondary)] border-[var(--color-border)] bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs rounded-[4px] cursor-pointer"
            title="Search & Quick Actions (⌘K)"
          >
            <Command className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
            <span className="text-xs hidden sm:inline font-mono">⌘K</span>
          </Button>

          {/* More Secondary Drawers Trigger (Dropdown) */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="h-8.5 w-8.5 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs rounded-[4px] cursor-pointer"
              title="More Options (Governance Blueprint & Logs)"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {moreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-10 z-50 w-52 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-xl space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onOpenGovernanceDrawer();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] text-left cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#057A55]" />
                    <span>NIST AI Governance</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMoreMenuOpen(false);
                      onOpenLogsDrawer();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-[4px] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] text-left cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#533AFD]" />
                    <span>Real-time Execution Logs</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Primary Action Button: Chaos Test */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8.5 text-xs sm:text-[13px] font-semibold bg-[#533AFD] hover:bg-[#432DE0] text-white shadow-2xs whitespace-nowrap px-3.5 rounded-[4px] cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 mr-1.5 text-white" />
            <span>Chaos Test</span>
          </Button>

          {/* Theme Toggle Button */}
          {mounted && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="h-8.5 w-8.5 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs rounded-[4px] cursor-pointer"
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

      {/* Mobile Horizontal Sub-Navigation (<768px) */}
      <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-2 px-4 overflow-x-auto no-scrollbar flex items-center gap-4 flex-nowrap">
        {siteConfig.primaryNav.map((item) => {
          const isActive = activeSection === item.id;
          const label = item.label;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-[13.5px] transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'text-[#635BFF] dark:text-[#7A68FF] font-semibold'
                  : 'text-[var(--color-text-secondary)] font-medium'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
