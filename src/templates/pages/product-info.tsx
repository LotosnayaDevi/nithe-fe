import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";

export function renderProductInfo(): string {
  return Page({
    title: "NYTHE — JC-09",
    bodyClass: "woocommerce single-product",
    children: (
      <>
        <Nav />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <ProductCard
            variant="info"
            code="JC-09"
            price="₴20,809.00"
            imageCount={4}
            attributes={[]}
            href="/pages/product"
          />
        </main>
      </>
    ),
  });
}
