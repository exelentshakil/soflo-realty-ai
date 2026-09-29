/**
 * Curated Elite Real Estate Listings Database
 * Seeded with authentic luxury developments in South Florida.
 * Uses high-fidelity, royalty-free Pexels API image sources.
 */

export interface LuxuryListing {
  id: string;
  name: string;
  neighborhood: string;
  priceRange: string;
  specs: string;
  image: string;
  description: string;
  amenities: string[];
  developer: string;
  completionYear: string;
}

export const luxuryListings: LuxuryListing[] = [
  {
    id: 'list-armani',
    name: 'Armani Casa Residences',
    neighborhood: 'Sunny Isles Beach',
    priceRange: '$2,950,000 to $8,200,000',
    specs: '2 to 4 Bedrooms | 2,500 to 4,500 Sq.Ft.',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Ultra-luxury oceanfront residences designed by world-renowned architect Cesar Pelli with interiors curated by Giorgio Armani. Features flow-through layouts, private elevator access, and floor-to-ceiling glass framing expansive Atlantic views.',
    amenities: [
      'Private Beach Club with beach service',
      'Heated oceanfront swimming pool',
      'Signature Armani restaurant and bar',
      'Full-service luxury spa and fitness center',
      'Private cigar room and wine cellar'
    ],
    developer: 'Dezer Development & Related Group',
    completionYear: '2020'
  },
  {
    id: 'list-porsche',
    name: 'Porsche Design Tower',
    neighborhood: 'Sunny Isles Beach',
    priceRange: '$4,500,000 to $16,000,000',
    specs: '3 to 5 Bedrooms | 3,800 to 6,000 Sq.Ft.',
    image: 'https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'An iconic, cylinder-shaped skyscraper featuring the patented Dezerator automated glass elevator. Owners drive their vehicles directly into the lift and park them in their own private sky garage attached to their residential suite.',
    amenities: [
      'Automated glass car elevator lift',
      'Private balcony plunge pools',
      'Oceanfront dining and lounge room',
      'State-of-the-art virtual racing simulator',
      'Private cinema and screening room'
    ],
    developer: 'Dezer Development',
    completionYear: '2017'
  },
  {
    id: 'list-waldorf',
    name: 'Waldorf Astoria Residences',
    neighborhood: 'Downtown Miami',
    priceRange: '$1,800,000 to $11,000,000',
    specs: '1 to 4 Bedrooms | 1,200 to 3,500 Sq.Ft.',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Rising 1,049 feet as Miami first supertall tower. An architectural masterpiece designed by Carlos Ott consisting of nine stacked, offset glass cubes that deliver panoramic views of Biscayne Bay, Key Biscayne, and the city skyline.',
    amenities: [
      'Signature Waldorf Astoria hotel spa',
      'Private resident helipad access',
      'Peacock Alley restaurant and bar lounge',
      'Resort-style pool deck with private cabanas',
      'Bespoke 24-hour concierge and butler services'
    ],
    developer: 'PMG (Property Markets Group)',
    completionYear: '2026'
  },
  {
    id: 'list-cipriani',
    name: 'Cipriani Residences',
    neighborhood: 'Brickell',
    priceRange: '$1,400,000 to $6,500,000',
    specs: '1 to 4 Bedrooms | 1,100 to 3,200 Sq.Ft.',
    image: 'https://images.pexels.com/photos/53610/pexels-photo-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic Italian elegance in the center of Miami. Impeccable residential service designed by Cipriani, classic elegant materials, custom kitchens, and floor-to-ceiling glass doors opening onto expansive Brickell balconies.',
    amenities: [
      'Private Cipriani dining for residents',
      'Elevated resort pool deck with bar',
      'Exclusive state-of-the-art wellness salon',
      'Private screening room and media library',
      '24/7 Cipriani trained concierge and valet'
    ],
    developer: 'Mast Capital & Cipriani family',
    completionYear: '2026'
  }
];

