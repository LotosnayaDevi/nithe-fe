import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addToCart, getCartCount } from "../_store";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { product_id, quantity = 1, size = "" } = req.body ?? {};
  addToCart(String(product_id), Number(quantity), String(size));
  res.json({ success: true, cart_count: getCartCount() });
}
