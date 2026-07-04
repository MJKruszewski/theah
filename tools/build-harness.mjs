// Inline the compiled dist/theah.css into design/_harness.html and generate the
// data-driven bits (traits, skills, wound track, death spiral, rolled dice) so
// the harness renders the *real* CSS over the *real* template DOM with sample data.
import { readFileSync, writeFileSync } from "node:fs";

const css = readFileSync("dist/theah.css", "utf8");
let html = readFileSync("design/_harness.html", "utf8");

const pips = (val, max) =>
  Array.from({ length: max }, (_, i) => `<i class="fillable rating${i < val ? " on" : ""}"></i>`).join("");

// --- Traits (medallions over the compass rose) ---
const traits = [["Brawn", 2], ["Finesse", 4], ["Resolve", 3], ["Wits", 3], ["Panache", 4]];
const traitsHtml = traits
  .map(([n, v]) =>
    `<div class="trait"><div class="medallion"><span class="num">${v}</span></div><div class="pips">${pips(v, 5)}</div><div class="tname">${n}</div></div>`,
  )
  .join("\n");

// --- Skills (ledger rows) ---
const skills = [
  ["Aim", 2], ["Athletics", 3], ["Brawl", 1], ["Convince", 3], ["Empathy", 2], ["Hide", 1],
  ["Intimidate", 2], ["Notice", 3], ["Perform", 3], ["Ride", 2], ["Sailing", 1], ["Scholarship", 2],
  ["Tempt", 3], ["Theft", 2], ["Warfare", 2], ["Weaponry", 4],
];
const go = `<svg class="go" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const skillsHtml = skills
  .map(([n, v]) =>
    `<div class="skill"><span class="sname rollable">${n}</span><div class="pips">${pips(v, 5)}</div><span class="val">${v}</span>${go}</div>`,
  )
  .join("\n");

// --- Wound track (20 pips, 6 filled) ---
const trackHtml = Array.from({ length: 20 }, (_, i) => `<i class="fillable wound${i < 6 ? " on" : ""}"></i>`).join("");

// --- Death spiral (4 wax seals, 2 spent) ---
const seal = (spent) =>
  `<div class="seal${spent ? " spent" : ""} fillable wound dramatic"><svg viewBox="0 0 52 52"><circle class="wax" cx="26" cy="26" r="22"/><path class="sig" d="M18 30 L26 16 L34 30 M21 26 h10"/></svg></div>`;
const spiralHtml = [true, true, false, false].map(seal).join("");

// --- Rolled dice (same raises engine as the sheet) ---
function computeRaises(dice, threshold) {
  const arr = [...dice].sort((a, b) => b - a);
  const used = [];
  let raises = 0;
  const combos = [];
  while (arr.length) {
    const set = [arr.shift()];
    while (set.reduce((a, b) => a + b, 0) < threshold && arr.length) set.push(arr.pop());
    const sum = set.reduce((a, b) => a + b, 0);
    if (sum >= threshold) { raises++; combos.push(set.join("+")); used.push(...set); }
    else break;
  }
  return { raises, combos, used };
}
const sampleDice = [10, 9, 8, 7, 6, 5, 3, 2];
const { used } = computeRaises(sampleDice, 15);
const usedCopy = [...used];
const diceHtml = sampleDice
  .slice()
  .sort((a, b) => b - a)
  .map((d) => {
    let cls = "die" + (d === 10 ? " ten" : "");
    const idx = usedCopy.indexOf(d);
    if (idx > -1) { cls += " used"; usedCopy.splice(idx, 1); }
    return `<div class="${cls}">${d}</div>`;
  })
  .join("");

html = html
  .replace("/*__CSS__*/", css)
  .replace("<!--TRAITS-->", traitsHtml)
  .replace("<!--SKILLS-->", skillsHtml)
  .replace("<!--TRACK-->", trackHtml)
  .replace("<!--SPIRAL-->", spiralHtml)
  .replace("<!--DICE-->", diceHtml);

writeFileSync("design/harness.html", html);
console.log("Wrote design/harness.html (", (html.length / 1024).toFixed(0), "KB )");
