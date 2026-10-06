export type StoneCategory =
  | "Natural Stones"
  | "Semi-Precious Stones"
  | "Exclusive Table Tops — Stone"
  | "Mosaics"
  | "Stone Veneers"
  | "Artefacts"
  // Legacy & specific sub-type aliases for flexible filtering:
  | "Marble"
  | "Granite"
  | "Onyx"
  | "Quartzite"
  | "Travertine"
  | "Limestone"
  | "Sandstone"
  | "Slate"
  | "Semi-Precious";

export type ColorFamily =
  | "White"
  | "Beige"
  | "Grey"
  | "Black"
  | "Green"
  | "Pink"
  | "Brown"
  | "Blue"
  | "Gold-Yellow"
  | "Multi";

export type FinishType =
  | "Polished"
  | "Honed"
  | "Leathered"
  | "Brushed"
  | "Antique"
  | "Flamed"
  | "Hand-Carved"
  | "Translucent Backlit"
  | "Waterjet Precision";

export type ApplicationArea =
  | "Flooring"
  | "Wall Cladding"
  | "Countertop"
  | "Facade"
  | "Staircase"
  | "Bathroom"
  | "Pooja Room"
  | "Dining & Living"
  | "Furniture"
  | "Feature Wall"
  | "Outdoor";

export type ThicknessOption =
  | "1mm - 2mm (Flexible)"
  | "12mm"
  | "15mm"
  | "18mm"
  | "20mm"
  | "30mm"
  | "Solid Monolithic Block"
  | "Custom Precision Calibrated";

export type VeiningPattern =
  | "Veined"
  | "Cloudy"
  | "Uniform"
  | "Dramatic"
  | "Bookmatch-ready"
  | "Intricate Inlay"
  | "Artisanal Mosaic"
  | "Hand-Sculpted";

export type PriceTier = "tier_1" | "tier_2" | "tier_3" | "on_request";

export type AvailabilityStatus = "In stock" | "Import on request" | "Bespoke Made to Order";

export interface StoneProduct {
  id: string;
  slug: string;
  name: string;
  category: StoneCategory;
  subCategory?: string;
  colorFamily: ColorFamily;
  origin: string;
  finishes: FinishType[];
  applications: ApplicationArea[];
  thicknesses: ThicknessOption[];
  veining: VeiningPattern;
  priceTier: PriceTier;
  availability: AvailabilityStatus;
  primaryImage: string;
  veinCloseUpImage: string;
  galleryImages: string[];
  description: string;
  bestSuitedFor: string[];
  specs: {
    compressiveStrength?: string;
    waterAbsorption?: string;
    density?: string;
    dimensions?: string;
    quarryLocation: string;
    recommendedCare: string;
  };
  pairsWithSlugs?: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  capabilities: string[];
  process: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
}

export interface ApplicationSpace {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  recommendedStones: {
    name: string;
    slug: string;
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  city: string;
  projectScope: string;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  coverImage: string;
  contentHtml: string;
}
