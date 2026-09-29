'use client';

import React from 'react';
import {
  MapPin,
  ArrowRight,
  Calendar,
  Compass,
  Shield,
  TrendingUp,
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
    <div className="relative w-full bg-[#FAF9F6] text-[#0A2E2B]">

      {/* Cinematic Drone Video Hero Section */}
      <div className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          poster={mediaConfig.ambientVideo.posterUrl}
        >
          <source src={mediaConfig.ambientVideo.videoUrl} type="video/mp4" />
        </video>
        {/* Deep luxurious pine vignette overlay to blend with typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FAF9F6]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-6">
          <Badge className="bg-[#FAF9F6]/10 hover:bg-[#FAF9F6]/15 text-white border-white/20 px-3.5 py-1 text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
            South Florida Luxury Estate Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none drop-shadow-md text-white uppercase font-sans">
            Premium Beachfront Residences
          </h1>
          <p className="text-sm md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-sans drop-shadow-xs font-light">
            Discover hand-selected penthouses and architectural masterpieces curated across Sunny Isles, Brickell, and Coral Gables, fully prepared for immediate private consultation.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onOpenConcierge}
              className="w-full sm:w-auto h-11 px-6 bg-[#C5A880] hover:bg-[#B3966E] text-white text-[12px] font-mono font-bold tracking-wider uppercase rounded-[4px] shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4 text-white" />
              <span>Consult Valeria's Office</span>
            </Button>
            <a
              href="#portfolio"
              className="w-full sm:w-auto h-11 px-6 border border-white/40 text-white hover:bg-white/10 hover:border-white/60 text-[12px] font-mono font-bold tracking-wider uppercase rounded-[4px] backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Value Deck Quick Navigation */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-lg border border-[#C5A880]/30 bg-white shadow-xl">
          <div className="p-4 rounded-md hover:bg-[#FAF9F6] transition-colors flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-[#0A2E2B]/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-[#C5A880]/20">
              <Compass className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A2E2B]">Bespoke Matching</h3>
              <p className="text-[11.5px] text-[#556B69] leading-relaxed font-light">
                Direct, confidential access to Miami's most exclusive off-market listings, custom sky penthouses, and premier pre-construction developments.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-[#FAF9F6] transition-colors flex items-start gap-4 border-t md:border-t-0 md:border-x border-[#C5A880]/10">
            <div className="h-10 w-10 rounded-full bg-[#0A2E2B]/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-[#C5A880]/20">
              <Shield className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A2E2B]">Private Representation</h3>
              <p className="text-[11.5px] text-[#556B69] leading-relaxed font-light">
                Uncompromising privacy and institutional-grade discretion for high-net-worth individuals, family offices, and international entities.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-[#FAF9F6] transition-colors flex items-start gap-4 border-t md:border-t-0">
            <div className="h-10 w-10 rounded-full bg-[#0A2E2B]/5 flex items-center justify-center text-[#C5A880] shrink-0 border border-[#C5A880]/20">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-left">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0A2E2B]">On-Demand Showings</h3>
              <p className="text-[11.5px] text-[#556B69] leading-relaxed font-light">
                Seamless coordination for private helicopter charters, luxury ground transport, or deep-water yacht docking directly at candidate estates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Property Portfolio */}
      <section id="portfolio" className="py-24 max-w-5xl mx-auto px-4 scroll-mt-16">
        <div className="mb-16 text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A880]">
            Curated Selection
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2E2B] uppercase tracking-tight">
            Featured Elite Developments
          </h2>
          <p className="text-xs md:text-sm text-[#556B69] leading-relaxed font-light">
            Explore active beachfront and penthouse listings, each fully equipped with immersive detail tables and live booking routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {luxuryListings.map(listing => (
            <div
              key={listing.id}
              className="group rounded-lg border border-[#C5A880]/20 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#0A2E2B]/90 backdrop-blur-sm text-white border border-[#C5A880]/30 text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5">
                  {listing.neighborhood}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="text-white font-extrabold text-xl tracking-tight uppercase">
                    {listing.name}
                  </span>
                  <span className="text-white font-mono text-[11px] font-bold bg-[#C5A880]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-[2px]">
                    {listing.priceRange}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10.5px] text-[#556B69] font-mono border-b border-[#C5A880]/10 pb-2.5">
                    <span className="font-bold text-[#0A2E2B]">Specifications:</span>
                    <span>{listing.specs}</span>
                  </div>
                  <p className="text-[12.5px] text-[#556B69] leading-relaxed font-light">
                    {listing.description}
                  </p>
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0A2E2B] block">
                      Exclusive Amenities:
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {listing.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11.5px] text-[#556B69]">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#C5A880]" />
                          <span className="truncate font-light">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C5A880]/10 flex items-center justify-between gap-3">
                  <div className="text-[10px] text-[#819997] font-mono leading-tight">
                    <div>Developer: <span className="font-bold text-[#0A2E2B]">{listing.developer}</span></div>
                    <div className="mt-0.5">Completion: <span className="font-bold text-[#0A2E2B]">{listing.completionYear}</span></div>
                  </div>
                  <Button
                    onClick={onOpenConcierge}
                    className="h-8.5 text-[10.5px] font-mono font-bold tracking-wider uppercase border border-[#C5A880] hover:bg-[#C5A880] hover:text-white bg-transparent text-[#C5A880] rounded-[3px] px-4 cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Showing</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Miami Neighborhood Showcase */}
      <section id="submarkets" className="py-24 bg-[#0A2E2B] text-white border-y border-[#134441] scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16 text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A880]">
              Prime Submarkets
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Miami Waterfront Submarkets
            </h2>
            <p className="text-xs md:text-sm text-[#A6C0BE] leading-relaxed font-light">
              South Florida's coastal enclaves represent some of the most stable, highly sought real estate assets globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Neighborhood 1: Sunny Isles */}
            <div className="group rounded-lg border border-[#134441] bg-[#0A2E2B] p-6 hover:border-[#C5A880]/40 hover:shadow-lg transition-all space-y-5 text-left">
              <div className="h-44 rounded-sm overflow-hidden bg-slate-900">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sunny Isles Beach"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-white uppercase tracking-tight">Sunny Isles Beach</h3>
                <p className="text-[12px] text-[#A6C0BE] leading-relaxed font-light">
                  Known as Miami's Riviera, a thin peninsula of luxury skyscrapers providing unobstructed Atlantic views, private beaches, and robust privacy.
                </p>
              </div>
              <div className="pt-3.5 border-t border-[#134441] flex justify-between text-[9.5px] text-[#81A3A0] font-mono uppercase tracking-wider">
                <span>Avg Entry: $3.2M</span>
                <span>Oceanfront Focus</span>
              </div>
            </div>

            {/* Neighborhood 2: Brickell */}
            <div className="group rounded-lg border border-[#134441] bg-[#0A2E2B] p-6 hover:border-[#C5A880]/40 hover:shadow-lg transition-all space-y-5 text-left">
              <div className="h-44 rounded-sm overflow-hidden bg-slate-900">
                <img
                  src="https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Brickell"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-white uppercase tracking-tight">Brickell Financial Sector</h3>
                <p className="text-[12px] text-[#A6C0BE] leading-relaxed font-light">
                  The financial capital of the South. A vibrant, walk-to-work district presenting vertical sky mansions, premium dining, and architectural penthouses.
                </p>
              </div>
              <div className="pt-3.5 border-t border-[#134441] flex justify-between text-[9.5px] text-[#81A3A0] font-mono uppercase tracking-wider">
                <span>Avg Entry: $1.9M</span>
                <span>Urban Core</span>
              </div>
            </div>

            {/* Neighborhood 3: Coral Gables */}
            <div className="group rounded-lg border border-[#134441] bg-[#0A2E2B] p-6 hover:border-[#C5A880]/40 hover:shadow-lg transition-all space-y-5 text-left">
              <div className="h-44 rounded-sm overflow-hidden bg-slate-900">
                <img
                  src="https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Coral Gables"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-white uppercase tracking-tight">Coral Gables Estates</h3>
                <p className="text-[12px] text-[#A6C0BE] leading-relaxed font-light">
                  A historic residential enclave offering Spanish-colonial architecture, private deep-water yacht canals, and quiet institutional prestige.
                </p>
              </div>
              <div className="pt-3.5 border-t border-[#134441] flex justify-between text-[9.5px] text-[#81A3A0] font-mono uppercase tracking-wider">
                <span>Avg Entry: $4.5M</span>
                <span>Waterfront Estate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Valeria Profile (Scrubbed of Tech/Developer Jargon, High-fidelity) */}
      <section id="about" className="py-24 max-w-5xl mx-auto px-4 scroll-mt-16">
        <div className="rounded-lg border border-[#C5A880]/20 bg-white p-6 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-14 shadow-xs">
          <div className="w-52 h-64 md:w-64 md:h-80 rounded-sm overflow-hidden shrink-0 border border-[#C5A880]/20 shadow-md relative bg-slate-100">
            <img
              src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
              alt="Valeria Afanasieva"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1 space-y-5 text-left">
            <div className="space-y-1.5">
              <div className="flex flex-wrap gap-1.5 mb-1">
                <Badge className="bg-[#0A2E2B]/5 text-[#0A2E2B] border-[#C5A880]/30 text-[8.5px] font-mono uppercase tracking-widest px-2 py-0.5">
                  The Agency South Florida
                </Badge>
                <Badge className="bg-[#C5A880]/10 text-[#C5A880] border-[#C5A880]/30 text-[8.5px] font-mono uppercase tracking-widest px-2 py-0.5">
                  EN · RU · UK
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2E2B] uppercase tracking-tight font-sans">
                Valeria Afanasieva
              </h2>
              <p className="text-[10.5px] text-[#C5A880] font-mono uppercase tracking-wider font-bold">
                Real Estate Associate · South Florida Luxury Advisor
              </p>
            </div>

            <div className="space-y-4 text-[12.5px] text-[#556B69] leading-relaxed font-light font-sans">
              <p>
                Delve into the vibrant realm of Miami and Fort Lauderdale real estate, and one name inevitably shines bright - Valeria Afanasieva. Partnering with <span className="font-semibold text-[#0A2E2B]">The Agency</span>, Valeria has established herself as the definitive expert in pre-construction sales in South Florida's most sought-after locales.
              </p>
              <p>
                Valeria's association with The Agency isn't just about a brand or a name. It's about synergy. Together, they bring to the table a harmonious blend of in-depth local insights, extensive market research, and cutting-edge sales strategies, all tailored to ensure clients receive not just a property, but a future home or investment that aligns perfectly with their visions and aspirations.
              </p>
              <p>
                Clients consistently praise Valeria for her service. To her, it's not merely about closing deals; it's about forming lasting, trust-based partnerships.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-[9.5px] font-mono border-[#C5A880]/30 text-[#0A2E2B] px-2.5 py-0.5 uppercase tracking-wider">
                Pre-Construction Specialist
              </Badge>
              <Badge variant="outline" className="text-[9.5px] font-mono border-[#C5A880]/30 text-[#0A2E2B] px-2.5 py-0.5 uppercase tracking-wider">
                Global Network Placements
              </Badge>
              <Badge variant="outline" className="text-[9.5px] font-mono border-[#C5A880]/30 text-[#0A2E2B] px-2.5 py-0.5 uppercase tracking-wider">
                Bespoke Client Advisory
              </Badge>
            </div>

            <div className="pt-3">
              <Button
                onClick={onOpenConcierge}
                className="h-10 px-5 bg-[#0A2E2B] hover:bg-[#134441] text-white text-[10.5px] font-mono font-bold tracking-wider uppercase rounded-[3px] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-[#C5A880]" />
                <span>Consult Her Office</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Active Concierge Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onOpenConcierge}
          className="h-11 px-5 rounded-full bg-[#0A2E2B] text-white flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-101 hover:bg-[#134441] transition-all cursor-pointer border border-[#C5A880]/30 active:scale-98"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D924] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D924]"></span>
          </span>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#C5A880]">
            AI Concierge · Active
          </span>
        </button>
      </div>

    </div>
  );
}
