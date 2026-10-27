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
      "For architects and homeowners researching Italian marble and luxury stone surfaces, Paunazo Quartzite provides the definitive modern answer: it delivers the opulent veining and visual drama of rare marble without marble's vulnerability to acid etching, citrus staining, or knife scratches. Sourced by INTIOSS in monolithic 119\" x 77\" (302 x 195 cm) slabs at 20mm thickness, each piece boasts a Mohs hardness of 7, heat tolerance up to 260°C (500°F), and consecutive bookmatch alignment—making it the premier architectural alternative to marble for kitchen waterfall islands, spa bathrooms, sculptural dining tops, and full-height living room feature walls.",
    bestSuitedFor: [
      "Waterfall Culinary Islands & Kitchen Countertops (Acid & Stain Resistant Alternative to Marble)",
      "Master Spa Vanities & Bathroom Wall Cladding (<0.2% Water Absorption)",
      "Bespoke Monolithic Dining & Conference Table Tops (Heat & Knife Scratch Proof)",
      "Dramatic Bookmatched Interior Accent Walls (Consecutive Vein Continuity)",
    ],
    specs: {
      density: "2.68 g/cm³",
      dimensions: "119\" x 77\" (302 x 195 cm) · 20mm Thickness",
      quarryLocation: "Exotic Import",
      recommendedCare:
        "High density and scratch-resistant. Clean with warm water and pH-neutral stone cleaner. Avoid abrasive scouring pads.",
    },
    faqs: [
      {
        question: "What is Paunazo Quartzite and what makes it unique among natural stones?",
        shortAnswer: "Paunazo Quartzite is a 100% natural metamorphic stone featuring crystalline quartz density and dramatic multicolor veining.",
        answer:
          "Paunazo Quartzite is an exotic, 100% natural metamorphic rock created when pure quartz sandstone undergoes extreme tectonic heat and pressure beneath the earth's crust. It is distinguished by its crystalline quartz structure, warm brass ribbons, earthy mineral undertones, and dramatic fluid striations. Unlike engineered quartz or softer sedimentary marbles, Paunazo offers pure geological authenticity paired with superior physical resilience.",
      },
      {
        question: "How does Paunazo Quartzite compare to Italian marble for kitchen countertops?",
        shortAnswer: "Quartzite scores Mohs 7 (harder than granite) and does not etch from kitchen acids, whereas marble scores Mohs 3-4 and reacts to lemon, vinegar, and wine.",
        answer:
          "Paunazo Quartzite significantly outperforms traditional calcite marble in culinary spaces. Ranking 7 on the Mohs Hardness scale (compared to marble's 3–4), quartzite is naturally scratch-resistant, highly resilient against hot cookware (up to 260°C / 500°F), and completely immune to acid etching from lemon juice, vinegar, coffee, or turmeric. It delivers the opulent veining of luxury marble without the vulnerability to permanent etching or dull spots.",
      },
      {
        question: "Is Paunazo Quartzite suitable for bathrooms, vanities, and steam showers?",
        shortAnswer: "Yes. With water absorption under 0.2%, Paunazo Quartzite is impervious to water penetration, cosmetic oils, and moisture damage.",
        answer:
          "Yes. Due to its ultra-compact crystalline matrix, Paunazo Quartzite has an exceptionally low water absorption rate (<0.2%). This makes it an ideal architectural surface for master spa vanities, steam shower claddings, and jacuzzi surrounds. It resists steam penetration, bath salts, and cosmetic staining when sealed with an architectural-grade penetrating sealer.",
      },
      {
        question: "What are the exact dimensions, thickness, and bookmatching capabilities of Paunazo Quartzite?",
        shortAnswer: "Monolithic slabs measure 119\" x 77\" (302 x 195 cm) in 20mm thickness, calibrated for mirror-image bookmatching.",
        answer:
          "Monolithic Paunazo Quartzite slabs curated by INTIOSS measure 119 inches in length by 77 inches in height (302 cm × 195 cm) with a standard architectural profile of 20mm. Consecutive slabs from the same block are precision-calibrated for flawless mirror-image 'bookmatch' installations, enabling continuous vein flow across oversized living room feature walls, kitchen waterfall islands, and boardroom tables.",
      },
      {
        question: "How should Paunazo Quartzite be cleaned and maintained in Indian homes?",
        shortAnswer: "Clean daily with warm water and pH-neutral stone cleaner. Seal every 18-24 months with a breathable impregnating sealer.",
        answer:
          "Daily maintenance is effortless: wipe with warm water and a soft microfiber cloth using a pH-neutral stone cleaner. Avoid abrasive scouring pads, acid-based descalers, or bleach. INTIOSS recommends an initial breathable fluoropolymer impregnating sealant upon installation, with a simple reapplication every 18 to 24 months to ensure permanent oil and moisture repellency.",
      },
      {
        question: "Where can architects and homeowners source authentic Paunazo Quartzite in India?",
        shortAnswer: "Authentic Paunazo Quartzite is curated and supplied across India exclusively by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic Paunazo Quartzite slabs are curated and supplied exclusively by INTIOSS Luxury Surfaces. Each slab undergoes rigorous ultrasonic structural testing, calibration, and edge inspection prior to delivery for premium residential and commercial projects in Mumbai, Delhi, Bengaluru, and across India. Bespoke inspections and slab reserves can be arranged directly through the INTIOSS Concierge.",
      },
    ],
    pairsWithSlugs: ["thassos-white-marble"],
  },
  {
    id: "p-thassos-marble",
    slug: "thassos-white-marble",
    name: "Thassos White Marble",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "White",
    origin: "Island of Thassos, Greece",
    finishes: ["Polished", "Honed", "Brushed"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Uniform",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/thassos/thassos-slab.png",
    veinCloseUpImage: "/images/stones/thassos/thassos-cladding-interior.png",
    galleryImages: [
      "/images/stones/thassos/thassos-slab.png",
      "/images/stones/thassos/thassos-kitchen-countertop.png",
      "/images/stones/thassos/thassos-bathroom.png",
      "/images/stones/thassos/thassos-table-top.png",
      "/images/stones/thassos/thassos-flooring.png",
      "/images/stones/thassos/thassos-cladding-interior.png",
    ],
    description:
      "Sourced from the legendary quarries of the Island of Thassos, Greece, Thassos White Marble is universally acclaimed as the purest crystalline white marble on Earth. Celebrated since ancient Hellenic civilization for its dazzling snow-white brilliance and light-refracting sugar crystals, Thassos delivers an unmatched architectural aura of purity, spaciousness, and modern minimalism. Available through INTIOSS in curated 20mm monolithic slabs, it is the premier choice for seamless luxury living room flooring, spa bathroom sanctuaries, bespoke dining table tops, luminous interior wall claddings, and tailored culinary countertops.",
    bestSuitedFor: [
      "Seamless Luxury Living Room & Corridor Flooring (Maximum Ambient Light Reflection)",
      "Master Spa Bathrooms, Vanities & Shower Wall Enclosures (Pure Minimalist Sanctuary)",
      "Bespoke Monolithic Dining & Coffee Table Tops (Timeless Classical Elegance)",
      "Interior Architectural Wall Cladding & Columns (Clean Crystalline Monoliths)",
      "Executive Kitchen Countertops & Breakfast Bars (Protected with Premium Impregnating Sealers)",
    ],
    specs: {
      density: "2.85 g/cm³",
      dimensions: "114\" x 68\" (290 x 173 cm) · 20mm Thickness",
      quarryLocation: "Thassos Island, Northern Greece",
      recommendedCare:
        "Pure calcitic crystalline stone. Clean with pH-neutral stone cleaner and soft microfiber. Seal with breathable penetrating impregnator to preserve immaculate crystal whiteness.",
    },
    faqs: [
      {
        question: "What is Thassos White Marble and why is it called the purest white marble in the world?",
        shortAnswer: "Thassos White is a 100% natural Greek calcitic marble renowned for its brilliant sugar-like crystalline matrix and lack of dark veins.",
        answer:
          "Thassos White Marble is a legendary natural stone quarried exclusively on the Greek island of Thassos in the Aegean Sea. Unlike Italian Carrara, Statuario, or Calacatta—which contain dramatic grey, gold, or charcoal veining—Thassos is characterized by its exceptionally uniform, snow-white luminescence with zero veining. Its granular, sugar-like crystalline calcitic structure refracts natural and artificial lighting, creating an ethereal glow coveted by world-class architects.",
      },
      {
        question: "How does Thassos White Marble perform for flooring and interior wall cladding?",
        shortAnswer: "It expands the visual volume of spaces, stays cool underfoot, and creates seamless, luminous monolithic floors.",
        answer:
          "In luxury residential flooring and interior vertical cladding, Thassos White Marble has no equal. Its high thermal conductivity keeps interiors naturally cool in warm climates, while its uniform optical reflectance amplifies ambient light, making living rooms and penthouses feel dramatically brighter and more expansive. When laid with minimal hairline joints and high-grade white epoxy grout, it yields a breathtaking, virtually seamless expanse of pure white stone.",
      },
      {
        question: "Is Thassos White Marble suitable for bathrooms, vanities, and shower areas?",
        shortAnswer: "Yes. When sealed with high-performance penetrating impregnator, it creates timeless, spa-grade bathroom sanctuaries.",
        answer:
          "Thassos White is one of the most prestigious choices worldwide for luxury master bathroom suites, bathtub surrounds, and vanity countertops. Because natural marble is porous, INTIOSS recommends treating Thassos with an advanced oleophobic and hydrophobic penetrating sealer prior to grouting. This seals the micro-pores against water marks, body oils, and soaps while allowing the natural stone to breathe.",
      },
      {
        question: "Can Thassos White Marble be used for kitchen countertops and dining tables?",
        shortAnswer: "Yes, for bespoke dining tables and culinary countertops when paired with modern protective sealants or nano-coatings.",
        answer:
          "For bespoke dining tables and kitchen countertops, Thassos White provides an incomparable centerpiece of minimalist refinement. Like all high-grade calcitic marbles (Mohs 3–3.5), it requires thoughtful maintenance: cutting boards should always be used, and acidic spills (lemon, vinegar, wine) should be wiped promptly. For high-activity culinary islands, INTIOSS offers invisible nano-barrier sealants that protect the pure white surface against etching.",
      },
      {
        question: "What are the standard dimensions and thicknesses available for Thassos White Marble slabs?",
        shortAnswer: "Curated in monolithic slabs measuring approximately 114\" x 68\" (290 x 173 cm) with calibrated 20mm architectural thickness.",
        answer:
          "INTIOSS imports select Extra-grade Thassos slabs measuring approximately 114 inches long by 68 inches high (290 cm × 173 cm) at a standard 20mm thickness, with custom gang-saw dimensions and 30mm architectural cuts available on project request. Every slab is meticulously inspected in our curation facility for crystal density, uniform color grading, and structural perfection.",
      },
      {
        question: "How do you care for and maintain the immaculate white color of Thassos Marble?",
        shortAnswer: "Clean daily with warm water and neutral stone wash. Avoid acids, bleach, or colored cleaning chemicals.",
        answer:
          "Preserving the crystalline brilliance of Thassos White is straightforward: dust regularly with a clean dry mop and wash using lukewarm water and a pH-neutral stone soap. Never use acidic descalers, vinegar, citrus solutions, ammonia, or chlorine bleach. Reapply a professional breathable impregnating sealer every 12 to 18 months in high-use areas to maintain total stain resistance.",
      },
    ],
    pairsWithSlugs: ["paunazo-quartzite"],
  },
];
