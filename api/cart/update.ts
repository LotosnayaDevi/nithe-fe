import type { VercelRequest, VercelResponse } from "@vercel/node";
import { updateCartItem, getCartCount } from "../_store";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { cart_item_key, quantity } = req.body ?? {};
  updateCartItem(String(cart_item_key), Number(quantity));
  res.json({ success: true, cart_count: getCartCount() });
}
