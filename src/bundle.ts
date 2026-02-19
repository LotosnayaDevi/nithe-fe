import { join } from "path";
import { readdirSync, existsSync, mkdirSync } from "fs";

const PAGES_DIR = join(import.meta.dir, "pages");
const OUT_DIR = join(import.meta.dir, "..", "dist", "assets");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// Collect all page entry points
const entrypoints: string[] = [];
if (existsSync(PAGES_DIR)) {
  for (const file of readdirSync(PAGES_DIR)) {
    if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      entrypoints.push(join(PAGES_DIR, file));
    }
  }
}

// Also bundle the shared main entry
const mainEntry = join(import.meta.dir, "main.ts");
if (existsSync(mainEntry)) {
  entrypoints.push(mainEntry);
}

if (entrypoints.length === 0) {
  console.log("[bundle] No entry points found, skipping.");
  process.exit(0);
}

const result = await Bun.build({
  entrypoints,
  outdir: OUT_DIR,
  minify: process.env.NODE_ENV === "production",
  target: "browser",
  format: "esm",
});

if (!result.success) {
  console.error("[bundle] Build failed:");
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`[bundle] Built ${result.outputs.length} files.`);
