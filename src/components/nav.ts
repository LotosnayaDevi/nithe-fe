export interface NavLink {
  label: string;
  href: string;
  group?: "main" | "legal";
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/pages/catalog.html" },
  { label: "About", href: "/pages/about.html" },
  { label: "Contact", href: "/pages/contact.html" },
  { label: "Cart", href: "/pages/cart.html" },
];

const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: "/pages/privacy.html" },
  { label: "Terms", href: "/pages/terms.html" },
  { label: "Refund", href: "/pages/refund.html" },
  { label: "Shipping", href: "/pages/shipping.html" },
];

function isActive(href: string): boolean {
  const path = window.location.pathname;
  // Handle both dev (exact) and prod (with/without trailing slash)
  if (href === "/") return path === "/" || path === "/index.html";
  return path === href || path === href.replace(".html", "");
}

function renderLink(link: NavLink): string {
  const active = isActive(link.href);
  return `<a href="${link.href}" data-nav class="${active ? "text-white" : "text-neutral-400 hover:text-white"} transition-colors">${link.label}</a>`;
}

export function createNav(): string {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" class="text-white text-lg font-semibold tracking-widest uppercase">NITHE</a>
        <div class="hidden md:flex items-center gap-8 text-sm">
          ${NAV_LINKS.map(renderLink).join("\n")}
        </div>
        <div class="flex items-center gap-4">
          <a href="/pages/search.html" data-nav class="${isActive("/pages/search.html") ? "text-white" : "text-neutral-400 hover:text-white"} transition-colors text-sm">Search</a>
          <a href="/pages/cart.html" data-nav class="${isActive("/pages/cart.html") ? "text-white" : "text-neutral-400 hover:text-white"} transition-colors text-sm">Cart</a>
          <button id="nav-toggle" class="md:hidden text-white" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      <div id="nav-mobile" class="md:hidden hidden border-t border-neutral-800 bg-neutral-950">
        <div class="flex flex-col gap-4 px-6 py-4 text-sm">
          ${NAV_LINKS.map(renderLink).join("\n")}
        </div>
      </div>
    </nav>
  `;
}

export function createFooter(): string {
  return `
    <footer class="border-t border-neutral-800 bg-neutral-950 mt-auto">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <a href="/" class="text-white text-lg font-semibold tracking-widest uppercase">NITHE</a>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <span class="text-neutral-500 uppercase text-xs tracking-wider mb-1">Shop</span>
            ${NAV_LINKS.filter((l) => l.href !== "/").map((l) => `<a href="${l.href}" class="text-neutral-400 hover:text-white transition-colors">${l.label}</a>`).join("\n")}
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <span class="text-neutral-500 uppercase text-xs tracking-wider mb-1">Info</span>
            ${LEGAL_LINKS.map((l) => `<a href="${l.href}" class="text-neutral-400 hover:text-white transition-colors">${l.label}</a>`).join("\n")}
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function mountNav(): void {
  const app = document.getElementById("app");
  if (!app) return;

  // Wrap existing content with nav + footer
  const content = app.innerHTML;
  app.innerHTML = `
    ${createNav()}
    <main class="pt-16 min-h-screen">
      ${content}
    </main>
    ${createFooter()}
  `;

  // Mobile toggle
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  toggle?.addEventListener("click", () => {
    mobile?.classList.toggle("hidden");
  });
}
