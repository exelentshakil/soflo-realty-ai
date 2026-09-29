'use client';

import React from 'react';
import {
  MapPin,
  ArrowRight,
  Calendar,
  Compass,
  Sparkles,
  Shield,
  TrendingUp,
  Award,
  Building2,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import { mediaConfig } from '@/config/media';
import { luxuryListings, type LuxuryListing } from '@/config/listings';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ClientPortalProps {
  onOpenConcierge: () => void;
  onShowlisting: (listing: LuxuryListing) => void;
}

export function ClientPortal({ onOpenConcierge, onShowlisting }: ClientPortalProps) {
  return (
    <div className="relative w-full bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      {/* Cinematic Drone Video Hero Section */}
      <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          poster={mediaConfig.ambientVideo.posterUrl}
        >
          <source src={mediaConfig.ambientVideo.videoUrl} type="video/mp4" />
        </video>
        {/* Soft elegant vignette overlay to blend with typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[var(--color-canvas)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-6">
          <Badge className="bg-white/10 hover:bg-white/15 text-white border-white/20 px-3 py-1 text-xs font-mono backdrop-blur-md tracking-wider">
            South Florida Luxury Estate Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-extrabold tracking-tight leading-none drop-shadow-md">
            Premium Beachfront Residences
          </h1>
          <p className="text-base md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-xs font-light">
            Discover hand-selected penthouses and architectural masterpieces curated across Sunny Isles, Brickell, and Coral Gables, qualified with instant AI Search Optimization.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              onClick={onOpenConcierge}
              className="w-full sm:w-auto h-11 px-6 bg-[#533AFD] hover:bg-[#432DE0] text-white text-[13px] font-bold rounded-[4px] shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Consult AI Luxury Concierge</span>
            </Button>
            <a
              href="#portfolio"
              className="w-full sm:w-auto h-11 px-6 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-[13px] font-bold rounded-[4px] backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Lead Deck Quick Navigation */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/90 shadow-xl backdrop-blur-lg">
          <div className="p-4 rounded-md hover:bg-[var(--color-panel-subtle)] transition-colors flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#533AFD]/5 flex items-center justify-center text-[#533AFD] shrink-0">
              <Compass className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">GEO Discovery</h3>
              <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                Fully optimized listing structures indexed automatically for real-time recommendation inside ChatGPT and Perplexity Search.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-[var(--color-panel-subtle)] transition-colors flex items-start gap-3 border-t md:border-t-0 md:border-x border-[var(--color-border-subtle)]">
            <div className="h-9 w-9 rounded-full bg-[#533AFD]/5 flex items-center justify-center text-[#533AFD] shrink-0">
              <Shield className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">Verified POF Gate</h3>
              <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                Our system securely checks proof of funds through premium, end-to-end sandbox interfaces to guarantee only high-intent buyers qualify.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-[var(--color-panel-subtle)] transition-colors flex items-start gap-3 border-t md:border-t-0">
            <div className="h-9 w-9 rounded-full bg-[#533AFD]/5 flex items-center justify-center text-[#533AFD] shrink-0">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">CRM Sync SLA</h3>
              <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                Qualified leads route to Valeria's GoHighLevel CRM in under 5 seconds, triggering instant VIP SMS scheduling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Property Portfolio */}
      <section id="portfolio" className="py-20 max-w-5xl mx-auto px-4 scroll-mt-16">
        <div className="mb-12 text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#533AFD]">
            Curated Selection
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[var(--color-text-primary)]">
            Featured Elite Developments
          </h2>
          <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
            Explore active, ultra-luxury residential spaces featuring world-class amenities, coastal views, and prestigious architecture in South Florida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {luxuryListings.map(listing => (
            <div
              key={listing.id}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm hover:bg-slate-900 text-white border-white/10 text-[10.5px] font-mono px-2.5 py-0.5">
                  {listing.neighborhood}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="text-white font-serif font-bold text-lg leading-tight">
                    {listing.name}
                  </span>
                  <span className="text-white font-mono font-bold text-xs bg-[#533AFD]/90 backdrop-blur-sm px-2 py-0.5 rounded-[3px]">
                    {listing.priceRange}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)] font-mono border-b border-[var(--color-border-subtle)] pb-2">
                    <span className="font-bold text-[var(--color-text-primary)]">Specs:</span>
                    <span>{listing.specs}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {listing.description}
                  </p>
                  <div className="space-y-1 pt-2">
                    <span className="text-[10.5px] font-mono font-bold uppercase text-[var(--color-text-primary)] block">
                      Exclusive Amenities:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {listing.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-[#057A55]" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-3">
                  <div className="text-[10px] text-[var(--color-text-muted)] leading-tight">
                    <div>Developer: <span className="font-medium text-[var(--color-text-primary)]">{listing.developer}</span></div>
                    <div>Completion: <span className="font-medium text-[var(--color-text-primary)]">{listing.completionYear}</span></div>
                  </div>
                  <Button
                    onClick={onOpenConcierge}
                    variant="outline"
                    className="h-8 text-[11.5px] font-bold border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] rounded-[4px] px-3.5 cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Schedule Visit</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Miami Neighborhood Showcase */}
      <section className="py-20 bg-[var(--color-panel-subtle)] border-y border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-12 text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#533AFD]">
              Prime Submarkets
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[var(--color-text-primary)]">
              Miami Waterfront Neighborhoods
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
              South Florida's coastal zipcodes represent some of the most consistent, highly sought real estate on the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Neighborhood 1: Sunny Isles */}
            <div className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] hover:shadow-xs transition-all space-y-4">
              <div className="h-40 rounded-md overflow-hidden bg-slate-100">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sunny Isles Beach"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-base text-[var(--color-text-primary)]">Sunny Isles Beach</h3>
                <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                  Known as Miami's Riviera, a narrow strip of luxury high-rises offering unobstructed ocean vistas, private sand beaches, and extreme privacy.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--color-border-subtle)] flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                <span>Avg Price: $3.2M</span>
                <span>Oceanfront focus</span>
              </div>
            </div>

            {/* Neighborhood 2: Brickell */}
            <div className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] hover:shadow-xs transition-all space-y-4">
              <div className="h-40 rounded-md overflow-hidden bg-slate-100">
                <img
                  src="https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Brickell"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-base text-[var(--color-text-primary)]">Brickell</h3>
                <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                  The Wall Street of the South. A vibrant, high-density metropolitan financial sector offering vertical luxury living, fine culinary dining, and elite penthouses.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--color-border-subtle)] flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                <span>Avg Price: $1.9M</span>
                <span>Urban Luxury</span>
              </div>
            </div>

            {/* Neighborhood 3: Coral Gables */}
            <div className="group rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] hover:shadow-xs transition-all space-y-4">
              <div className="h-40 rounded-md overflow-hidden bg-slate-100">
                <img
                  src="https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Coral Gables"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif font-bold text-base text-[var(--color-text-primary)]">Coral Gables</h3>
                <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed">
                  A historic, tree-lined residential enclave offering Spanish-colonial estates, waterfront canals, private yacht docks, and quiet institutional elegance.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--color-border-subtle)] flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
                <span>Avg Price: $4.5M</span>
                <span>Waterfront Estates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Valeria Profile and GEO Explanation */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-sm">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shrink-0 border border-[var(--color-border)] shadow-xs relative bg-slate-100">
            <img
              src="/headshot.jpeg"
              alt="Valeria Afanasieva"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if local headshot missing
                e.currentTarget.src = 'https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <Badge className="bg-[#533AFD]/5 hover:bg-[#533AFD]/10 text-[#533AFD] border-[#533AFD]/20 text-[10.5px] font-mono px-2 py-0.5 uppercase tracking-wider">
                Principal Luxury Specialist
              </Badge>
              <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[var(--color-text-primary)] leading-tight">
                Valeria Afanasieva
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] font-mono">
                Licensed Global Real Estate Advisor · South Florida Focus
              </p>
            </div>

            <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
              With a focus on high-capital relocations and custom investment strategies, Valeria leverages modern data science to position properties directly where today's elite buyers search. In an era where buyers bypass legacy portals in favor of conversational AI inquiries on Perplexity and ChatGPT, Valeria has installed custom Generative Engine Optimization models to ensure her listings stay cited as the premier beachfront choices in South Florida.
            </p>

            <div className="pt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-[10.5px] border-[var(--color-border-strong)] text-[var(--color-text-primary)] px-2 py-0.5">
                $42M+ Closed Volume
              </Badge>
              <Badge variant="outline" className="text-[10.5px] border-[var(--color-border-strong)] text-[var(--color-text-primary)] px-2 py-0.5">
                Generative Search Optimized
              </Badge>
              <Badge variant="outline" className="text-[10.5px] border-[var(--color-border-strong)] text-[var(--color-text-primary)] px-2 py-0.5">
                Certified Luxury Specialist
              </Badge>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onOpenConcierge}
                className="h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-[4px] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Consult Her Virtual Office</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Widget Tracker for Live Concierge Status */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onOpenConcierge}
          className="h-11 px-4.5 rounded-full bg-[#533AFD] text-white flex items-center gap-2.5 shadow-lg hover:shadow-xl hover:scale-102 hover:bg-[#432DE0] transition-all cursor-pointer border border-white/20 active:scale-98"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D924] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D924]"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide font-sans">
            Valeria's AI Concierge · Online
          </span>
        </button>
      </div>
    </div>
  );
}

