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
                        style="flex: 1; padding: 14px 24px; background-color: #fff; border: 2px solid #000; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 2px; height: 56px;"
                      >
                        <svg viewBox="0 0 165.52 68" width="58" height="24">
                          <path d="M150.7 0H14.82A14.83 14.83 0 000 14.82v38.36A14.83 14.83 0 0014.82 68H150.7a14.83 14.83 0 0014.82-14.82V14.82A14.83 14.83 0 00150.7 0" fill="transparent"/>
                          <path d="M150.7 2.57a12.28 12.28 0 0112.26 12.25v38.36A12.28 12.28 0 01150.7 65.43H14.82A12.28 12.28 0 012.57 53.18V14.82A12.28 12.28 0 0114.82 2.57H150.7" fill="transparent"/>
                          <path d="M43.87 21.64a10.24 10.24 0 002.42-7.34 10.43 10.43 0 00-6.78 3.51 9.76 9.76 0 00-2.49 7.09 8.63 8.63 0 006.85-3.26" fill="#000"/>
                          <path d="M46.26 25.42c-3.77-.22-6.98 2.14-8.77 2.14s-4.56-2.03-7.52-1.97a11.1 11.1 0 00-9.44 5.7c-4.04 6.98-1.03 17.34 2.86 23.03 1.92 2.82 4.23 5.93 7.24 5.82 2.86-.11 3.97-1.86 7.42-1.86s4.44 1.86 7.47 1.8c3.14-.05 5.12-2.82 7.03-5.65a24.63 24.63 0 003.19-6.51 10.17 10.17 0 01-6.13-9.28 10.26 10.26 0 014.89-8.62 10.56 10.56 0 00-8.24-4.6" fill="#000"/>
                          <path d="M78.23 15.17c7.67 0 13 5.29 13 12.99 0 7.74-5.44 13.05-13.16 13.05h-8.47v13.52h-6.1V15.17zm-8.63 20.86h7.03c5.34 0 8.38-2.87 8.38-7.85 0-4.98-3.04-7.82-8.35-7.82h-7.06z" fill="#000"/>
                          <path d="M92.64 45.12c0-5.06 3.88-8.16 10.77-8.55l7.93-.46v-2.24c0-3.21-2.16-5.14-5.78-5.14-3.42 0-5.58 1.71-6.1 4.34h-5.56c.29-5.2 4.57-9.05 11.84-9.05 6.96 0 11.41 3.68 11.41 9.44v19.8h-5.64v-4.73h-.13a10.16 10.16 0 01-9.05 5.12c-5.62 0-9.69-3.46-9.69-8.53zm18.7-2.58v-2.3l-7.14.43c-3.56.22-5.58 1.88-5.58 4.56 0 2.74 2.1 4.53 5.31 4.53 4.17 0 7.41-2.87 7.41-6.62z" fill="#000"/>
                          <path d="M120.81 63.12v-4.7a18 18 0 001.88.1c2.69 0 4.17-1.13 5.07-4.04l.55-1.75-10.61-28.69h6.37l7.53 23.39h.1l7.53-23.39h6.21l-11.01 30.01c-2.52 6.93-5.44 9.15-11.55 9.15-.58 0-1.75-.07-2.07-.1z" fill="#000"/>
                        </svg>
                      </button>
                      <button
                        style="flex: 1; padding: 14px 24px; background-color: #fff; border: 2px solid #aaa; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 2px; height: 56px;"
                      >
                        <svg viewBox="0 0 150 60" width="62" height="24">
                          <path d="M65.68 28.77V9.48h8.46a7.3 7.3 0 015.18 1.86 6.22 6.22 0 012 4.7 6.28 6.28 0 01-2 4.73 7.27 7.27 0 01-5.18 1.88h-5.27v6.12zm3.19-8.87h5.31a4 4 0 002.9-1.09 3.63 3.63 0 001.13-2.73 3.58 3.58 0 00-1.13-2.7 4.04 4.04 0 00-2.9-1.09h-5.31z" fill="#5F6368"/>
                          <path d="M87.25 28.77v-1.86a5.83 5.83 0 01-2.37 1.59 7.77 7.77 0 01-2.93.56 6.36 6.36 0 01-4.38-1.55 5.03 5.03 0 01-1.72-3.88 5.01 5.01 0 011.72-3.86 6.31 6.31 0 014.38-1.57 7.63 7.63 0 012.89.54 5.83 5.83 0 012.35 1.53v-1.7a3.31 3.31 0 00-1.26-2.66 4.72 4.72 0 00-3.15-1.07 5.46 5.46 0 00-4.84 2.73l-2.67-1.6a8.03 8.03 0 013.1-2.99 8.75 8.75 0 014.43-1.14 7.5 7.5 0 015.22 1.8 6.14 6.14 0 012 4.77v10.36z m0-5.81a3.77 3.77 0 00-1.63-1.63 4.98 4.98 0 00-2.36-.58 4.16 4.16 0 00-2.72.93 2.85 2.85 0 00-1.13 2.29 2.83 2.83 0 001.13 2.27 4.21 4.21 0 002.72.9 4.98 4.98 0 002.36-.57 3.73 3.73 0 001.63-1.64z" fill="#5F6368"/>
                          <path d="M99 28.77l-6.19-15.94h3.35l4.03 11.1h.05l3.94-11.1h3.35L99 44.33h-3.26z" fill="#5F6368"/>
                          <path d="M44.48 24.26a13 13 0 00-.19-2.26H28.1v4.28h9.19a7.86 7.86 0 01-3.4 5.15v4.28h5.51a16.6 16.6 0 005.08-11.45z" fill="#4285F4"/>
                          <path d="M28.1 39.8c4.6 0 8.47-1.52 11.29-4.13l-5.51-4.28c-1.53 1.02-3.48 1.63-5.78 1.63a10.08 10.08 0 01-9.49-6.96H12.9v4.41A16.83 16.83 0 0028.1 39.8z" fill="#34A853"/>
                          <path d="M18.6 26.06a10.1 10.1 0 010-6.44V15.2H12.9a16.86 16.86 0 000 15.27z" fill="#FBBC04"/>
                          <path d="M28.1 12.63a9.12 9.12 0 016.45 2.52l4.84-4.84A16.23 16.23 0 0028.1 5.86 16.83 16.83 0 0012.9 15.2l5.71 4.42a10.08 10.08 0 019.49-6.99z" fill="#EA4335"/>
                        </svg>
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
