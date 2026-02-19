function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export function SearchOverlay() {
  return (
    <div
      id="search-overlay"
      className="fixed search-overlay-hidden"
      style="inset: 0; z-index: 60; display: flex; flex-direction: column;"
    >
      {/* Search bar — white top strip */}
      <div style="background-color: var(--color-bg-surface);">
        <div className="flex items-center" style="padding: 24px 40px; gap: 16px;">
          {/* Bordered input box with search icon inside */}
          <div className="flex items-center" style="flex: 1; border: 1px solid var(--color-text-primary); padding: 12px 16px; gap: 12px;">
            <input
              type="text"
              placeholder="Search"
              style="flex: 1; border: none; outline: none; font-size: var(--font-size-base); font-family: var(--font-mono); background: transparent; color: var(--color-text-primary); padding: 0;"
              id="search-input"
            />
            <button
              className="transition-opacity hover:opacity-70"
              style="color: var(--color-text-primary); flex-shrink: 0; background: none; border: none; cursor: pointer; padding: 0;"
              aria-label="Submit search"
            >
              <SearchIcon />
            </button>
          </div>
          {/* Close button outside the bordered box */}
          <button
            data-search-close
            aria-label="Close search"
            className="transition-opacity hover:opacity-70"
            style="color: var(--color-text-primary); flex-shrink: 0; background: none; border: none; cursor: pointer; padding: 0;"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Dark overlay area with results box inside */}
      <div
        data-search-close
        style="flex: 1; background-color: rgba(11, 12, 15, 0.8); cursor: pointer; position: relative;"
      >
        {/* Search results dropdown — floats inside the dark overlay */}
        <div
          id="search-results"
          style="display: none; background-color: #E3E3E3; margin: 40px 40px 0 40px; padding: 24px 28px;"
          onClick="event.stopPropagation()"
        >
          <div id="search-results-inner">
            {/* Results will be injected here by JS */}
          </div>
        </div>
      </div>
    </div>
  );
}
