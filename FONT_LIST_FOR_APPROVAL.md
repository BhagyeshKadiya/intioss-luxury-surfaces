# INTIOSS Luxury Surfaces — Font List for Client Approval

*Document generated for INTIOSS Luxury Surfaces (Draft 4 Review)*  
*All fonts are served directly via Google Fonts (`next/font/google`). Zero non-Google or paid fonts.*

---

## 1. Approved Fonts

### Marcellus
- **Weights Used:** Regular (`400` only)
- **CSS Variable / Class:** `var(--font-marcellus)` / `font-marcellus`
- **Application & Scope:** 
  - Hero Tagline: *"Breathtaking Stones for the Discerning Few"* (Title Case, `font-synthesis: none`, `text-transform: none`)
  - Primary Headings: `<h1>`, `<h2>` across all pages (replacing previous system-default font)
  - Section titles, stone names, card headers
- **Source:** [Google Fonts — Marcellus](https://fonts.google.com/specimen/Marcellus)
- **Licence:** SIL Open Font License (OFL)

### Jost
- **Weights Loaded:** Light (`300`), Regular (`400`), Medium (`500`), SemiBold (`600`), Bold (`700`)
- **CSS Variable / Class:** `var(--font-jost)` / `font-jost`
- **Application & Scope:**
  - Body copy, narrative descriptions
  - Navigation links, mobile drawer links
  - Interactive buttons, filter pills, CTAs
  - Input labels, form elements, technical specification tables
- **Source:** [Google Fonts — Jost](https://fonts.google.com/specimen/Jost)
- **Licence:** SIL Open Font License (OFL)

### EB Garamond
- **Weights Loaded:** Regular (`400`), Medium (`500`), SemiBold (`600`), Italic
- **CSS Variable / Class:** `var(--font-garamond)` / `font-garamond`
- **Application & Scope:**
  - Long editorial articles & Architectural Journals (`/blogs/[slug]`)
  - Pull quotes and curatorial statements
- **Source:** [Google Fonts — EB Garamond](https://fonts.google.com/specimen/EB+Garamond)
- **Licence:** SIL Open Font License (OFL)

---

## 2. Transitionary Fonts (Currently Retained per Client Note)

*Per client instructions: fonts already in use may stay until final confirmation in writing, before a mass-swap is performed.*

### Montserrat
- **Weights Loaded:** Regular (`400`), Medium (`500`), SemiBold (`600`), Bold (`700`)
- **CSS Variable / Class:** `var(--font-montserrat)` / `font-montserrat`
- **Current Usage:** Uppercase tracking badges, sub-labels, metadata pills, filter buttons
- **Source:** [Google Fonts — Montserrat](https://fonts.google.com/specimen/Montserrat)
- **Licence:** SIL Open Font License (OFL)
- **Proposed Migration:** Migrate sub-labels and badges to **Jost (Medium / SemiBold)** upon client sign-off.

### Poppins
- **Weights Loaded:** Regular (`400`), Medium (`500`), SemiBold (`600`)
- **CSS Variable / Class:** `var(--font-poppins)` / `font-poppins`
- **Current Usage:** Micro-copy, secondary subtitles, timeline dates
- **Source:** [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)
- **Licence:** SIL Open Font License (OFL)
- **Proposed Migration:** Migrate micro-copy to **Jost (Regular)** upon client sign-off.

---

## 3. Font Loading & Performance Verification

- **Origin:** All fonts are downloaded at build time and self-hosted via Next.js Font Optimization (`next/font/google`).
- **External Requests:** No external CSS/font requests to third-party aggregators or CDNs at runtime.
- **FOUT / CLS Prevention:** `display: "swap"` configured on all typeface declarations.
