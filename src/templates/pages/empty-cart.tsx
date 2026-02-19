import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

export function renderEmptyCart(): string {
  return Page({
    title: "NYTHE — Cart",
    bodyClass: "woocommerce woocommerce-cart",
    children: (
      <>
        <Nav activePath="/cart" />
        <main style="padding-top: var(--nav-height); flex: 1; background-color: var(--color-bg-light, #F7F7F7);">
          <div style="text-align: center; padding: 80px var(--page-padding) 120px;">
            <h1
              style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-8);"
            >
              Your cart is empty
            </h1>
            <a
              href="/pages/catalog"
              style="display: inline-block; padding: var(--space-4) var(--space-16); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); font-family: var(--font-mono); text-decoration: none; letter-spacing: var(--tracking-wide);"
            >
              Continue shopping
            </a>

            <div style="margin-top: 60px;">
              <h2
                style="font-size: var(--font-size-lg); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-3);"
              >
                Have an account?
              </h2>
              <p style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
                <a href="#" style="color: var(--color-accent); text-decoration: none;">Log in</a> to check out faster.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    ),
  });
}
