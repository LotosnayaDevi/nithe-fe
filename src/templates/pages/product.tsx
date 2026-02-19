import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";

export function renderProduct(): string {
  return Page({
    title: "NYTHE — Corset JC-09",
    bodyClass: "woocommerce single-product",
    children: (
      <>
        <Nav />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <ProductCard
            variant="full"
            code="JC-09"
            name="Corset JC-09"
            brand="NYTHE STUDIO"
            price="₴20,774.00"
            currency="UAH"
            imageCount={4}
            sizes={["XS", "S", "M", "L", "XL"]}
            selectedSize="XS"
            qtyInCart={1}
            description={[
              "100% Vegetal Leather",
              "This sculpted top is crafted from 100% vegetal leather.",
              "Each piece is handmade and hand-dyed. The design embraces the natural contours of your body for a flattering silhouette.",
              "This item is available through pre-order. Production and preparation time is estimated between 4/5 days before shipping.",
            ]}
          />
        </main>
        <Footer />
      </>
    ),
  });
}
