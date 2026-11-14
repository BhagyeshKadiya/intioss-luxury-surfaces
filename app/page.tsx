import { HeroSection } from "@/components/sections/HeroSection";
import { CategoryShowcaseScroller } from "@/components/sections/CategoryShowcaseScroller";
import { ColorStoneSelector } from "@/components/sections/ColorStoneSelector";
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

      {/* 4.2 Curated Surfaces & Solutions Unified Interactive Showcase (Fit-in-One-Screen Expandable Accordion) */}
      <CategoryShowcaseScroller />

      {/* 4.3 Select Color Wise (Interactive Chromatic Stone Palette) */}
      <ColorStoneSelector />

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
