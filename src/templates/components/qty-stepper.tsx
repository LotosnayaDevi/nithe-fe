export interface QtyStepperProps {
  value?: number;
  label?: string;
}

export function QtyStepper({ value, label }: QtyStepperProps) {
  return (
    <div>
      {label && <span className="label-text" style="display: block; margin-bottom: var(--space-3);">{label}</span>}
      <div
        className="inline-flex items-center"
        style="border: 1px solid var(--color-border-light); border-radius: var(--radius-full); overflow: hidden;"
      >
        <button
          className="flex items-center justify-center transition-colors hover:bg-gray-100"
          style="width: 2.75rem; height: 2.75rem; font-size: var(--font-size-sm);"
          data-qty-decrease
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span
          className="flex items-center justify-center"
          style="width: 2.75rem; height: 2.75rem; font-size: var(--font-size-sm);"
          data-qty-value
        >
          {value ?? 1}
        </span>
        <button
          className="flex items-center justify-center transition-colors hover:bg-gray-100"
          style="width: 2.75rem; height: 2.75rem; font-size: var(--font-size-sm);"
          data-qty-increase
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
