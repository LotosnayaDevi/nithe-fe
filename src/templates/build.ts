import { mkdirSync } from "fs";
import { join } from "path";

import { renderHome } from "./pages/home";
import { renderCatalog } from "./pages/catalog";
import { renderProduct } from "./pages/product";
import { renderCart } from "./pages/cart";
import { renderCheckout } from "./pages/checkout";
import { renderContact } from "./pages/contact";
import { renderAbout } from "./pages/about";
import { renderPrivacy, renderTerms, renderRefund, renderShipping } from "./pages/legal";

const DIST = join(import.meta.dir, "..", "..", "dist");

interface PageDef {
  path: string;
  render: () => string;
}

const pages: PageDef[] = [
  { path: "index.html", render: renderHome },
  { path: "pages/catalog.html", render: renderCatalog },
  { path: "pages/product.html", render: renderProduct },
  { path: "pages/cart.html", render: renderCart },
  { path: "pages/checkout.html", render: renderCheckout },
  { path: "pages/contact.html", render: renderContact },
  { path: "pages/about.html", render: renderAbout },
  { path: "pages/privacy.html", render: renderPrivacy },
  { path: "pages/terms.html", render: renderTerms },
  { path: "pages/refund.html", render: renderRefund },
  { path: "pages/shipping.html", render: renderShipping },
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
