// Deploy the built system into your local Foundry data folder for testing.
// Reads foundryconfig.json (gitignored) → copies dist/ → <dataPath>/Data/systems/theah.
// Usage: bun deploy.mjs   (or `bun run deploy` to build first)
import { cp, rm, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cfgPath = join(__dirname, "foundryconfig.json");

if (!existsSync(cfgPath)) {
  console.error("✗ Missing foundryconfig.json.");
  console.error("  Copy foundryconfig.json.example → foundryconfig.json and set \"dataPath\".");
  process.exit(1);
}
let dataPath;
try { ({ dataPath } = JSON.parse(await readFile(cfgPath, "utf8"))); }
catch (e) { console.error("✗ foundryconfig.json is not valid JSON:", e.message); process.exit(1); }
if (!dataPath) { console.error("✗ foundryconfig.json has no \"dataPath\"."); process.exit(1); }

const dist = join(__dirname, "dist");
if (!existsSync(dist)) { console.error("✗ No dist/ — run `bun run build` first."); process.exit(1); }

const target = resolve(dataPath, "Data", "systems", "theah");
if (!existsSync(resolve(dataPath, "Data"))) {
  console.error(`✗ '${resolve(dataPath, "Data")}' not found — is dataPath correct?`);
  process.exit(1);
}
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(dist, target, { recursive: true });
console.log("✓ Deployed Théah →", target);
console.log("  Restart Foundry (or return to Setup) and it appears under Game Systems.");
