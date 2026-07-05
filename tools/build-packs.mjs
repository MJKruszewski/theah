// Convert the validated parsed rulebook data (../../data/parsed) into Foundry
// document JSON under public/packs-data/. These files are seeded into the
// declared compendium packs at runtime (see src/packs.js) — no native LevelDB
// build tool required, so the dependency-safety rules stay intact.
//
// Usage: bun tools/build-packs.mjs   (run from the theah/ folder)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const DATA = R("../../data/parsed");
const OUT = R("../public/packs-data");
mkdirSync(OUT, { recursive: true });

// Deterministic 16-char alphanumeric _id from a stable key, so re-running the
// builder (or re-seeding) keeps the same document ids.
const id16 = (key) => createHash("sha256").update(key).digest("hex").slice(0, 16);

const para = (s) => (s && s.trim() ? `<p>${s.trim()}</p>` : "");
const readJson = (name) => JSON.parse(readFileSync(resolve(DATA, name), "utf8"));

const written = [];

/* ----------------------------- Advantages ----------------------------- */
{
  const src = readJson("advantages.json");
  const docs = src.map((a) => {
    let desc = para(a.description);
    if (a.nationalDiscounts?.length) {
      desc += `<p><em>Reduced cost for: ${a.nationalDiscounts.join(", ")}.</em></p>`;
    }
    if (a.nationRestriction) {
      desc += `<p><em>Restricted to: ${a.nationRestriction}.</em></p>`;
    }
    return {
      _id: id16("advantage:" + a.name),
      name: a.name,
      type: "advantage",
      img: "systems/theah/icons/item.svg",
      system: {
        description: desc,
        infosource: `Core Rulebook p.${a.page}`,
        cost: { normal: a.cost ?? 1, reducecost: a.nationalDiscounts?.length ? Math.max(0, (a.cost ?? 1) - 1) : 0 },
        knack: false,
        innate: false,
      },
    };
  });
  writeFileSync(resolve(OUT, "advantages.json"), JSON.stringify(docs, null, 2));
  written.push(`advantages: ${docs.length}`);
}

/* ----------------------------- Backgrounds ---------------------------- */
{
  const src = readJson("backgrounds.json");
  const docs = src.map((b) => ({
    _id: id16("background:" + b.name),
    name: b.name,
    type: "background",
    img: "systems/theah/icons/item.svg",
    system: {
      description: para(b.description),
      infosource: `Core Rulebook p.${b.page}`,
      quirk: para(b.quirk),
      skills: b.skills ?? [],
      advantages: b.advantages ?? [],
      nation: b.nation ?? "none",
    },
  }));
  writeFileSync(resolve(OUT, "backgrounds.json"), JSON.stringify(docs, null, 2));
  written.push(`backgrounds: ${docs.length}`);
}

/* --------------------------- Arcana (optional) ------------------------ */
// Written once the extractor produces data/parsed/arcana.json. Each arcanum
// yields a Virtue item and a Hubris item (the system stores them as separate
// embedded items on the actor).
if (existsSync(resolve(DATA, "arcana.json"))) {
  const src = readJson("arcana.json");
  const docs = [];
  for (const arc of src) {
    if (arc.virtue?.name) {
      docs.push({
        _id: id16("virtue:" + arc.virtue.name),
        name: arc.virtue.name,
        type: "virtue",
        img: "systems/theah/icons/item.svg",
        system: {
          description: para(arc.virtue.effect) + para(`Arcana: ${arc.name}.`),
          infosource: `Core Rulebook p.${arc.page ?? ""}`.trim(),
        },
      });
    }
    if (arc.hubris?.name) {
      docs.push({
        _id: id16("hubris:" + arc.hubris.name),
        name: arc.hubris.name,
        type: "hubris",
        img: "systems/theah/icons/item.svg",
        system: {
          description: para(arc.hubris.effect) + para(`Arcana: ${arc.name}.`),
          infosource: `Core Rulebook p.${arc.page ?? ""}`.trim(),
        },
      });
    }
  }
  writeFileSync(resolve(OUT, "arcana.json"), JSON.stringify(docs, null, 2));
  written.push(`arcana: ${docs.length} (virtues + hubris)`);
} else {
  written.push("arcana: skipped (data/parsed/arcana.json not present yet)");
}

console.log("packs-data →", OUT);
for (const w of written) console.log("  " + w);
