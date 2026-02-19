# Unified Product Card Component

## Problem

Product display is split across three separate implementations with no shared structure:
- `product-card.tsx` — grid card (code + price)
- `product.tsx` page — full product page (inline markup)
- No intermediate "info" view exists at all

## Design

One `ProductCard` component with a `variant` prop: `"grid" | "info" | "full"`.

### Shared data interface

```ts
interface ProductData {
  code: string;            // "JC-09"
  name?: string;           // "Corset JC-09" (full only)
  brand?: string;          // "NYTHE STUDIO" (full only)
  price: string;           // "₴20,774.00"
  currency?: string;       // "UAH" (full only)
  originalPrice?: string;  // strike-through price for sales
  imageCount?: number;     // carousel slides (info/full)
  sizes?: string[];        // ["XS","S","M","L","XL"] (full only)
  selectedSize?: string;   // (full only)
  qtyInCart?: number;      // (full only)
  attributes?: string[];   // ["WORK JACKET","100% COTTON"] (info)
  description?: string[];  // longer paragraphs (full only)
  href?: string;           // grid→info URL, info→full URL
}
```

### Variant: grid

- Used in catalog grids and home page sections
- Image placeholder (3:4 aspect ratio) with hover zoom
- Below: code (left) + price (right), single row
- Entire card wrapped in `<a>` when `href` provided
- `data-reveal` for scroll animation

### Variant: info

- Centered standalone page layout (max-width ~650px, auto margins)
- Image carousel with prev/next arrows + dot indicators
- Arrows positioned at viewport edges (outside the centered image)
- Below carousel: dots → code (bold, centered) → price (centered)
- Optional `attributes` rendered as uppercase centered stacked lines
- "+" link at bottom navigating to `href` (the full product page)

### Variant: full

- 2-column grid layout: image carousel (left col) + details panel (right col)
- Details panel: brand label, product name (h1), price + currency, tax note
- Size selector (reuses `SizeSelector` component)
- Quantity stepper (reuses `QtyStepper` component)
- "Add to cart" button (full-width, dark)
- Product description paragraphs below

### Navigation flow

```
Catalog grid (variant=grid) → Product info page (variant=info) → Product page (variant=full)
```

Each is a separate static HTML page. The "+" button on info is an `<a>` tag.

## File changes

| File | Action |
|------|--------|
| `src/templates/components/product-card.tsx` | Rewrite: unified component with 3 variants |
| `src/templates/pages/product.tsx` | Refactor: use `<ProductCard variant="full" />` |
| `src/templates/pages/product-info.tsx` | New: page template using `<ProductCard variant="info" />` |
| `src/templates/pages/catalog.tsx` | Update: pass `variant="grid"` and `href` to info page |
| `src/templates/pages/home.tsx` | Update: same as catalog |
| `src/templates/build.ts` | Register new `pages/product-info.html` route |

No new client-side JS needed. Existing carousel/qty-stepper handlers attach via data attributes.
