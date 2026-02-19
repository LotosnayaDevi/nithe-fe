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

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;

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
