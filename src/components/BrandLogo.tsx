'use client';

import React from 'react';
import { Bot } from 'lucide-react';

export function BrandLogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <div className={`flex ${className} items-center justify-center rounded-[6px] bg-gradient-to-br from-[#533AFD] via-[#432DE0] to-[#0D1738] text-white shadow-xs font-bold shrink-0 border border-white/20`}>
      <Bot className="h-4 w-4" />
    </div>
  );
}
