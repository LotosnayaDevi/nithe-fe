import { mkdirSync, cpSync } from "fs";
import { join } from "path";

import { renderHome } from "./pages/home";
import { renderCatalog } from "./pages/catalog";
import { renderProduct } from "./pages/product";
import { renderProductInfo } from "./pages/product-info";
import { renderCart } from "./pages/cart";
import { renderCheckout } from "./pages/checkout";
import { renderContact } from "./pages/contact";
import { renderAbout } from "./pages/about";
import { renderPrivacy, renderTerms, renderRefund, renderShipping } from "./pages/legal";
import { renderEmptyCart } from "./pages/empty-cart";

const DIST = join(import.meta.dir, "..", "..", "dist");

interface PageDef {
  path: string;
  render: () => string;
}

const pages: PageDef[] = [
  { path: "index.html", render: renderHome },
  { path: "pages/catalog.html", render: renderCatalog },
  { path: "pages/product.html", render: renderProduct },
  { path: "pages/product-info.html", render: renderProductInfo },
  { path: "pages/cart.html", render: renderCart },
  { path: "pages/checkout.html", render: renderCheckout },
  { path: "pages/contact.html", render: renderContact },
  { path: "pages/about.html", render: renderAbout },
  { path: "pages/privacy.html", render: renderPrivacy },
  { path: "pages/terms.html", render: renderTerms },
  { path: "pages/refund.html", render: renderRefund },
  { path: "pages/shipping.html", render: renderShipping },
  { path: "pages/empty-cart.html", render: renderEmptyCart },
];

// Ensure dist dirs exist
mkdirSync(join(DIST, "pages"), { recursive: true });
mkdirSync(join(DIST, "assets", "images"), { recursive: true });

// Copy static images
const ASSETS_SRC = join(import.meta.dir, "..", "..", "assets", "imgs");
cpSync(join(ASSETS_SRC, "HERO.png"), join(DIST, "assets", "images", "hero.png"));
cpSync(join(ASSETS_SRC, "underline.png"), join(DIST, "assets", "images", "underline.png"));
cpSync(join(ASSETS_SRC, "LOGO rova.png"), join(DIST, "assets", "images", "logo-rova.png"));
cpSync(join(ASSETS_SRC, "logo.png"), join(DIST, "assets", "images", "logo.png"));
cpSync(join(ASSETS_SRC, "video frame.png"), join(DIST, "assets", "images", "video-frame.png"));
cpSync(join(ASSETS_SRC, "additional shape.png"), join(DIST, "assets", "images", "additional-shape.png"));
cpSync(join(ASSETS_SRC, "Smoke.png"), join(DIST, "assets", "images", "smoke.png"));

for (const page of pages) {
  const filePath = join(DIST, page.path);
  const html = page.render();
  await Bun.write(filePath, html);
  console.log(`[render] ${page.path}`);
}

console.log(`[render] Done — ${pages.length} pages.`);
