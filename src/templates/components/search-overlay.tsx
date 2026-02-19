function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export function SearchOverlay() {
  return (
    <div
      id="search-overlay"
      className="fixed hidden"
      style="inset: 0; z-index: 60; background-color: rgba(0, 0, 0, 0.85);"
    >
      {/* Search bar */}
      <div style="background-color: var(--color-bg-surface); padding: var(--space-6) var(--page-padding);">
        <div className="flex items-center" style="max-width: var(--max-width); margin: 0 auto; gap: var(--space-4);">
          <span style="color: var(--color-text-muted); flex-shrink: 0;">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            style="flex: 1; border: none; outline: none; font-size: var(--font-size-base); font-family: var(--font-mono); background: transparent; color: var(--color-text-primary);"
            id="search-input"
          />
          <button
            data-search-close
            aria-label="Close search"
            className="transition-opacity hover:opacity-70"
            style="color: var(--color-text-muted); flex-shrink: 0; background: none; border: none; cursor: pointer;"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Results area */}
      <div style="background-color: var(--color-bg-light); padding: var(--space-12) var(--page-padding); overflow-y: auto; max-height: calc(100vh - 5rem);">
        <div style="max-width: var(--max-width); margin: 0 auto;">
          <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-6); letter-spacing: var(--tracking-wide);">
            Popular searches
          </p>
          <div className="flex flex-wrap" style="gap: var(--space-3);">
            {["Corsets", "Leather dresses", "Crop tops", "Harnesses", "New arrivals"].map((term) => (
              <a
                href={`/pages/catalog?q=${encodeURIComponent(term.toLowerCase())}`}
                style="font-size: var(--font-size-sm); color: var(--color-text-primary); padding: var(--space-2) var(--space-4); border: 1px solid var(--color-border-light); border-radius: var(--radius-full);"
                className="transition-colors hover:border-current"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
