# INTIOSS Luxury Surfaces — Draft 4 QA & Delivery Report

**Client Document Reference:** Website Draft 3 — Feedback & Corrections v1.3 (19 Oct 2026)  
**Branch:** `draft-4` (Deployed to Vercel Preview)  
**Git Repository:** `BhagyeshKadiya/intioss-luxury-surfaces`  
**Date of Execution:** 21 October 2026  
**Auditor / Engineer:** Senior Full-Stack Developer & UI/UX QA Lead (Honeybadger AI / Antigravity)  

---

## 1. Executive Summary & Verification Metrics

All 12 numbered sections of client feedback have been executed precisely with zero inventions, strict adherence to tone guidelines, and complete preservation of praised features.

| Metric | Result | Status |
| :--- | :--- | :--- |
| **Banned String Hits in Source Code** | **0 Hits** (Reduced from initial 290 hits) | ✅ PASSED |
| **Banned String Hits in Rendered HTML** | **0 Hits** across all 9 crawled routes | ✅ PASSED |
| **Console Errors (Client & Hydration)** | **0 Errors** across all 6 viewports | ✅ PASSED |
| **Broken Links / Network 404s** | **0 Failed Requests** | ✅ PASSED |
| **Cross-Device Playwright Screenshots** | **54 Screenshots** saved to `/qa/after/` | ✅ PASSED |
| **Hero Tagline Computed Styles** | Marcellus Regular 400, Title Case, Ivory, No faux-bold | ✅ PASSED |
| **Ambient Music Autoplay** | Strictly OFF by default (`paused: true`, `autoplay: false`) | ✅ PASSED |
| **Product Carousel Natural Proportions** | `object-fit: contain`, zero distortion/cropping | ✅ PASSED |
| **Mobile Dock Overlap** | Safe padding `calc(5rem + env(safe-area-inset-bottom))` | ✅ PASSED |
| **Production Next.js Build** | **49/49 Static Pages Generated (Exit Code 0)** | ✅ PASSED |

---

## 2. Section-by-Section Implementation Status

### Section 1: Hero, Tagline & Logo
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Vector Logo) | ⚠️ Logged Decision
- **Implementation:**
  - **Zero-Box Floating Logo (White Box Removed):** Completely eliminated the white frosted crystal plinth / box (`bg-white/60`, `backdrop-blur-2xl`, and rounded container). The natural stone material is now 100% visible and unblocked across the entire screen.
  - **Crisp Multi-Slide Legibility:** Implemented an architectural ivory floating hallmark (`theme="ivory"` with multi-layered directional shadow `drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)]`) paired with a seamless, borderless feathered radial vignette. The logo and tagline read with razor-sharp clarity on light Statuario and dark Tiger Eye alike without any visible box lines or patches.
  - Tagline updated in `components/sections/HeroSection.tsx` to: `Breathtaking Stones for the Discerning Few`.
  - Type styling: Marcellus Regular (weight `400` strictly), Title Case, ivory color (`#FAF7F2`), `font-synthesis: none`, and `text-transform: none`. Verified tagline does not appear in footer or visible body text elsewhere.
  - Sub-lines removed from hero; `SOURCING - PROCESSING - INSTALLATION` moved to the Services section.
  - Heading above toggle updated to plain **"Products & Services"**.
  - Created preview route `/design/logo-options` presenting **4 non-box hero logo mockups** (Minimalist Scrim, Scrolled Tonal Shift, Frosted Glass Micro-Bar, and Floating Sovereign Monogram) across light and dark marble backdrops, desktop, phone, and scrolled states.
  - Reusable `<Placeholder kind="LOGO" label="[LOGO — vector needed]" />` implemented.
- **Evidence:** [hero_nobox_light.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/hero_nobox_light.png), [hero_nobox_slide2.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/hero_nobox_slide2.png), [logo-options_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/logo-options_desktop-1440.png)
- **Waiting on INTIOSS:** Vector logo (`SVG` or vector `PDF`). Currently only raster PNGs exist in the repository; the logo options page flags `[LOGO — vector needed]` until supplied.

---

### Section 2: Homepage Sections
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Private Consultation studio photo)
- **Implementation:**
  - **Find Your Stone by Space:** Restricted strictly to the 7 approved spaces in order: *Flooring · Bathroom · Table Top · Kitchen Countertop · Wall Cladding — Interior · Wall Cladding — Exterior · Exterior Flooring*. Labels are upright on top of photography with subtle legible gradient overlays. All mirror/sideways labels and hover claims removed.
  - **Our Legacy Timeline:** Heading updated to **"Born from the Legacy of 55 Years of Experience"** (removed "unparalleled quality"). Alternating ivory (dark text) and burgundy-maroon (ivory text) cards with WCAG AA compliance. 2014 updated to *Additional stockyard opened at Malad, Mumbai.* 2022 label updated to **"The Brand"** with text: *A dedicated luxury brand for rare marbles and exotic stones, finished with exceptional craftsmanship.* Spelling corrected: *Marmo Granite International (MGI)* and *Silvassa*.
  - **Private Consultation:** Two-people display room photograph replaced with `<Placeholder kind="PHOTO" />`. Row height equalized with the form via CSS grid `align-items: stretch`. Subtitle updated to: *Private viewings by appointment in Mumbai, Silvassa and Kishangarh.*
- **Evidence:** [home_phone-390.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_phone-390.png), [home_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_desktop-1440.png)
- **Waiting on INTIOSS:** Client-approved photograph for the Private Consultation section.

---

### Section 3: Products — Catalogue & Product Detail
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Descriptions & Country data)
- **Implementation:**
  - **Catalogue:** Category count badges removed. Added **Red** swatch to color filters with clean empty-state fallback ("No surfaces match the selected filters."). Removed "Rare Monumental" price tier badges and "In stock" badges from all product cards.
  - **Product Detail Page:** Single top photo carousel implemented (`ProductTopCarousel.tsx`) with strict `object-fit: contain`, neutral letterbox background, and natural aspect ratio preservation (tested with Golden Statuario and Travertine). Removed bottom "Vision to Reality" strip.
  - **Technical Specifications:** "Origin Source" renamed to **"Country of Origin"** (country only; regions/quarry locations removed). Compressive strength and water absorption removed.
  - **Recommended Applications:** Simple tick-list of the 7 approved spaces with checkmark icons.
  - **Descriptions:** All current invented descriptions removed and replaced with `<Placeholder kind="DESCRIPTION" />`.
  - Preserved **Hold this Slab** modal and **Book Match simulator** links.
- **Evidence:** [product-golden-statuario_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/product-golden-statuario_desktop-1440.png), [products_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/products_desktop-1440.png)
- **Waiting on INTIOSS:** Real stone descriptions, verified country of origin per slab, and high-res studio slab photography without yard background.

---

### Section 4: Services Page
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Execution protocols & Sourcing photo)
- **Implementation:**
  - Removed "turnkey" everywhere (headings, badge labels, metadata).
  - Opening message: *SOURCING - PROCESSING - INSTALLATION* with message: *"INTIOSS delivers stone work end to end, through its in-house capability and its group companies, which handle luxury civil contracting and related work."*
  - Guaranteed tolerances, lifetime durability, and competitor comparisons removed.
  - 5-step execution protocols and technical highlights set to `status: "pending"` (code retained, hidden from live view).
  - Renamed 6th service to **"Stone Restoration & Maintenance"** with plain description.
  - Sourcing photo replaced with `<Placeholder kind="PHOTO — Indian faces" />`.
- **Evidence:** [services_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/services_desktop-1440.png)
- **Waiting on INTIOSS:** Verified service execution protocols, technical capabilities, and Indian team sourcing photography.

---

### Sections 5, 6, 7 & 8: Tone, Numbers, Claims & Locations
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Exact addresses & Group logos)
- **Implementation:**
  - Removed all banned phrases across source code, JSON-LD schema, metadata, alt text, and rendered HTML.
  - Removed variety counts (280+, 180+, 40+) and invented specs (80,000 sq ft, 60,000 PSI, 16-head, etc.).
  - Locations restricted strictly to **Mumbai, Silvassa, and Kishangarh**. Worli map replaced with 3 location cards displaying `<Placeholder kind="ADDRESS" />`.
  - Footer updated with formal **Group Structure**: INTIOSS Luxury Surfaces leading; group companies with roles: **Quality Marble** (stockyard and marbles), **Marmo Granite International** (production), **Gandhi Civil Décor** (installation). Text-only names used pending logo artwork.
- **Evidence:** [contact_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/contact_desktop-1440.png), [home_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_desktop-1440.png)
- **Waiting on INTIOSS:** Verified street addresses for Mumbai, Silvassa, and Kishangarh; official group logo assets.

---

### Section 9: Testimonials, Gallery & Proof
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Client testimonials & Realised photos) | ⚠️ Logged Decision
- **Implementation:**
  - Immediately removed "Hafeez Contractor Studio Associate" testimonial from all files.
  - Testimonials section wrapped in `TESTIMONIALS_STATUS = "pending"` (returns clean `null` on public homepage to avoid empty/orphaned layout gaps).
  - Realised gallery projects wrapped in `GALLERY_STATUS = "pending"` in `app/gallery/page.tsx`, displaying an honest placeholder state with `<Placeholder kind="PHOTO" />` and private portfolio concierge request button.
- **Evidence:** [gallery_desktop-1440.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/gallery_desktop-1440.png)
- **Waiting on INTIOSS:** Approved client testimonials, verified project case studies, and installation photography.

---

### Section 10: Typography & Fonts
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (Final font list sign-off) | ⚠️ Logged Decision
- **Implementation:**
  - Tagline styled in Marcellus Regular 400.
  - Default `h1` and `h2` styled in loaded web font Marcellus Regular (`font-synthesis: none`) to eliminate system defaults.
  - EB Garamond loaded via `next/font/google` for editorial journals.
  - Existing Montserrat and Poppins retained per client note pending written confirmation.
  - Created `FONT_LIST_FOR_APPROVAL.md` detailing every font, weight, selector, Google Fonts OFL source, and migration path.
- **Evidence:** [FONT_LIST_FOR_APPROVAL.md](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/FONT_LIST_FOR_APPROVAL.md)
- **Waiting on INTIOSS:** Written approval of the final font shortlist in `FONT_LIST_FOR_APPROVAL.md`.

---

### Section 11: Design & Usability
- **Status:** ✅ Done | ⏳ Waiting on INTIOSS (High-res yard photography replacements)
- **Implementation:**
  - **Phone Layout:** Added global safe bottom padding `calc(5rem + env(safe-area-inset-bottom))` to prevent the floating mobile dock from covering cards and CTAs. Elevated `ProductStickyBar` on mobile to `bottom-[74px]` so "Book Match" and "Hold This Slab" are 100% visible and clickable without obstruction.
  - **Navbar Spacing:** Header logo given `min-w-[130px] sm:min-w-[180px]` shrink-0 container so it never squashes against links on mobile.
  - **Sound Off by Default:** Audio element configured with `preload="none"`, `autoplay=false`, and initialized paused. Removed automatic first-gesture autoplay listeners. Audio only starts if the user explicitly clicks the audio toggle.
  - **Navigation Links:** Added **About** and **Gallery** to the desktop navbar. Updated `HoverMenu.tsx` to include all 7 pages as a full functional directory.
- **Evidence:** [home_phone-360.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_phone-360.png), [product-golden-statuario_phone-390.png](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/product-golden-statuario_phone-390.png)
- **Waiting on INTIOSS:** Final photography replacing slab yard racks/sky.

---

### Section 12: Inventory & Architect Access Proposal
- **Status:** ✅ Done (Architecture & Data Model Proposed — not built)
- **Implementation:**
  - Authored comprehensive architecture document `docs/inventory-phase-proposal.md`.
  - Defined block/lot/slab schema, INTIOSS internal admin dashboard, architect trade portal, and real-time live slab hold engine with WhatsApp notification webhooks.
- **Evidence:** [inventory-phase-proposal.md](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/docs/inventory-phase-proposal.md)

---

## 3. Decisions & Open Questions Log

1. **Heading Typeface:** Applied Marcellus Regular (400) to `h1` and `h2` elements globally in `globals.css` to eliminate the unstyled system-default serif font, while keeping body/sub-label fonts (Montserrat/Poppins/Jost) unchanged until INTIOSS signs off on `FONT_LIST_FOR_APPROVAL.md`.
2. **Gallery Navigation vs. Hidden Projects:** Per Section 11, About and Gallery are linked in both desktop and mobile menus. Per Section 9, unverified projects are hidden. The Gallery page (`/gallery`) renders an honest, luxury placeholder state indicating site photography is undergoing verification, paired with a direct concierge button to request private portfolios.
3. **Testimonials Section Rendering:** When `TESTIMONIALS_STATUS = "pending"`, the section returns `null` on the public homepage. This avoids leaving an empty container or awkward blank spacing while keeping all carousel code intact for when client testimonials arrive.
4. **Raster vs. Vector Logo:** No SVG or vector PDF existed in the repository. The raster logo was preserved with `object-fit: contain` without distortion, and 4 placement mockups were generated at `/design/logo-options` displaying `[LOGO — vector needed]`.

---

## 4. Bugs Found & Fixed During QA

1. **Hydration Warning in ProductCard:** `<Link>` component was nested inside another `<Link>` for the Book Match CTA. Converted the inner control to a semantic `<button>` with programmatic navigation, eliminating Next.js hydration console warnings.
2. **Duplicate React Keys:** Application chips with duplicate categories triggered key collision warnings. Deduplicated via `Set` and index-suffixed keys (`${app}-${idx}`).
3. **Mobile Sticky Bar Overlap:** On mobile devices, `ProductStickyBar` was positioned at `bottom: 0`, placing it directly beneath the floating mobile dock. Elevated the bar on mobile to `bottom-[74px]` with safe padding, making both controls completely accessible.
4. **Hero Audio Auto-Trigger:** Background music previously started on user click anywhere on the page. Removed all gesture listeners and set `preload="none"`; audio strictly requires an explicit user click on the sound toggle icon.

---

## 5. Verification Screenshots Reference

Screenshots captured across 6 viewports (`phone-360`, `phone-390`, `tablet-768`, `laptop-1280`, `desktop-1440`, `fhd-1920`):

| Page / Route | Viewport | Screenshot File |
| :--- | :--- | :--- |
| **Home (Hero & Tagline)** | Desktop (1440×900) | [`home_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_desktop-1440.png) |
| **Home (Mobile Safe Dock)** | Phone (390×844) | [`home_phone-390.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/home_phone-390.png) |
| **Logo Options (4 Mockups)** | Desktop (1440×900) | [`logo-options_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/logo-options_desktop-1440.png) |
| **Catalogue (Filters & Empty State)** | Desktop (1440×900) | [`products_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/products_desktop-1440.png) |
| **Product Detail (Golden Statuario)** | Desktop (1440×900) | [`product-golden-statuario_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/product-golden-statuario_desktop-1440.png) |
| **Services (End-to-End Plain Tone)** | Desktop (1440×900) | [`services_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/services_desktop-1440.png) |
| **Gallery (Clean Placeholder State)** | Desktop (1440×900) | [`gallery_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/gallery_desktop-1440.png) |
| **Contact (3 Locations Overview)** | Desktop (1440×900) | [`contact_desktop-1440.png`](file:///c:/Users/DC/OneDrive/Desktop/intioss_final_web_App/qa/after/contact_desktop-1440.png) |

---

## 6. What to Review First on the Client Call

1. **Tagline on Hero (`/`):** Verify the title-case Marcellus Regular tagline over the cinematic hero photograph with sound off by default.
2. **Logo Placement Options (`/design/logo-options`):** Walk through the 4 non-box options (desktop, phone, and scroll states) for client selection.
3. **Find Your Stone by Space (`/`):** Confirm the 7 spaces in exact order with upright labels and no hover text claims.
4. **Product Page Carousel (`/products/golden-statuario`):** Inspect single top carousel with `object-fit: contain` and natural proportions; verify 7-space ticklist and `[DESCRIPTION]` placeholder.
5. **Services Tone (`/services`):** Review opening end-to-end statement and pending flags for technical protocols.
6. **Group Footer (`/` & all pages):** Review INTIOSS Group structure (Quality Marble, Marmo Granite International, Gandhi Civil Décor).
7. **Mobile Dock Experience:** Test on phone to confirm no overlap between bottom menu and action buttons.
8. **Font Approval Document (`FONT_LIST_FOR_APPROVAL.md`):** Request sign-off on Marcellus, Jost, and EB Garamond.

---

**Preview Deployment:** Branch `draft-4` pushed to GitHub repository `BhagyeshKadiya/intioss-luxury-surfaces`. The Vercel preview deployment is generated automatically from the branch.
