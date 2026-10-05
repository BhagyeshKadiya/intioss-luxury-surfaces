# INTIOSS – Luxury Surfaces Web App

Production-grade website for **INTIOSS – Luxury Surfaces**, the premium stone brand of the Gandhi Civil Décor Group and subsidiary of Quality Marble ([qualitymarble.co.in](https://www.qualitymarble.co.in/)).

---

## 1. Tech Stack
- **Next.js 14** (App Router, React Server Components, TypeScript Strict)
- **Motion (`motion/react`)** – smooth luxury easing, scroll transforms, and animations
- **Tailwind CSS** – strict luxury brand tokens (`--maroon`, `--maroon-deep`, `--gold`, `--grey`, `--ivory`, `--white`)
- **Lenis** – silky smooth scrolling
- **7 Google Fonts** loaded via `next/font`: Montserrat, Poppins, Marcellus, Raleway, EB Garamond, Bebas Neue, Jost
- **Embla Carousel** – hardware-accelerated editorial sliders
- **Fuse.js** – typo-tolerant stone search
- **Zod & React Hook Form** – consultation validation and security honeypot

---

## 2. Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 3. Brand System & Assets
- **Colours**:
  - `--maroon: #541B2A` (deep burgundy from logo)
  - `--maroon-deep: #300C16` (dark background sections and overlays)
  - `--gold: #DDB62B` (hairline accents and indicators)
  - `--grey: #5B5B5B` (sub-copy)
  - `--ivory: #FAF7F2` (warm page background)
- **WhatsApp Concierge**: `+91 99301 71094`
- **Hero Video Brief**: See [docs/hero-video-brief.md](./docs/hero-video-brief.md) for shot-by-shot production guidelines.

---

## 4. Production Build & Deployment to Vercel

```bash
npm run build
npm run start
```

Deployable to Vercel in 1-click by importing this repository and specifying Next.js preset.
