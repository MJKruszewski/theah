# Théah — 7th Sea 2e (Unofficial) — Foundry VTT System

An unofficial 7th Sea Second Edition system for Foundry VTT (V13–V14), with an
aged sea-chart aesthetic and the Raises dice pool. Built on the mechanics of the
`svnsea2e` community system, reskinned and extended.

## Install in Foundry via manifest URL (recommended)

Once the repo is on GitHub and a release exists, install like any other system:

1. Foundry Setup → **Game Systems** → **Install System**.
2. Paste the **Manifest URL**:
   ```
   https://github.com/<owner>/<repo>/releases/latest/download/system.json
   ```
   (e.g. `https://github.com/podania/theah/releases/latest/download/system.json`)
3. Install. Foundry pulls the release zip and future updates automatically.

### Publish a release (what makes that URL work)

`node_modules/`, `dist/`, and `foundryconfig.json` are gitignored; the built
system is produced by CI, not committed.

```powershell
cd D:\Projects\7sea\theah
git init
git add .
git commit -m "Théah system: rebrand + reskin"
git branch -M main
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main

# cut a release — the GitHub Action builds, stamps + zips, and publishes assets:
git tag v0.1.0
git push origin v0.1.0
```

The workflow (`.github/workflows/release.yml`) runs on the tag, injects the
correct `manifest`/`download`/`version` into `system.json` (from the repo + tag),
and attaches `system.json` + `theah.zip` to the release. The repo must be
**public** for Foundry to fetch the assets without authentication.

### Manual release (no CI)

```powershell
bun run build
bun tools/ci-stamp-manifest.mjs v0.1.0 <owner>/<repo>   # stamps dist/system.json
Compress-Archive -Path .\dist\* -DestinationPath .\theah.zip -Force
# then create a GitHub Release for tag v0.1.0 and upload dist/system.json + theah.zip
```

## Local install (dev / testing without a release)

```powershell
bun install          # first time only — installs esbuild + sass locally
# copy foundryconfig.json.example → foundryconfig.json and set dataPath
bun run deploy       # builds, then copies dist/ → <dataPath>/Data/systems/theah
```
Restart Foundry; the system appears under Game Systems. (Or manually copy `dist/`
contents into `<FoundryData>/Data/systems/theah/`.)

## Build

```powershell
bun run build        # → dist/  (theah.mjs, theah.css, system.json, assets)
```
Minimal, self-contained: esbuild bundles the ES module, dart-sass compiles the
SCSS. Two pinned dev dependencies (esbuild, sass); nothing global.

## Compatibility

- Foundry **V13–V14** (`compatibility.minimum "13"`, `verified "14"`).
- Sheets currently use the deprecated ApplicationV1 base (works through V15);
  ApplicationV2 migration is planned.

## Status

- ✅ Rebranded, builds cleanly, reskinned character sheet (traits / skills /
  wounds / Raises roll card) in the aged sea-chart theme.
- ✅ Foundry-V14-compliant manifest; GitHub-release install flow.
- 🔜 Compendiums (Advantages, Backgrounds, …) extracted from the rulebooks.
- 🔜 Bundled display font; dark theme; remaining actor/item sheets.

Uses 7th Sea content under the applicable fan-content terms; for personal use.
Book-derived compendium data is **not** committed to this repo.
