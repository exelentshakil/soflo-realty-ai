'use client';

import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  Calendar,
  Compass,
  Shield,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Building,
  Layers,
  Sparkles,
  Award,
  Phone,
  Mail,
  Search,
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
  // Active county submarket tab (Broward vs Palm Beach)
  const [activeCountyTab, setActiveCountyTab] = useState<'broward' | 'palmbeach'>('broward');

  // Active submarket tab (all vs Miami stats vs Pre-con)
  const [activeCatalogTab, setActiveCatalogTab] = useState<'listings' | 'precon' | 'stats'>('listings');

  // Pre-construction developments data with exact HOA fees and prices
  const preConstructionDevelopments = [
    {
      name: 'FAENA RESIDENCES',
      address: '24 SW 4th St, Miami, FL 33130, USA',
      price: '$1,300,000 - $6,800,000',
      hoa: '$1.80 per Sq.Ft. average based on unit height',
      badge: 'Faena District Classic',
    },
    {
      name: 'Dolce & Gabbana Residences',
      address: '888 Brickell Avenue, Miami, FL, USA',
      price: '$2,100,000 - $35,000,000',
      hoa: '$2.10 per Sq.Ft. estimated signature service rate',
      badge: 'Ultra-Luxury Fashion Co-brand',
    },
    {
      name: 'MIDTOWN PARK',
      address: '3055 N Miami Ave, Miami, FL 33137, USA',
      price: '$775,000 - $2,195,000',
      hoa: '$1.35 per Sq.Ft. high-density standard',
      badge: 'Urban Core Location',
    },
    {
      name: 'PAGANI Residences',
      address: '7940 West Drive, North Bay Village, FL 33141, USA',
      price: '$3,955,000 - $30,000,000',
      hoa: '$1.75 per Sq.Ft. private waterfront estate',
      badge: 'Automobili Pagani Curated Interiors',
    },
    {
      name: 'St Regis Bahia Mar',
      address: '801 Seabreeze Blvd, Fort Lauderdale, FL, USA',
      price: '$3,343,957 - $7,803,250',
      hoa: '$1.80/SF resort towers | $2.00/SF private residential towers',
      badge: 'Fort Lauderdale Yachting Core',
    },
    {
      name: 'St Regis Brickell',
      address: '1809 Brickell Avenue, Miami, FL, USA',
      price: '$6,000,000 - $12,000,000',
      hoa: '$1.90 per Sq.Ft. signature butler level',
      badge: 'South Brickell Historic Block',
    },
    {
      name: 'Villa Miami',
      address: '710 Northeast 29th Street, Miami, Florida 33137, USA',
      price: '$4,000,000 - $8,700,000',
      hoa: '$2.10 per Sq.Ft. private helicopter pad service',
      badge: 'Edgewater Luxury Vertical Tower',
    },
    {
      name: 'W Pompano Beach Hotel & Residences',
      address: '20 N Ocean Blvd, Pompano Beach, FL 33062, USA',
      price: '$800,000 - $4,900,000',
      hoa: '$1.81 per Sq.Ft. dynamic resort model',
      badge: 'Waterfront Pompano Focus',
    },
  ];

  // Miami Waterfront Submarket Inventory Statistics
  const miamiSubmarkets = [
    { name: 'AVENTURA', forSale: '1,144', changeSale: '+0.53%', forRent: '538', changeRent: '+0.37%', pending: '58', changePend: '+9.38%', sold: '8', changeSold: '+42.86%', image: 'https://images.pexels.com/photos/3774903/pexels-photo-3774903.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'SUNNY ISLES BEACH', forSale: '1,083', changeSale: '+0.84%', forRent: '787', changeRent: 'Stable', pending: '55', changePend: '+9.84%', sold: '14', changeSold: '+16.67%', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'EDGEWATER', forSale: '484', changeSale: '+1.89%', forRent: '319', changeRent: '+3.92%', pending: '30', changePend: '+3.45%', sold: '3', changeSold: '+25.00%', image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'MIDTOWN MIAMI', forSale: '124', changeSale: '+1.59%', forRent: '164', changeRent: '+1.20%', pending: '3', changePend: '+25.00%', sold: '1', changeSold: 'Stable', image: 'https://images.pexels.com/photos/3773575/pexels-photo-3773575.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'WYNWOOD', forSale: '63', changeSale: '+8.62%', forRent: '97', changeRent: '+1.04%', pending: '0', changePend: 'Stable', sold: '0', changeSold: '+100.00%', image: 'https://images.pexels.com/photos/1647121/pexels-photo-1647121.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'DOWNTOWN MIAMI', forSale: '1,007', changeSale: '+2.23%', forRent: '726', changeRent: '+0.41%', pending: '29', changePend: 'Stable', sold: '3', changeSold: '+62.50%', image: 'https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'BRICKELL', forSale: '1,244', changeSale: '+1.63%', forRent: '1,084', changeRent: '+0.74%', pending: '85', changePend: '+1.16%', sold: '12', changeSold: 'Stable', image: 'https://images.pexels.com/photos/2816315/pexels-photo-2816315.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'MIAMI BEACH', forSale: '1,814', changeSale: '+0.72%', forRent: '1,773', changeRent: '+1.50%', pending: '165', changePend: 'Stable', sold: '18', changeSold: '+50.00%', image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  // Broward (Fort Lauderdale) Areas Statistics
  const browardSubmarkets = [
    { name: 'LAS OLAS ISLES', forSale: '146', changeSale: '+0.69%', pending: '12', forRent: '51', changeRent: '+2.00%', sold: '1' },
    { name: 'DOLPHIN ISLES', forSale: '10', changeSale: '+9.09%', pending: '2', forRent: '11', changeRent: '+8.33%', sold: '0' },
    { name: 'FORT LAUDERDALE', forSale: '2,210', changeSale: '+0.45%', pending: '220', forRent: '1,498', changeRent: '+0.20%', sold: '40' },
    { name: 'HARBOR BEACH', forSale: '21', changeSale: '+5.00%', pending: '0', forRent: '7', changeRent: '+12.50%', sold: '0' },
    { name: 'BAY COLONY', forSale: '5', changeSale: '+16.67%', pending: '0', forRent: '4', changeRent: 'Stable', sold: '1' },
    { name: 'VICTORIA PARK', forSale: '107', changeSale: '+7.00%', pending: '7', forRent: '99', changeRent: '+1.02%', sold: '2' },
    { name: 'CORAL RIDGE', forSale: '83', changeSale: '+1.22%', pending: '6', forRent: '48', changeRent: '+2.13%', sold: '0' },
    { name: 'RIO VISTA', forSale: '71', changeSale: 'Stable', pending: '10', forRent: '29', changeRent: 'Stable', sold: '4' },
    { name: 'SUNRISE KEY', forSale: '2', changeSale: 'Stable', pending: '0', forRent: '1', changeRent: 'Stable', sold: '0' },
  ];

  // Palm Beach Areas Statistics
  const palmBeachSubmarkets = [
    { name: 'WELLINGTON', forSale: '391', changeSale: '+1.76%', pending: '34', changePend: '+10.53%', forRent: '487', changeRent: '+5.98%', sold: '15', changeSold: '+11.76%' },
    { name: 'BOCA RATON', forSale: '1,652', changeSale: '+2.55%', pending: '257', changePend: '+5.17%', forRent: '886', changeRent: '+2.21%', sold: '48', changeSold: '+47.25%' },
    { name: 'WEST PALM BEACH', forSale: '829', changeSale: '+1.22%', pending: '165', changePend: '+7.82%', forRent: '661', changeRent: '+2.16%', sold: '24', changeSold: 'Stable' },
    { name: 'DELRAY BEACH', forSale: '1,347', changeSale: '+0.67%', pending: '173', changePend: '+2.37%', forRent: '660', changeRent: '+0.30%', sold: '38', changeSold: '+19.15%' },
    { name: 'RIVIERA BEACH', forSale: '296', changeSale: '+0.67%', pending: '30', changePend: '+15.38%', forRent: '257', changeRent: '+1.53%', sold: '7', changeSold: '+30.00%' },
    { name: 'LAKE WORTH', forSale: '175', changeSale: 'Stable', pending: '10', changePend: '+16.67%', forRent: '182', changeRent: 'Stable', sold: '8', changeSold: '+60.00%' },
    { name: 'HIGHLAND BEACH', forSale: '120', changeSale: '+1.69%', pending: '12', changePend: '+9.09%', forRent: '44', changeRent: '+13.73%', sold: '0', changeSold: '+100.00%' },
    { name: 'JUPITER', forSale: '345', changeSale: '+1.99%', pending: '54', changePend: '+5.88%', forRent: '280', changeRent: '+1.41%', sold: '13', changeSold: '+43.48%' },
    { name: 'LIGHTHOUSE POINT', forSale: '146', changeSale: '+1.39%', pending: '13', changePend: '+44.44%', forRent: '59', changeRent: '+1.72%', sold: '1', changeSold: '+80.00%' },
  ];

  // Curated Signature Collections
  const signatureCollections = [
    {
      id: 'penthouses',
      title: 'Most Expansive Penthouses Miami',
      count: 18,
      image: 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Sky mansions featuring flow-through private elevators, rooftop terraces, and glass pools soaring above Biscayne Bay.',
    },
    {
      id: 'waterfront-villas',
      title: 'Waterfront Villas',
      count: 62,
      image: 'https://images.pexels.com/photos/221506/pexels-photo-221506.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Private deep-water gated estates in Coral Gables and Miami Beach with premier superyacht docking facilities.',
    },
    {
      id: 'acqualina',
      title: 'Estates at Acqualina',
      count: 20,
      image: 'https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'World-renowned oceanfront service, massive family floorplans, and five-star luxury amenities in Sunny Isles.',
    },
    {
      id: 'stregis-bal',
      title: 'St Regis Bal Harbour',
      count: 5,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'The pinnacle of exclusivity. Standard-setting butler service, five-star private pools, and adjacent luxury shopping.',
    },
  ];

  return (
    <div className="relative w-full bg-[#FCFBFA] text-[#111827] overflow-x-hidden font-sans">

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
        {/* Deep luxurious charcoal vignette overlay to blend with typography and enforce premium tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FCFBFA]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-6">
          <Badge className="bg-black/40 hover:bg-black/50 text-white border border-white/20 px-3.5 py-1 text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
            The Agency · South Florida Luxury Portfolio
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none drop-shadow-md text-white uppercase">
            Premium Beachfront Residences
          </h1>
          <p className="text-sm md:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs font-light">
            Discover hand-selected penthouses and architectural masterpieces curated across Sunny Isles, Brickell, and Coral Gables, fully prepared for immediate private consultation.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onOpenConcierge}
              className="w-full sm:w-auto h-11 px-6 bg-[#E31B23] hover:bg-[#C62828] text-white text-[12px] font-mono font-bold tracking-wider uppercase rounded-[4px] shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-lg border border-slate-200/80 bg-white shadow-xl">
          <div className="p-4 rounded-md hover:bg-slate-50 transition-colors flex items-start gap-4 text-left">
            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
              <Compass className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111827]">Bespoke Matching</h3>
              <p className="text-[13px] text-[#374151] leading-relaxed font-normal">
                Direct, confidential access to Miami's most exclusive off-market listings, custom sky penthouses, and premier pre-construction developments.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-slate-50 transition-colors flex items-start gap-4 border-t md:border-t-0 md:border-x border-slate-100 text-left">
            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
              <Shield className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111827]">Private Representation</h3>
              <p className="text-[13px] text-[#374151] leading-relaxed font-normal">
                Uncompromising privacy and institutional-grade discretion for high-net-worth individuals, family offices, and international entities.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md hover:bg-slate-50 transition-colors flex items-start gap-4 border-t md:border-t-0 text-left">
            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111827]">On-Demand Showings</h3>
              <p className="text-[13px] text-[#374151] leading-relaxed font-normal">
                Seamless coordination for private helicopter charters, luxury ground transport, or deep-water yacht docking directly at candidate estates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Slogan Section (Motto) */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#111827] leading-snug font-bold select-none tracking-tight">
            "EXCELLENCE IS A CONSTANT, NOT AN EXCEPTION"
          </p>
          <div className="h-0.5 w-16 bg-slate-300 mx-auto mt-6" />
        </div>
      </section>

      {/* Segment Selection Navigation (Luxury Dashboard Feel) */}
      <section id="portfolio" className="pt-20 max-w-6xl mx-auto px-4 scroll-mt-16 text-center">
        <div className="mb-10 max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
            Valeria's Portfolio Core
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] uppercase tracking-tight">
            Curated South Florida Portals
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed font-normal">
            Toggle between live pre-construction developments, submarket inventory metrics, or active beachfront estates.
          </p>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex justify-center border-b border-slate-200 max-w-md mx-auto mb-12">
          <button
            onClick={() => setActiveCatalogTab('listings')}
            className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCatalogTab === 'listings'
                ? 'border-b-2 border-[#E31B23] text-[#E31B23]'
                : 'text-slate-400 hover:text-[#111827]'
            }`}
          >
            Beachfront Estates
          </button>
          <button
            onClick={() => setActiveCatalogTab('precon')}
            className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCatalogTab === 'precon'
                ? 'border-b-2 border-[#E31B23] text-[#E31B23]'
                : 'text-slate-400 hover:text-[#111827]'
            }`}
          >
            Pre-Construction
          </button>
          <button
            onClick={() => setActiveCatalogTab('stats')}
            className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCatalogTab === 'stats'
                ? 'border-b-2 border-[#E31B23] text-[#E31B23]'
                : 'text-slate-400 hover:text-[#111827]'
            }`}
          >
            Waterfront Stats
          </button>
        </div>

        {/* TAB 1: Beachfront Estates */}
        {activeCatalogTab === 'listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {luxuryListings.map(listing => (
              <div
                key={listing.id}
                className="group rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-400 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-[#111827]/90 backdrop-blur-sm text-white border border-slate-800 text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 font-bold">
                    {listing.neighborhood}
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-white font-extrabold text-xl tracking-tight uppercase">
                      {listing.name}
                    </span>
                    <span className="text-white font-mono text-[11px] font-bold bg-slate-900/90 backdrop-blur-sm px-2.5 py-0.5 rounded-[2px] tracking-wider border border-slate-800">
                      {listing.priceRange}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-mono border-b border-slate-100 pb-2.5">
                      <span className="font-bold text-[#111827]">Specifications:</span>
                      <span className="font-semibold text-slate-800">{listing.specs}</span>
                    </div>
                    <p className="text-[14px] text-[#374151] leading-relaxed font-normal">
                      {listing.description}
                    </p>
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111827] block">
                        Exclusive Amenities:
                      </span>
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        {listing.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[13px] text-[#374151]">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                            <span className="truncate font-normal">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[10.5px] text-[#475569] font-mono leading-tight min-w-0 flex-1">
                      <div className="truncate">Developer: <span className="font-bold text-[#111827]">{listing.developer}</span></div>
                      <div className="mt-1">Completion: <span className="font-bold text-[#111827]">{listing.completionYear}</span></div>
                    </div>
                    <Button
                      onClick={onOpenConcierge}
                      className="h-9 text-[11px] font-mono font-bold tracking-wider uppercase bg-slate-900 hover:bg-slate-800 text-white rounded-[3px] px-4 cursor-pointer flex items-center justify-center gap-1.5 transition-all shrink-0 w-full sm:w-auto"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Showing</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Pre-Construction Catalog */}
        {activeCatalogTab === 'precon' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {preConstructionDevelopments.map((dev, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-extrabold text-[15px] text-[#111827] uppercase tracking-tight group-hover:text-slate-950 group-hover:underline decoration-slate-300 transition-colors">
                        {dev.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-[#475569] font-mono mt-1">
                        <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                        <span className="truncate max-w-[180px] font-semibold">{dev.address}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 shrink-0 whitespace-nowrap">
                      {dev.badge}
                    </Badge>
                  </div>

                  <div className="space-y-2.5 text-[13px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#475569] font-sans font-normal">Price Bracket:</span>
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[3px]">
                        {dev.price}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <span className="text-[#475569] font-sans font-normal shrink-0">HOA Assessment:</span>
                      <span className="font-mono text-[#111827] font-bold text-right text-[11.5px] leading-snug">
                        {dev.hoa}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Button
                    onClick={onOpenConcierge}
                    className="w-full h-8.5 text-[10.5px] font-mono font-bold tracking-widest uppercase bg-[#111827] hover:bg-[#1f2937] text-white rounded-[3px] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>Inquire Plans</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Waterfront Stats Ingestion Ledger */}
        {activeCatalogTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {miamiSubmarkets.map((market, idx) => (
              <div
                key={idx}
                className="group rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="relative h-24 overflow-hidden bg-slate-900">
                  <img
                    src={market.image}
                    alt={market.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 font-extrabold text-[13px] text-white uppercase tracking-tight">
                    {market.name}
                  </h3>
                </div>

                <div className="p-4 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="border-r border-slate-100 pr-2">
                      <div className="text-[10px] text-[#475569] font-bold uppercase">FOR SALE</div>
                      <div className="text-[13px] font-bold text-[#111827] mt-0.5 flex items-baseline gap-1">
                        <span>{market.forSale}</span>
                        <span className="text-[8.5px] font-bold text-emerald-700">{market.changeSale}</span>
                      </div>
                    </div>
                    <div className="pl-1">
                      <div className="text-[10px] text-[#475569] font-bold uppercase">FOR RENT</div>
                      <div className="text-[13px] font-bold text-[#111827] mt-0.5 flex items-baseline gap-1">
                        <span>{market.forRent}</span>
                        <span className="text-[8.5px] font-semibold text-slate-500">{market.changeRent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono border-t border-slate-100 pt-3">
                    <div className="border-r border-slate-100 pr-2">
                      <div className="text-[10px] text-[#475569] font-bold uppercase">PENDING</div>
                      <div className="text-[13px] font-bold text-[#111827] mt-0.5 flex items-baseline gap-1">
                        <span>{market.pending}</span>
                        <span className="text-[8.5px] font-bold text-emerald-700">{market.changePend}</span>
                      </div>
                    </div>
                    <div className="pl-1">
                      <div className="text-[10px] text-[#475569] font-bold uppercase">SOLD (7D)</div>
                      <div className="text-[13px] font-bold text-[#111827] mt-0.5 flex items-baseline gap-1">
                        <span>{market.sold}</span>
                        <span className="text-[8.5px] font-bold text-emerald-700">{market.changeSold}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={onOpenConcierge}
                    className="w-full text-center text-[9px] font-mono font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:underline transition-colors cursor-pointer"
                  >
                    Request Area Ledger &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NEW: Signature Collections Showcase */}
      <section className="py-24 bg-white text-[#111827]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16 text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Discover Signature Collections
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] uppercase tracking-tight">
              The Most Exclusive Listings
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed font-normal">
              Carefully grouped, elite market selections presenting verified active options curated by Valeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureCollections.map((col, idx) => (
              <div
                key={idx}
                onClick={onOpenConcierge}
                className="group cursor-pointer rounded-lg border border-slate-200 bg-[#FCFBFA] overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-slate-900/90 text-white border border-slate-800 text-[9.5px] font-mono font-bold px-2 py-0.5 tracking-wide">
                    {col.count} Listings
                  </Badge>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-extrabold text-[14px] text-white uppercase tracking-tight leading-tight">
                      {col.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-left">
                  <p className="text-[13px] text-[#374151] leading-relaxed font-normal line-clamp-3">
                    {col.description}
                  </p>
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] font-mono uppercase text-slate-600 font-bold tracking-wider group-hover:text-[#111827] transition-colors">
                    <span>Curated by Valeria</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#E31B23] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERHAULED: Interactive Broward & Palm Beach County Coverage */}
      <section className="py-24 bg-[#111827] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-14 text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Statewide Coverage Network
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">
              Extended Luxury Submarkets
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-normal">
              Confidential placement metrics for key enclaves throughout Broward and Palm Beach Counties.
            </p>
          </div>

          {/* Interactive County Tab Selection */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-col sm:flex-row rounded-md bg-slate-900 p-1 border border-slate-800/80 shadow-2xl">
              <button
                onClick={() => setActiveCountyTab('broward')}
                className={`px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
                  activeCountyTab === 'broward'
                    ? 'bg-[#1F2937] text-white border border-slate-700/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${activeCountyTab === 'broward' ? 'bg-[#E31B23] animate-pulse' : 'bg-slate-600'}`}></span>
                <span>Broward County (Fort Lauderdale)</span>
              </button>
              <button
                onClick={() => setActiveCountyTab('palmbeach')}
                className={`px-6 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer ${
                  activeCountyTab === 'palmbeach'
                    ? 'bg-[#1F2937] text-white border border-slate-700/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${activeCountyTab === 'palmbeach' ? 'bg-[#E31B23] animate-pulse' : 'bg-slate-600'}`}></span>
                <span>Palm Beach County (Boca & Wellington)</span>
              </button>
            </div>
          </div>

          {/* Active Ledger Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCountyTab === 'broward' ? browardSubmarkets : palmBeachSubmarkets).map((market, idx) => (
              <div
                key={idx}
                className="group rounded-md border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-all duration-300 p-5 flex flex-col justify-between space-y-4 shadow-xs"
              >
                {/* Title & Status Indicator */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <span className="font-extrabold text-[13px] text-white tracking-wide uppercase font-sans truncate max-w-[180px]">
                    {market.name}
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="h-1 w-1 rounded-full bg-[#E31B23] opacity-80"></span>
                    <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">ACTIVE PORTAL</span>
                  </span>
                </div>

                {/* Submarket Metrics Split Ledger */}
                <div className="grid grid-cols-2 gap-4 text-left">
                  {/* Column 1 */}
                  <div className="space-y-3 border-r border-slate-800/40 pr-2">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        FOR SALE
                      </span>
                      <div className="text-[13.5px] font-mono font-bold text-white mt-0.5 flex items-baseline gap-1">
                        <span>{market.forSale}</span>
                        <span className="text-[8.5px] text-[#057A55] font-bold">{market.changeSale}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        PENDING
                      </span>
                      <div className="text-[13.5px] font-mono font-bold text-white mt-0.5 flex items-baseline gap-1">
                        <span>{market.pending}</span>
                        {(market as any).changePend && (
                          <span className="text-[8.5px] text-[#057A55] font-bold">{(market as any).changePend}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-3 pl-1">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        RENTALS
                      </span>
                      <div className="text-[13.5px] font-mono font-bold text-white mt-0.5 flex items-baseline gap-1">
                        <span>{market.forRent}</span>
                        {(market as any).changeRent && (
                          <span className="text-[8.5px] text-slate-400 font-bold">{(market as any).changeRent}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                        SOLD
                      </span>
                      <div className="text-[13.5px] font-mono font-bold text-white mt-0.5 flex items-baseline gap-1">
                        <span>{market.sold}</span>
                        {(market as any).changeSold && (
                          <span className="text-[8.5px] text-[#057A55] font-bold">{(market as any).changeSold}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submarket Action Trigger */}
                <div className="pt-3.5 border-t border-slate-800/40 flex items-center justify-between text-[9px] font-mono uppercase text-slate-400 group-hover:text-white transition-colors">
                  <span>CONFIDENTIAL METRICS</span>
                  <button
                    onClick={onOpenConcierge}
                    className="text-[#E31B23] hover:underline font-bold tracking-wider cursor-pointer flex items-center gap-1.5"
                  >
                    <span>REQUEST PORTAL</span>
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERHAULED: About Valeria Editorial Biography (Premium Widescreen Grid Layout) */}
      <section id="about" className="py-28 max-w-6xl mx-auto px-4 scroll-mt-16 bg-[#FCFBFA]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">

          {/* Left Column: Mighty Tall Widescreen Portrait Frame */}
          <div className="lg:col-span-6 flex items-stretch justify-center w-full">
            <div className="relative w-full max-w-[460px] min-h-[500px] rounded-lg overflow-hidden shadow-2xl bg-slate-900 group">
              <img
                src="https://media.pandaidx.com/_image?key=users%2F65368b2f445db5143fcec5a2%2Favatar%2F1776880400744-val.png&w=1080&q=90&f=auto"
                alt="Valeria Afanasieva Portrait"
                className="w-full h-full object-cover object-top filter contrast-[1.01] brightness-[1.01] transition-transform duration-700 group-hover:scale-101"
              />
              {/* Subtle luxury vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#111827]/90 backdrop-blur-md text-[#E31B23] border border-[#E31B23]/20 text-[8.5px] font-mono tracking-widest uppercase px-3 py-1 font-bold">
                  Active Advisor
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typographic Flow */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#111827]/5 text-[#111827] border-slate-200 text-[9px] font-mono uppercase tracking-widest px-3 py-1 font-bold">
                  The Agency South Florida
                </Badge>
                <Badge className="bg-slate-100 text-slate-800 border-slate-200 text-[9px] font-mono uppercase tracking-widest px-3 py-1 font-bold">
                  EN · RU · UK
                </Badge>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] uppercase tracking-tight leading-none font-sans">
                Valeria Afanasieva
              </h2>
              <p className="text-[11px] text-[#475569] font-mono uppercase tracking-widest font-bold border-b border-slate-100 pb-4">
                Real Estate Associate · Global Luxury Advisory Services
              </p>
            </div>

            {/* Direct Work-iCloud Contact Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 text-[13px] font-mono">
              <div className="flex items-center gap-2.5 p-3 rounded-md bg-white border border-slate-200 shadow-3xs">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <a href="mailto:valeria25.12@icloud.com" className="text-[#111827] font-bold hover:text-[#E31B23] transition-colors truncate">
                  valeria25.12@icloud.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-md bg-white border border-slate-200 shadow-3xs">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <a href="tel:+17542927012" className="text-[#111827] font-bold hover:text-[#E31B23] transition-colors">
                  +1 (754) 292-7012
                </a>
              </div>
            </div>

            {/* Biography Copy */}
            <div className="space-y-5 text-[14.5px] text-[#374151] leading-relaxed font-normal font-sans">
              <p>
                Delve into the vibrant realm of Miami and Fort Lauderdale real estate, and one name inevitably shines bright – <span className="font-bold text-[#111827]">Valeria Afanasieva</span>. Partnering with <span className="font-bold text-[#111827]">The Agency</span>, Valeria has established herself as the definitive expert in pre-construction sales in South Florida's most sought-after locales.
              </p>
              <p>
                Valeria's association with The Agency isn't just about a brand or a name. It's about synergy. Together, they bring to the table a harmonious blend of in-depth local insights, extensive market research, and cutting-edge sales strategies, all tailored to ensure clients receive not just a property, but a future home or investment that aligns perfectly with their visions and aspirations.
              </p>
              <p>
                Clients consistently praise Valeria for her service. To her, it's not merely about closing deals; it's about forming lasting, trust-based partnerships that safeguard client liquidity while placing wealth into South Florida's premier architectural and coastal residential developments.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#111827] font-bold font-sans">
                <CheckCircle2 className="h-4 w-4 text-slate-500" />
                <span>Pre-Construction</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#111827] font-bold font-sans">
                <CheckCircle2 className="h-4 w-4 text-slate-500" />
                <span>Waterfront Estates</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#111827] font-bold font-sans">
                <CheckCircle2 className="h-4 w-4 text-slate-500" />
                <span>Off-Market Placement</span>
              </span>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button
                onClick={onOpenConcierge}
                className="h-11 px-6 bg-[#111827] hover:bg-[#1f2937] text-white text-[11px] font-mono font-bold tracking-wider uppercase rounded-[3px] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-[#E31B23]" />
                <span>Consult Her Office</span>
              </Button>
              <div className="flex items-center gap-2 text-[10.5px] text-[#475569] font-mono uppercase tracking-wider font-semibold">
                <Award className="h-5 w-5 text-slate-400 shrink-0" />
                <span>Top-Tier Placement Advisor</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Floating Active Concierge Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onOpenConcierge}
          className="h-11 px-5 rounded-full bg-[#111827] text-white flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-101 hover:bg-[#1f2937] transition-all cursor-pointer border border-[#E31B23]/30 active:scale-98"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D924] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D924]"></span>
          </span>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#E31B23]">
            AI Concierge · Active
          </span>
        </button>
      </div>

    </div>
  );
}
