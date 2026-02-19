export interface SizeSelectorProps {
  sizes: string[];
  selected?: string;
}

export function SizeSelector({ sizes, selected }: SizeSelectorProps) {
  return (
    <div>
      <span className="label-text" style="display: block; margin-bottom: var(--space-3);">Size</span>
      <div className="flex flex-wrap" style="gap: var(--space-2);">
        {sizes.map((size) => (
          <button
            className="flex items-center justify-center transition-colors"
            style={`width: 2.75rem; height: 2.75rem; border-radius: var(--radius-full); font-size: var(--font-size-sm); ${
              size === selected
                ? "background-color: var(--color-bg-dark); color: var(--color-text-inverse); border: 1px solid var(--color-bg-dark);"
                : "background-color: transparent; color: var(--color-text-primary); border: 1px solid var(--color-border-light);"
            }`}
            data-size={size}
            data-attribute_pa_size={size.toLowerCase()}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
