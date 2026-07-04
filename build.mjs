// Minimal, auditable build for the Théah Foundry system.
// Bundles the ES module entry with esbuild, compiles SCSS with dart-sass,
// and copies public/ assets into dist/. Two deps only: esbuild, sass.
// Usage: bun build.mjs [--watch]
import { build as esbuild, context as esctx } from "esbuild";
import * as sass from "sass";
import { cp, mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const watch = process.argv.includes("--watch");

const JS_ENTRY = R("src/theah.mjs");
const SCSS_ENTRY = R("src/assets/theah.scss");
const OUT = R("dist");

async function copyPublic() {
  await cp(R("public"), OUT, { recursive: true });
}

async function buildCss() {
  const res = sass.compile(SCSS_ENTRY, {
    style: "expanded",
    sourceMap: true,
    silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api"],
    loadPaths: [R("src/assets")],
  });
  await writeFile(resolve(OUT, "theah.css"), res.css + `\n/*# sourceMappingURL=theah.css.map */\n`);
  if (res.sourceMap) await writeFile(resolve(OUT, "theah.css.map"), JSON.stringify(res.sourceMap));
  console.log("  css  ✓ theah.css");
}

const jsOptions = {
  entryPoints: [JS_ENTRY],
  bundle: true,
  format: "esm",
  target: "es2022",
  outfile: resolve(OUT, "theah.mjs"),
  sourcemap: true,
  logLevel: "info",
  // Foundry provides these as globals at runtime — never bundle them.
  // (all of this system's imports are relative, so nothing else is external)
};

async function buildJs() {
  if (watch) {
    const ctx = await esctx(jsOptions);
    await ctx.watch();
    console.log("  js   ▶ watching…");
  } else {
    await esbuild(jsOptions);
    console.log("  js   ✓ theah.mjs");
  }
}

async function run() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  console.log("Building Théah →", OUT);
  await copyPublic();
  console.log("  pub  ✓ public/ → dist/");
  await buildCss();
  await buildJs();
  if (!watch) console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
