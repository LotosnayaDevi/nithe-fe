import { Page } from "../layouts/base";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { ProductGrid } from "../components/product-grid";
import { FilterBar } from "../components/filter-bar";

const SAMPLE_PRODUCTS = [
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-03", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-03", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-02", price: "₴24,126.00", originalPrice: "₴28,000.00" },
  { code: "BG-03", price: "₴24,126.00", originalPrice: "₴28,000.00" },
];

export function renderCatalog(): string {
  return Page({
    title: "NYTHE — Catalog",
    children: (
      <>
        <Nav activePath="/catalog" />
        <main style="padding-top: var(--nav-height); min-height: 100vh;">
          <div style="max-width: var(--max-width); margin: 0 auto; padding: var(--space-8) var(--page-padding);">
            <FilterBar productCount={SAMPLE_PRODUCTS.length} />
            <ProductGrid>
              {SAMPLE_PRODUCTS.map((p) => (
                <ProductCard
                  code={p.code}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  href="/pages/product"
                />
              ))}
            </ProductGrid>
          </div>
        </main>
        <Footer />
      </>
    ),
  });
}
