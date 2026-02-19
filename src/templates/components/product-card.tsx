import { ImageCarousel } from "./image-carousel";
import { SizeSelector } from "./size-selector";
import { QtyStepper } from "./qty-stepper";

export interface ProductCardProps {
  variant: "grid" | "info" | "full";
  code: string;
  price: string;
  name?: string;
  brand?: string;
  currency?: string;
  originalPrice?: string;
  imageCount?: number;
  sizes?: string[];
  selectedSize?: string;
  qtyInCart?: number;
  attributes?: string[];
  description?: string[];
  href?: string;
  imageAlt?: string;
}

/* ─── Grid variant ─── compact card for catalog/home grids ─── */

function GridCard({ code, price, originalPrice, href, imageAlt }: ProductCardProps) {
  const content = (
    <div className="group product type-product" data-reveal data-product-id="0">
      <div
        className="overflow-hidden woocommerce-product-gallery__image"
        style="aspect-ratio: 430/600; background-color: var(--color-bg-light); margin-bottom: var(--space-4);"
      >
        <div
          className="w-full h-full transition-transform group-hover:scale-[1.02]"
          style="background: linear-gradient(180deg, #888 0%, #ccc 100%); transition-duration: var(--duration-slow); transition-timing-function: var(--ease-out-quart);"
          role="img"
          aria-label={imageAlt ?? code}
        ></div>
      </div>
      <div className="flex items-baseline justify-between" style="gap: var(--space-4);">
        <span className="woocommerce-loop-product__title" style="font-size: var(--font-size-sm);">{code}</span>
        <span className="price" style="font-size: var(--font-size-sm); color: var(--color-accent);">
          <span className="woocommerce-Price-amount amount">{price}</span> UAH
        </span>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

/* ─── Info variant ─── centered standalone with carousel ─── */

function InfoCard({ code, price, originalPrice, attributes, href, imageCount }: ProductCardProps) {
  return (
    <div className="product type-product" data-product-id="0" style="margin: 0 auto; padding: var(--space-8) var(--page-padding);">
      {/* Carousel with arrows at viewport edges */}
      <div className="relative" data-carousel>
        <div className="flex items-center justify-center">
          {/* Left arrow — viewport edge */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
            style="width: 3rem; height: 3rem; cursor: pointer; background: none; border: none;"
            data-carousel-prev
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image area — fixed 480x520 */}
          <div
            className="overflow-hidden woocommerce-product-gallery"
            style="width: 480px; height: 520px;"
          >
            <div
              className="w-full h-full woocommerce-product-gallery__image"
              style="background: linear-gradient(180deg, #555 0%, #bbb 100%);"
              data-carousel-slides
            ></div>
          </div>

          {/* Right arrow — viewport edge */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
            style="width: 3rem; height: 3rem; cursor: pointer; background: none; border: none;"
            data-carousel-next
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center" style="gap: var(--space-2); margin-top: var(--space-4);">
          {Array.from({ length: imageCount ?? 4 }).map((_, i) => (
            <button
              className="rounded-full transition-colors"
              style={`width: 0.5rem; height: 0.5rem; cursor: pointer; border: none; ${
                i === 0
                  ? "background-color: var(--color-text-primary);"
                  : "background-color: var(--color-border-light);"
              }`}
              data-carousel-dot={String(i)}
              aria-label={`Go to image ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Product info — centered */}
      <div className="text-center" style="margin-top: var(--space-6);">
        <div style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2);">
          {code}
        </div>
        <div style="font-size: var(--font-size-sm); margin-bottom: var(--space-4);">
          {originalPrice && (
            <span style="color: var(--color-accent); text-decoration: line-through; margin-right: var(--space-2);">
              {originalPrice}
            </span>
          )}
          {price}
        </div>

        {/* Attributes — uppercase stacked lines */}
        {attributes && attributes.length > 0 && (
          <div style="margin-bottom: var(--space-4);">
            {attributes.map((attr) => (
              <div
                style="font-size: var(--font-size-sm); text-transform: uppercase; letter-spacing: var(--tracking-wider); color: var(--color-text-primary); line-height: 1.8;"
              >
                {attr}
              </div>
            ))}
          </div>
        )}

        {/* "+" link to full product page */}
        {href && (
          <a
            href={href}
            className="inline-flex items-center justify-center transition-opacity hover:opacity-70"
            style="width: 2rem; height: 2rem; font-size: var(--font-size-lg); color: var(--color-text-primary); text-decoration: none;"
            aria-label="View full product"
          >
            +
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Full variant ─── 2-column product page ─── */

function FullCard({
  code,
  name,
  brand,
  price,
  currency,
  imageCount,
  sizes,
  selectedSize,
  qtyInCart,
  description,
}: ProductCardProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 product type-product"
      id="product-0"
      style="max-width: var(--max-width); margin: 0 auto; gap: var(--grid-gap);"
    >
      {/* Image carousel */}
      <div className="woocommerce-product-gallery" data-columns="4" style="padding: var(--page-padding);">
        <ImageCarousel imageCount={imageCount ?? 4} activeIndex={0} />
      </div>

      {/* Details */}
      <div className="summary entry-summary" style="padding: var(--page-padding);" data-reveal>
        {brand && (
          <div className="product_meta">
            <span className="label-text" style="display: block; margin-bottom: var(--space-4);">
              {brand}
            </span>
          </div>
        )}
        <h1
          className="product_title entry-title"
          style="font-size: var(--font-size-xl); font-weight: var(--font-weight-light); letter-spacing: var(--tracking-wide); margin-bottom: var(--space-4);"
        >
          {name ?? code}
        </h1>
        <p className="price" style="font-size: var(--font-size-base); margin-bottom: var(--space-2);">
          {price}{currency ? ` ${currency}` : ""}
        </p>
        <p
          style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-8);"
        >
          Tax included. Shipping calculated at checkout.
        </p>

        {sizes && sizes.length > 0 && (
          <div style="margin-bottom: var(--space-6);">
            <SizeSelector sizes={sizes} selected={selectedSize ?? sizes[0]} />
          </div>
        )}

        <div style="margin-bottom: var(--space-6);">
          <QtyStepper
            label={qtyInCart ? `Quantity (${qtyInCart} in cart)` : "Quantity"}
            value={1}
          />
        </div>

        <form className="cart" method="post">
          <input type="hidden" name="add-to-cart" value="0" />
          <button
            className="w-full transition-colors single_add_to_cart_button button alt"
            style="padding: var(--space-4); background-color: var(--color-bg-dark); color: var(--color-text-inverse); font-size: var(--font-size-sm); letter-spacing: var(--tracking-wide); border: 1px solid var(--color-bg-dark);"
          >
            Add to cart
          </button>
        </form>

        {description && description.length > 0 && (
          <div className="woocommerce-product-details__short-description" style="margin-top: var(--space-8);">
            <h2
              style="font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-4);"
            >
              {description[0]}
            </h2>
            {description.slice(1).map((para) => (
              <p
                style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-3);"
              >
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main export ─── */

export function ProductCard(props: ProductCardProps) {
  switch (props.variant) {
    case "grid":
      return GridCard(props);
    case "info":
      return InfoCard(props);
    case "full":
      return FullCard(props);
  }
}
