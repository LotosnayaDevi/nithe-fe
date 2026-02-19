export interface QtyStepperProps {
  value?: number;
  label?: string;
}

export function QtyStepper({ value, label }: QtyStepperProps) {
  return (
    <div>
      {label && <span className="label-text" style="display: block; margin-bottom: var(--space-3);">{label}</span>}
      <div
        className="inline-flex items-center quantity"
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
        <input
          type="number"
          className="qty"
          name="quantity"
          value={String(value ?? 1)}
          min="1"
          style="width: 2.75rem; height: 2.75rem; text-align: center; font-size: var(--font-size-sm); border: none; background: transparent; -moz-appearance: textfield; font-family: var(--font-mono);"
          data-qty-value
        />
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
