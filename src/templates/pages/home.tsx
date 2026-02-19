import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";

export function renderHome(): string {
  return Page({
    title: "NYTHE — Beautifully Wrong.",
    children: (
      <>
        <Nav activePath="/" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <section className="flex items-center justify-center" style="height: 60vh;">
            <h1 className="page-title">Beautifully Wrong.</h1>
          </section>
        </main>
        <Footer />
      </>
    ),
  });
}
