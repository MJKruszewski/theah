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
  // The book's discount labels are nation KEYS, except "glamour isles" — the
  // Triple Kingdom (Avalon + Inismore + the Highland Marches). A Hero from any of
  // the three gets the discount.
  const NATION_KEYS = { "glamour isles": ["avalon", "inismore", "highland"] };
  const resolveNationKeys = (label) => NATION_KEYS[label] || [label];
  const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
  const docs = src.map((a) => {
    let desc = para(a.description);
    // Resolve the per-nation discounts to {nation:<key>, cost} pairs the Hero
    // Creator can charge against (it reads flags.theah.nationalDiscounts).
    const discounts = [];
    for (const d of a.nationalDiscounts || []) {
      for (const key of resolveNationKeys(d.nation)) discounts.push({ nation: key, cost: d.cost });
    }
    if (a.nationalDiscounts?.length) {
      const human = a.nationalDiscounts.map((d) => `${titleCase(d.nation)} (${d.cost})`).join(", ");
      desc += `<p><em>Reduced cost for: ${human}.</em></p>`;
    }
    if (a.nationRestriction) {
      desc += `<p><em>Restricted to: ${a.nationRestriction}.</em></p>`;
    }
    // reducecost (a single display value on the item sheet) = the best discount.
    const reducecost = discounts.length ? Math.min(...discounts.map((d) => d.cost)) : 0;
    const doc = {
      _id: id16("advantage:" + a.name),
      name: a.name,
      type: "advantage",
      img: "systems/theah/icons/item.svg",
      system: {
        description: desc,
        infosource: `Core Rulebook p.${a.page}`,
        cost: { normal: a.cost ?? 1, reducecost },
        knack: false,
        innate: false,
      },
    };
    if (discounts.length) doc.flags = { theah: { nationalDiscounts: discounts } };
    return doc;
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

/* --------------------------- Dueling Styles --------------------------- */
{
  const src = readJson("duelstyles.json");
  const docs = src.map((d) => ({
    _id: id16("duelstyle:" + d.name),
    name: d.name,
    type: "duelstyle",
    img: "systems/theah/icons/item.svg",
    system: {
      description: para(d.description),
      infosource: `Core Rulebook p.${d.page}`,
      // bonus is authored as HTML in the source data; keep it verbatim.
      bonus: d.bonus ?? "",
    },
  }));
  writeFileSync(resolve(OUT, "duelstyles.json"), JSON.stringify(docs, null, 2));
  written.push(`duelstyles: ${docs.length}`);
}

/* -------------------------- Secret Societies -------------------------- */
{
  const src = readJson("secretsocieties.json");
  const docs = src.map((s) => ({
    _id: id16("secretsociety:" + s.name),
    name: s.name,
    type: "secretsociety",
    img: "systems/theah/icons/item.svg",
    system: {
      description: para(s.description),
      infosource: `Core Rulebook p.${s.page}`,
      concern: para(s.concern),
      // earnfavor / callupon are authored as HTML lists; keep them verbatim.
      earnfavor: s.earnfavor ?? "",
      callupon: s.callupon ?? "",
      // Favor is a live numeric tracker on the actor; templates start at 0.
      favor: 0,
    },
  }));
  writeFileSync(resolve(OUT, "secretsocieties.json"), JSON.stringify(docs, null, 2));
  written.push(`secretsocieties: ${docs.length}`);
}

/* ------------------------------ Sorceries ----------------------------- */
// The 5 core traditions (Hexenwerk, Glamour, Porté, Sanderis, Sorte). Each
// effect keeps its book grouping label (e.g. "Luck Glamour", "Major Unguent")
// as an italic kicker atop the description; sorctype/sorccat/sorcsubcat are
// config keys the sheet renders as tags.
{
  const src = readJson("sorceries.json");
  const docs = src.map((e) => {
    let desc = e.group ? `<p><em>${e.group}</em></p>` : "";
    desc += para(e.description);
    return {
      _id: id16("sorcery:" + e.sorctype + ":" + e.name),
      name: e.name,
      type: "sorcery",
      img: "systems/theah/icons/item.svg",
      system: {
        description: desc,
        infosource: e.page ? `Core Rulebook p.${e.page}` : "Core Rulebook",
        sorctype: e.sorctype,
        sorcdur: e.sorcdur || "none",
        sorccat: e.sorccat || "none",
        sorcsubcat: e.sorcsubcat || "none",
      },
    };
  });
  writeFileSync(resolve(OUT, "sorceries.json"), JSON.stringify(docs, null, 2));
  written.push(`sorceries: ${docs.length}`);
}

console.log("packs-data →", OUT);
for (const w of written) console.log("  " + w);
