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
  { name: "BG-02 Corset", price: "₴24,126.00", size: "XS", qty: 1, total: "₴24,126.00" },
  { name: "BG-03 Dress", price: "₴18,500.00", size: "XS", qty: 2, total: "₴37,000.00" },
  { name: "BG-01 Top", price: "₴12,300.00", size: "XS", qty: 1, total: "₴12,300.00" },
];

const ESTIMATED_TOTAL = "₴73,426.00";

function CartItemRow({ item }: { item: CartItem }) {
  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center"
      style="padding: var(--space-6) 0; border-bottom: 1px solid var(--color-border-light); gap: var(--space-4);"
    >
      {/* Product info */}
      <div className="flex items-center" style="flex: 2; gap: var(--space-4);">
        <div
          style="width: 80px; height: 100px; min-width: 80px; background: linear-gradient(135deg, #e5e5e5, #c4c4c4); border-radius: var(--radius-sm);"
        />
        <div>
          <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-regular); margin-bottom: var(--space-1);">
            {item.name}
          </div>
          <div style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
            {item.price}
          </div>
          <div style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: var(--space-1);">
            Size: {item.size}
          </div>
        </div>
      </div>

      {/* Total */}
      <div style="flex: 1; font-size: var(--font-size-sm);">
        {item.total}
      </div>

      {/* Quantity */}
      <div style="flex: 1; text-align: right;">
        <QtyStepper value={item.qty} />
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
        <Nav activePath="/cart" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
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
                <div style="flex: 2;">Product</div>
                <div style="flex: 1;">Total</div>
                <div style="flex: 1; text-align: right;">Quantity</div>
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
                    Special instructions for seller
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
                    <span style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold);">
                      {ESTIMATED_TOTAL}
                    </span>
                  </div>
                  <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-6);">
                    Tax included. Shipping and discounts calculated at checkout.
                  </p>
                  <a
                    href="/pages/checkout"
                    style="display: inline-block; width: 100%; max-width: 320px; padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); text-align: center; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-wider); text-decoration: none; text-transform: uppercase;"
                  >
                    Check out
                  </a>
                  <div className="flex items-center justify-end" style="gap: var(--space-3); margin-top: var(--space-4);">
                    <button
                      style="flex: 1; max-width: 155px; padding: var(--space-3); background-color: #000; color: #fff; border: none; border-radius: var(--radius-sm); font-size: var(--font-size-sm); cursor: pointer;"
                    >
                      Apple Pay
                    </button>
                    <button
                      style="flex: 1; max-width: 155px; padding: var(--space-3); background-color: #000; color: #fff; border: none; border-radius: var(--radius-sm); font-size: var(--font-size-sm); cursor: pointer;"
                    >
                      Google Pay
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
        <Footer />
      </>
    ),
  });
}
