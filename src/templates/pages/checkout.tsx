import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

interface OrderItem {
  name: string;
  size: string;
  qty: number;
  price: string;
}

const ORDER_ITEMS: OrderItem[] = [
  { name: "BG-02 Corset", size: "XS", qty: 1, price: "₴24,126.00" },
  { name: "BG-03 Dress", size: "XS", qty: 2, price: "₴37,000.00" },
  { name: "BG-01 Top", size: "XS", qty: 1, price: "₴12,300.00" },
];

const inputStyle = "border: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-4); font-family: var(--font-mono); font-size: var(--font-size-sm); width: 100%;";

function SectionTitle({ text }: { text: string }) {
  return (
    <h2
      className="label-text"
      style="font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-widest); text-transform: uppercase; margin-bottom: var(--space-6); color: var(--color-text-primary);"
    >
      {text}
    </h2>
  );
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <div className="flex items-center" style="gap: var(--space-4); padding: var(--space-3) 0;">
      <div
        style="width: 64px; height: 80px; min-width: 64px; background: linear-gradient(135deg, #e5e5e5, #c4c4c4); border-radius: var(--radius-sm);"
      />
      <div style="flex: 1;">
        <div style="font-size: var(--font-size-sm);">{item.name}</div>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
          Size: {item.size} / Qty: {item.qty}
        </div>
      </div>
      <div style="font-size: var(--font-size-sm); white-space: nowrap;">{item.price}</div>
    </div>
  );
}

export function renderCheckout(): string {
  return Page({
    title: "NYTHE — Checkout",
    bodyClass: "woocommerce woocommerce-checkout",
    children: (
      <>
        <Nav activePath="/checkout" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <div
            className="flex flex-col md:flex-row"
            style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-8) var(--page-padding); gap: var(--space-12);"
          >
            {/* Form column */}
            <div className="woocommerce" style="flex: 3;">
              <form className="woocommerce-checkout checkout">
                {/* Contact Information */}
                <section style="margin-bottom: var(--space-8);">
                  <SectionTitle text="Contact Information" />
                  <div style="margin-bottom: var(--space-4);">
                    <input type="email" placeholder="Email" style={inputStyle} />
                  </div>
                  <label className="flex items-center" style="gap: var(--space-2); font-size: var(--font-size-sm); cursor: pointer;">
                    <input type="checkbox" />
                    <span>Email me with news and offers</span>
                  </label>
                </section>

                {/* Shipping Address */}
                <section style="margin-bottom: var(--space-8);">
                  <SectionTitle text="Shipping Address" />
                  <div className="flex" style="gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div style="flex: 1;">
                      <input type="text" placeholder="First name" style={inputStyle} />
                    </div>
                    <div style="flex: 1;">
                      <input type="text" placeholder="Last name" style={inputStyle} />
                    </div>
                  </div>
                  <div style="margin-bottom: var(--space-4);">
                    <input type="text" placeholder="Address" style={inputStyle} />
                  </div>
                  <div style="margin-bottom: var(--space-4);">
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" style={inputStyle} />
                  </div>
                  <div className="flex" style="gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div style="flex: 1;">
                      <input type="text" placeholder="City" style={inputStyle} />
                    </div>
                    <div style="flex: 1;">
                      <select style={inputStyle}>
                        <option value="">Country/Region</option>
                        <option value="UA">Ukraine</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex" style="gap: var(--space-4); margin-bottom: var(--space-4);">
                    <div style="flex: 1;">
                      <input type="text" placeholder="State / Province" style={inputStyle} />
                    </div>
                    <div style="flex: 1;">
                      <input type="text" placeholder="ZIP / Postal code" style={inputStyle} />
                    </div>
                  </div>
                  <div style="margin-bottom: var(--space-4);">
                    <div className="flex" style="gap: 0;">
                      <span
                        style="display: flex; align-items: center; padding: var(--space-3) var(--space-3); border: 1px solid var(--color-border-light); border-right: none; font-family: var(--font-mono); font-size: var(--font-size-sm); color: var(--color-text-muted); white-space: nowrap;"
                      >
                        +380
                      </span>
                      <input type="tel" placeholder="Phone" style={inputStyle} />
                    </div>
                  </div>
                </section>

                {/* Payment Details */}
                <section style="margin-bottom: var(--space-8);">
                  <SectionTitle text="Payment Details" />
                  <div
                    style="padding: var(--space-6); border: 1px solid var(--color-border-light); font-size: var(--font-size-sm); color: var(--color-text-muted); text-align: center;"
                  >
                    This store can't accept payments right now.
                  </div>
                </section>

                {/* Billing Address */}
                <section style="margin-bottom: var(--space-8);">
                  <SectionTitle text="Billing Address" />
                  <label className="flex items-center" style="gap: var(--space-2); font-size: var(--font-size-sm); cursor: pointer;">
                    <input type="checkbox" checked />
                    <span>Use shipping address as billing address</span>
                  </label>
                </section>

                {/* Submit */}
                <button
                  type="submit"
                  style="width: 100%; padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-wider); text-transform: uppercase; border: none; cursor: pointer;"
                >
                  Select a payment method
                </button>
              </form>
            </div>

            {/* Order Summary column */}
            <div style="flex: 2;">
              <div style="position: sticky; top: calc(var(--nav-height) + var(--space-8));">
                <h2
                  className="label-text"
                  style="font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-widest); text-transform: uppercase; margin-bottom: var(--space-6);"
                >
                  Order Summary
                </h2>

                {/* Order items */}
                <div style="border-bottom: 1px solid var(--color-border-light); margin-bottom: var(--space-6);">
                  {ORDER_ITEMS.map((item) => (
                    <OrderItemRow item={item} />
                  ))}
                </div>

                {/* Totals */}
                <div style="font-size: var(--font-size-sm);">
                  <div className="flex items-center justify-between" style="margin-bottom: var(--space-3);">
                    <span>Subtotal</span>
                    <span>₴73,426.00</span>
                  </div>
                  <div className="flex items-center justify-between" style="margin-bottom: var(--space-3);">
                    <span>Shipping</span>
                    <span style="color: var(--color-text-muted);">Calculated at next step</span>
                  </div>
                  <div className="flex items-center justify-between" style="margin-bottom: var(--space-3);">
                    <span>Taxes</span>
                    <span style="color: var(--color-text-muted);">Calculated at next step</span>
                  </div>
                  <div
                    className="flex items-center justify-between"
                    style="padding-top: var(--space-4); border-top: 1px solid var(--color-border-light); margin-top: var(--space-4); font-weight: var(--font-weight-semibold); font-size: var(--font-size-base);"
                  >
                    <span>Total</span>
                    <span>₴73,426.00</span>
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
