// Entry point for the GTA 6 meme bounty: copy POST.json, which holds the
// address of the X post carrying the meme, into the output directory.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = join(repoDir, "POST.json");
const target = join(outputDir, "POST.json");

// Refuse to hand in a post file that does not name a post address.
const post = JSON.parse(readFileSync(source, "utf8")) as { url?: unknown };
if (typeof post.url !== "string" || !post.url.startsWith("https://")) {
  throw new Error("POST.json must hold an object with a url string");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);
console.log(`Copied POST.json to ${target}`);
