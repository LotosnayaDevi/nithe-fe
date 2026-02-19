import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { SizeSelector } from "../components/size-selector";
import { QtyStepper } from "../components/qty-stepper";
import { ImageCarousel } from "../components/image-carousel";

export function renderProduct(): string {
  return Page({
    title: "NYTHE — Corset JC-09",
    children: (
      <>
        <Nav />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style="max-width: var(--max-width); margin: 0 auto; gap: var(--grid-gap);"
          >
            {/* Image carousel */}
            <div style="padding: var(--page-padding);">
              <ImageCarousel imageCount={4} activeIndex={0} />
            </div>

            {/* Details */}
            <div style="padding: var(--page-padding);" data-reveal>
              <span className="label-text" style="display: block; margin-bottom: var(--space-4);">NYTHE STUDIO</span>
              <h1 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-4);">
                Corset JC-09
              </h1>
              <p style="font-size: var(--font-size-base); margin-bottom: var(--space-2);">₴20,774.00 UAH</p>
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-8);">
                Tax included. Shipping calculated at checkout.
              </p>

              <div style="margin-bottom: var(--space-6);">
                <SizeSelector sizes={["XS", "S", "M", "L", "XL"]} selected="XS" />
              </div>

              <div style="margin-bottom: var(--space-6);">
                <QtyStepper label="Quantity (1 in cart)" value={1} />
              </div>

              <button
                className="w-full transition-colors"
                style="padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wide); border: 1px solid var(--color-bg-dark);"
              >
                Add to cart
              </button>

              <div style="margin-top: var(--space-8);">
                <h2 style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);">
                  100% Vegetal Leather
                </h2>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-3);">
                  This sculpted top is crafted from 100% vegetal leather.
                </p>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-3);">
                  Each piece is handmade and hand-dyed. The design embraces the natural contours of your body for a flattering silhouette.
                </p>
                <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6;">
                  This item is available through pre-order. Production and preparation time is estimated between 4/5 days before shipping.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    ),
  });
}
