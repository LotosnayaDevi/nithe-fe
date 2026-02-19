import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { ProductGrid } from "../components/product-grid";

const NEW_ARRIVALS = [
  { code: "BG-01 Top", price: "₴12,300.00", href: "/pages/product?id=bg01" },
  { code: "BG-02 Corset", price: "₴24,126.00", href: "/pages/product?id=bg02" },
  { code: "BG-03 Dress", price: "₴18,500.00", href: "/pages/product?id=bg03" },
];

const BEST_SELLERS = [
  { code: "BG-04 Harness", price: "₴9,800.00", href: "/pages/product?id=bg04" },
  { code: "BG-05 Corset", price: "₴22,400.00", originalPrice: "₴28,000.00", href: "/pages/product?id=bg05" },
  { code: "BG-06 Top", price: "₴14,200.00", href: "/pages/product?id=bg06" },
];

export function renderHome(): string {
  return Page({
    title: "NYTHE — Beautifully Wrong.",
    bodyClass: "woocommerce home page",
    children: (
      <>
        <Nav activePath="/" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">

          {/* Hero */}
          <section
            className="flex flex-col items-center justify-center"
            style="height: 90vh; background-color: var(--color-bg-dark); color: var(--color-text-inverse); text-align: center; padding: 0 var(--page-padding);"
          >
            <h1
              data-reveal
              style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-widest); text-transform: uppercase; margin-bottom: var(--space-6);"
            >
              Beautifully Wrong.
            </h1>
            <p
              data-reveal
              style="font-size: var(--font-size-sm); color: var(--color-text-muted); max-width: 28rem; line-height: 1.8; margin-bottom: var(--space-8);"
            >
              Handcrafted leather pieces born from raw material and quiet rebellion. Made in Ukraine.
            </p>
            <a
              data-reveal
              href="/pages/catalog"
              style="display: inline-block; padding: var(--space-3) var(--space-8); border: 1px solid var(--color-text-inverse); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider); text-transform: uppercase; text-decoration: none;"
              className="transition-opacity hover:opacity-70"
            >
              Shop now
            </a>
          </section>

          {/* New Arrivals */}
          <section style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-24) var(--page-padding);">
            <div className="flex items-baseline justify-between" style="margin-bottom: var(--space-8);">
              <h2
                data-reveal
                className="uppercase"
                style="font-size: var(--font-size-lg); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-widest);"
              >
                New arrivals
              </h2>
              <a
                href="/pages/catalog"
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); text-decoration: underline;"
                className="transition-opacity hover:opacity-70"
              >
                View all
              </a>
            </div>
            <ProductGrid>
              {NEW_ARRIVALS.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

          {/* Featured banner */}
          <section
            style="background-color: var(--color-bg-light); padding: var(--space-24) var(--page-padding);"
          >
            <div
              className="flex flex-col md:flex-row items-center"
              style="max-width: var(--max-width); margin: 0 auto; gap: var(--space-12);"
            >
              <div
                data-reveal
                style="flex: 1; aspect-ratio: 4/5; background: linear-gradient(180deg, #888 0%, #ccc 100%); min-height: 320px;"
              />
              <div style="flex: 1;" data-reveal>
                <span
                  className="uppercase"
                  style="font-size: var(--font-size-xs); letter-spacing: var(--tracking-widest); color: var(--color-text-muted); display: block; margin-bottom: var(--space-4);"
                >
                  Featured
                </span>
                <h2
                  style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-6);"
                >
                  BG-02 Corset
                </h2>
                <p
                  style="font-size: var(--font-size-base); color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-8); max-width: 32rem;"
                >
                  Structured silhouette in full-grain leather with hand-finished boning channels. A signature piece that softens and moulds to the body over time.
                </p>
                <a
                  href="/pages/product?id=bg02"
                  style="display: inline-block; padding: var(--space-3) var(--space-8); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider); text-transform: uppercase; text-decoration: none;"
                  className="transition-opacity hover:opacity-70"
                >
                  View product
                </a>
              </div>
            </div>
          </section>

          {/* Best Sellers */}
          <section style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-24) var(--page-padding);">
            <div className="flex items-baseline justify-between" style="margin-bottom: var(--space-8);">
              <h2
                data-reveal
                className="uppercase"
                style="font-size: var(--font-size-lg); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-widest);"
              >
                Best sellers
              </h2>
              <a
                href="/pages/catalog"
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); text-decoration: underline;"
                className="transition-opacity hover:opacity-70"
              >
                View all
              </a>
            </div>
            <ProductGrid>
              {BEST_SELLERS.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

        </main>
        <Footer />
      </>
    ),
  });
}
