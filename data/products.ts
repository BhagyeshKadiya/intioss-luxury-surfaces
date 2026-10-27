import { StoneProduct } from "@/lib/types";

export const PRODUCTS: StoneProduct[] = [
  {
    id: "p-paunazo",
    slug: "paunazo-quartzite",
    name: "Paunazo Quartzite",
    category: "Natural Stones",
    subCategory: "Quartzite",
    colorFamily: "Multi",
    origin: "Exotic Quarry",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
      "Feature Wall",
    ],
    thicknesses: ["20mm"],
    veining: "Bookmatch-ready",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/paunazo/paunazo-slab.png",
    veinCloseUpImage: "/images/stones/paunazo/paunazo-feature-wall.png",
    galleryImages: [
      "/images/stones/paunazo/paunazo-slab.png",
      "/images/stones/paunazo/paunazo-kitchen-island.png",
      "/images/stones/paunazo/paunazo-bathroom.png",
      "/images/stones/paunazo/paunazo-table-top.png",
      "/images/stones/paunazo/paunazo-feature-wall.png",
    ],
    description:
      "Paunazo Quartzite is an extraordinarily dramatic, multi-tonal exotic stone showcasing rich mineral veining and crystalline depth. Featuring a magnificent interplay of warm brass accents, earthy undertones, and striking contrasting striations, each monolithic slab pairs supreme hardness and heat resistance with high-aesthetic luxury. Ideal for bespoke kitchen islands, master bath vanities, bookmatched feature claddings, and sculptural dining tops.",
    bestSuitedFor: [
      "Waterfall Culinary Islands & Kitchen Countertops",
      "Master Spa Vanities & Bathroom Wall Cladding",
      "Bespoke Monolithic Dining & Conference Table Tops",
      "Dramatic Bookmatched Interior Accent Walls",
    ],
    specs: {
      density: "2.68 g/cm³",
      dimensions: "119\" x 77\" (302 x 195 cm) · 20mm Thickness",
      quarryLocation: "Exotic Import",
      recommendedCare:
        "High density and scratch-resistant. Clean with warm water and pH-neutral stone cleaner. Avoid abrasive scouring pads.",
    },
    pairsWithSlugs: [],
  },
];
