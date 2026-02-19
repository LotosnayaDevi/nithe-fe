import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCart, getCartCount } from "../_store";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ items: getCart(), cart_count: getCartCount(), total: 0 });
}
