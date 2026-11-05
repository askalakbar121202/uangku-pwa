import { cp, mkdir } from "node:fs/promises";

const files = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js"
];

await mkdir("www", { recursive: true });
for (const file of files) {
  await cp(file, `www/${file}`);
}
await cp("icons", "www/icons", { recursive: true });
console.log("Uangku web files copied to www/");
