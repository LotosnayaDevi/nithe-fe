export interface FilterBarProps {
  productCount?: number;
}

export function FilterBar({ productCount }: FilterBarProps) {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
      style="padding: var(--space-6) 0; margin-bottom: var(--space-6); gap: var(--space-4);"
    >
      <div className="flex items-center" style="gap: var(--space-4);">
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
      </div>
      <div className="flex items-center" style="gap: var(--space-4);">
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
        {productCount != null && (
          <span style="font-size: var(--font-size-sm); color: var(--color-text-muted);">
            {productCount} products
          </span>
        )}
      </div>
    </div>
  );
}
