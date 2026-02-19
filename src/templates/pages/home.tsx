import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { ProductGrid } from "../components/product-grid";

const BEST_SELLERS_1 = [
  { code: "Best Sell", price: "₴12,300.00" },
  { code: "Best Sell", price: "₴24,126.00" },
  { code: "Best Sell", price: "₴18,500.00" },
];

const BEST_SELLERS_2 = [
  { code: "Best Sell", price: "₴9,800.00" },
  { code: "Best Sell", price: "₴22,400.00" },
  { code: "Best Sell", price: "₴14,200.00" },
];

const NEW_ARRIVALS = [
  { code: "BG-01", price: "₴12,300.00" },
  { code: "BG-02", price: "₴24,126.00" },
  { code: "BG-03", price: "₴18,500.00" },
  { code: "BG-04", price: "₴9,800.00" },
  { code: "BG-05", price: "₴22,400.00" },
  { code: "BG-06", price: "₴14,200.00" },
];

export function renderHome(): string {
  return Page({
    title: "NYTHE — Beautifully Wrong.",
    bodyClass: "woocommerce home page",
    children: (
      <>
        <Nav activePath="/" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">

          {/* ── Hero ── */}
          <section
            data-reveal
            style="height: 90vh; background: url('/assets/images/hero.png') center/cover no-repeat;"
          />

          {/* ── Best Sellers — Row 1 ── */}
          <section style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-16) var(--page-padding);">
            <div className="flex items-baseline justify-between" style="margin-bottom: var(--space-8);">
              <h2
                data-reveal
                className="uppercase"
                style="font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); letter-spacing: var(--tracking-widest);"
              >
                Best Sell
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
              {BEST_SELLERS_1.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

          {/* ── Featured Section ── */}
          <section style="padding: 0 var(--page-padding);">
            <div
              className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden"
              style="max-width: var(--max-width); margin: 0 auto; min-height: 500px;"
            >
              {/* Left — model image with geometric clip */}
              <div
                data-reveal
                className="relative"
                style="min-height: 400px;"
              >
                <div
                  style="position: absolute; inset: 0; background: linear-gradient(180deg, #555 0%, #999 100%); clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);"
                />
              </div>

              {/* Right — text over smoke/ink background */}
              <div
                className="flex flex-col justify-center"
                style="padding: var(--space-12); background: radial-gradient(ellipse at 30% 50%, rgba(80,80,80,0.3) 0%, transparent 70%), linear-gradient(180deg, #f8f8f8 0%, #e0e0e0 100%);"
              >
                <span
                  data-reveal
                  className="uppercase"
                  style="font-size: var(--font-size-xs); letter-spacing: var(--tracking-widest); color: var(--color-text-muted); display: block; margin-bottom: var(--space-4);"
                >
                  Featured in this video
                </span>
                <h2
                  data-reveal
                  style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-4);"
                >
                  &rsaquo; BT-02 Dress
                </h2>
              </div>
            </div>
          </section>

          {/* ── Best Sellers — Row 2 ── */}
          <section style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-16) var(--page-padding);">
            <div className="flex items-baseline justify-between" style="margin-bottom: var(--space-8);">
              <h2
                data-reveal
                className="uppercase"
                style="font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); letter-spacing: var(--tracking-widest);"
              >
                Best Sell
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
              {BEST_SELLERS_2.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

          {/* ── New Arrivals Grid ── */}
          <section style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-16) var(--page-padding);">
            <ProductGrid>
              {NEW_ARRIVALS.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>

            {/* Show more button */}
            <div style="text-align: center; margin-top: var(--space-12);">
              <a
                href="/pages/catalog"
                data-reveal
                style="display: inline-block; padding: var(--space-3) var(--space-12); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider); text-decoration: none;"
                className="transition-opacity hover:opacity-70"
              >
                show more
              </a>
            </div>
          </section>

          {/* ── Custom Made Section ── */}
          <section style="background-color: #1A1A1A; color: var(--color-text-inverse); padding: var(--space-24) var(--page-padding);">
            <div
              data-reveal
              style="max-width: 40rem; margin: 0 auto; text-align: center;"
            >
              <h2
                style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-8);"
              >
                Custom Made
              </h2>
              <p
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-6);"
              >
                Our custom-made corsets begin with measurements of your bust and waist, ensuring a fit that enhances your natural curves.
              </p>
              <p
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-6);"
              >
                Choose from a variety of fabric colors to find the perfect hue that matches your style and mood.
              </p>
              <p
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.8; margin-bottom: var(--space-8);"
              >
                Once we have your size and color preferences, we'll work closely with you to explore additional customization options. Whether it's selecting the silhouette, deciding on the length, or adding embellishments, every detail of your corset is tailored to your desires.
              </p>
              <a
                href="/pages/contact"
                style="display: inline-block; padding: var(--space-3) var(--space-12); border: 1px solid var(--color-text-inverse); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider); text-decoration: none;"
                className="transition-opacity hover:opacity-70"
              >
                Contact us
              </a>
            </div>
          </section>

        </main>
        <Footer />
      </>
    ),
  });
}
