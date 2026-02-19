import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

export function renderAbout(): string {
  return Page({
    title: "About — NYTHE",
    bodyClass: "woocommerce page",
    children: (
      <>
        <Nav activePath="/about" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <article style="max-width: 48rem; margin: 0 auto; padding: var(--space-24) var(--page-padding);">
            <h1
              className="uppercase"
              style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-widest); margin-bottom: var(--space-4); text-align: center;"
            >
              About the NYTHE
            </h1>
            <p
              style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-12); letter-spacing: var(--tracking-wide); text-align: center;"
            >
              Our story
            </p>

            <div style="display: flex; flex-direction: column; gap: var(--space-8);">
              <p style="font-size: var(--font-size-base); color: var(--color-text-primary); line-height: 1.8;">
                NYTHE was born from a quiet rebellion against disposable fashion. In a world saturated
                with mass production, we chose to slow down, to work with our hands, and to let the
                material speak. Every piece we create begins with raw, full-grain leather sourced from
                small European tanneries that share our commitment to responsible craft.
              </p>

              <p style="font-size: var(--font-size-base); color: var(--color-text-primary); line-height: 1.8;">
                Our studio sits at the intersection of tradition and edge. We draw inspiration from
                historical corsetry, deconstructed tailoring, and the raw beauty of imperfect surfaces.
                Each garment is cut, stitched, and finished by hand — a process that takes days rather
                than minutes and results in pieces that carry the unmistakable warmth of human touch.
              </p>

              <p style="font-size: var(--font-size-base); color: var(--color-text-primary); line-height: 1.8;">
                We believe leather is a living material. It ages, softens, and tells a story over time.
                Our designs embrace that impermanence — celebrating the patina, the crease, the marks
                that make each piece truly one of a kind. We do not chase trends; we craft objects that
                outlast them.
              </p>

              <p style="font-size: var(--font-size-base); color: var(--color-text-primary); line-height: 1.8;">
                NYTHE is more than a label. It is a philosophy of intentional dressing — for those who
                understand that what you wear is an extension of who you are. Our community is small
                and deliberate, built around people who value substance over spectacle and who find
                beauty in the unconventional.
              </p>

              <p style="font-size: var(--font-size-base); color: var(--color-text-primary); line-height: 1.8;">
                We are proudly based in Ukraine, drawing strength from a culture of resilience,
                resourcefulness, and quiet artistry. Every stitch carries that spirit forward. Welcome
                to NYTHE — beautifully wrong, unapologetically ours.
              </p>
            </div>
          </article>
        </main>
        <Footer />
      </>
    ),
  });
}
