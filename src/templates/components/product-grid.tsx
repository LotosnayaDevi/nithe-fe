export interface ProductGridProps {
  children: string;
}

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <div
      className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      style="gap: var(--grid-gap);"
      data-reveal-stagger
    >
      {children}
    </div>
  );
}
