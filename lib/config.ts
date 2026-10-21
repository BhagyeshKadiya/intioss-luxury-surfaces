export const WHATSAPP_NUMBER = "919930171094";

export const SITE_CONFIG = {
  name: "INTIOSS",
  tagline: "Luxury Surfaces",
  description:
    "Curating rare Italian marble, precious gemstones, onyx, and architectural surfaces across Mumbai, Silvassa, and Kishangarh.",
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
  ],
  locations: [
    {
      city: "Mumbai",
      area: "Studio & Gallery",
      address: "[ADDRESS]",
      phone: "+91 99301 71094",
      hours: "Mon – Sat (By Appointment)",
    },
    {
      city: "Silvassa",
      area: "Processing Works & Slab Hub",
      address: "[ADDRESS]",
      phone: "+91 99301 71094",
      hours: "Mon – Sat (By Appointment)",
    },
    {
      city: "Kishangarh",
      area: "Stone Studio",
      address: "[ADDRESS]",
      phone: "+91 99301 71094",
      hours: "Mon – Sat (By Appointment)",
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
