import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsServicesToggle } from "@/components/sections/ProductsServicesToggle";
import { ApplicationSelector } from "@/components/sections/ApplicationSelector";
import { LegacySection } from "@/components/sections/LegacySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 4.1 Hero (Cinematic Video, Center Logo Scroll Morph, Raleway Tagline) */}
      <HeroSection />

      {/* 4.2 Products and Services Segmented Toggle */}
      <ProductsServicesToggle />

      {/* 4.3 Application-wise Selection (Find your stone by space) */}
      <ApplicationSelector />

      {/* 4.4 Our Legacy (55+ Years, Animated Counters, Quality Marble Link) */}
      <LegacySection />

      {/* 4.5 Testimonials (EB Garamond Carousel, South Mumbai / Gujarat context) */}
      <TestimonialsSection />

      {/* 4.6 Book Consultation Form (2 Columns, Floating Inputs, WhatsApp handoff) */}
      <ConsultationSection />

      {/* 4.7 FAQ (Restyled Hairline Accordion with Gold Icons) */}
      <FaqSection />
    </div>
  );
}
