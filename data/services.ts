import { ServiceItem } from "@/lib/types";

export const SERVICES: ServiceItem[] = [
  {
    id: "s1",
    slug: "luxury-civil-interior-contracting",
    title: "Luxury Civil Interior Contracting",
    shortDesc:
      "Precision structural retrofitting, high-tolerance subfloor casting, and turnkey stone execution for elite residences.",
    fullDesc:
      "Unlike conventional civil contractors, INTIOSS operates with laser precision required for zero-tolerance marble installation. We handle interior structural alterations, moisture-barrier screeds, leveling within 1mm per 3 meters, and custom steel sub-frames for monumental vertical stone claddings.",
    image: "/images/services/luxury-civil-contracting.jpg",
    capabilities: [
      "Ultra-flat self-leveling screed casting",
      "Structural steel subframe engineering for heavy slabs",
      "Concealed moisture-membrane barrier systems",
      "Acoustic subfloor decoupling for penthouses",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Site Survey & Laser Scan",
        description: "3D digital scans of floor levels, slab deflections, and wall squareness.",
      },
      {
        stepNumber: "02",
        title: "Substrate Engineering",
        description: "Specialized non-shrink polymer screeds and acoustic isolation layers.",
      },
      {
        stepNumber: "03",
        title: "Dry Lay & Vein Alignment",
        description: "Complete warehouse mockup of slabs before bringing to site.",
      },
      {
        stepNumber: "04",
        title: "Precision Mechanical Fitting",
        description: "Zero-lip installation using Italian levelers and epoxy mortars.",
      },
      {
        stepNumber: "05",
        title: "Diamond Crystallisation",
        description: "Multi-stage diamond pad grinding and fluoropolymer sealing.",
      },
    ],
  },
  {
    id: "s2",
    slug: "marble-block-processing",
    title: "Marble Block Processing",
    shortDesc:
      "Gang-saw block slabbing, vacuum-epoxy netting, and Italian 16-head polishing in our dedicated industrial facility.",
    fullDesc:
      "Raw quarried blocks weighing up to 35 tons are processed using cutting-edge multi-wire and diamond gang-saws. Every individual slab undergoes deep resin vacuum treatment to reinforce micro-fissures, followed by 16-head continuous Italian calibrating and mirror polishing.",
    image: "/images/services/marble-block-processing.jpg",
    capabilities: [
      "Multi-wire precision gang-saw block slicing",
      "Deep vacuum chamber epoxy impregnating",
      "16-head Italian continuous polishing line",
      "Ultra-thin 12mm to monumental 50mm calibration",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Block Dressing",
        description: "Squaring and wire-cleaning raw imported blocks at our Silvassa yard.",
      },
      {
        stepNumber: "02",
        title: "Precision Gang-Saw Cut",
        description: "Continuous water-cooled multi-wire slicing with strict gauge tolerance.",
      },
      {
        stepNumber: "03",
        title: "Vacuum Resin Infusion",
        description: "Structural reinforcement with transparent Italian resins under vacuum.",
      },
      {
        stepNumber: "04",
        title: "Automated Polishing",
        description: "Progressive diamond abrasives achieving up to 105 gloss reading.",
      },
      {
        stepNumber: "05",
        title: "Digital Slab Cataloging",
        description: "High-resolution photo scanning for 3D digital dry-lay planning.",
      },
    ],
  },
  {
    id: "s3",
    slug: "stone-facades",
    title: "Stone Facades",
    shortDesc:
      "Engineered ventilated facades, undercut anchor systems, and monumental dry-clad exterior architecture.",
    fullDesc:
      "We design and engineer bespoke ventilated stone facades engineered to resist coastal wind loads of South Mumbai and the thermal extremes of Gujarat. Utilizing German Fischer undercut anchors and marine-grade SS316 substructures, our facades provide lifetime durability, thermal insulation, and timeless grandeur.",
    image: "/images/services/stone-facades.jpg",
    capabilities: [
      "Ventilated curtain-wall stone engineering",
      "Fischer undercut anchor mechanical dry-cladding",
      "Seismic and coastal wind-load finite element analysis",
      "Integrated facade thermal and acoustic insulation",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Structural Engineering",
        description: "Wind load modeling, anchor pull-out calculations, and shop drawings.",
      },
      {
        stepNumber: "02",
        title: "Substructure Installation",
        description: "High-grade aluminium and SS316 brackets with thermal break isolators.",
      },
      {
        stepNumber: "03",
        title: "CNC Anchor Slotting",
        description: "Precision CNC drilling of stone backs for stress-free undercut anchors.",
      },
      {
        stepNumber: "04",
        title: "Dry Clad Assembly",
        description: "Expansion-gap installation allowing independent stone movement.",
      },
      {
        stepNumber: "05",
        title: "Hydrophobic Sealing",
        description: "UV-stable silane impregnation preventing rainwater salt stains.",
      },
    ],
  },
  {
    id: "s4",
    slug: "cnc-waterjet",
    title: "CNC & Waterjet",
    shortDesc:
      "5-axis CNC 3D stone carving, zero-kerf abrasive waterjet inlays, fluting, and bespoke architectural elements.",
    fullDesc:
      "Transforming monolithic stone into fluid architectural art. With 5-axis CNC machining centers and high-pressure 60,000 PSI abrasive waterjet cutters, we produce intricate fluted wall panels, curved cantilever stone sinks, brass-and-gemstone floor medallions, and sculptural temple sanctuaries.",
    image: "/images/services/cnc-waterjet.jpg",
    capabilities: [
      "60,000 PSI cold waterjet cutting with 0.1mm tolerance",
      "5-axis CNC sculptural 3D bas-relief milling",
      "Seamless brass, mother-of-pearl, and stone inlays",
      "Monolithic hand-carved stone bathtubs and sinks",
    ],
    process: [
      {
        stepNumber: "01",
        title: "CAD/CAM Modeling",
        description: "Translating architectural blueprints into 5-axis machine toolpaths.",
      },
      {
        stepNumber: "02",
        title: "Material Grain Selection",
        description: "Aligning natural stone veining with cut paths for organic flow.",
      },
      {
        stepNumber: "03",
        title: "Waterjet & CNC Milling",
        description: "Cold-cutting delicate gemstone and marble components with zero heat stress.",
      },
      {
        stepNumber: "04",
        title: "Master Hand-Finishing",
        description: "Manual chisel and diamond refinement by senior stone artisans.",
      },
      {
        stepNumber: "05",
        title: "Pre-Assembly Inspection",
        description: "Test assembly at our factory before protected crating and shipment.",
      },
    ],
  },
  {
    id: "s5",
    slug: "international-stone-sourcing",
    title: "International Stone Sourcing",
    shortDesc:
      "Direct quarry block inspection in Carrara, Verona, Denizli, and Espírito Santo with bespoke block reserve rights.",
    fullDesc:
      "With 55+ years of personal relationships across primary quarries in Italy, Greece, Spain, Brazil, and Turkey, we curate exclusive block selections directly from quarry benches. Clients and architects can commission specific mountain veins, receive video inspections, or travel with our directors for quarry-bench approvals.",
    image: "/images/services/international-stone-sourcing.jpg",
    capabilities: [
      "Quarry bench inspections and private reserve holds",
      "Direct ocean container logistics to Nhava Sheva & Mundra ports",
      "Custom slab thickness cutting at source quarries",
      "Rare gemstone and fossilised wood consignment curation",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Design Intent Brief",
        description: "Understanding colorway, veining intensity, and spatial requirements.",
      },
      {
        stepNumber: "02",
        title: "Quarry Bench Scouting",
        description: "Identifying optimal blocks at active quarries across Italy & Brazil.",
      },
      {
        stepNumber: "03",
        title: "Visual HD & Live Video Audit",
        description: "Block water-wetting tests, vein progression verification, and client sign-off.",
      },
      {
        stepNumber: "04",
        title: "Secure Port Transit",
        description: "Insured containerized maritime shipping directly to our processing hubs.",
      },
      {
        stepNumber: "05",
        title: "Custody Handover",
        description: "Uncrating and staging in our private South Mumbai or Ahmedabad studios.",
      },
    ],
  },
  {
    id: "s6",
    slug: "stone-maintenance-services",
    title: "Stone Maintenance Services",
    shortDesc:
      "Specialist diamond re-crystallisation, stain extraction, grout refurbishment, and scheduled surface rejuvenation.",
    fullDesc:
      "Fine marble is a living natural medium that deserves ongoing curatorial care. Our dedicated maintenance division ensures your surfaces maintain showroom brilliance for decades. From annual diamond micro-honing and stain extraction to re-sealing high-traffic kitchen and bathroom zones, we preserve your architectural investment.",
    image: "/images/services/amc-services.jpg",
    capabilities: [
      "Dust-free diamond pad micro-crystallisation",
      "Enzymatic and poultice deep stain extraction",
      "Epoxy grout joint cleaning and color restoration",
      "Hydrophobic and oleophobic breathable re-impregnation",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Surface Health Audit",
        description: "Gloss-meter readings, wear-pattern mapping, and porosity testing.",
      },
      {
        stepNumber: "02",
        title: "Deep Residue Cleansing",
        description: "Neutral extraction of soap scum, waxes, and embedded debris.",
      },
      {
        stepNumber: "03",
        title: "Diamond Honing",
        description: "Micro-level scratch removal without damaging natural stone depth.",
      },
      {
        stepNumber: "04",
        title: "Italian Crystallisation",
        description: "Chemical thermo-mechanical polishing that seals natural calcite crystals.",
      },
      {
        stepNumber: "05",
        title: "Curatorial Handover",
        description: "Final gloss inspection and customized daily maintenance protocol.",
      },
    ],
  },
];
