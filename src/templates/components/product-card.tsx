export interface ProductCardProps {
  code: string;
  price: string;
  originalPrice?: string;
  href?: string;
  imageAlt?: string;
}

export function ProductCard({ code, price, originalPrice, href, imageAlt }: ProductCardProps) {
  const content = (
    <div className="group" data-reveal>
      <div
        className="overflow-hidden"
        style="aspect-ratio: 3/4; background-color: var(--color-bg-light); margin-bottom: var(--space-4);"
      >
        <div
          className="w-full h-full transition-transform group-hover:scale-[1.02]"
          style="background: linear-gradient(180deg, #888 0%, #ccc 100%); transition-duration: var(--duration-slow); transition-timing-function: var(--ease-out-quart);"
          role="img"
          aria-label={imageAlt ?? code}
        ></div>
      </div>
      <div className="flex items-baseline justify-between" style="gap: var(--space-4);">
        <span style="font-size: var(--font-size-sm);">{code}</span>
        <div className="flex items-baseline" style="gap: var(--space-2);">
          {originalPrice && (
            <span style="font-size: var(--font-size-sm); color: var(--color-accent); text-decoration: line-through;">
              {originalPrice}
            </span>
          )}
          <span style="font-size: var(--font-size-sm);">{price}</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}
