export type StoneCategory =
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
  | "Flamed";

export type ApplicationArea =
  | "Flooring"
  | "Wall Cladding"
  | "Countertop"
  | "Façade"
  | "Staircase"
  | "Bathroom"
  | "Pooja Room"
  | "Outdoor";

export type ThicknessOption = "12mm" | "15mm" | "18mm" | "20mm" | "30mm";

export type VeiningPattern =
  | "Veined"
  | "Cloudy"
  | "Uniform"
  | "Dramatic"
  | "Bookmatch-ready";

export type PriceTier = "tier_1" | "tier_2" | "tier_3" | "on_request";

export type AvailabilityStatus = "In stock" | "Import on request";

export interface StoneProduct {
  id: string;
  slug: string;
  name: string;
  category: StoneCategory;
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
