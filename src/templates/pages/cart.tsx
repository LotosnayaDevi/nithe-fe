import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { QtyStepper } from "../components/qty-stepper";

interface CartItem {
  name: string;
  price: string;
  size: string;
  qty: number;
  total: string;
}

const CART_ITEMS: CartItem[] = [
  { name: "Corset: BG-01", price: "₴20,809.00", size: "XS", qty: 1, total: "₴20,809.00" },
  { name: "Corset: BG-01", price: "₴15,102.00", size: "", qty: 1, total: "₴15,102.00" },
  { name: "Corset: BG-01", price: "₴20,809.00", size: "XS", qty: 1, total: "₴20,809.00" },
];

const ESTIMATED_TOTAL = "₴56,720.00";

function parsePrice(str: string): number {
  return parseFloat(str.replace(/[₴,]/g, "")) || 0;
}

function CartItemRow({ item }: { item: CartItem }) {
  const unitPrice = parsePrice(item.price);
  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center"
      style="padding: var(--space-6) 0; border-bottom: 1px solid var(--color-border-light); gap: var(--space-4);"
      data-cart-row
      data-unit-price={String(unitPrice)}
    >
      {/* Product info */}
      <div className="flex items-center" style="flex: 1; gap: var(--space-4); min-width: 0;">
        <div
          style="width: 80px; height: 100px; min-width: 80px; background: linear-gradient(135deg, #e5e5e5, #c4c4c4);"
        />
        <div>
          <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); margin-bottom: var(--space-1);">
            {item.name}
          </div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
            {item.price}
          </div>
          {item.size && (
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: var(--space-1);">
              Size: {item.size}
            </div>
          )}
        </div>
      </div>

      {/* Quantity stepper */}
      <div>
        <QtyStepper value={item.qty} />
      </div>

      {/* Row total */}
      <div style="min-width: 120px; text-align: right; font-size: var(--font-size-sm);" data-row-total>
        {item.total}
      </div>
    </div>
  );
}

export function renderCart(): string {
  return Page({
    title: "NYTHE — Cart",
    bodyClass: "woocommerce woocommerce-cart",
    children: (
      <>
        <Nav activePath="/cart" cartCount={CART_ITEMS.reduce((sum, item) => sum + item.qty, 0)} />
        <main style={`padding-top: var(--nav-height);${CART_ITEMS.length > 0 ? " min-height: 100vh;" : ""}`}>
          {CART_ITEMS.length > 0 ? (
            <div className="woocommerce" style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-8) var(--page-padding);">
              <div className="woocommerce-cart-form">

                {/* Header */}
                <div className="flex items-center justify-between" style="margin-bottom: var(--space-8);">
                  <h1 style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide);">
                    Your cart
                  </h1>
                  <a
                    href="/pages/catalog"
                    style="font-size: var(--font-size-sm); color: var(--color-text-muted); text-decoration: underline;"
                  >
                    Continue shopping
                  </a>
                </div>

                {/* Table headers */}
                <div
                  className="hidden md:flex items-center"
                  style="padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border-light); font-size: var(--font-size-xs); color: var(--color-text-muted); letter-spacing: var(--tracking-wider); text-transform: uppercase;"
                >
                  <div style="flex: 1;">Product</div>
                  <div>Total</div>
                  <div style="min-width: 120px; text-align: right;">Quantity</div>
                </div>

                {/* Cart items */}
                {CART_ITEMS.map((item) => (
                  <CartItemRow item={item} />
                ))}

                {/* Bottom section */}
                <div
                  className="flex flex-col md:flex-row"
                  style="margin-top: var(--space-8); gap: var(--space-8);"
                >
                  {/* Special instructions */}
                  <div style="flex: 1;">
                    <label
                      className="label-text"
                      style="display: block; margin-bottom: var(--space-3); font-size: var(--font-size-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: var(--tracking-wider);"
                    >
                      Order special instructions
                    </label>
                    <textarea
                      style="width: 100%; min-height: 100px; border: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-4); font-family: var(--font-mono); font-size: var(--font-size-sm); resize: vertical;"
                      placeholder=""
                    />
                  </div>

                  {/* Estimated total + checkout */}
                  <div style="flex: 1; text-align: right;">
                    <div className="flex items-center justify-end" style="gap: var(--space-4); margin-bottom: var(--space-2);">
                      <span style="font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: var(--tracking-wider);">
                        Estimated total
                      </span>
                      <span style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);" data-estimated-total>
                        {ESTIMATED_TOTAL}
                      </span>
                      <span style="font-size: var(--font-size-sm);">UAH</span>
                    </div>
                    <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
                      Tax included. Shipping and discounts calculated at checkout.
                    </p>
                    <a
                      href="/pages/checkout"
                      style="display: block; width: 420px; max-width: 100%; margin-left: auto; padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); text-align: center; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-wider); text-decoration: none; text-transform: uppercase;"
                    >
                      Check out
                    </a>
                    <div className="flex items-center" style="gap: var(--space-3); margin-top: var(--space-4); width: 420px; max-width: 100%; margin-left: auto;">
                      <button
                        style="flex: 1; padding: 14px 24px; background-color: #fff; border: 2px solid #000; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 56px;"
                      >
                        <img src="/assets/images/apple-logo.png" alt="Apple Pay" style="height: 24px; width: auto;" />
                      </button>
                      <button
                        style="flex: 1; padding: 14px 24px; background-color: #fff; border: 2px solid #aaa; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 56px;"
                      >
                        <img src="/assets/images/android-logo.png" alt="Google Pay" style="height: 24px; width: auto;" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div style="text-align: center; padding: 120px var(--page-padding) 160px;">
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
          )}
        </main>
        <Footer />
      </>
    ),
  });
}
