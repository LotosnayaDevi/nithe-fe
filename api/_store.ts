// Shared in-memory cart store for Vercel serverless functions.
// State persists while the function instance is warm — good enough for a demo.

export interface CartItem {
  product_id: string;
  quantity: number;
  size: string;
  key: string;
}

const cart: CartItem[] = [];
let nextKey = 1;

export function getCart() {
  return cart;
}

export function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(product_id: string, quantity: number, size: string) {
  const existing = cart.find((i) => i.product_id === product_id && i.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product_id, quantity, size, key: String(nextKey++) });
  }
}

export function updateCartItem(key: string, quantity: number) {
  const idx = cart.findIndex((i) => i.key === key);
  if (idx === -1) return;
  if (quantity <= 0) {
    cart.splice(idx, 1);
  } else {
    cart[idx].quantity = quantity;
  }
}

export function removeCartItem(key: string) {
  const idx = cart.findIndex((i) => i.key === key);
  if (idx !== -1) cart.splice(idx, 1);
}
