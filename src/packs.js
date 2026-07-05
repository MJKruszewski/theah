/**
 * Runtime compendium seeding.
 *
 * The system ships its core catalog (advantages, backgrounds, arcana) as plain
 * JSON under `packs-data/` and fills the declared compendium packs on world
 * load. This keeps the build free of the native LevelDB tooling (`classic-level`)
 * that shipping pre-compiled packs would require — respecting the project's
 * dependency-safety rules — while still giving players real, drag-able compendia.
 *
 * Seeding is GM-only, idempotent (documents are created by their stable _id, so
 * re-runs only add what's missing) and version-gated so it doesn't re-fetch on
 * every load once done.
 */

// Bump when the shipped catalog changes to force a re-seed of missing entries.
export const PACK_SEED_VERSION = 1;

const SEED_TARGETS = [
  { pack: 'theah.backgrounds', file: 'backgrounds' },
  { pack: 'theah.advantages', file: 'advantages' },
  { pack: 'theah.arcana', file: 'arcana' },
];

/**
 * Fetch the shipped document array for a pack, or null if unavailable.
 * @param {string} file  Base filename under packs-data/.
 * @returns {Promise<object[]|null>}
 */
async function loadSeedData(file) {
  try {
    const res = await fetch(`systems/theah/packs-data/${file}.json`);
    if (!res.ok) return null;
    const docs = await res.json();
    return Array.isArray(docs) && docs.length ? docs : null;
  } catch (e) {
    console.warn(`Théah | could not load seed data for ${file}`, e);
    return null;
  }
}

/**
 * Seed the core compendia from bundled JSON. Only the GM writes to packs.
 * @returns {Promise<void>}
 */
export async function seedCompendia() {
  if (!game.user?.isGM) return;

  const seededVersion = game.settings.get('theah', 'packSeedVersion') || 0;

  // Fast path: already seeded at the current version and no pack is empty.
  if (seededVersion >= PACK_SEED_VERSION) {
    const anyMissing = SEED_TARGETS.some((t) => {
      const c = game.packs.get(t.pack);
      return c && c.index.size === 0;
    });
    if (!anyMissing) return;
  }

  let created = 0;
  for (const { pack, file } of SEED_TARGETS) {
    const collection = game.packs.get(pack);
    if (!collection) continue; // pack not declared / not ready

    const docs = await loadSeedData(file);
    if (!docs) continue;

    const wasLocked = collection.locked;
    if (wasLocked) await collection.configure({ locked: false });

    try {
      const index = await collection.getIndex();
      const existing = new Set(index.map((i) => i._id));
      const toCreate = docs.filter((d) => !existing.has(d._id));
      if (toCreate.length) {
        const cls = CONFIG[collection.metadata.type].documentClass;
        await cls.createDocuments(toCreate, { pack, keepId: true });
        created += toCreate.length;
      }
    } catch (e) {
      console.error(`Théah | failed seeding ${pack}`, e);
    } finally {
      if (wasLocked) await collection.configure({ locked: true });
    }
  }

  await game.settings.set('theah', 'packSeedVersion', PACK_SEED_VERSION);
  if (created) {
    ui.notifications?.info(
      game.i18n.format('SVNSEA2E.PacksSeeded', { count: created }),
    );
    console.log(`Théah | seeded ${created} compendium entries.`);
  }
}
