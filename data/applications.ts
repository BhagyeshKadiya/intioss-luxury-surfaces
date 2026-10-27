import { ApplicationSpace } from "@/lib/types";

export const APPLICATION_SPACES: ApplicationSpace[] = [
  {
    id: "app-flooring",
    slug: "flooring",
    title: "Flooring",
    tagline: "Expansive monolithic salon & hallway flooring",
    image: "/images/stones/statuario/statuario-flooring.png",
    recommendedStones: [
      { name: "Statuario Marble", slug: "statuario-marble" },
      { name: "Golden Statuario", slug: "golden-statuario-marble" },
      { name: "Super Spider", slug: "super-spider-marble" },
      { name: "Thassos White", slug: "thassos-white-marble" },
    ],
  },
  {
    id: "app-bathroom",
    slug: "bathroom",
    title: "Bathroom",
    tagline: "Five-star master spa suites & floating vanities",
    image: "/images/stones/golden-statuario/golden-statuario-bathroom.png",
    recommendedStones: [
      { name: "Golden Statuario", slug: "golden-statuario-marble" },
      { name: "Statuario Marble", slug: "statuario-marble" },
      { name: "Montano Pulchiano", slug: "montano-pulchiano-marble" },
      { name: "Thassos White", slug: "thassos-white-marble" },
    ],
  },
  {
    id: "app-kitchen-countertop",
    slug: "kitchen-countertop",
    title: "Kitchen Countertop",
    tagline: "Chef's monolithic waterfall islands & backsplashes",
    image: "/images/stones/paunazo/paunazo-kitchen-countertop.png",
    recommendedStones: [
      { name: "Paunazo Quartzite", slug: "paunazo-quartzite" },
      { name: "Statuario Marble", slug: "statuario-marble" },
      { name: "Montano Pulchiano", slug: "montano-pulchiano-marble" },
      { name: "Super Spider", slug: "super-spider-marble" },
    ],
  },
  {
    id: "app-table-top",
    slug: "table-top",
    title: "Table Top",
    tagline: "Sculptural dining tables & executive boardroom pieces",
    image: "/images/stones/super-spider/super-spider-table-top.png",
    recommendedStones: [
      { name: "Super Spider", slug: "super-spider-marble" },
      { name: "Paunazo Quartzite", slug: "paunazo-quartzite" },
      { name: "Montano Pulchiano", slug: "montano-pulchiano-marble" },
      { name: "Golden Statuario", slug: "golden-statuario-marble" },
    ],
  },
  {
    id: "app-wall-cladding-interior",
    slug: "wall-cladding-interior",
    title: "Wall Cladding — Interior",
    tagline: "Double-height bookmatched feature walls & fireplace facades",
    image: "/images/stones/montano-pulchiano/montano-pulchiano-cladding-interior.png",
    recommendedStones: [
      { name: "Montano Pulchiano", slug: "montano-pulchiano-marble" },
      { name: "Statuario Marble", slug: "statuario-marble" },
      { name: "Golden Statuario", slug: "golden-statuario-marble" },
      { name: "Paunazo Quartzite", slug: "paunazo-quartzite" },
    ],
  },
  {
    id: "app-wall-cladding-exterior",
    slug: "wall-cladding-exterior",
    title: "Wall Cladding — Exterior",
    tagline: "Architectural ventilated facades & monolithic porticos",
    image: "/images/services/stone-facades.jpg",
    recommendedStones: [
      { name: "Paunazo Quartzite", slug: "paunazo-quartzite" },
      { name: "Thassos White", slug: "thassos-white-marble" },
      { name: "Statuario Marble", slug: "statuario-marble" },
    ],
  },
  {
    id: "app-exterior-flooring",
    slug: "exterior-flooring",
    title: "Exterior Flooring",
    tagline: "Slip-resistant terrace & poolside stone pavilions",
    image: "/images/stones/thassos/thassos-flooring.png",
    recommendedStones: [
      { name: "Thassos White", slug: "thassos-white-marble" },
      { name: "Paunazo Quartzite", slug: "paunazo-quartzite" },
      { name: "Statuario Marble", slug: "statuario-marble" },
    ],
  },
];
