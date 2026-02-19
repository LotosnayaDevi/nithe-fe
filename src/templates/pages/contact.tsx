import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

const inputStyle = "border: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-4); font-family: var(--font-mono); font-size: var(--font-size-sm); width: 100%;";

export function renderContact(): string {
  return Page({
    title: "NYTHE — Contact",
    bodyClass: "woocommerce page",
    children: (
      <>
        <Nav activePath="/contact" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <div style="max-width: 640px; margin: 0 auto; padding: var(--space-16) var(--page-padding);">

            <h1
              style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); text-align: center; margin-bottom: var(--space-12);"
            >
              Contact us
            </h1>

            <form>
              {/* Name + Email row */}
              <div className="flex flex-col md:flex-row" style="gap: var(--space-4); margin-bottom: var(--space-6);">
                <div style="flex: 1;">
                  <input type="text" name="name" required placeholder="Name *" style={inputStyle} />
                </div>
                <div style="flex: 1;">
                  <input type="email" name="email" required placeholder="Email *" style={inputStyle} />
                </div>
              </div>

              {/* Phone */}
              <div style="margin-bottom: var(--space-6);">
                <input type="tel" name="phone" required placeholder="Phone number *" style={inputStyle} />
              </div>

              {/* Comment */}
              <div style="margin-bottom: var(--space-8);">
                <textarea
                  name="comment"
                  rows="5"
                  placeholder="Comment"
                  style={`${inputStyle} resize: vertical;`}
                />
              </div>

              {/* Submit */}
              <div style="text-align: center;">
                <button
                  type="submit"
                  style="width: 200px; padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); letter-spacing: var(--tracking-wider); text-transform: uppercase; border: none; cursor: pointer;"
                >
                  Send
                </button>
              </div>
            </form>

          </div>
        </main>
        <Footer />
      </>
    ),
  });
}
