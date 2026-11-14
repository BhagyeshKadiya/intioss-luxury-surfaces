export const CATEGORY_TYPES_MAP: Record<string, string[]> = {
  "Natural Stones": [
    "Marble",
    "Travertine",
    "Onyx",
    "Quartzite",
    "Lime Stone",
    "Sand Stone",
    "Granite",
    "Basalt",
  ],
  "Semi-Precious Stones": [
    "Quartz",
    "Gemstones",
    "Agate",
    "Jasper",
    "Mother of Pearl",
    "Tiger Eye",
    "Petrified Wood",
  ],
  "Exclusive Table Tops — Stone": [
    "Marble",
    "Semi Precious Stone",
    "Inlay Table Tops",
    "Custom Design",
  ],
  "Stone Veneers": [
    "Slate Veneer Collection",
    "Marble Veneer Collection",
  ],
  "Stone Art": [
    "Inlays",
    "Murals",
    "Statues",
    "Artefacts",
  ],
  "Mosaics": [
    "Marble",
    "Semi-precious gemstone",
    "Hand-cut glass",
    "Floor Medallions",
  ],
};

export function getTypesForCategory(categoryName?: string | null): string[] {
  if (!categoryName) return CATEGORY_TYPES_MAP["Natural Stones"];
  if (categoryName.includes("Natural")) return CATEGORY_TYPES_MAP["Natural Stones"];
  if (categoryName.includes("Semi-Precious") || categoryName.includes("Semi Precious")) {
    return CATEGORY_TYPES_MAP["Semi-Precious Stones"];
  }
  if (categoryName.includes("Table Top")) return CATEGORY_TYPES_MAP["Exclusive Table Tops — Stone"];
  if (categoryName.includes("Veneer")) return CATEGORY_TYPES_MAP["Stone Veneers"];
  if (categoryName.includes("Art") || categoryName.includes("Artefact")) {
    return CATEGORY_TYPES_MAP["Stone Art"];
  }
  if (categoryName.includes("Mosaic")) return CATEGORY_TYPES_MAP["Mosaics"];
  return CATEGORY_TYPES_MAP["Natural Stones"];
}
