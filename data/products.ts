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
    pairsWithSlugs: ["paunazo-quartzite", "golden-statuario-marble"],
  },
  {
    id: "p-golden-statuario",
    slug: "golden-statuario-marble",
    name: "Golden Statuario Marble",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "Gold-Yellow",
    origin: "Carrara, Tuscany, Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Bookmatch-ready",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/golden-statuario/golden-statuario-slab.png",
    veinCloseUpImage: "/images/stones/golden-statuario/golden-statuario-cladding-interior.png",
    galleryImages: [
      "/images/stones/golden-statuario/golden-statuario-slab.png",
      "/images/stones/golden-statuario/golden-statuario-kitchen-countertop.png",
      "/images/stones/golden-statuario/golden-statuario-bathroom.png",
      "/images/stones/golden-statuario/golden-statuario-table-top.png",
      "/images/stones/golden-statuario/golden-statuario-flooring.png",
      "/images/stones/golden-statuario/golden-statuario-cladding-interior.png",
    ],
    description:
      "Directly imported from the premier mountain quarries of Carrara, Italy, Golden Statuario Marble is among the world's most coveted natural stones, fusing the pure milky white crystalline background of classic Statuario with sweeping, dramatic veins of warm amber gold, honey bronze, and soft grey shadow. Sourced by INTIOSS in curated 112\" x 70\" (284 x 178 cm) monolithic slabs at 20mm thickness, its consecutive block quarrying guarantees mirror-image bookmatch vein continuity across expansive luxury floors, culinary islands, master spa bathrooms, executive conference tables, and full-height living room feature walls.",
    bestSuitedFor: [
      "Mirror-Image Bookmatched Accent Walls & Fireplace Surrounds (Symmetrical Gold Vein Flow)",
      "Luxury Master Spa Bathrooms & Bespoke Vanities (Opulent Italian Aesthetic)",
      "Expansive Living Room & Penthouse Flooring (Warm Golden Reflectance)",
      "Sculptural Monolithic Dining & Boardroom Table Tops (Distinctive Vein Artistry)",
      "Chef's Kitchen Waterfall Islands & Backsplashes (Sealed with Premium Impregnators)",
    ],
    specs: {
      density: "2.72 g/cm³",
      dimensions: "112\" x 70\" (284 x 178 cm) · 20mm Thickness",
      quarryLocation: "Carrara, Apuan Alps, Italy",
      recommendedCare:
        "Classic Italian calcitic marble. Clean with pH-neutral stone cleaner and microfiber cloth. Reapply penetrating fluoropolymer sealer annually to protect golden veins against moisture and oils.",
    },
    faqs: [
      {
        question: "What is Golden Statuario Marble and how is it distinct from traditional Statuario or Calacatta?",
        shortAnswer: "Golden Statuario features rare amber-gold and warm bronze ribbons flowing across an immaculate Italian white calcite base.",
        answer:
          "Golden Statuario Marble is an ultra-rare geological variation extracted from select veins in the Carrara region of Tuscany, Italy. While standard Statuario features cool slate-grey and charcoal veining, Golden Statuario develops natural iron and mineral infusions that produce luminous golden-honey, amber, and champagne ribbons. It combines the structural purity of white Italian marble with the warm, opulent resonance typically sought in Calacatta Gold.",
      },
      {
        question: "Can Golden Statuario slabs be bookmatched for symmetrical wall cladding?",
        shortAnswer: "Yes. INTIOSS curates consecutive slabs from the same quarry block specifically cut and polished for mirror-image bookmatch alignment.",
        answer:
          "Yes. INTIOSS exclusively curates Golden Statuario in consecutive sequence slabs (Block Pairs A and B). The prominent golden veins mirror each other across adjacent panels to create monumental symmetrical patterns—such as butterfly, diamond, or bookmatch flows—making it the benchmark choice for living room feature walls, double-height lobby claddings, and luxury fireplace surrounds.",
      },
      {
        question: "Which interior spaces benefit most from Golden Statuario Marble?",
        shortAnswer: "High-visibility focal zones: bookmatched accent walls, master spa vanities, dining table tops, and expansive living room flooring.",
        answer:
          "Golden Statuario is designed for high-impact architectural spaces. It excels on expansive living room and penthouse floors where its golden warmth softens minimalist interiors. In master bathrooms, it creates five-star hotel sanctuary vanities, freestanding tub backdrops, and bookmatched shower walls. It is also extensively specified for custom monolithic dining tables and executive boardroom centerpieces.",
      },
      {
        question: "How does Golden Statuario perform for kitchen countertops and waterfall islands?",
        shortAnswer: "Ideal for statement islands when protected with high-grade oleophobic sealers or specialized marble surface barriers.",
        answer:
          "When installed on culinary islands and kitchen backsplashes, Golden Statuario creates unmatched visual drama. Because it is a natural calcitic stone (Mohs 3–3.5), it requires standard luxury marble care: wipe acidic spills (citrus, tomato, wine) promptly. INTIOSS applies advanced penetrating nano-sealers that bond deep within the stone pores to provide robust stain and oil repellency.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Golden Statuario?",
        shortAnswer: "Monolithic slabs measure 112\" x 70\" (284 x 178 cm) with a standard architectural profile of 20mm.",
        answer:
          "Curated Golden Statuario slabs measure 112 inches in length by 70 inches in height (284 cm × 178 cm) with a calibrated 20mm thickness. Custom slab dimensions, 30mm profiles, and precision waterjet cut-to-size packages are available upon request for architectural projects across India.",
      },
      {
        question: "Where can architects and homeowners source authentic Italian Golden Statuario in India?",
        shortAnswer: "Authentic Golden Statuario slabs are imported and curated exclusively by INTIOSS Luxury Surfaces.",
        answer:
          "INTIOSS Luxury Surfaces imports and verifies authentic Italian Golden Statuario directly from Carrara quarries. Each slab is cataloged with provenance documentation, ultrasonically inspected for structural soundness, and dry-laid for dry-match visualization prior to dispatch to Mumbai, Delhi, Bengaluru, and pan-India sites.",
      },
    ],
    pairsWithSlugs: ["paunazo-quartzite", "thassos-white-marble", "statuario-marble"],
  },
  {
    id: "p-statuario",
    slug: "statuario-marble",
    name: "Statuario Marble",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "White",
    origin: "Carrara, Tuscany, Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["18mm"],
    veining: "Bookmatch-ready",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/statuario/statuario-slab.png",
    veinCloseUpImage: "/images/stones/statuario/statuario-cladding-interior.png",
    galleryImages: [
      "/images/stones/statuario/statuario-slab.png",
      "/images/stones/statuario/statuario-kitchen-countertop.png",
      "/images/stones/statuario/statuario-bathroom.png",
      "/images/stones/statuario/statuario-table-top.png",
      "/images/stones/statuario/statuario-flooring.png",
      "/images/stones/statuario/statuario-cladding-interior.png",
    ],
    description:
      "Directly quarried from the high-altitude mountain quarries of Carrara, Italy, Statuario Marble is the timeless crown jewel of classical architecture and contemporary luxury design. Revered for its brilliant milk-white crystalline canvas intersected by bold, dramatic black and charcoal-grey veins, Statuario creates an unmatched sense of grandeur and monochromatic black and white sophistication. Sourced by INTIOSS in monolithic 115\" x 75\" (292 x 191 cm) slabs at 18mm thickness (Lot 6415A), each consecutive block pair is calibrated for mirror-image bookmatch vein continuity—rendering it the premier choice for monumental living room flooring, master spa bathroom sanctuaries, bespoke dining table centerpieces, culinary waterfall islands, and double-height interior feature walls.",
    bestSuitedFor: [
      "Mirror-Image Bookmatched Accent Walls & Double-Height Atriums (Symmetrical Black & White Vein Artistry)",
      "Five-Star Master Spa Bathrooms, Bathtub Surrounds & Vanities (Timeless Carrara Luxury)",
      "Monolithic Living Room & Penthouse Flooring (Dazzling White Reflectance with Charcoal Contrast)",
      "Sculptural Bespoke Dining & Executive Boardroom Tables (Statement Natural Art)",
      "Chef's Kitchen Waterfall Countertops & Backsplashes (Protected with Breathable Penetrating Impregnators)",
    ],
    specs: {
      density: "2.71 g/cm³",
      dimensions: "115\" x 75\" (292 x 191 cm) · 18mm Thickness",
      quarryLocation: "Carrara, Apuan Alps, Tuscany, Italy · Lot 6415A",
      recommendedCare:
        "Classic Italian calcitic marble. Clean with pH-neutral stone cleaner and microfiber cloth. Avoid acidic cleaners. Reapply penetrating fluoropolymer sealer periodically to preserve immaculate white crystalline brightness.",
    },
    faqs: [
      {
        question: "What is authentic Italian Statuario Marble and why is it considered the apex of white marble?",
        shortAnswer: "Statuario is the rarest, most prized white Italian marble, quarried high in the Carrara mountains and distinguished by its pure white field and bold black-grey veins.",
        answer:
          "Authentic Statuario Marble is quarried exclusively in the upper mountain regions of Carrara in Tuscany, Italy. Unlike common Carrara marble—which has a greyish background and subtle feathery veining—Statuario features an exceptionally bright, pure milk-white background intersected by bold, commanding veins in dark grey, charcoal, and black. Limited quarry yield and historical prestige make it the gold standard of luxury architecture worldwide.",
      },
      {
        question: "What is the difference between Statuario, Calacatta, and Carrara marble?",
        shortAnswer: "Statuario has a pure white background with bold dark grey/black veins; Calacatta has warmer gold/taupe tones; Carrara is softer grey with muted feather veins.",
        answer:
          "While all three originate from the Apuan Alps of Italy, their aesthetics and rarity differ substantially: Bianco Carrara is the most abundant, featuring a soft greyish-white base with fine misty veins. Calacatta features an ivory-white field with thick, dramatic veins that frequently carry warm gold, beige, or bronze undertones. Statuario is the rarest and purest: it possesses the brightest white crystalline background with sharp, high-contrast charcoal and black veining, delivering an iconic monochromatic look.",
      },
      {
        question: "Can Statuario marble slabs be bookmatched for symmetrical wall cladding?",
        shortAnswer: "Yes. INTIOSS imports consecutive slabs cut and polished from the same block to achieve perfect mirror-image bookmatch symmetry.",
        answer:
          "Yes. Statuario is universally celebrated for bookmatching. When consecutive slabs (cut in alternating sequence) are laid side-by-side, the bold black and charcoal veins mirror each other to create mesmerizing geometric and organic patterns—including butterfly, bookmatch, and diamond motifs. This makes Statuario the preferred choice for living room feature walls, luxury fireplace facades, and double-height entrance lobbies.",
      },
      {
        question: "How does Statuario marble perform for flooring, bathroom vanities, and kitchen countertops?",
        shortAnswer: "Exceptional for flooring and master bathrooms; ideal for culinary islands when treated with advanced penetrating sealers.",
        answer:
          "On residential floors and interior wall claddings, Statuario creates a palace-like atmosphere, staying naturally cool and reflecting abundant ambient light. In master spa bathrooms, its pure white background and moisture resilience make it ideal for floating vanities, shower walls, and custom stone bathtubs. For culinary islands and dining tables, INTIOSS applies state-of-the-art penetrating oleophobic nano-sealers to protect the marble against stains while retaining its natural honed or polished texture.",
      },
      {
        question: "What are the exact slab dimensions and thickness for INTIOSS Statuario slabs?",
        shortAnswer: "Monolithic slabs measure 115\" x 75\" (292 x 191 cm) with an architectural profile of 18mm (Lot 6415A).",
        answer:
          "Curated Statuario slabs measure 115 inches in length by 75 inches in height (292 cm × 191 cm) at an architectural 18mm thickness (Lot 6415A). Gang-saw calibration ensures absolute planar accuracy, seamless joint alignment, and uniform edge finishing. Custom architectural thicknesses and cut-to-size packages are available on project request.",
      },
      {
        question: "How should Statuario marble surfaces be sealed, cleaned, and maintained?",
        shortAnswer: "Wipe daily with warm water and pH-neutral stone soap. Protect with penetrating impregnating sealer and avoid all acidic solutions.",
        answer:
          "Daily care is simple: wipe with a soft microfiber cloth and lukewarm water with a pH-neutral stone cleaner. Because all natural calcitic marbles are sensitive to acids, never use vinegar, lemon juice, bathroom descalers, or bleach. INTIOSS recommends an initial deep-penetrating breathable sealer followed by a routine resealing every 12 to 18 months to ensure lasting stain and moisture resistance.",
      },
    ],
    pairsWithSlugs: ["statuario-rb4384-marble", "golden-statuario-marble", "super-spider-marble", "montano-pulchiano-marble"],
  },
  {
    id: "p-statuario-rb4384",
    slug: "statuario-rb4384-marble",
    name: "Statuario Marble (Lot RB-4384)",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "White",
    origin: "Carrara, Tuscany, Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Bookmatch-ready",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/statuario-rb4384/statuario-rb4384-slab.png",
    veinCloseUpImage: "/images/stones/statuario-rb4384/statuario-rb4384-cladding-interior.png",
    galleryImages: [
      "/images/stones/statuario-rb4384/statuario-rb4384-slab.png",
      "/images/stones/statuario-rb4384/statuario-rb4384-kitchen-countertop.png",
      "/images/stones/statuario-rb4384/statuario-rb4384-bathroom.png",
      "/images/stones/statuario-rb4384/statuario-rb4384-table-top.png",
      "/images/stones/statuario-rb4384/statuario-rb4384-flooring.png",
      "/images/stones/statuario-rb4384/statuario-rb4384-cladding-interior.png",
    ],
    description:
      "Directly quarried from the premier high-altitude reserves of Carrara, Tuscany, Italy, Statuario Marble (Lot RB-4384) represents the ultimate expression of Italian architectural drama. Characterized by a high-contrast black and white palette, bold graphite-black and deep charcoal veining cuts decisively across a pristine, crystalline milk-white canvas. Precision-quarried in monolithic 100\" x 71\" (254 x 180 cm) slabs at a solid 20mm thickness, Lot RB-4384 is bookmatch-ready for mirror-image symmetry—making it the benchmark selection for luxury living room flooring, master spa bathroom sanctuaries, bespoke dining table tops, culinary waterfall islands, and bookmatched interior wall cladding.",
    bestSuitedFor: [
      "Symmetrical Bookmatched Interior Cladding & Feature Walls (High-Contrast Black & White Vein Artistry)",
      "Five-Star Master Spa Bathrooms & Bespoke Floating Vanities (Opulent Carrara Crystalline Background)",
      "Expansive Monolithic Living Room & Penthouse Flooring (Dazzling Ambient Reflectance with Charcoal Drama)",
      "Sculptural Bespoke Dining & Executive Boardroom Table Tops (20mm Calibrated Solid Slab Profile)",
      "Chef's Kitchen Waterfall Countertops & Backsplashes (Protected with Breathable Penetrating Impregnators)",
    ],
    specs: {
      density: "2.71 g/cm³",
      dimensions: "100\" x 71\" (254 x 180 cm) · 20mm Thickness",
      quarryLocation: "Carrara, Apuan Alps, Tuscany, Italy · Lot RB-4384",
      recommendedCare:
        "Calcitic Carrara marble with high-contrast black veining. Clean with pH-neutral stone cleaner and soft microfiber. Seal with premium breathable penetrating impregnator to protect against acidic etching and maintain natural luster.",
    },
    faqs: [
      {
        question: "What distinguishes Statuario Marble Lot RB-4384 from standard white marbles?",
        shortAnswer: "Lot RB-4384 features high-contrast, bold black and graphite veining sweeping over a pure milk-white Carrara crystalline field.",
        answer:
          "Quarried in the renowned Apuan Alps of Carrara, Italy, Statuario Lot RB-4384 is celebrated for its rare high-contrast black and white visual power. While standard Carrara marbles exhibit soft muted grey feathering, Lot RB-4384 delivers pronounced, sweeping ribbons of deep charcoal and raven black against a brilliant milk-white calcitic background, providing immediate architectural presence.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Statuario Lot RB-4384?",
        shortAnswer: "Monolithic slabs measure 100\" x 71\" (254 x 180 cm) in an architectural 20mm thickness.",
        answer:
          "Monolithic slabs of Statuario Lot RB-4384 measure 100 inches in length by 71 inches in height (254 cm × 180 cm) with a solid 20mm thickness. Calibrated with diamond-gang saws for planar uniformity, this 20mm profile provides ideal structural substance for mitered edge fabrication, expansive floorplate cutting, and full-slab wall installation.",
      },
      {
        question: "Can Statuario Lot RB-4384 slabs be bookmatched for interior wall cladding?",
        shortAnswer: "Yes. Slabs are quarried and polished in consecutive block pairs specifically for mirror-image bookmatching.",
        answer:
          "Yes. INTIOSS curates Statuario Lot RB-4384 in consecutive sequence pairs (Block Pairs A and B). When mounted side-by-side, the bold black veins mirror each other across the central seam to form dramatic butterfly and diamond patterns, making it the premier choice for double-height foyer accent walls, living room feature claddings, and luxury fireplace surrounds.",
      },
      {
        question: "How does this 20mm Statuario marble perform for flooring and master bathrooms?",
        shortAnswer: "Its dense calcitic matrix and brilliant reflectance keep floors cool, luminous, and spa-grade luxurious.",
        answer:
          "In luxury residences and penthouses, 20mm Statuario flooring provides thermal cooling and magnificent light reflectance under natural sunlight. For master bathrooms, vanity tops, and steam shower surrounds, the dense crystalline stone creates an opulent boutique-hotel sanctuary when protected with an architectural breathable penetrating sealant.",
      },
      {
        question: "Is Statuario Lot RB-4384 suitable for kitchen countertops and dining table tops?",
        shortAnswer: "Yes. It creates a sculptural statement island or dining table when maintained with proper penetrating sealers.",
        answer:
          "Yes. Statuario Lot RB-4384 makes a breathtaking culinary waterfall island or bespoke dining table. As with all genuine Italian marbles, wiping acidic spills (citrus, vinegar, red wine) promptly and applying a penetrating oleophobic nano-sealer safeguards the polished marble luster for decades of refined living.",
      },
      {
        question: "Where can architects and designers source authentic Statuario Lot RB-4384 in India?",
        shortAnswer: "Curated and supplied exclusively across India by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic Statuario Lot RB-4384 slabs are curated and supplied directly by INTIOSS Luxury Surfaces. Each slab includes provenance verification, ultrasonic structural scanning, and pre-dispatch inspection for turnkey delivery to Mumbai, Delhi, Bengaluru, Hyderabad, and nationwide luxury projects.",
      },
    ],
    pairsWithSlugs: ["statuario-marble", "statuario-rb599a-marble", "golden-statuario-marble", "thassos-white-marble"],
  },
  {
    id: "p-statuario-rb599a",
    slug: "statuario-rb599a-marble",
    name: "Statuario Marble (Lot RB599A)",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "White",
    origin: "Carrara, Tuscany, Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Bookmatch-ready",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/statuario-rb599a/statuario-rb599a-slab.png",
    veinCloseUpImage: "/images/stones/statuario-rb599a/statuario-rb599a-cladding-interior.png",
    galleryImages: [
      "/images/stones/statuario-rb599a/statuario-rb599a-slab.png",
      "/images/stones/statuario-rb599a/statuario-rb599a-kitchen-countertop.png",
      "/images/stones/statuario-rb599a/statuario-rb599a-bathroom.png",
      "/images/stones/statuario-rb599a/statuario-rb599a-table-top.png",
      "/images/stones/statuario-rb599a/statuario-rb599a-flooring.png",
      "/images/stones/statuario-rb599a/statuario-rb599a-cladding-interior.png",
    ],
    description:
      "Directly extracted from the high-altitude quarries of Carrara, Tuscany, Italy, Statuario Marble (Lot RB599A) represents an extraordinary architectural monumental lot. Presenting a dramatic black and white palette, bold charcoal ribbons and sweeping graphite veins flow with monumental power across a crystalline milk-white background. Calibrated in expansive 125\" x 77\" (318 x 196 cm) monolithic slabs at an architectural 20mm thickness, Lot RB599A is bookmatch-ready for mirror-image symmetry—making it the benchmark selection for luxury living room flooring, master spa bathroom sanctuaries, bespoke dining table centerpieces, culinary waterfall islands, and bookmatched interior wall cladding.",
    bestSuitedFor: [
      "Symmetrical Bookmatched Interior Cladding & Feature Walls (Monumental Black & White Vein Artistry)",
      "Five-Star Master Spa Bathrooms & Floating Vanities (High-Reflectance Carrara Crystalline Base)",
      "Expansive Monolithic Living Room & Penthouse Flooring (Dazzling 125\" Format with Charcoal Contrast)",
      "Sculptural Bespoke Dining & Boardroom Table Tops (20mm Calibrated Solid Slab Profile)",
      "Chef's Kitchen Waterfall Countertops & Islands (Protected with Breathable Penetrating Impregnators)",
    ],
    specs: {
      density: "2.71 g/cm³",
      dimensions: "125\" x 77\" (318 x 196 cm) · 20mm Thickness",
      quarryLocation: "Carrara, Apuan Alps, Tuscany, Italy · Lot RB599A",
      recommendedCare:
        "Calcitic Carrara marble with high-contrast black veining. Clean with pH-neutral stone cleaner and soft microfiber. Seal with premium breathable penetrating impregnator to protect against acidic etching and preserve natural gloss.",
    },
    faqs: [
      {
        question: "What distinguishes Statuario Marble Lot RB599A from other Statuario slabs?",
        shortAnswer: "Lot RB599A features oversized 125\" x 77\" monolithic dimensions paired with high-contrast black and charcoal veining.",
        answer:
          "Quarried from the premier Apuan Alps reserves in Carrara, Italy, Statuario Lot RB599A is distinguished by its monumental slab scale of 125\" x 77\" (318 x 196 cm). Its sweeping black and graphite ribbons create exceptional dramatic contrast against a pure milk-white calcitic ground, enabling grand continuous installations across large luxury residential spaces.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Statuario Lot RB599A?",
        shortAnswer: "Monolithic slabs measure 125\" x 77\" (318 x 196 cm) at an architectural 20mm thickness.",
        answer:
          "Monolithic slabs of Statuario Lot RB599A measure 125 inches in length by 77 inches in height (318 cm × 196 cm) with a substantial 20mm profile. This grand format minimizes joint lines across expansive flooring layouts, double-height feature walls, and oversized single-slab kitchen islands.",
      },
      {
        question: "Can Statuario Lot RB599A slabs be bookmatched for interior wall cladding?",
        shortAnswer: "Yes. Slabs are quarried and calibrated in consecutive block sequence for mirror-image bookmatching.",
        answer:
          "Yes. INTIOSS curates Statuario Lot RB599A in consecutive block sequence pairs (Block Pairs A and B). When installed side-by-side, the bold black veins mirror each other seamlessly to create stunning butterfly, diamond, or bookmatched focal murals for living rooms, executive boardrooms, and grand foyers.",
      },
      {
        question: "How does Statuario Lot RB599A perform for flooring and master bathrooms?",
        shortAnswer: "Its dense calcitic matrix and bright crystalline reflectance create cool, luminous, and spa-grade surfaces.",
        answer:
          "In luxury penthouses and villas, 20mm Statuario flooring provides thermal cooling and magnificent light reflectance under ambient sunlight. For master bathrooms, vanity counters, and walk-in shower surrounds, the dense crystalline stone creates an opulent boutique-hotel sanctuary when protected with a breathable penetrating sealant.",
      },
      {
        question: "Is Statuario Lot RB599A suitable for kitchen countertops and dining table tops?",
        shortAnswer: "Yes. It creates a sculptural statement island or dining table when maintained with proper penetrating sealers.",
        answer:
          "Yes. With a substantial 20mm thickness and generous 125\" length, Statuario Lot RB599A makes a breathtaking culinary waterfall island or bespoke monolithic dining table. Standard marble maintenance applies: wipe spills promptly and utilize trivets under hot cookware.",
      },
      {
        question: "Where can architects and designers source authentic Statuario Lot RB599A in India?",
        shortAnswer: "Curated and supplied exclusively across India by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic Statuario Lot RB599A slabs are curated and supplied directly by INTIOSS Luxury Surfaces. Each slab includes provenance certification, ultrasonic structural scanning, and pre-dispatch inspection for turnkey delivery to Mumbai, Delhi, Bengaluru, Hyderabad, and nationwide luxury projects.",
      },
    ],
    pairsWithSlugs: ["statuario-marble", "statuario-rb4384-marble", "golden-statuario-marble", "michael-angelo-marble"],
  },
  {
    id: "p-super-spider",
    slug: "super-spider-marble",
    name: "Super Spider Marble",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "White",
    origin: "Mediterranean Basin",
    finishes: ["Polished", "Honed"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["16mm"],
    veining: "Dramatic",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/super-spider/super-spider-slab.png",
    veinCloseUpImage: "/images/stones/super-spider/super-spider-cladding-interior.png",
    galleryImages: [
      "/images/stones/super-spider/super-spider-slab.png",
      "/images/stones/super-spider/super-spider-kitchen-countertop.png",
      "/images/stones/super-spider/super-spider-bathroom.png",
      "/images/stones/super-spider/super-spider-table-top.png",
      "/images/stones/super-spider/super-spider-flooring.png",
      "/images/stones/super-spider/super-spider-cladding-interior.png",
    ],
    description:
      "Distinguished by an electrifying network of fine, intersecting amber-gold, bronze, and charcoal-grey web-like veins coursing across an immaculate crystalline white backdrop, Super Spider Marble is an extraordinary natural stone masterpiece. Its distinctive webbed or spider-matrix motif delivers a striking three-dimensional visual depth that captivates architects and interior connoisseurs alike. Sourced in custom 77\" x 48\" (196 x 122 cm) slabs at a refined 16mm profile, Super Spider offers lightweight structural advantages without sacrificing monolithic luxury—making it the ideal selection for expansive living room floorings, luminous master bathroom vanity enclaves, bespoke coffee and dining tables, statement kitchen countertops, and sculptural interior cladding facades.",
    bestSuitedFor: [
      "Luxury Residential Flooring & Hallways (Dynamic Interlocking Spider Vein Symmetry)",
      "Master Bathroom Spa Sanctuaries & Floating Vanities (High-Reflectance White Crystalline Ground)",
      "Architectural Feature Cladding & Fireplace Lounges (Striking Geometric Web Motif)",
      "Curated Marble Dining & Center Table Tops (Captivating Natural Art)",
      "Contemporary Kitchen Islands & Countertops (Refined 16mm Slab Calibration)",
    ],
    specs: {
      density: "2.68 g/cm³",
      dimensions: "77\" x 48\" (196 x 122 cm) · 16mm Thickness",
      quarryLocation: "Mediterranean Mountain Formations",
      recommendedCare:
        "Calcitic natural marble with crystalline matrix. Clean using pH-neutral gentle stone cleaners. Seal with breathable penetrating impregnator to protect against staining while highlighting delicate webbed veins.",
    },
    faqs: [
      {
        question: "What defines Super Spider Marble and why is its veining pattern so unique?",
        shortAnswer: "Super Spider is famous for its intricate, spiderweb-like network of bronze and charcoal veins branching over a luminous white crystalline background.",
        answer:
          "Super Spider Marble gets its evocative name from the delicate, hyper-detailed web of fine veins that crisscross its snowy white surface. Unlike conventional linear or cloud-veined marbles, Super Spider features multidirectional fractals and gossamer webs of golden-bronze, taupe, and deep charcoal. This creates a mesmerizing textural illusion of depth and movement, making every slab an abstract geometric artwork created by centuries of natural geological pressure.",
      },
      {
        question: "What are the structural and installation advantages of the 16mm slab thickness?",
        shortAnswer: "The 16mm profile reduces dead weight by ~20% compared to 20mm slabs, facilitating easier elevator transit and lower structural loading.",
        answer:
          "At 16mm thickness, Super Spider slabs offer an optimized strength-to-weight ratio. The reduced mass makes handling, vertical crane transport, and high-rise installation significantly safer and faster while adhering to architectural dead-load constraints for suspended floors and floating vanities. Despite the sleeker profile, modern resin-reinforced backing ensures exceptional flexural strength and crack resistance.",
      },
      {
        question: "How does Super Spider marble perform across flooring and bathroom environments?",
        shortAnswer: "Excellent thermal conductivity and light reflectance make it premier for radiant floor heating and luxurious wet areas.",
        answer:
          "In flooring installations, the stone's bright white crystalline base reflects sunlight across interior spaces, keeping rooms naturally cool and luminous. The interlocking vein network also conceals everyday dust and minor surface marks better than solid monochrome whites. In bathrooms, polished or honed Super Spider creates a boutique hotel ambience, particularly when paired with warm brass or matte black plumbing fixtures.",
      },
      {
        question: "Can Super Spider Marble be used for kitchen countertops and dining table tops?",
        shortAnswer: "Yes. Treated with premium penetrating oleophobic sealers, it serves as a stunning dining table or culinary island centerpiece.",
        answer:
          "Yes. Super Spider makes a spectacular statement island or sculptural dining table. As with all fine calcitic marbles, it should be protected with a high-grade fluoropolymer impregnating sealer prior to handover. Trivets should be used under hot cookware and cutting boards should be utilized during meal prep to safeguard the pristine polished luster.",
      },
      {
        question: "What are the exact slab dimensions and finishes available for Super Spider Marble?",
        shortAnswer: "Slabs measure 77\" x 48\" (196 x 122 cm) at 16mm thickness, available in high-gloss Polished and smooth Honed finishes.",
        answer:
          "INTIOSS maintains curated lots of Super Spider slabs measuring 77 inches in length by 48 inches in height (196 cm × 122 cm) with a 16mm thickness. Finishes include a glass-like High Polish that accentuates the depth of the spider veins, and an organic Honed matte finish that diffuses lighting softly for minimalist interiors.",
      },
      {
        question: "How should Super Spider Marble be maintained to keep its pristine white luster?",
        shortAnswer: "Use a damp microfiber cloth with pH-neutral stone wash daily. Re-seal every 12 to 18 months and clean spills immediately.",
        answer:
          "Maintenance is effortless when following basic stone care protocols: wipe surfaces with a microfiber cloth and water mixed with a pH-neutral cleaner. Never apply abrasive scouring pads, vinegar, citrus-based solutions, or harsh bathroom chemicals. Periodically testing water droplet beading indicates when a fresh coat of penetrating sealer should be applied.",
      },
    ],
    pairsWithSlugs: ["statuario-marble", "golden-statuario-marble", "montano-pulchiano-marble"],
  },
  {
    id: "p-montano-pulchiano",
    slug: "montano-pulchiano-marble",
    name: "Montano Pulchiano Marble (Lot 87206)",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "Multi",
    origin: "Tuscany / Northern Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Dramatic",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/montano-pulchiano/montano-pulchiano-slab.png",
    veinCloseUpImage: "/images/stones/montano-pulchiano/montano-pulchiano-cladding-interior.png",
    galleryImages: [
      "/images/stones/montano-pulchiano/montano-pulchiano-slab.png",
      "/images/stones/montano-pulchiano/montano-pulchiano-kitchen-countertop.png",
      "/images/stones/montano-pulchiano/montano-pulchiano-bathroom.png",
      "/images/stones/montano-pulchiano/montano-pulchiano-table-top.png",
      "/images/stones/montano-pulchiano/montano-pulchiano-flooring.png",
      "/images/stones/montano-pulchiano/montano-pulchiano-cladding-interior.png",
    ],
    description:
      "Montano Pulchiano Marble (Lot 87206) is a rare, dramatically evocative polychrome stone quarried from exclusive European geological reserves. Renowned for its rich multicolored tapestry combining earthy rust, warm ochre, smoky charcoal, olive-tinted veins, and soft alabaster clouds, Montano Pulchiano commands attention as a living canvas of geological history. Formatted in generous 93\" x 58\" (236 x 147 cm) slabs with a substantial 20mm thickness (Lot 87206), it introduces warmth, depth, and opulent character to high-end residential and hospitality environments. It is exquisitely suited for monolithic living room flooring, dramatic feature wall cladding, spa-grade bathroom retreats, bespoke statement dining tables, and chef-curated culinary islands.",
    bestSuitedFor: [
      "Monolithic Architectural Cladding & Living Room Accent Walls (Vibrant Multicolored Geological Veining)",
      "Statement Kitchen Islands & Waterfall Countertops (Rich Earth Tones & Superior Durability)",
      "Opulent Master Bathroom Suites & Floating Vanities (Spa-Like Warmth & Contrast)",
      "Luxury Residence & Penthouse Flooring (Warm Ambient Tone with Rich Natural Depth)",
      "Custom Sculptural Dining, Boardroom & Cocktail Tables (One-of-a-Kind Polychrome Natural Centerpiece)",
    ],
    specs: {
      density: "2.72 g/cm³",
      dimensions: "93\" x 58\" (236 x 147 cm) · 20mm Thickness",
      quarryLocation: "Apuan Alps / Northern Italian Reserves · Lot 87206",
      recommendedCare:
        "Dense calcitic polychrome marble. Daily cleaning with damp microfiber cloth and pH-balanced stone soap. Re-treat annually with high-performance penetrating sealant to enrich multicolored depth and protect against moisture.",
    },
    faqs: [
      {
        question: "What makes Montano Pulchiano Marble a premier multicolored natural stone?",
        shortAnswer: "Montano Pulchiano stands out for its complex chromatic palette of rust, ochre, charcoal, and warm cream formed over millennia.",
        answer:
          "Unlike monochromatic white or black marbles, Montano Pulchiano is an expressive polychrome stone. Its surface displays intricate mineral transitions—where iron oxides yield warm terracotta and golden-ochre bands, while silicate layers produce smoky charcoal and sage-olive currents against soft cream stone. This rich spectrum complements both contemporary neutral palettes and lavish walnut or bronze architectural finishes.",
      },
      {
        question: "Where is Montano Pulchiano best utilized in luxury interior architecture?",
        shortAnswer: "Ideal for feature walls, large-format living room floors, waterfall kitchen islands, and bespoke dining tables.",
        answer:
          "Due to its bold multicolored personality, Montano Pulchiano is frequently specified as the focal anchor of a room. On full-height fireplace walls or foyer cladding, it acts as a dramatic fine art installation. As a waterfall kitchen island or monolithic conference table, its diverse palette naturally harmonizes with warm woods, brushed brass, champagne gold, and dark fluted millwork.",
      },
      {
        question: "What are the dimensions and thickness of INTIOSS Montano Pulchiano Lot 87206 slabs?",
        shortAnswer: "Monolithic slabs measure 93\" x 58\" (236 x 147 cm) at an architectural 20mm thickness (Lot 87206).",
        answer:
          "Each slab measures 93 inches in length by 58 inches in height (236 cm × 147 cm) with a standard 20mm (3/4\") thickness (Lot 87206). This substantial profile ensures robust structural integrity for mitered edge waterfall islands, cantilevered vanities, and expansive floor tile cutting schedules.",
      },
      {
        question: "How does Montano Pulchiano perform in bathrooms and wet areas?",
        shortAnswer: "Its dense mineral structure makes it highly durable for vanity counters, shower walls, and custom soaker tubs when sealed.",
        answer:
          "Montano Pulchiano possesses low porosity and high compressive strength compared to porous sedimentary stones. In luxury bathrooms, it provides a warm, spa-like atmosphere that resists moisture penetration when sealed with a breathable fluorochemical impregnator. Soap scum and mineral residue are easily cleaned with pH-neutral solutions.",
      },
      {
        question: "Which finishes best highlight the multicolored veins of Montano Pulchiano?",
        shortAnswer: "Polished finish maximizes chromatic vibrancy; Leathered adds an organic tactile dimensionality to the veins.",
        answer:
          "INTIOSS offers Montano Pulchiano in three distinct surface finishes: High Polish, which delivers mirror-like gloss and maximum color saturation; Honed, which creates a velvety matte surface free of glare; and Leathered, a textured technique that follows the natural hardness variations in the veining to create a tactile, antique feel underfoot or to the touch.",
      },
      {
        question: "What is the recommended cleaning and maintenance regimen?",
        shortAnswer: "Clean with pH-neutral stone soap and soft microfiber. Avoid acids and abrasive cleaners; seal annually.",
        answer:
          "Preserving Montano Pulchiano's natural beauty requires minimal effort: dust mop floors regularly and wipe counters with warm water and a neutral stone cleaner. Never use acid-based toilet cleaners, vinegar, or citrus sprays on the surface. Re-applying a penetrating sealer once a year ensures complete barrier protection against wine, coffee, or oil absorption.",
      },
    ],
    pairsWithSlugs: ["montano-pulchiano-86978-marble", "golden-statuario-marble", "statuario-marble", "michael-angelo-marble"],
  },
  {
    id: "p-montano-pulchiano-86978",
    slug: "montano-pulchiano-86978-marble",
    name: "Montano Pulchiano Marble (Lot 86978)",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "Multi",
    origin: "Tuscany / Northern Italy",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Dramatic",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-slab.png",
    veinCloseUpImage: "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-cladding-interior.png",
    galleryImages: [
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-slab.png",
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-kitchen-countertop.png",
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-bathroom.png",
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-table-top.png",
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-flooring.png",
      "/images/stones/montano-pulchiano-86978/montano-pulchiano-86978-cladding-interior.png",
    ],
    description:
      "Directly sourced from exclusive North Italian geological reserves, Montano Pulchiano Marble (Lot 86978) presents an extraordinary multicolour tapestry of earth tones, russet red, golden ochre, smoky charcoal ribbons, and warm alabaster clouds. Formatted in expansive 96\" x 56\" (244 x 142 cm) monolithic slabs at a substantial 20mm thickness, Lot 86978 offers commanding architectural presence with rich polychromatic complexity. It is exquisitely suited for monolithic living room flooring, dramatic feature wall cladding, spa-grade bathroom retreats, bespoke statement dining tables, and chef-curated culinary waterfall islands.",
    bestSuitedFor: [
      "Monolithic Architectural Cladding & Living Room Accent Walls (Vibrant Multicolour Geological Veining)",
      "Statement Kitchen Islands & Waterfall Countertops (Rich Earth Tones & Superior Durability)",
      "Opulent Master Bathroom Suites & Floating Vanities (Spa-Like Warmth & Contrast)",
      "Luxury Residence & Penthouse Flooring (Warm Ambient Tone with Rich Natural Depth)",
      "Custom Sculptural Dining, Boardroom & Cocktail Tables (One-of-a-Kind Polychrome Natural Centerpiece)",
    ],
    specs: {
      density: "2.72 g/cm³",
      dimensions: "96\" x 56\" (244 x 142 cm) · 20mm Thickness",
      quarryLocation: "Apuan Alps / Northern Italian Reserves · Lot 86978",
      recommendedCare:
        "Dense calcitic polychrome marble. Daily cleaning with damp microfiber cloth and pH-balanced stone soap. Re-treat annually with high-performance penetrating sealant to enrich multicolored depth and protect against moisture.",
    },
    faqs: [
      {
        question: "What makes Montano Pulchiano Marble Lot 86978 unique?",
        shortAnswer: "Lot 86978 features an expansive 96\" x 56\" format with rich polychromatic earthy rust, charcoal, and warm ochre veining.",
        answer:
          "Unlike monochromatic marbles, Montano Pulchiano Lot 86978 is a living geological tapestry. Natural iron oxides and silicate infusions across millions of years have forged rich terracotta currents, ochre highlights, and bold charcoal bands against warm cream calcite, bringing immediate warmth to modern minimalist spaces.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Lot 86978?",
        shortAnswer: "Monolithic slabs measure 96\" x 56\" (244 x 142 cm) at an architectural 20mm thickness.",
        answer:
          "Curated Lot 86978 slabs measure 96 inches in length by 56 inches in height (244 cm × 142 cm) with a calibrated 20mm thickness. Gang-saw planar calibration ensures uniform flatness and seamless joint alignment for luxury interior floor and wall installations.",
      },
      {
        question: "Where is Montano Pulchiano Lot 86978 best utilized in luxury interiors?",
        shortAnswer: "Ideal for feature walls, large-format living room floors, waterfall kitchen islands, and bespoke dining tables.",
        answer:
          "Its rich earth-tone palette makes Lot 86978 a stunning anchor for double-height living room walls, luxury penthouse salons, and bespoke dining tables. It pairs effortlessly with natural walnut millwork, brushed champagne brass fixtures, and bronze accents.",
      },
      {
        question: "How does Montano Pulchiano perform in bathrooms and wet areas?",
        shortAnswer: "Dense calcitic matrix resists moisture and creates an opulent spa retreat when sealed.",
        answer:
          "In luxury master bathrooms, Montano Pulchiano provides a warm, organic spa sanctuary. Its low porosity resists water penetration when treated with architectural penetrating fluoropolymer sealers, and its natural multicolored veining naturally conceals minor soap or water droplet marks.",
      },
      {
        question: "Can Lot 86978 be specified for kitchen countertops and waterfall islands?",
        shortAnswer: "Yes. The 20mm thickness and miter-ready edge profile make it ideal for statement islands.",
        answer:
          "Yes. Montano Pulchiano Lot 86978 creates an unforgettable culinary waterfall island. Wiping acidic spills promptly and maintaining the protective penetrating seal keeps the polished or honed surface in pristine showroom condition.",
      },
      {
        question: "Where can architects source authentic Montano Pulchiano Lot 86978 in India?",
        shortAnswer: "Curated and supplied exclusively across India by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic Montano Pulchiano Lot 86978 slabs are curated and imported directly by INTIOSS Luxury Surfaces with provenance documentation, ultrasonic soundness testing, and turnkey delivery across India.",
      },
    ],
    pairsWithSlugs: ["montano-pulchiano-marble", "golden-statuario-marble", "statuario-marble", "michael-angelo-marble"],
  },
  {
    id: "p-michael-angelo",
    slug: "michael-angelo-marble",
    name: "Michael Angelo Marble",
    category: "Natural Stones",
    subCategory: "Marble",
    colorFamily: "Pink",
    origin: "Apuan Alps / Mediterranean Reserves",
    finishes: ["Polished", "Honed", "Leathered"],
    applications: [
      "Flooring",
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Dramatic",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/michael-angelo/michael-angelo-slab.png",
    veinCloseUpImage: "/images/stones/michael-angelo/michael-angelo-cladding-interior.png",
    galleryImages: [
      "/images/stones/michael-angelo/michael-angelo-slab.png",
      "/images/stones/michael-angelo/michael-angelo-kitchen-countertop.png",
      "/images/stones/michael-angelo/michael-angelo-bathroom.png",
      "/images/stones/michael-angelo/michael-angelo-table-top.png",
      "/images/stones/michael-angelo/michael-angelo-flooring.png",
      "/images/stones/michael-angelo/michael-angelo-cladding-interior.png",
    ],
    description:
      "Named in homage to the legendary Renaissance master sculptor, Michael Angelo Marble is a rare, poetic natural stone celebrated for its luminous blush pink, rosy alabaster, and warm cream canvas interlaced with dramatic, delicate crystalline veining. Quarried in extra-large monolithic 135\" x 71\" (343 x 180 cm) slabs at a solid 20mm thickness (Lot SL-11096), Michael Angelo introduces an unprecedented aura of romantic warmth, softness, and modern luxury to interior spaces. Ideal for architects and discerning homeowners seeking an elevated alternative to monochromatic stone, it is exquisitely suited for expansive living room flooring, spa bathroom sanctuaries, bespoke dining table tops, culinary waterfall islands, and sculptural interior wall cladding.",
    bestSuitedFor: [
      "Monolithic Living Room & Penthouse Flooring (Warm Rose-Toned Ambient Reflectance)",
      "Five-Star Master Spa Bathrooms & Floating Vanities (Subtle Blush Pink Crystalline Luxury)",
      "Sculptural Bespoke Dining & Boardroom Table Tops (Extra-Large 135\" Monolithic Format)",
      "Chef's Kitchen Waterfall Countertops & Islands (Warm Organic Tones Sealed with Oleophobic Impregnators)",
      "Architectural Feature Cladding & Fireplace Backdrops (Dramatic Vein Continuity)",
    ],
    specs: {
      density: "2.70 g/cm³",
      dimensions: "135\" x 71\" (343 x 180 cm) · 20mm Thickness",
      quarryLocation: "Apuan Alps / Mediterranean Reserves · Lot SL-11096",
      recommendedCare:
        "Calcitic marble with delicate pink crystalline structure. Daily cleaning with microfiber cloth and pH-neutral stone cleaner. Seal with breathable penetrating impregnator annually to preserve radiant blush tones and protect against moisture and oils.",
    },
    faqs: [
      {
        question: "What makes Michael Angelo Marble distinct in luxury interior design?",
        shortAnswer: "Its rare blush-pink and rosy alabaster field brings soft organic warmth, departing from sterile stark white or grey marbles.",
        answer:
          "Michael Angelo Marble is celebrated for its ethereal palette of soft blush pink, rose alabaster, and warm cream quartz accents. Unlike harsh artificial pigments, its color is formed naturally by mineral trace infusions deep within tectonic marble formations. It infuses interiors with warmth, romance, and tactile sophistication without overwhelming surrounding decor.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Michael Angelo Marble?",
        shortAnswer: "Extra-large monolithic slabs measure 135\" x 71\" (343 x 180 cm) with a substantial 20mm thickness.",
        answer:
          "Curated Michael Angelo slabs measure an extraordinary 135 inches in length by 71 inches in height (343 cm × 180 cm) at an architectural 20mm profile (Lot SL-11096). This grand monolithic scale allows expansive seamless floor layouts, full-height wall cladding with minimal grout joints, and oversized single-slab dining tables without joints.",
      },
      {
        question: "How does Michael Angelo Marble perform in master bathrooms and spa suites?",
        shortAnswer: "Its dense calcitic matrix and soothing pink reflectance create a serene five-star wellness atmosphere.",
        answer:
          "In luxury master bathrooms, Michael Angelo creates a tranquil spa retreat. The soft pink reflectance flatters ambient skin tones, while its dense crystalline structure provides excellent water resistance when sealed with an architectural penetrating fluoropolymer impregnator.",
      },
      {
        question: "Can Michael Angelo Marble be specified for kitchen countertops and dining tables?",
        shortAnswer: "Yes. Slabs are precision-calibrated for mitered waterfall islands and sculptural dining centerpieces.",
        answer:
          "Yes. With a substantial 20mm thickness and impressive 135\" continuous span, Michael Angelo makes an unforgettable statement kitchen island or monolithic dining table. Standard marble maintenance applies: clean spills promptly and use trivets under hot cookware.",
      },
      {
        question: "Which finishes best express the pink hues of Michael Angelo Marble?",
        shortAnswer: "Polished illuminates crystal depth and translucency; Honed or Leathered softens the rose tone into a velvety tactile aesthetic.",
        answer:
          "High Polish maximizes light reflectance and crystalline depth, creating a luminous jewel-like luster. Honed delivers a soft matte glow favored in understated contemporary penthouses, while Leathered accentuates the organic contour of the stone's delicate veins.",
      },
      {
        question: "Where can architects and homeowners source authentic Michael Angelo Marble in India?",
        shortAnswer: "Curated and supplied exclusively across India by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic Michael Angelo Marble slabs (Lot SL-11096) are curated and imported exclusively by INTIOSS Luxury Surfaces. Each slab is cataloged with full origin documentation, structural resonance testing, and pre-dispatch quality verification for delivery to Mumbai, Delhi, Bengaluru, and across India.",
      },
    ],
    pairsWithSlugs: ["statuario-marble", "golden-statuario-marble", "montano-pulchiano-marble", "white-crystal-quartz"],
  },
  {
    id: "p-white-crystal-quartz",
    slug: "white-crystal-quartz",
    name: "White Crystal Quartzite (Lot JNC-01)",
    category: "Natural Stones",
    subCategory: "Quartzite",
    colorFamily: "White",
    origin: "Espirito Santo, Brazil",
    finishes: ["Polished", "Honed", "Leathered", "Translucent Backlit"],
    applications: [
      "Bathroom",
      "Wall Cladding — Interior",
      "Table Top",
      "Kitchen Countertop",
    ],
    thicknesses: ["20mm"],
    veining: "Uniform",
    priceTier: "tier_3",
    availability: "Available on request",
    primaryImage: "/images/stones/white-crystal-quartz/white-crystal-quartz-slab.png",
    veinCloseUpImage: "/images/stones/white-crystal-quartz/white-crystal-quartz-cladding-interior.png",
    galleryImages: [
      "/images/stones/white-crystal-quartz/white-crystal-quartz-slab.png",
      "/images/stones/white-crystal-quartz/white-crystal-quartz-kitchen-countertop.png",
      "/images/stones/white-crystal-quartz/white-crystal-quartz-bathroom.png",
      "/images/stones/white-crystal-quartz/white-crystal-quartz-table-top.png",
      "/images/stones/white-crystal-quartz/white-crystal-quartz-cladding-interior.png",
    ],
    description:
      "White Crystal Quartz (Lot JNC-01) is an extraordinary natural quartzite renowned for its semi-translucent crystalline purity, diamond-like luminescence, and serene white-on-white mineral structure. Sourced in monolithic 91\" x 57\" (231 x 145 cm) slabs at an architectural 20mm thickness, it boasts a Mohs hardness of 7 and exceptional thermal resilience. Unlike soft calcitic marbles, natural crystalline quartzite is naturally impervious to acidic etching from lemon juice, wine, or vinegar, making it the premier architectural specification for high-performance culinary islands, bespoke dining table tops, luminous spa bathroom sanctuaries, and translucent backlit feature claddings.",
    bestSuitedFor: [
      "High-Performance Chef's Kitchen Waterfall Islands (Mohs 7 Scratch & Acid Etch Resistant Alternative to Marble)",
      "Luminous Master Spa Bathrooms & Floating Vanities (<0.2% Water Absorption)",
      "Bespoke Sculptural Dining & Executive Boardroom Table Tops (Heat & Knife Scratch Proof)",
      "Translucent Backlit Feature Walls & Interior Cladding (Natural Light-Refracting Quartz Matrix)",
    ],
    specs: {
      density: "2.65 g/cm³",
      dimensions: "91\" x 57\" (231 x 145 cm) · 20mm Thickness",
      quarryLocation: "Espirito Santo, Brazil · Lot JNC-01",
      recommendedCare:
        "Dense 100% natural crystalline quartzite. Impervious to everyday kitchen acids. Clean with warm water and pH-neutral cleaner. Periodic sealing preserves its radiant crystalline translucency.",
    },
    faqs: [
      {
        question: "What is White Crystal Quartz and what makes it distinct from white marble?",
        shortAnswer: "White Crystal Quartz is a genuine metamorphic quartzite ranking Mohs 7 hardness, completely immune to acid etching.",
        answer:
          "White Crystal Quartz is a 100% natural metamorphic rock formed under extreme tectonic heat and pressure from pure quartz sandstone. While white calcitic marble has a Mohs hardness of 3–4 and reacts chemically with acids (lemon, vinegar, wine), White Crystal Quartz scores Mohs 7 (harder than granite) and will never etch, dull, or scratch under normal residential or commercial culinary usage.",
      },
      {
        question: "What are the exact slab dimensions and thickness for Lot JNC-01?",
        shortAnswer: "Monolithic slabs measure 91\" x 57\" (231 x 145 cm) at an architectural 20mm thickness.",
        answer:
          "Curated Lot JNC-01 slabs measure 91 inches in length by 57 inches in height (231 cm × 145 cm) with a substantial 20mm profile. Precision diamond-gang calibration guarantees uniform flatness, seamless mitered waterfall edges, and flawless vertical installation.",
      },
      {
        question: "Can White Crystal Quartz be backlit with LED illumination?",
        shortAnswer: "Yes. Due to its pure crystalline quartz matrix, select areas transmit warm ambient light when backlit.",
        answer:
          "Yes. White Crystal Quartz features high light translucency thanks to its fused macro-crystalline quartz grains. When paired with slimline LED light panels behind vertical feature wall claddings or floating bathroom vanity fascias, it produces a breathtaking, warm, honey-white glow that acts as illuminated fine architectural art.",
      },
      {
        question: "How does White Crystal Quartz perform in luxury kitchens and bathrooms?",
        shortAnswer: "Superior heat tolerance up to 260°C (500°F) and near-zero water absorption (<0.2%).",
        answer:
          "In culinary spaces, hot pots, acidic liquids, and sharp cutlery do not harm genuine quartzite. In master spa bathrooms, its ultra-dense crystal matrix prevents moisture ingress, soap residue buildup, and cosmetic oil penetration, ensuring lifelong pristine elegance.",
      },
      {
        question: "Which finishes best highlight White Crystal Quartz?",
        shortAnswer: "Polished maximizes crystalline refraction; Leathered introduces an organic, silky tactile depth.",
        answer:
          "High Polish produces a dazzling diamond-like sheen that catches natural daylight. Leathered texture enhances the micro-topography of the quartz crystals for a velvety, tactile experience under hand.",
      },
      {
        question: "Where can architects and homeowners source authentic White Crystal Quartz in India?",
        shortAnswer: "Curated and supplied exclusively across India by INTIOSS Luxury Surfaces.",
        answer:
          "Authentic monolithic White Crystal Quartz slabs (Lot JNC-01) are imported and supplied directly by INTIOSS Luxury Surfaces with complete provenance verification, ultrasonic resonance testing, and turnkey project delivery nationwide.",
      },
    ],
    pairsWithSlugs: ["paunazo-quartzite", "thassos-white-marble", "statuario-marble"],
  },
];

