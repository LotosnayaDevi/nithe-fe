import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

const inputStyle = "border: 1px solid var(--color-border-light); padding: var(--space-3) var(--space-4); font-family: var(--font-mono); font-size: var(--font-size-sm); width: 100%;";

function RequiredMark() {
  return <span style="color: var(--color-accent);">*</span>;
}

export function renderContact(): string {
  return Page({
    title: "NYTHE — Contact",
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
                  <label
                    className="label-text"
                    style="display: block; margin-bottom: var(--space-2); font-size: var(--font-size-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider);"
                  >
                    Name <RequiredMark />
                  </label>
                  <input type="text" name="name" required style={inputStyle} />
                </div>
                <div style="flex: 1;">
                  <label
                    className="label-text"
                    style="display: block; margin-bottom: var(--space-2); font-size: var(--font-size-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider);"
                  >
                    Email <RequiredMark />
                  </label>
                  <input type="email" name="email" required style={inputStyle} />
                </div>
              </div>

              {/* Phone */}
              <div style="margin-bottom: var(--space-6);">
                <label
                  className="label-text"
                  style="display: block; margin-bottom: var(--space-2); font-size: var(--font-size-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider);"
                >
                  Phone number <RequiredMark />
                </label>
                <input type="tel" name="phone" required style={inputStyle} />
              </div>

              {/* Comment */}
              <div style="margin-bottom: var(--space-8);">
                <label
                  className="label-text"
                  style="display: block; margin-bottom: var(--space-2); font-size: var(--font-size-xs); text-transform: uppercase; letter-spacing: var(--tracking-wider);"
                >
                  Comment
                </label>
                <textarea
                  name="comment"
                  rows="5"
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
