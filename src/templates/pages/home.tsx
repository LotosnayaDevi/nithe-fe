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
        <main style="padding-top: var(--nav-height); min-height: 100vh; overflow-x: clip;">

          {/* ── Hero ── */}
          <section
            data-reveal
            style="height: 90vh; background: url('/assets/images/hero.png') center/cover no-repeat;"
          />

          {/* ── Product Cards — Row 1 ── */}
          <section style="padding: var(--space-16) 40px;">
            <ProductGrid>
              {BEST_SELLERS_1.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

          {/* ── Product Cards — Row 2 ── */}
          <section style="padding: 0 40px var(--space-16);">
            <ProductGrid>
              {BEST_SELLERS_2.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </ProductGrid>
          </section>

          {/* ── Featured / Video Promotion Section ── */}
          <section className="relative" style="overflow: visible; height: 700px;">
            {/* Smoke — full section background */}
            <img
              src="/assets/images/smoke.png"
              alt=""
              style="position: absolute; bottom: 0; left: 0; width: 1600px; height: auto; max-width: none; pointer-events: none; mix-blend-mode: multiply; z-index: 1;"
            />

            <div
              className="relative"
              style="max-width: var(--max-width); margin: 0 auto; height: 100%; padding: 0 var(--page-padding);"
            >
              {/* Additional geometric shape — behind, overlapping right & lower */}
              <img
                data-reveal
                src="/assets/images/additional-shape.png"
                alt=""
                style="position: absolute; top: 8%; left: 4%; width: 55%; height: auto; z-index: 2; pointer-events: none;"
              />

              {/* Main geometric frame (left, in front) */}
              <div
                data-reveal
                className="relative"
                style="position: absolute; top: 0; left: var(--page-padding); width: 38%; height: 98%; z-index: 3;"
              >
                <img
                  src="/assets/images/video-frame.png"
                  alt=""
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; pointer-events: none;"
                />
              </div>

              {/* Text content — top right area */}
              <div
                style="position: absolute; top: 8%; right: 10%; z-index: 5;"
              >
                <span
                  data-reveal
                  style="font-size: 32px; letter-spacing: 0.02em; color: #F7F7F7; display: block; margin-bottom: var(--space-6);"
                >
                  Featured in this video:
                </span>
                <p
                  data-reveal
                  style="font-size: 32px; font-weight: var(--font-weight-light); letter-spacing: 0.02em; color: #F7F7F7;"
                >
                  &mdash; RT-01 dress
                </p>
              </div>
            </div>
          </section>

          {/* ── Product Cards — Row 3 + 4 (New Arrivals) ── */}
          <section style="padding: var(--space-16) 40px;">
            <div
              id="products-grid"
              className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style="gap: var(--grid-gap);"
              data-reveal-stagger
            >
              {NEW_ARRIVALS.map((p) => (
                <ProductCard variant="grid" {...p} href="/pages/product-info" />
              ))}
            </div>

            {/* Show more button */}
            <div style="text-align: center; margin-top: var(--space-12);">
              <button
                data-show-more
                data-reveal
                style="display: inline-block; padding: var(--space-3) var(--space-12); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wider); border: none; cursor: pointer;"
                className="transition-opacity hover:opacity-70"
              >
                show more
              </button>
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
