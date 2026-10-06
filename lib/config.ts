export const WHATSAPP_NUMBER = "919930171094";

export const SITE_CONFIG = {
  name: "INTIOSS",
  tagline: "Luxury Surfaces",
  description:
    "The luxury stone brand of the Gandhi Civil Decor Group. Direct quarrier, bespoke processor, and turnkey installer of rare marble, precious gemstones, onyx, and architectural surfaces.",
  whatsappNumber: WHATSAPP_NUMBER,
  phoneDisplay: "+91 99301 71094",
  email: "concierge@intioss.com",
  parentBrand: {
    name: "Quality Marble",
    url: "https://www.qualitymarble.co.in/",
  },
  group: "Gandhi Civil Decor Group",
  stats: [
    { value: 55, suffix: "+", label: "Years of Legacy" },
    { value: 1250, suffix: "+", label: "Projects Delivered" },
    { value: 280, suffix: "+", label: "Stone Varieties" },
    { value: 28, suffix: "+", label: "Cities Served" },
  ],
  locations: [
    {
      city: "Silvassa",
      area: "Processing Works & Slab Hub",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Silvassa",
      phone: "+91 99301 71094",
      hours: "Mon – Sat: 9:00 AM – 7:00 PM (By Appointment)",
    },
    {
      city: "Mumbai",
      area: "Studio & Experience Gallery",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Mumbai",
      phone: "+91 99301 71094",
      hours: "Mon – Sat: 10:00 AM – 7:30 PM (By Appointment)",
    },
    {
      city: "Kishangarh",
      area: "Architectural Stone Atelier",
      address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, Kishangarh",
      phone: "+91 99301 71094",
      hours: "Mon – Sat: 9:30 AM – 7:00 PM (By Appointment)",
    },
  ],
  socials: {
    instagram: "https://instagram.com/intioss.surfaces",
    linkedin: "https://linkedin.com/company/intioss",
    youtube: "https://youtube.com/@intioss",
    pinterest: "https://pinterest.com/intiossofficial",
  },
};

export function getWhatsAppUrl(customText?: string) {
  const text =
    customText ||
    "Hello INTIOSS, I'd like to know more about your surfaces.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getProductWhatsAppUrl(productName: string) {
  const text = `Hello INTIOSS, I'm interested in ${productName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
