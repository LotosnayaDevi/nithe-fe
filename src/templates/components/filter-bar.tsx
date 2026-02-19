export interface FilterBarProps {
  productCount?: number;
}

export function FilterBar({ productCount }: FilterBarProps) {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      style="padding: var(--space-6) 0; margin-bottom: var(--space-6); gap: var(--space-4);"
    >
      {/* Filter / Availability */}
      <div className="relative flex items-center" style="gap: var(--space-4);">
        <span className="label-text">Filter:</span>
        <button
          className="flex items-center"
          style="gap: var(--space-2); font-size: var(--font-size-sm); border-bottom: 1px solid var(--color-border-light); padding-bottom: var(--space-1);"
          data-filter-toggle
        >
          Availability
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Availability dropdown panel */}
        <div
          className="dropdown-panel dropdown-hidden"
          style="position: absolute; top: 100%; left: 0; margin-top: var(--space-2); min-width: 12rem; background-color: var(--color-bg-surface); border: 1px solid var(--color-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 40; padding: var(--space-4);"
          data-filter-dropdown
        >
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="checkbox" name="availability" value="in-stock" style="accent-color: var(--color-text-primary);" />
            In stock
          </label>
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="checkbox" name="availability" value="out-of-stock" style="accent-color: var(--color-text-primary);" />
            Out of stock
          </label>
        </div>
      </div>

      {/* Sort */}
      <div className="relative flex items-center" style="gap: var(--space-4);">
        <span className="label-text">Sort by:</span>
        <button
          className="flex items-center"
          style="gap: var(--space-2); font-size: var(--font-size-sm);"
          data-sort-toggle
        >
          Best selling
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Sort dropdown panel */}
        <div
          className="dropdown-panel dropdown-hidden"
          style="position: absolute; top: 100%; right: 0; margin-top: var(--space-2); min-width: 14rem; background-color: var(--color-bg-surface); border: 1px solid var(--color-border-light); box-shadow: 0 4px 12px rgba(0,0,0,0.08); z-index: 40; padding: var(--space-4);"
          data-sort-dropdown
        >
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="radio" name="sort" value="best-selling" checked style="accent-color: var(--color-text-primary);" />
            Best selling
          </label>
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="radio" name="sort" value="price-asc" style="accent-color: var(--color-text-primary);" />
            Price: low to high
          </label>
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="radio" name="sort" value="price-desc" style="accent-color: var(--color-text-primary);" />
            Price: high to low
          </label>
          <label className="flex items-center cursor-pointer" style="gap: var(--space-2); font-size: var(--font-size-sm); padding: var(--space-2) 0;">
            <input type="radio" name="sort" value="newest" style="accent-color: var(--color-text-primary);" />
            Newest
          </label>
        </div>

        {productCount != null && (
          <span style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
            {productCount} products
          </span>
        )}
      </div>
    </div>
  );
}
