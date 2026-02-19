# NYTHE — Frontend

Static-first e-commerce frontend for the NYTHE brand. Built with **Bun**, **TypeScript**, and **Tailwind CSS**. Designed to integrate with a **WooCommerce** backend.

## Architecture

### Compile-time JSX (no runtime framework)

This project uses JSX purely as a **compile-time HTML templating language**. There is no React, Preact, or any virtual DOM library.

The custom JSX runtime (`src/jsx-runtime.ts`) converts JSX expressions into plain HTML strings at build time. When you run `bun run render`, each page function executes once, produces an HTML string, and writes it to `dist/`. The browser never loads a JSX runtime — it receives only static `.html` files.

```
.tsx component → (Bun executes at build time) → HTML string → .html file in dist/
```

The `tsconfig.json` points `jsxImportSource` to the package itself (`nithe-site-fe`), which resolves to `src/jsx-runtime.ts` via the `exports` field in `package.json`. This gives full TypeScript JSX support (autocompletion, type checking) while producing zero client-side framework overhead.

### Client-side interactivity

All browser-side behavior lives in `src/main.ts` — vanilla TypeScript bundled by Bun into a single ES module. There is no client-side component model. Interactive features (dropdowns, search overlay, quantity steppers, cart badge) use DOM queries and event listeners.

## Project Structure

```
├── api/                        # Vercel serverless functions (cart API)
│   ├── _store.ts               #   In-memory cart store (demo/dev)
│   └── cart/                   #   REST endpoints: GET /api/cart, POST add/update/remove
├── assets/
│   ├── figma-frames/           # Reference screenshots from Figma
│   └── imgs/                   # Source images (copied to dist at build time)
├── dist/                       # Build output (git-ignored, deployed to Vercel)
├── public/                     # Static files copied to dist root
├── src/
│   ├── jsx-runtime.ts          # Custom JSX → HTML string runtime (compile-time only)
│   ├── jsx.d.ts                # JSX type definitions for TypeScript
│   ├── main.ts                 # Client-side JS entry (nav, search, cart, dropdowns, etc.)
│   ├── bundle.ts               # Bun bundler config — bundles main.ts for the browser
│   ├── lib/
│   │   └── animate.ts          # Scroll-reveal animation helpers
│   ├── styles/
│   │   ├── main.css            # Tailwind entry + custom styles
│   │   └── tokens.css          # Design tokens (colors, typography, spacing, animation)
│   └── templates/
│       ├── build.ts            # Build script — renders all pages and copies assets
│       ├── layouts/
│       │   └── base.tsx        # HTML document shell (head, scripts, shared overlay)
│       ├── components/         # Reusable JSX components (nav, footer, product card, etc.)
│       │   ├── nav.tsx
│       │   ├── footer.tsx
│       │   ├── product-card.tsx
│       │   ├── product-grid.tsx
│       │   ├── filter-bar.tsx
│       │   ├── search-overlay.tsx
│       │   ├── qty-stepper.tsx
│       │   ├── size-selector.tsx
│       │   └── image-carousel.tsx
│       └── pages/              # One file per page, each exports a render function
│           ├── home.tsx
│           ├── catalog.tsx
│           ├── product.tsx
│           ├── product-info.tsx
│           ├── cart.tsx
│           ├── empty-cart.tsx
│           ├── checkout.tsx
│           ├── contact.tsx
│           ├── about.tsx
│           └── legal.tsx       # Privacy, terms, refund, shipping
├── serve.ts                    # Dev server with live reload and mock cart API
├── vercel.json                 # Vercel deployment config
├── package.json
└── tsconfig.json
```

## Build Pipeline

The build runs three steps in sequence (`bun run build`):

1. **`render`** — Executes `src/templates/build.ts` with Bun. Imports all page modules, calls their render functions, and writes static HTML files to `dist/`. Also copies images from `assets/imgs/` to `dist/assets/images/`.
2. **`css`** — Runs Tailwind CLI to compile `src/styles/main.css` (which imports `tokens.css`) into `dist/assets/styles.css`.
3. **`bundle`** — Runs `src/bundle.ts` which uses `Bun.build()` to bundle `src/main.ts` into `dist/assets/main.js` as a browser-targeted ES module.

## Development

```bash
# Install dependencies
bun install

# Start dev server with live reload (port 3000)
bun run dev

# Production build
bun run build
```

The dev server (`serve.ts`) performs a full build on startup, then watches `src/` for changes and triggers rebuilds with SSE-based live reload. It also provides a mock in-memory cart API at `/api/cart/*` so the frontend can be developed without a WooCommerce backend.

## Deployment

Deployed to **Vercel** as a static site. The `dist/` directory is the output. Serverless functions in `api/` handle cart operations (demo store — in-memory, resets on cold start).

## WooCommerce Integration

The HTML structure uses WooCommerce-compatible class names (`woocommerce-product-gallery__image`, `price`, `single_add_to_cart_button`, `form.cart`, etc.) so the templates can be connected to a WooCommerce backend. The client-side JS in `main.ts` includes both vanilla cart logic and a jQuery-based AJAX cart module that targets the `/api/cart` endpoints.

## Design Tokens

All visual constants are defined as CSS custom properties in `src/styles/tokens.css`: colors, typography (IBM Plex Mono), spacing on a 4px grid, animation curves/durations, and layout constraints. The tokens respect `prefers-reduced-motion`.
