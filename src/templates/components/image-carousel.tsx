export interface ImageCarouselProps {
  imageCount?: number;
  activeIndex?: number;
}

export function ImageCarousel({ imageCount, activeIndex }: ImageCarouselProps) {
  const count = imageCount ?? 4;
  const active = activeIndex ?? 0;

  return (
    <div className="relative" data-carousel>
      {/* Image area */}
      <div
        className="overflow-hidden"
        style="aspect-ratio: 4/5; background-color: var(--color-bg-light);"
      >
        <div
          className="w-full h-full"
          style="background: linear-gradient(180deg, #555 0%, #bbb 100%);"
          data-carousel-slides
        ></div>
      </div>

      {/* Arrow buttons */}
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
        style="width: 3rem; height: 3rem;"
        data-carousel-prev
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-70"
        style="width: 3rem; height: 3rem;"
        data-carousel-next
        aria-label="Next image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex items-center justify-center" style="gap: var(--space-2); margin-top: var(--space-4);">
        {Array.from({ length: count }).map((_, i) => (
          <button
            className="rounded-full transition-colors"
            style={`width: 0.5rem; height: 0.5rem; ${
              i === active
                ? "background-color: var(--color-text-primary);"
                : "background-color: var(--color-border-light);"
            }`}
            data-carousel-dot={String(i)}
            aria-label={`Go to image ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
