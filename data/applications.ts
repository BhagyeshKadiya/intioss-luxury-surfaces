import { ApplicationSpace } from "@/lib/types";

export const APPLICATION_SPACES: ApplicationSpace[] = [
  {
    id: "app-flooring",
    slug: "flooring",
    title: "Flooring",
    tagline: "",
    image: "/images/usecases/Intioss_Golden-Statuario_Living-Room-Flooring_03.png",
    recommendedStones: [
      { name: "Golden Statuario", slug: "golden-statuario" },
      { name: "Calacatta Borghini", slug: "calacatta-borghini" },
      { name: "Michael Angelo", slug: "michael-angelo" },
    ],
  },
  {
    id: "app-bathroom",
    slug: "bathroom",
    title: "Bathroom",
    tagline: "",
    image: "/images/usecases/Intioss_Michael-Angelo_Bathroom-Wall-Cladding_04.png",
    recommendedStones: [
      { name: "White Navona Travertine", slug: "white-travertine" },
      { name: "Golden Statuario", slug: "golden-statuario" },
      { name: "Emerald Green Onyx", slug: "emerald-green-onyx" },
    ],
  },
  {
    id: "app-table-top",
    slug: "table-top",
    title: "Table Top",
    tagline: "",
    image: "/images/usecases/Intioss_White-Travertine_Dining-Table-Top_05.png",
    recommendedStones: [
      { name: "Patagonia Quartzite", slug: "patagonia-quartzite" },
      { name: "White Navona Travertine", slug: "white-travertine" },
      { name: "Golden Statuario", slug: "golden-statuario" },
    ],
  },
  {
    id: "app-kitchen-countertop",
    slug: "kitchen-countertop",
    title: "Kitchen Countertop",
    tagline: "",
    image: "/images/usecases/Intioss_Ice-Berg_Kitchen-Countertop-Backsplash_05.png",
    recommendedStones: [
      { name: "Ice Berg Quartzite", slug: "ice-berg-quartzite" },
      { name: "Patagonia Quartzite", slug: "patagonia-quartzite" },
      { name: "Golden Statuario", slug: "golden-statuario" },
    ],
  },
  {
    id: "app-wall-cladding-interior",
    slug: "wall-cladding-interior",
    title: "Wall Cladding — Interior",
    tagline: "",
    image: "/hero/Intioss_Tiger-Eye_Entrance-Feature-Wall_04.webp",
    recommendedStones: [
      { name: "Golden Statuario", slug: "golden-statuario" },
      { name: "Michael Angelo", slug: "michael-angelo" },
      { name: "Royal Blue Agate", slug: "blue-agate" },
    ],
  },
  {
    id: "app-wall-cladding-exterior",
    slug: "wall-cladding-exterior",
    title: "Wall Cladding — Exterior",
    tagline: "",
    image: "/images/services/stone-facades.jpg",
    recommendedStones: [
      { name: "Silver Travertine Titanium", slug: "silver-travertine" },
      { name: "White Navona Travertine", slug: "white-travertine" },
      { name: "Ice Berg Quartzite", slug: "ice-berg-quartzite" },
    ],
  },
  {
    id: "app-exterior-flooring",
    slug: "exterior-flooring",
    title: "Exterior Flooring",
    tagline: "",
    image: "/hero/Intioss_White-Travertine_Dining-Table-Top_05.webp",
    recommendedStones: [
      { name: "White Navona Travertine", slug: "white-travertine" },
      { name: "Silver Travertine Titanium", slug: "silver-travertine" },
      { name: "Ice Berg Quartzite", slug: "ice-berg-quartzite" },
    ],
  },
];
