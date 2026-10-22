import { ServiceItem } from "@/lib/types";

export interface ExtendedServiceItem extends ServiceItem {
  status?: "active" | "pending";
  protocolStatus?: "active" | "pending";
  highlightsStatus?: "active" | "pending";
  photoPlaceholder?: string;
}

export const SERVICES: ExtendedServiceItem[] = [
  {
    id: "s1",
    slug: "luxury-civil-contracting",
    title: "Luxury Civil Contracting",
    shortDesc:
      "Structural retrofitting, subfloor preparation, moisture barrier systems, and stone installation coordination.",
    fullDesc:
      "INTIOSS executes specialized civil contracting for luxury residences and estates. We manage structural preparation, moisture barrier screeds, sub-floor leveling, and custom framing required for complex architectural stone installations.",
    image: "/images/services/luxury-civil-contracting.jpg",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "Subfloor preparation and screed casting",
      "Moisture membrane barrier systems",
      "Structural steel subframe coordination",
      "Acoustic subfloor decoupling",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Site Survey",
        description: "Initial dimensional survey and floor level assessment.",
      },
      {
        stepNumber: "02",
        title: "Substrate Preparation",
        description: "Application of moisture membranes and level screeds.",
      },
      {
        stepNumber: "03",
        title: "Dry Lay Inspection",
        description: "Dry lay layout and vein alignment prior to installation.",
      },
      {
        stepNumber: "04",
        title: "Stone Installation",
        description: "Mechanical fitting and precision alignment of slabs.",
      },
      {
        stepNumber: "05",
        title: "Final Finishing",
        description: "Surface cleaning, joint filling, and protective sealing.",
      },
    ],
  },
  {
    id: "s2",
    slug: "marble-block-processing",
    title: "Marble Block Processing",
    shortDesc:
      "Block gang-sawing, resin reinforcing, and surface calibration at our dedicated facilities.",
    fullDesc:
      "Raw quarried blocks of marble and natural stone are processed into calibrated slabs. Each block is inspected, cut to required thicknesses, reinforced where necessary, and polished or honed to specification.",
    image: "/images/services/marble-block-processing.jpg",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "Block gang-saw slabbing",
      "Resin vacuum reinforcement",
      "Surface calibration and polishing",
      "Custom thickness slicing",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Block Dressing",
        description: "[CONFIRM] Block squaring and inspection pending from INTIOSS.",
      },
      {
        stepNumber: "02",
        title: "Slabbing",
        description: "[CONFIRM] Multi-wire cutting flow pending from INTIOSS.",
      },
      {
        stepNumber: "03",
        title: "Resin Treatment",
        description: "[CONFIRM] Reinforcement protocol pending from INTIOSS.",
      },
      {
        stepNumber: "04",
        title: "Surface Finishing",
        description: "[CONFIRM] Polishing stages pending from INTIOSS.",
      },
      {
        stepNumber: "05",
        title: "Quality Curation",
        description: "[CONFIRM] Curation protocol pending from INTIOSS.",
      },
    ],
  },
  {
    id: "s3",
    slug: "stone-facades",
    title: "Stone Facades",
    shortDesc:
      "Engineered ventilated stone facades, mechanical anchor systems, and exterior stone cladding.",
    fullDesc:
      "We engineer and install ventilated natural stone facades and exterior cladding for private residences and buildings. Systems are designed for structural integrity, thermal efficiency, and weather resilience.",
    image: "/images/services/stone-facades.jpg",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "Ventilated curtain-wall stone cladding",
      "Mechanical anchor dry-cladding",
      "Structural substructure installation",
      "Exterior weatherproofing and joint sealing",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Engineering",
        description: "Wind load modeling and anchor structural calculations.",
      },
      {
        stepNumber: "02",
        title: "Substructure",
        description: "Installation of brackets and vertical rail frameworks.",
      },
      {
        stepNumber: "03",
        title: "Anchor Slotting",
        description: "Drilling and fixing of mechanical anchors.",
      },
      {
        stepNumber: "04",
        title: "Panel Installation",
        description: "Mounting of exterior stone panels with expansion joints.",
      },
      {
        stepNumber: "05",
        title: "Protective Sealing",
        description: "Final weatherproofing and hydrophobic sealant application.",
      },
    ],
  },
  {
    id: "s4",
    slug: "cnc-waterjet",
    title: "CNC & Waterjet",
    shortDesc:
      "Precision CNC stone carving, abrasive waterjet inlays, fluting, and bespoke architectural elements.",
    fullDesc:
      "Transforming natural stone into bespoke architectural details. Our CNC machining and waterjet cutting capabilities produce fluted wall claddings, carved panels, precision floor inlays, and customized stone furnishings.",
    image: "/images/services/cnc-waterjet.jpg",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "CNC 3D stone carving and profiling",
      "Precision waterjet cutting and inlays",
      "Fluted and textured wall panels",
      "Custom basins and monolithic stone pieces",
    ],
    process: [
      {
        stepNumber: "01",
        title: "CAD Modeling",
        description: "Digital conversion of architectural drawings into toolpaths.",
      },
      {
        stepNumber: "02",
        title: "Material Selection",
        description: "Choosing stone slabs with suitable density and veining.",
      },
      {
        stepNumber: "03",
        title: "CNC Machining",
        description: "Precision automated cutting and carving.",
      },
      {
        stepNumber: "04",
        title: "Hand Finishing",
        description: "Artisanal hand-honing and edge detailing.",
      },
      {
        stepNumber: "05",
        title: "Final Assembly",
        description: "Dry fitting and sealing of components.",
      },
    ],
  },
  {
    id: "s5",
    slug: "international-stone-sourcing",
    title: "International Stone Sourcing",
    shortDesc:
      "Direct sourcing of rare marbles, quartzites, and exotic stones on your behalf from global quarries.",
    fullDesc:
      "Through long-standing relationships with quarries around the world, and with premium marble suppliers in Italy, we source stone on your behalf. You buy through INTIOSS.",
    image: "",
    photoPlaceholder: "PHOTO — Indian faces",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "Direct quarry relationship sourcing",
      "Italian marble block and slab procurement",
      "Inspection and quality verification",
      "Import logistics and custom handling",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Brief & Specification",
        description: "Understanding aesthetic and quantity requirements with architects.",
      },
      {
        stepNumber: "02",
        title: "Global Search",
        description: "Reviewing available quarry yields with partner yards in Italy and worldwide.",
      },
      {
        stepNumber: "03",
        title: "Block / Lot Approval",
        description: "Sharing lot photographs and technical data for client sign-off.",
      },
      {
        stepNumber: "04",
        title: "Import & Clearing",
        description: "Complete shipping, import duty, and container clearance to our stockyards.",
      },
      {
        stepNumber: "05",
        title: "Delivery to Site",
        description: "Safely transporting calibrated crates directly to site.",
      },
    ],
  },
  {
    id: "s6",
    slug: "stone-restoration-maintenance",
    title: "Stone Restoration & Maintenance",
    shortDesc:
      "Restoring and maintaining marble and natural stone surfaces, including annual maintenance contracts (AMC).",
    fullDesc:
      "INTIOSS provides ongoing care for installed natural stone, including diamond re-polishing, stain removal, sealer re-application, and structured Annual Maintenance Contracts (AMC) for residences and commercial properties.",
    image: "/images/services/amc-services.jpg",
    status: "active",
    highlightsStatus: "pending",
    protocolStatus: "pending",
    capabilities: [
      "Surface re-polishing and honing",
      "Stain removal and poultice treatments",
      "Protective sealer re-application",
      "Annual Maintenance Contracts (AMC)",
    ],
    process: [
      {
        stepNumber: "01",
        title: "Surface Audit",
        description: "Assessing wear patterns, etch marks, and sealant condition.",
      },
      {
        stepNumber: "02",
        title: "Deep Cleaning",
        description: "Neutral pH extraction of accumulated dirt and residue.",
      },
      {
        stepNumber: "03",
        title: "Re-Polishing",
        description: "Diamond abrasion to restore original luster.",
      },
      {
        stepNumber: "04",
        title: "Penetrating Sealer",
        description: "Re-sealing pores to resist liquids and stains.",
      },
      {
        stepNumber: "05",
        title: "Scheduled AMC",
        description: "Periodic inspections and maintenance visits.",
      },
    ],
  },
];
