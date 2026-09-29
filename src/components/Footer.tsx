'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Home,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#111827] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1F2937]">
      <div className="mx-auto max-w-5xl space-y-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="mb-3">
                <img
                  src="https://media.pandaidx.com/_image?key=app%2F65368b3913315d8344407428%2Fgeneral%2F1776877572564-logo-print.png&w=640&q=75&f=auto"
                  alt="The Agency Logo"
                  className="h-8 w-auto object-contain opacity-90"
                  style={{ filter: 'invert(1)' }}
                />
              </div>
              <span className="text-[15px] font-sans font-extrabold tracking-widest uppercase text-[#E31B23]">
                Valeria Afanasieva
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase mt-1">
                The Agency South Florida
              </span>
            </div>
            <p className="text-[12.5px] text-[#E2E8F0] leading-relaxed font-sans font-light">
              Providing bespoke client advisory services and ultra-luxury residential representation across South Florida's coastal submarkets.
            </p>
            <div className="flex items-center gap-3.5 pt-2 text-slate-400">
              <a href="#" className="hover:text-[#E31B23] transition-colors" aria-label="Instagram">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-[#E31B23] transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-[#E31B23] transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="hover:text-[#E31B23] transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Office Locations */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              Our Offices
            </h4>
            <div className="space-y-3.5 text-[12.5px] text-[#E2E8F0] font-sans font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Miami Beach Office</p>
                  <p className="text-[#94A3B8]">1682 Jefferson Avenue</p>
                  <p className="text-[#94A3B8]">Miami Beach, FL 33139</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Coral Gables Office</p>
                  <p className="text-[#94A3B8]">4000 Ponce de Leon Blvd, Suite 700</p>
                  <p className="text-[#94A3B8]">Coral Gables, FL 33146</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Concierge */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              Direct Contact
            </h4>
            <div className="space-y-3 text-[12.5px] text-[#E2E8F0] font-sans font-light">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="tel:+17542927012" className="text-white font-medium hover:text-[#E31B23] transition-colors">
                  +1 (754) 292-7012
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="mailto:valeria25.12@icloud.com" className="text-white truncate hover:text-[#E31B23] transition-colors">
                  valeria25.12@icloud.com
                </a>
              </div>
              <div className="pt-2">
                <div className="p-3.5 rounded bg-[#1F2937]/50 border border-[#374151] text-[11.5px] leading-relaxed text-[#E2E8F0] font-sans font-light">
                  Affiliated with <span className="text-white font-semibold">The Agency</span>. Representing South Florida's premier architectural and coastal residential assets.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Compliance & Legal Footer Bar */}
        <div className="pt-8 border-t border-[#1F2937] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#94A3B8] font-mono uppercase tracking-wider">
          <div className="text-center md:text-left leading-normal">
            © {new Date().getFullYear()} Valeria Afanasieva Group. All rights reserved.
          </div>
          <div className="flex items-center gap-4.5">
            <span className="flex items-center gap-1.5 font-sans font-light">
              <Home className="h-3.5 w-3.5 text-slate-500" />
              <span>Equal Housing Opportunity</span>
            </span>
            <span className="font-sans font-light">REALTOR®</span>
            <span className="font-sans font-light">MLS®</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
