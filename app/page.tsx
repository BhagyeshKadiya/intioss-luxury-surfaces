import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryShowcaseScroller } from "@/components/sections/CategoryShowcaseScroller";
import { ProductsServicesToggle } from "@/components/sections/ProductsServicesToggle";
import { ApplicationSelector } from "@/components/sections/ApplicationSelector";
import { LegacySection } from "@/components/sections/LegacySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 4.1 Hero (Cinematic Video, Center Logo Scroll Morph, Marcellus Tagline) */}
      <HeroSection />

      {/* 4.2 Surface Categories Interactive Scroller (Modern Fit-in-One-Screen Expandable Showcase) */}
      <CategoryShowcaseScroller />

      {/* 4.3 Products and Services Segmented Toggle */}
      <ProductsServicesToggle />

      {/* 4.4 Application-wise Selection (Find your stone by space) */}
      <ApplicationSelector />

      {/* 4.5 Our Legacy (55+ Years, Animated Counters, Quality Marble Link) */}
      <LegacySection />

      {/* 4.6 Testimonials */}
      <TestimonialsSection />

      {/* 4.7 Book Consultation Form (2 Columns, Floating Inputs, WhatsApp handoff) */}
      <ConsultationSection />

      {/* 4.8 FAQ (Restyled Hairline Accordion with Gold Icons) */}
      <FaqSection />
    </div>
  );
}
