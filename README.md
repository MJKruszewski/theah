# Théah — 7th Sea 2e (Unofficial) — Foundry VTT System

An unofficial 7th Sea Second Edition system for Foundry VTT (V13+), with an
aged sea-chart aesthetic and the Raises dice pool. Built on the mechanics of the
`svnsea2e` community system, reskinned and extended.

## Build

```powershell
cd D:\Projects\7sea\theah
bun install          # first time only — installs esbuild + sass locally
bun run build        # → dist/  (theah.mjs, theah.css, system.json, assets)
```

The build is minimal and self-contained: `bun build.mjs` bundles the ES module
with esbuild and compiles SCSS with dart-sass. Two pinned dev dependencies only.

## Install into Foundry (local testing)

**Option A — automatic deploy (recommended):**

1. Copy `foundryconfig.json.example` → `foundryconfig.json` and set `dataPath`
   to your Foundry user-data folder (the one that contains `Data/`), e.g.
   `C:/Users/macie/AppData/Local/FoundryVTT`.
2. Run:
   ```powershell
   bun run deploy      # builds, then copies dist/ → <dataPath>/Data/systems/theah
   ```
3. Restart Foundry (or return to Setup). "Théah — 7th Sea 2e (Unofficial)"
   appears under **Game Systems**. Create a world with it.

**Option B — manual copy:**

Copy the contents of `dist/` into `<FoundryData>/Data/systems/theah/`
(so that `.../Data/systems/theah/system.json` exists), then restart Foundry.

## Push to git (optional)

`node_modules/`, `dist/`, and `foundryconfig.json` are gitignored. To publish:

```powershell
cd D:\Projects\7sea\theah
git init
git add .
git commit -m "Théah system: rebrand + reskin"
git remote add origin <your-remote>
git push -u origin main
```

## Status

- ✅ Rebranded, builds cleanly, reskinned character sheet (traits / skills /
  wounds / Raises roll card) in the aged sea-chart theme.
- 🔜 Compendiums (Advantages, Backgrounds, …) extracted from the rulebooks.
- 🔜 Bundled display font; dark theme; remaining actor/item sheets.

Uses 7th Sea content under the applicable fan-content terms; for personal use.
