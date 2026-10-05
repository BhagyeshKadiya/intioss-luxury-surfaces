import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceTier(tier: string): string {
  switch (tier) {
    case "tier_1":
      return "₹₹";
    case "tier_2":
      return "₹₹₹";
    case "tier_3":
      return "₹₹₹₹";
    case "on_request":
    default:
      return "On request";
  }
}
