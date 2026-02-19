# NYTHE Style System & Layout Architecture

## Overview

Design system, layout components, and build architecture for the NYTHE fashion e-commerce site. Pure Bun tooling (no Vite), JSX templates pre-rendered to static HTML, CSS custom properties token system, Tailwind 4 via CLI, staggered reveal animations.

## Brand Identity

- **Name:** NYTHE /naɪθ/
- **Vibe:** Luxury handmade fashion. Dark, editorial, monospace. "Beautifully Wrong."
- **Origin:** Ukrainian brand (UAH ₴ currency, Telegram/TikTok/Instagram socials)

## Architecture

### Build Pipeline

```
src/templates/**/*.tsx  →  bun render.ts   →  *.html files (static)
src/pages/*.ts          →  bun build       →  dist/assets/*.js (interactive)
src/styles/*.css        →  tailwindcss cli →  dist/assets/styles.css
```

### Scripts

- `bun run dev` — render HTML + watch + Tailwind watch + dev server with live-reload
- `bun run build` — render + tailwind + bun build → production dist/
- `bun run render` — JSX templates → static HTML only

### Dev Server

Custom `serve.ts` using `Bun.serve()` with file watcher for live-reload (~30 lines). Watches `src/` for changes, re-renders HTML and triggers reload via WebSocket.

### Why No Vite

Bun provides native JSX, bundling (`Bun.build()`), and HTTP serving. Tailwind 4 has a standalone CLI. No plugin ecosystem needed.

## Style System: CSS Custom Properties

### tokens.css

```css
:root {
  /* === Colors === */
  --color-bg-dark: #000000;
  --color-bg-light: #fafafa;
  --color-bg-surface: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-inverse: #ffffff;
  --color-text-muted: #737373;
  --color-border-dark: #262626;
  --color-border-light: #e5e5e5;
  --color-accent: #c53030;

  /* === Typography === */
  --font-mono: 'IBM Plex Mono', monospace;
  --font-size-xs: 0.6875rem;    /* 11px — labels, uppercase tracking */
  --font-size-sm: 0.875rem;     /* 14px — body, nav links, prices */
  --font-size-base: 0.9375rem;  /* 15px — body text */
  --font-size-lg: 1.5rem;       /* 24px — logo */
  --font-size-xl: 2.25rem;      /* 36px — page titles */
  --font-size-2xl: 3rem;        /* 48px — hero heading */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.2em;

  /* === Spacing (4px grid) === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  /* === Animation === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-reveal: 800ms;
  --stagger-delay: 80ms;
  --reveal-distance: 12px;

  /* === Layout === */
  --max-width: 80rem;
  --nav-height: 5rem;
  --grid-gap: var(--space-6);
  --page-padding: var(--space-6);

  /* === Radius === */
  --radius-sm: 0.25rem;
  --radius-full: 9999px;
}
```

### Tailwind 4 Integration

Tokens registered via `@theme` in `main.css` so they work as both `var()` and Tailwind utilities:

```css
@import "tailwindcss";
@import "./tokens.css";

@theme {
  --color-bg-dark: var(--color-bg-dark);
  --color-bg-light: var(--color-bg-light);
  /* ... mapped 1:1 from tokens */
}
```

## Typography

**Single font family:** IBM Plex Mono (Google Fonts). Weights: 300, 400, 600.

| Element | Size | Weight | Tracking | Case |
|---------|------|--------|----------|------|
| Logo | `--font-size-lg` | semibold | widest | uppercase |
| Hero heading | `--font-size-2xl` | light | wide | mixed |
| Page title | `--font-size-xl` | light | wide | mixed |
| Nav links | `--font-size-sm` | regular | normal | mixed |
| Body text | `--font-size-sm` / `--font-size-base` | regular | normal | mixed |
| Labels | `--font-size-xs` | regular | wider | uppercase |
| Prices | `--font-size-sm` | regular | normal | — |

## Navigation (from Figma)

### Header
- **Left:** NYTHE /naɪθ/ logo (link to home)
- **Center:** Home · Corsets · Dresses · Tops · Contact
- **Right:** Ukraine | UAH ₴ ∨ dropdown, Search icon, Account icon, Cart icon
- **Style:** Black bg, fixed top, ~80px height, white text, 1px bottom border
- **Mobile:** Hamburger menu, category links in slide-down panel

### Footer
- **Row 1:** Telegram · TikTok · Instagram icons (center-left), "MADE BY [logo]" (right)
- **Row 2:** Nythe@brand.com (centered)
- **Row 3:** Refund policy · Privacy policy · Terms of service · Shipping policy
- **Row 4:** © 2026, NYTHE
- **Style:** Black bg, white/muted text, generous vertical padding

## Page Layouts

### Home (Main)
1. Hero: textured/grunge background, "Beautifully Wrong." tagline
2. Product grid: 3-col, "New In" section
3. Featured: model image in hexagonal clip + smoke texture, "Featured in this video" links
4. More product rows
5. "See More" button (centered, wide, dark)
6. Custom Made section: description text + "Contact Us" CTA

### Catalog
- Filter bar: "Filter: Availability" dropdown left, "Sort by: Best selling ∨" + count right
- 3-column product grid: image, product code, price (original + sale)
- Infinite scroll or pagination

### Product Detail
- **Main view:** Large image carousel (centered, arrows left/right, dot indicators) + price + material specs below
- **Info view:** Image left (55%), details right (45%) — brand label, title, price, tax note, size selector pills, quantity stepper, "Add to cart" button, description text

### Cart
- Title "Your cart" + "Continue shopping" link
- Table: PRODUCT | TOTAL | QUANTITY columns
- Each row: thumbnail, name, unit price, size, quantity stepper, line total
- Bottom: special instructions textarea (left), estimated total + checkout button + Apple Pay/Google Pay (right)

### Checkout
- 2-column: form (60%) left, order summary (40%) right
- Form sections: Contact info → Shipping address → Payment details → Billing address
- Order summary: product thumbnails with size/qty/price, subtotal/shipping/taxes/total

### Contact
- Centered: "Contact us" title, 2-col (name, email), phone, comment textarea, Send button

### Legal Pages (Privacy, Terms, Refund, Shipping)
- Shared template: title, prose content with h2/h3/p sections, centered max-width container

### About
- "About the NYTHE" title, "Our story" subtitle, prose paragraphs

### Search Overlay
- Full-screen dark overlay, search input at top with icon + close button, results dropdown below

## Component Library

### JSX Template Components (build-time only)

```
src/templates/
├── layouts/
│   └── base.tsx            # HTML shell, head, fonts, scripts
├── components/
│   ├── nav.tsx             # Header navigation
│   ├── footer.tsx          # Footer
│   ├── product-card.tsx    # Image + code + price
│   ├── product-grid.tsx    # 3-col responsive grid wrapper
│   ├── size-selector.tsx   # XS/S/M/L/XL pill buttons
│   ├── qty-stepper.tsx     # -/1/+ quantity control
│   ├── filter-bar.tsx      # Filter + sort bar
│   ├── image-carousel.tsx  # Dot navigation + arrows
│   ├── search-overlay.tsx  # Full-screen search
│   └── hero.tsx            # Home hero section
├── pages/
│   ├── home.tsx
│   ├── catalog.tsx
│   ├── product-main.tsx    # Carousel view
│   ├── product-info.tsx    # Detail view
│   ├── about.tsx
│   ├── contact.tsx
│   ├── cart.tsx
│   ├── checkout.tsx
│   └── legal.tsx           # Shared: privacy, terms, refund, shipping
└── build.ts                # Render orchestrator
```

### Interactive Modules (ship to browser)

```
src/pages/        # Page-specific interactivity
src/lib/
├── animate.ts    # IntersectionObserver staggered reveals
├── carousel.ts   # Image carousel logic
├── cart.ts       # Cart state management
├── search.ts     # Search overlay toggle + filtering
└── filters.ts    # Catalog filter/sort
```

## Animations: Staggered Reveals

### Implementation
- `src/lib/animate.ts` uses `IntersectionObserver` to detect elements entering viewport
- Elements with `data-reveal` attribute get animated
- `data-reveal-stagger` on parent applies incremental delays to children
- All driven by CSS custom properties (`--reveal-distance`, `--duration-reveal`, `--stagger-delay`)

### Behaviors
| Target | Animation | Timing |
|--------|-----------|--------|
| Grid items | fade + translateY(12px→0) | stagger +80ms per child |
| Text blocks | fade + translateY(8px→0) | stagger +60ms per line |
| Nav | fade on page load | 300ms ease-out |
| Product images (hover) | scale(1→1.02) | 400ms ease-out-quart |
| Nav links (hover) | underline slide-in from left | 200ms ease-out |
| Search overlay | fade-in backdrop + slide-down input | 300ms ease-out-expo |

### Respects Preferences
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-reveal: 0ms;
    --stagger-delay: 0ms;
    --reveal-distance: 0px;
  }
}
```

## File Structure (Final)

```
nithe-site-fe/
├── src/
│   ├── templates/          # Build-time JSX (never ships to browser)
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── pages/
│   │   └── build.ts
│   ├── pages/              # Client-side interactive TS
│   ├── lib/                # Shared client utilities
│   ├── styles/
│   │   ├── tokens.css      # CSS custom properties
│   │   └── main.css        # Tailwind entry + @theme
│   └── jsx-runtime.ts      # Custom JSX → HTML string runtime
├── serve.ts                # Bun dev server with live-reload
├── index.html              # Generated
├── pages/                  # Generated HTML
├── dist/                   # Production build output
├── assets/                 # Figma frames (reference)
├── docs/plans/             # This document
├── package.json
├── tsconfig.json
└── .gitignore
```
