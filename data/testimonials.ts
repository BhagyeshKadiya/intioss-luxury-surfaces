import { Testimonial } from "@/lib/types";

// Pending written confirmation from INTIOSS
export const TESTIMONIALS_STATUS: "active" | "pending" = "pending";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t2",
    quote:
      "When constructing our private family estate, we wanted rare Golden Statuario that didn't look like generic commercial stock. INTIOSS sourced exceptional blocks. The craftsmanship is breathtaking.",
    clientName: "Private Client",
    clientRole: "Estate Owner",
    city: "Silvassa",
    projectScope: "Bespoke Private Estate",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "t3",
    quote:
      "Working with historic properties requires contractors who understand both structural restraint and delicate stone care. INTIOSS is backed by 55 years of experience; their team is thorough and reliable.",
    clientName: "Private Architect",
    clientRole: "Senior Interior Architect",
    city: "Mumbai",
    projectScope: "Heritage Residence Restoration",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "t4",
    quote:
      "For our boutique coastal residence, INTIOSS engineered dry-hung Silver Travertine ventilated stone work that withstands coastal weather. Their technical documentation is meticulous.",
    clientName: "Private Developer",
    clientRole: "Developer",
    city: "Mumbai",
    projectScope: "Coastal Residence",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "t5",
    quote:
      "The diamond polish and bookmatching executed across our residence has aged impeccably. Their periodic maintenance crew keeps the floors as luminous as day one.",
    clientName: "Private Homeowner",
    clientRole: "Private Owner",
    city: "Kishangarh",
    projectScope: "Waterfront Residence",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  },
];
