# NYTHE Style System & Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete style system, layout components, and page templates for the NYTHE fashion e-commerce site using pure Bun tooling with JSX pre-rendering.

**Architecture:** Bun JSX templates render static HTML at build time via a custom string-based JSX runtime. Tailwind 4 processes CSS via its standalone CLI. A lightweight `Bun.serve()` dev server with WebSocket live-reload handles development. Interactive behavior ships as separate TS modules.

**Tech Stack:** Bun (runtime, bundler, JSX, dev server), Tailwind CSS 4 (via @tailwindcss/cli), IBM Plex Mono (Google Fonts), CSS custom properties, IntersectionObserver (animations)

**Design doc:** `docs/plans/2026-02-19-style-system-and-layout-design.md`

**Figma reference:** `assets/figma-frames/` (all .png files)

---

## Phase 1: Infrastructure

### Task 1: Remove Vite, Reconfigure for Bun

**Files:**
- Delete: `vite.config.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`
- Delete: `src/components/nav.ts` (old string-template nav)
- Delete: `src/lib/router.ts` (old nav helper)
- Delete: all generated HTML files (`index.html`, `pages/*.html`)
- Delete: all placeholder page TS files (`src/pages/*.ts`)

**Step 1: Remove Vite and old scaffolding**

```bash
rm vite.config.ts
rm src/components/nav.ts src/lib/router.ts
rm index.html
rm pages/*.html
rm src/pages/*.ts
rm src/main.ts
rm src/styles/main.css
```

**Step 2: Uninstall Vite, install Tailwind CLI**

```bash
bun remove vite @tailwindcss/vite
bun add -d @tailwindcss/cli tailwindcss
```

**Step 3: Update package.json scripts**

```json
{
  "name": "nithe-site-fe",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "render": "bun src/templates/build.ts",
    "css": "bunx @tailwindcss/cli -i src/styles/main.css -o dist/assets/styles.css",
    "css:watch": "bunx @tailwindcss/cli -i src/styles/main.css -o dist/assets/styles.css --watch",
    "bundle": "bun run src/bundle.ts",
    "build": "bun run render && bun run css && bun run bundle",
    "dev": "bun run serve.ts"
  },
  "devDependencies": {
    "@tailwindcss/cli": "latest",
    "tailwindcss": "latest",
    "typescript": "~5.9.3"
  }
}
```

**Step 4: Update tsconfig.json for JSX**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "jsx": "react-jsx",
    "jsxImportSource": "./src"
  },
  "include": ["src"]
}
```

**Step 5: Verify clean state**

```bash
bun run tsc --noEmit
```

Expected: Should pass (no source files to check yet after cleanup).

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Vite, reconfigure for pure Bun tooling"
```

---

### Task 2: Custom JSX Runtime (String-Based)

**Files:**
- Create: `src/jsx-runtime.ts`

The JSX runtime converts JSX syntax to HTML strings at build time. No React, no virtual DOM.

**Step 1: Create the JSX runtime**

```typescript
// src/jsx-runtime.ts

export type Child = string | number | boolean | null | undefined | Child[];
export type Props = Record<string, unknown> & { children?: Child | Child[] };
export type Component = (props: Props) => string;

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "param", "source", "track", "wbr",
]);

const ATTR_MAP: Record<string, string> = {
  className: "class",
  htmlFor: "for",
  tabIndex: "tabindex",
  viewBox: "viewBox",
  strokeWidth: "stroke-width",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  fillRule: "fill-rule",
  clipRule: "clip-rule",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderChildren(children: Child | Child[]): string {
  if (children == null || children === false || children === true) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(renderChildren).join("");
  return "";
}

function renderAttrs(props: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "key" || key === "ref") continue;
    if (value == null || value === false) continue;
    if (key === "dangerouslySetInnerHTML") continue;

    const attr = ATTR_MAP[key] ?? key;

    if (value === true) {
      parts.push(` ${attr}`);
    } else if (typeof value === "string") {
      parts.push(` ${attr}="${escapeHtml(value)}"`);
    } else {
      parts.push(` ${attr}="${escapeHtml(String(value))}"`);
    }
  }
  return parts.join("");
}

export function jsx(
  tag: string | Component,
  props: Props,
): string {
  if (typeof tag === "function") {
    return tag(props);
  }

  const attrs = renderAttrs(props);
  const tagName = tag;

  if (VOID_ELEMENTS.has(tagName)) {
    return `<${tagName}${attrs} />`;
  }

  let inner: string;
  if (props.dangerouslySetInnerHTML) {
    inner = (props.dangerouslySetInnerHTML as { __html: string }).__html;
  } else {
    inner = renderChildren(props.children);
  }

  return `<${tagName}${attrs}>${inner}</${tagName}>`;
}

export { jsx as jsxs, jsx as jsxDEV };

export function Fragment(props: { children?: Child | Child[] }): string {
  return renderChildren(props.children);
}
```

**Step 2: Create JSX type declarations**

Create `src/jsx.d.ts`:

```typescript
// src/jsx.d.ts
declare namespace JSX {
  type Element = string;
  interface IntrinsicElements {
    [elemName: string]: Record<string, unknown>;
  }
}
```

**Step 3: Verify JSX compiles — create a smoke test**

Create `src/templates/_smoke-test.tsx`:

```tsx
const Greeting = ({ name }: { name: string }) => (
  <div className="hello">
    <h1>Hello, {name}</h1>
  </div>
);

const html = <Greeting name="NYTHE" />;
console.log(html);
// Expected: <div class="hello"><h1>Hello, NYTHE</h1></div>
```

```bash
bun src/templates/_smoke-test.tsx
```

Expected output: `<div class="hello"><h1>Hello, NYTHE</h1></div>`

**Step 4: Clean up smoke test and commit**

```bash
rm src/templates/_smoke-test.tsx
git add -A
git commit -m "feat: add custom JSX string runtime for Bun"
```

---

### Task 3: CSS Token System + Tailwind Integration

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/main.css`

**Step 1: Create tokens.css**

```css
/* src/styles/tokens.css */
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
  --font-size-xs: 0.6875rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 0.9375rem;
  --font-size-lg: 1.5rem;
  --font-size-xl: 2.25rem;
  --font-size-2xl: 3rem;
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

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-reveal: 0ms;
    --stagger-delay: 0ms;
    --reveal-distance: 0px;
  }
}
```

**Step 2: Create main.css with Tailwind + theme mapping**

```css
/* src/styles/main.css */
@import "tailwindcss";
@import "./tokens.css";

@theme {
  --font-family-mono: var(--font-mono);

  --color-bg-dark: var(--color-bg-dark);
  --color-bg-light: var(--color-bg-light);
  --color-bg-surface: var(--color-bg-surface);
  --color-text-primary: var(--color-text-primary);
  --color-text-inverse: var(--color-text-inverse);
  --color-text-muted: var(--color-text-muted);
  --color-border-dark: var(--color-border-dark);
  --color-border-light: var(--color-border-light);
  --color-accent: var(--color-accent);
}

/* === Base styles === */
body {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  background-color: var(--color-bg-surface);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === Reveal animation base === */
[data-reveal] {
  opacity: 0;
  transform: translateY(var(--reveal-distance));
  transition:
    opacity var(--duration-reveal) var(--ease-out-expo),
    transform var(--duration-reveal) var(--ease-out-expo);
}

[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}

/* === Utility: label text === */
.label-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

/* === Utility: page title === */
.page-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-light);
  letter-spacing: var(--tracking-wide);
}
```

**Step 3: Verify Tailwind processes the CSS**

```bash
mkdir -p dist/assets
bunx @tailwindcss/cli -i src/styles/main.css -o dist/assets/styles.css
```

Expected: `dist/assets/styles.css` generated without errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add CSS token system and Tailwind 4 integration"
```

---

### Task 4: Dev Server with Live-Reload

**Files:**
- Create: `serve.ts`

**Step 1: Create the dev server**

```typescript
// serve.ts
import { watch } from "fs";
import { join, extname } from "path";

const DIST = join(import.meta.dir, "dist");
const SRC = join(import.meta.dir, "src");
const PORT = 3000;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const clients = new Set<ReadableStreamDefaultController>();

const RELOAD_SCRIPT = `<script>
(function(){
  const es = new EventSource("/__reload");
  es.onmessage = () => location.reload();
})();
</script>`;

function injectReload(html: string): string {
  return html.replace("</body>", `${RELOAD_SCRIPT}</body>`);
}

async function build() {
  console.log("[dev] Rendering templates...");
  const renderProc = Bun.spawn(["bun", "src/templates/build.ts"], { stdout: "inherit", stderr: "inherit" });
  await renderProc.exited;

  console.log("[dev] Building CSS...");
  const cssProc = Bun.spawn(
    ["bunx", "@tailwindcss/cli", "-i", "src/styles/main.css", "-o", "dist/assets/styles.css"],
    { stdout: "inherit", stderr: "inherit" },
  );
  await cssProc.exited;

  console.log("[dev] Bundling JS...");
  const bundleProc = Bun.spawn(["bun", "src/bundle.ts"], { stdout: "inherit", stderr: "inherit" });
  await bundleProc.exited;
}

function notifyClients() {
  for (const controller of clients) {
    try {
      controller.enqueue("data: reload\n\n");
    } catch {
      clients.delete(controller);
    }
  }
}

// Initial build
await build();

// Watch for changes
let debounce: Timer | null = null;
watch(SRC, { recursive: true }, () => {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(async () => {
    await build();
    notifyClients();
  }, 200);
});

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // SSE endpoint for live-reload
    if (pathname === "/__reload") {
      const stream = new ReadableStream({
        start(controller) {
          clients.add(controller);
          req.signal.addEventListener("abort", () => clients.delete(controller));
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Resolve path
    if (pathname === "/") pathname = "/index.html";
    if (!extname(pathname)) pathname += ".html";

    const filePath = join(DIST, pathname);
    const file = Bun.file(filePath);

    if (!(await file.exists())) {
      return new Response("Not Found", { status: 404 });
    }

    const ext = extname(pathname);
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    if (ext === ".html") {
      const html = await file.text();
      return new Response(injectReload(html), {
        headers: { "Content-Type": contentType },
      });
    }

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  },
});

console.log(`[dev] Server running at http://localhost:${PORT}`);
```

**Step 2: Verify it starts (will fail gracefully since build.ts doesn't exist yet)**

```bash
bun serve.ts
```

Expected: Server starts, build steps will error (expected at this stage). Ctrl+C to stop.

**Step 3: Commit**

```bash
git add serve.ts
git commit -m "feat: add Bun dev server with SSE live-reload"
```

---

### Task 5: Bundle Script

**Files:**
- Create: `src/bundle.ts`

**Step 1: Create the JS bundler script**

```typescript
// src/bundle.ts
import { join } from "path";
import { readdirSync, existsSync, mkdirSync } from "fs";

const PAGES_DIR = join(import.meta.dir, "pages");
const OUT_DIR = join(import.meta.dir, "..", "dist", "assets");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// Collect all page entry points
const entrypoints: string[] = [];
if (existsSync(PAGES_DIR)) {
  for (const file of readdirSync(PAGES_DIR)) {
    if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      entrypoints.push(join(PAGES_DIR, file));
    }
  }
}

// Also bundle the shared main entry
const mainEntry = join(import.meta.dir, "main.ts");
if (existsSync(mainEntry)) {
  entrypoints.push(mainEntry);
}

if (entrypoints.length === 0) {
  console.log("[bundle] No entry points found, skipping.");
  process.exit(0);
}

const result = await Bun.build({
  entrypoints,
  outdir: OUT_DIR,
  minify: process.env.NODE_ENV === "production",
  target: "browser",
  format: "esm",
});

if (!result.success) {
  console.error("[bundle] Build failed:");
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`[bundle] Built ${result.outputs.length} files.`);
```

**Step 2: Create placeholder main.ts for client-side**

```typescript
// src/main.ts
// Global client-side entry point — loads on every page
import "./lib/animate";
```

**Step 3: Create placeholder animate.ts**

```typescript
// src/lib/animate.ts
// Staggered reveal animations via IntersectionObserver — implemented in Phase 3
export function initRevealAnimations(): void {
  // placeholder
}
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Bun.build bundler script and client entry points"
```

---

## Phase 2: Layout Components (JSX Templates)

### Task 6: Base Layout Template

**Files:**
- Create: `src/templates/layouts/base.tsx`

**Step 1: Create the base HTML layout**

```tsx
// src/templates/layouts/base.tsx

interface BaseProps {
  title: string;
  children: string;
  bodyClass?: string;
  pageScript?: string;
}

export function Base({ title, children, bodyClass, pageScript }: BaseProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/styles.css" />
        <title>{title}</title>
      </head>
      <body className={bodyClass ?? ""}>
        {children}
        <script type="module" src="/assets/main.js"></script>
        {pageScript && <script type="module" src={`/assets/${pageScript}.js`} />}
      </body>
    </html>
  );
}

export function Page({ title, children, bodyClass, pageScript }: BaseProps) {
  return (
    "<!doctype html>\n" +
    Base({ title, children, bodyClass, pageScript })
  );
}
```

**Step 2: Verify it renders**

Create a quick test: `bun -e "import { Page } from './src/templates/layouts/base'; console.log(Page({ title: 'Test', children: '<h1>Hi</h1>' }))"`

Expected: Valid HTML5 document string with head, fonts, stylesheet link.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Base layout JSX template"
```

---

### Task 7: Nav Component

**Files:**
- Create: `src/templates/components/nav.tsx`

**Step 1: Build the nav matching Figma**

Reference: `assets/figma-frames/Cart.png` (clear nav screenshot)

```tsx
// src/templates/components/nav.tsx

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Corsets", href: "/catalog?category=corsets" },
  { label: "Dresses", href: "/catalog?category=dresses" },
  { label: "Tops", href: "/catalog?category=tops" },
  { label: "Contact", href: "/contact" },
];

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

export interface NavProps {
  activePath?: string;
}

export function Nav({ activePath }: NavProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style="background-color: var(--color-bg-dark); border-color: var(--color-border-dark); height: var(--nav-height);"
    >
      <nav className="flex items-center justify-between h-full" style="max-width: var(--max-width); margin: 0 auto; padding: 0 var(--page-padding);">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none" style="color: var(--color-text-inverse);">
          <span
            className="uppercase"
            style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-widest);"
          >
            NYTHE
          </span>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">/naɪθ/</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center" style="gap: var(--space-8);">
          {NAV_LINKS.map((link) => (
            <a
              href={link.href}
              className={`transition-colors hover:text-white ${activePath === link.href ? "text-white" : ""}`}
              style={`font-size: var(--font-size-sm); color: ${activePath === link.href ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
              data-nav
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right section: region + icons */}
        <div className="flex items-center" style="gap: var(--space-4); color: var(--color-text-inverse);">
          <span className="hidden lg:flex items-center" style="gap: var(--space-2); font-size: var(--font-size-sm); color: var(--color-text-muted);">
            Ukraine <span style="color: var(--color-border-dark);">|</span> UAH ₴
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          <a href="/search" className="transition-opacity hover:opacity-70" aria-label="Search" data-search-toggle>
            <SearchIcon />
          </a>
          <a href="/account" className="transition-opacity hover:opacity-70" aria-label="Account">
            <AccountIcon />
          </a>
          <a href="/cart" className="transition-opacity hover:opacity-70" aria-label="Cart">
            <CartIcon />
          </a>
          <button
            className="md:hidden transition-opacity hover:opacity-70"
            style="color: var(--color-text-inverse);"
            id="nav-toggle"
            aria-label="Toggle menu"
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="nav-mobile" className="hidden md:hidden" style="border-top: 1px solid var(--color-border-dark); background-color: var(--color-bg-dark);">
        <div className="flex flex-col" style="padding: var(--space-4) var(--page-padding); gap: var(--space-4);">
          {NAV_LINKS.map((link) => (
            <a
              href={link.href}
              style={`font-size: var(--font-size-sm); color: ${activePath === link.href ? "var(--color-text-inverse)" : "var(--color-text-muted)"};`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Nav JSX component matching Figma design"
```

---

### Task 8: Footer Component

**Files:**
- Create: `src/templates/components/footer.tsx`

**Step 1: Build footer matching Figma**

Reference: `assets/figma-frames/Cart.png`, `assets/figma-frames/Contact us.png`

```tsx
// src/templates/components/footer.tsx

function TelegramIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );
}

const LEGAL_LINKS = [
  { label: "Refund policy", href: "/refund" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Shipping policy", href: "/shipping" },
];

export function Footer() {
  return (
    <footer style="background-color: var(--color-bg-dark); color: var(--color-text-inverse); margin-top: auto;">
      <div style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-16) var(--page-padding) var(--space-8);">

        {/* Social + Made By */}
        <div className="flex flex-col md:flex-row items-center justify-between" style="margin-bottom: var(--space-8);">
          <div className="flex items-center" style="gap: var(--space-6); color: var(--color-text-inverse);">
            <a href="#" className="transition-opacity hover:opacity-70" aria-label="Telegram"><TelegramIcon /></a>
            <a href="#" className="transition-opacity hover:opacity-70" aria-label="TikTok"><TikTokIcon /></a>
            <a href="#" className="transition-opacity hover:opacity-70" aria-label="Instagram"><InstagramIcon /></a>
          </div>
          <div className="flex items-center" style="gap: var(--space-2); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider);">
            <span>MADE BY</span>
            {/* Placeholder for agency logo */}
            <span className="inline-block w-8 h-8" style="border: 1px solid var(--color-border-dark);"></span>
          </div>
        </div>

        {/* Email */}
        <div className="text-center" style="margin-bottom: var(--space-8);">
          <a
            href="mailto:Nythe@brand.com"
            className="transition-opacity hover:opacity-70"
            style="font-size: var(--font-size-base);"
          >
            Nythe@brand.com
          </a>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center" style="gap: var(--space-4); margin-bottom: var(--space-6);">
          {LEGAL_LINKS.map((link, i) => (
            <>
              <a
                href={link.href}
                className="transition-opacity hover:opacity-70"
                style="font-size: var(--font-size-sm); color: var(--color-text-muted);"
              >
                {link.label}
              </a>
              {i < LEGAL_LINKS.length - 1 && (
                <span style="color: var(--color-text-muted);">·</span>
              )}
            </>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center" style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
          © 2026, NYTHE
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Footer JSX component matching Figma design"
```

---

### Task 9: Build Script (Template Renderer)

**Files:**
- Create: `src/templates/build.ts`
- Create: `src/templates/pages/home.tsx` (minimal placeholder)

**Step 1: Create directory structure**

```bash
mkdir -p src/templates/{layouts,components,pages}
```

**Step 2: Create the build/render script**

```typescript
// src/templates/build.ts
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

// Import page renderers
import { renderHome } from "./pages/home";

const DIST = join(import.meta.dir, "..", "..", "dist");

interface PageDef {
  path: string;
  render: () => string;
}

const pages: PageDef[] = [
  { path: "index.html", render: renderHome },
];

// Ensure dist dirs exist
mkdirSync(join(DIST, "pages"), { recursive: true });
mkdirSync(join(DIST, "assets"), { recursive: true });

for (const page of pages) {
  const filePath = join(DIST, page.path);
  const html = page.render();
  await Bun.write(filePath, html);
  console.log(`[render] ${page.path}`);
}

console.log(`[render] Done — ${pages.length} pages.`);
```

**Step 3: Create home page placeholder**

```tsx
// src/templates/pages/home.tsx
import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

export function renderHome(): string {
  return Page({
    title: "NYTHE — Beautifully Wrong.",
    children: (
      <>
        <Nav activePath="/" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <section className="flex items-center justify-center" style="height: 60vh;">
            <h1 className="page-title">Beautifully Wrong.</h1>
          </section>
        </main>
        <Footer />
      </>
    ),
  });
}
```

**Step 4: Run the render**

```bash
bun src/templates/build.ts
```

Expected: `[render] index.html` then `[render] Done — 1 pages.` — and `dist/index.html` is a valid HTML file with nav, content, footer.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add build.ts render script with home page placeholder"
```

---

## Phase 3: All Page Templates

### Task 10: Catalog Page Template

**Files:**
- Create: `src/templates/components/product-card.tsx`
- Create: `src/templates/components/product-grid.tsx`
- Create: `src/templates/components/filter-bar.tsx`
- Create: `src/templates/pages/catalog.tsx`
- Modify: `src/templates/build.ts` (add catalog to pages array)

The catalog page shows a 3-col product grid with filter bar. Reference: `assets/figma-frames/Catalog.png`

**Product card:** Image placeholder, product code (e.g. "BG-02"), price with optional original price. No border, clean minimal card.

**Filter bar:** "Filter: Availability" left, "Sort by: Best selling ∨ · 27 products" right.

**Product grid:** CSS Grid, 3 cols on desktop, 2 on tablet, 1 on mobile. Uses `data-reveal` with stagger on children.

Page renders at `dist/pages/catalog.html`.

**Commit message:** `feat: add Catalog page with product grid and filter bar`

---

### Task 11: Product Detail Page Templates

**Files:**
- Create: `src/templates/components/image-carousel.tsx`
- Create: `src/templates/components/size-selector.tsx`
- Create: `src/templates/components/qty-stepper.tsx`
- Create: `src/templates/pages/product.tsx`
- Modify: `src/templates/build.ts` (add product to pages array)

Two views from Figma:
1. **Product card Main** — centered carousel with dots + arrows, price and material specs below
2. **Product card Info** — 55/45 split, image left, details right (brand label, title, price, sizes, quantity, add to cart, description)

Implement the Info view as the primary product page. The carousel view can be a variant.

Reference: `assets/figma-frames/Product card Main.png`, `assets/figma-frames/Product card-Info.png`

**Size selector:** Pill buttons (XS, S, M, L, XL) with border, selected state fills black. Uses `--radius-full`.

**Qty stepper:** Bordered pill with - [number] + buttons.

**Commit message:** `feat: add Product detail page with size selector, qty stepper, carousel`

---

### Task 12: Cart Page Template

**Files:**
- Create: `src/templates/pages/cart.tsx`
- Modify: `src/templates/build.ts`

Reference: `assets/figma-frames/Cart.png`, `assets/figma-frames/Empty cart.png`

Two states:
1. **Items in cart:** Table with product rows (thumbnail, name, price, size, qty stepper, line total), special instructions textarea, estimated total, checkout button, Apple Pay / Google Pay buttons
2. **Empty cart:** "Your cart is empty" heading, "Continue shopping" button, "Have an account? Log in to check out faster."

Render with sample data for now. Empty state handled by a conditional.

**Commit message:** `feat: add Cart page with empty and populated states`

---

### Task 13: Checkout Page Template

**Files:**
- Create: `src/templates/pages/checkout.tsx`
- Modify: `src/templates/build.ts`

Reference: `assets/figma-frames/Check Out.png`

2-column layout: form (left ~60%), order summary (right ~40%).

Form sections with uppercase labels: Contact Information, Shipping Address (first/last, address, apartment, city/country, state/zip, phone), Payment Details, Billing Address.

Order summary: product thumbnails, size/qty, prices, subtotal/shipping/taxes/total.

**Commit message:** `feat: add Checkout page with form and order summary`

---

### Task 14: Contact Page Template

**Files:**
- Create: `src/templates/pages/contact.tsx`
- Modify: `src/templates/build.ts`

Reference: `assets/figma-frames/Contact us.png`

Centered layout. "Contact us" page title. Form: 2-col row (Name, Email), Phone, Comment textarea, Send button. All inputs use monospace font, light borders.

**Commit message:** `feat: add Contact page with form`

---

### Task 15: About Page Template

**Files:**
- Create: `src/templates/pages/about.tsx`
- Modify: `src/templates/build.ts`

Reference: `assets/figma-frames/About.png`

Centered prose: "About the NYTHE" title, "Our story" subtitle, paragraphs of text. Max-width prose container.

**Commit message:** `feat: add About page`

---

### Task 16: Legal Pages (Shared Template)

**Files:**
- Create: `src/templates/pages/legal.tsx`
- Modify: `src/templates/build.ts` (add privacy, terms, refund, shipping)

Reference: `assets/figma-frames/Privacy.png`, `assets/figma-frames/Terms.png`, `assets/figma-frames/Refund.png`, `assets/figma-frames/Shipping.png`

All 4 use the same template: page title + prose content with h2/h3/p sections in a centered container. Content varies per page. Create a shared `LegalPage` component that takes title + content sections.

Renders to: `dist/pages/privacy.html`, `dist/pages/terms.html`, `dist/pages/refund.html`, `dist/pages/shipping.html`

**Commit message:** `feat: add legal pages (privacy, terms, refund, shipping)`

---

### Task 17: Search Overlay Template

**Files:**
- Create: `src/templates/components/search-overlay.tsx`
- Include in base layout (hidden by default, toggled by JS)

Reference: `assets/figma-frames/Search Overlay.png`

Full-screen dark overlay. Top: search input (white bg, full width) with search icon + close button. Below: results dropdown (light bg) with suggestion items.

Hidden by default (`hidden` class), toggled via `data-search-toggle` button in nav.

**Commit message:** `feat: add Search overlay component`

---

## Phase 4: Interactivity & Animations

### Task 18: Staggered Reveal Animation System

**Files:**
- Modify: `src/lib/animate.ts` (replace placeholder)
- Modify: `src/main.ts`

**Implementation:**

```typescript
// src/lib/animate.ts
export function initRevealAnimations(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target as HTMLElement;

        if (el.hasAttribute("data-reveal-stagger")) {
          // Stagger children
          const children = el.querySelectorAll("[data-reveal]");
          children.forEach((child, i) => {
            const delay = i * parseFloat(
              getComputedStyle(document.documentElement)
                .getPropertyValue("--stagger-delay")
                .replace("ms", "")
            );
            (child as HTMLElement).style.transitionDelay = `${delay}ms`;
            child.classList.add("revealed");
          });
        } else {
          el.classList.add("revealed");
        }

        observer.unobserve(el);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll("[data-reveal], [data-reveal-stagger]").forEach((el) => {
    observer.observe(el);
  });
}
```

Update `src/main.ts`:

```typescript
// src/main.ts
import { initRevealAnimations } from "./lib/animate";

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
});
```

Add `data-reveal` attributes to template components (product grid children, text blocks, sections).

**Commit message:** `feat: add IntersectionObserver staggered reveal animations`

---

### Task 19: Mobile Nav Toggle

**Files:**
- Create: `src/lib/nav.ts`
- Modify: `src/main.ts`

Simple toggle: click `#nav-toggle` → toggle `hidden` on `#nav-mobile`.

**Commit message:** `feat: add mobile nav toggle`

---

### Task 20: Search Overlay Toggle

**Files:**
- Create: `src/lib/search.ts`
- Modify: `src/main.ts`

Click `[data-search-toggle]` → show search overlay. Click close or press Escape → hide. Focus the input on open.

**Commit message:** `feat: add search overlay toggle`

---

### Task 21: Final Integration & Verification

**Step 1: Run full build**

```bash
bun run build
```

Expected: All HTML files in `dist/`, CSS in `dist/assets/styles.css`, JS bundles in `dist/assets/`.

**Step 2: Start dev server and verify all pages**

```bash
bun run dev
```

Visit each page, verify:
- Nav renders correctly with active states
- Footer renders correctly
- Page content matches Figma layouts
- Animations trigger on scroll
- Mobile nav works
- Search overlay opens/closes
- All inter-page links work

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: complete NYTHE site layout and style system"
```
