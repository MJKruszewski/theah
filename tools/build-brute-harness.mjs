// Inline the compiled dist/theah.css into design/_brute-harness.html and generate
// the Muster figure rank, so the harness renders the *real* CSS over the *real*
// brute.hbs DOM with sample data (Rösti's Dockhands: Strength 5 / 8). Mirrors
// tools/build-harness.mjs (the character-sheet harness) for direct comparison.
import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("dist/theah.css", "utf8");
let html = readFileSync("design/_brute-harness.html", "utf8");

// The Muster: one thug figure per point of full Strength (max 8); the first
// `cur` stand, the rest are fallen. Same markup + path as brute.hbs.
const CUR = 5;
const MAX = 8;
const FIG_PATH =
  "M12 2.4c-2.5 0-4 1.7-4 4 0 1.5.7 2.8 1.7 3.5-2.6.9-4.7 2.7-5.4 5.5-.3 1.2-.4 2.6-.4 4.2v7.6c0 .6.4 1 1 1h14.2c.6 0 1-.4 1-1v-7.6c0-1.6-.1-3-.4-4.2-.7-2.8-2.8-4.6-5.4-5.5 1-.7 1.7-2 1.7-3.5 0-2.3-1.5-4-4-4z";
const musterHtml = Array.from({ length: MAX }, (_, i) => {
  const down = i >= CUR ? " down" : "";
  return `<div class="fig${down}" data-level="${i + 1}"><svg viewBox="0 0 24 30"><path d="${FIG_PATH}"/></svg></div>`;
}).join("\n");

html = html.replace("/*__CSS__*/", css).replace("<!--MUSTER-->", musterHtml);

writeFileSync("design/brute-harness.html", html);
console.log("Wrote design/brute-harness.html (", (html.length / 1024).toFixed(0), "KB )");
