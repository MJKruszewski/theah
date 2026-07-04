// Stamp dist/system.json with the release version + GitHub manifest/download URLs.
// Used by the release workflow, and usable locally for a manual release:
//   bun tools/ci-stamp-manifest.mjs v0.1.0 owner/repo
import { readFileSync, writeFileSync } from "node:fs";

const tag = process.env.GITHUB_REF_NAME ?? process.argv[2];
const repo = process.env.GITHUB_REPOSITORY ?? process.argv[3];
if (!tag || !repo) {
  console.error("Need a tag and repo: env GITHUB_REF_NAME + GITHUB_REPOSITORY, or argv `<vX.Y.Z> <owner/repo>`.");
  process.exit(1);
}
const version = tag.replace(/^v/, "");
const p = "dist/system.json";
const j = JSON.parse(readFileSync(p, "utf8"));
j.version = version;
j.manifest = `https://github.com/${repo}/releases/latest/download/system.json`;
j.download = `https://github.com/${repo}/releases/download/${tag}/theah.zip`;
j.url = `https://github.com/${repo}`;
writeFileSync(p, JSON.stringify(j, null, 2));
console.log(`Stamped dist/system.json → v${version}`);
console.log(`  manifest: ${j.manifest}`);
console.log(`  download: ${j.download}`);
