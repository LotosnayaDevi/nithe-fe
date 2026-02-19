import { watch } from "fs";
import { join, extname } from "path";

const DIST = join(import.meta.dir, "dist");
const SRC = join(import.meta.dir, "src");
const PORT = 3000;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

const clients = new Set<ReadableStreamDefaultController>();

const RELOAD_SCRIPT = `<script>
(function(){
  const es = new EventSource("/__reload");
  es.onmessage = () => location.reload();
})();
</script>`;

function injectReload(html: string): string {
  return html.replace("</body>", `${RELOAD_SCRIPT}</body>`);
}

async function build() {
  console.log("[dev] Rendering templates...");
  const renderProc = Bun.spawn(["bun", "src/templates/build.ts"], { stdout: "inherit", stderr: "inherit" });
  await renderProc.exited;

  console.log("[dev] Building CSS...");
  const cssProc = Bun.spawn(
    ["bunx", "@tailwindcss/cli", "-i", "src/styles/main.css", "-o", "dist/assets/styles.css"],
    { stdout: "inherit", stderr: "inherit" },
  );
  await cssProc.exited;

  console.log("[dev] Bundling JS...");
  const bundleProc = Bun.spawn(["bun", "src/bundle.ts"], { stdout: "inherit", stderr: "inherit" });
  await bundleProc.exited;
}

function notifyClients() {
  for (const controller of clients) {
    try {
      controller.enqueue("data: reload\n\n");
    } catch {
      clients.delete(controller);
    }
  }
}

// Initial build
await build();

// Watch for changes
let debounce: Timer | null = null;
watch(SRC, { recursive: true }, () => {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(async () => {
    await build();
    notifyClients();
  }, 200);
});

// --- Mock Cart API (dev only) ---

interface CartItem {
  product_id: string;
  quantity: number;
  size: string;
  key: string;
}

const cart: CartItem[] = [];
let nextKey = 1;

const CORS_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS_HEADERS });
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

async function handleCartAPI(req: Request, pathname: string): Promise<Response | null> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (pathname === "/api/cart" && req.method === "GET") {
    return jsonResponse({ items: cart, cart_count: getCartCount(), total: 0 });
  }

  if (pathname === "/api/cart/add" && req.method === "POST") {
    const body = await req.json() as { product_id: string; quantity: number; size: string };
    const existing = cart.find((i) => i.product_id === body.product_id && i.size === body.size);
    if (existing) {
      existing.quantity += body.quantity;
    } else {
      cart.push({ product_id: body.product_id, quantity: body.quantity, size: body.size, key: String(nextKey++) });
    }
    return jsonResponse({ success: true, cart_count: getCartCount() });
  }

  if (pathname === "/api/cart/update" && req.method === "POST") {
    const body = await req.json() as { cart_item_key: string; quantity: number };
    const idx = cart.findIndex((i) => i.key === body.cart_item_key);
    if (idx !== -1) {
      if (body.quantity <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx].quantity = body.quantity;
      }
    }
    return jsonResponse({ success: true, cart_count: getCartCount() });
  }

  if (pathname === "/api/cart/remove" && req.method === "POST") {
    const body = await req.json() as { cart_item_key: string };
    const idx = cart.findIndex((i) => i.key === body.cart_item_key);
    if (idx !== -1) cart.splice(idx, 1);
    return jsonResponse({ success: true, cart_count: getCartCount() });
  }

  return null;
}

// --- Server ---

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

    // Mock API routes
    if (pathname.startsWith("/api/")) {
      const apiRes = await handleCartAPI(req, pathname);
      if (apiRes) return apiRes;
      return jsonResponse({ error: "Not found" }, 404);
    }

    // SSE endpoint for live-reload
    if (pathname === "/__reload") {
      const stream = new ReadableStream({
        start(controller) {
          clients.add(controller);
          req.signal.addEventListener("abort", () => clients.delete(controller));
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Resolve path
    if (pathname === "/") pathname = "/index.html";
    if (!extname(pathname)) pathname += ".html";

    // Try exact path first, then pages/ subdirectory
    let filePath = join(DIST, pathname);
    let file = Bun.file(filePath);

    if (!(await file.exists())) {
      // Try under pages/ (e.g. /catalog.html → /pages/catalog.html)
      filePath = join(DIST, "pages", pathname);
      file = Bun.file(filePath);
    }

    if (!(await file.exists())) {
      return new Response("Not Found", { status: 404 });
    }

    const ext = extname(pathname);
    const contentType = MIME_TYPES[ext] ?? "application/octet-stream";

    if (ext === ".html") {
      const html = await file.text();
      return new Response(injectReload(html), {
        headers: { "Content-Type": contentType },
      });
    }

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  },
});

console.log(`[dev] Server running at http://localhost:${PORT}`);
