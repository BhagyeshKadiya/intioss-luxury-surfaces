import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceTier(tier: string): string {
  switch (tier) {
    case "tier_1":
      return "Select Curation";
    case "tier_2":
      return "Premium Reserve";
    case "tier_3":
      return "Signature Curation";
    case "on_request":
    default:
      return "Price on Request";
  }
}
