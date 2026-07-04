// Inline the compiled dist/theah.css into design/_harness.html + generate traits/skills DOM.
import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("dist/theah.css", "utf8");
let html = readFileSync("design/_harness.html", "utf8");

const pips = (val, max, cls = "rating") =>
  Array.from({ length: max }, (_, i) => `<i class="fillable ${cls}${i < val ? " on" : ""}"></i>`).join("");

const traits = [["Brawn", 2], ["Finesse", 4], ["Resolve", 3], ["Wits", 3], ["Panache", 4]];
const traitsHtml = traits
  .map(([n, v]) => `<div class="trait-block"><div class="medallion"><span class="num">${v}</span></div><div class="pips">${pips(v, 5)}</div><div class="tname">${n}</div></div>`)
  .join("\n");

const skills = [
  ["Aim", 2], ["Athletics", 3], ["Brawl", 1], ["Convince", 3], ["Empathy", 2], ["Hide", 1],
  ["Intimidate", 2], ["Notice", 3], ["Perform", 3], ["Ride", 2], ["Sailing", 1], ["Scholarship", 2],
  ["Tempt", 3], ["Theft", 2], ["Warfare", 2], ["Weaponry", 4],
];
const skillsHtml = skills
  .map(([n, v]) => `<div class="skill-row"><span class="skill-name rollable">${n}</span><div class="pips">${pips(v, 5)}</div><span class="val">${v}</span></div>`)
  .join("\n");

html = html
  .replace("/*__CSS__*/", css)
  .replace("<!--TRAITS-->", traitsHtml)
  .replace("<!--SKILLS-->", skillsHtml);

writeFileSync("design/harness.html", html);
console.log("Wrote design/harness.html (", (html.length / 1024).toFixed(0), "KB )");
