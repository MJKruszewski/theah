/**
 * Runtime compendium seeding.
 *
 * The system ships its core catalog (advantages, backgrounds, arcana) as plain
 * JSON under `packs-data/` and fills the declared compendium packs on world
 * load. This keeps the build free of the native LevelDB tooling (`classic-level`)
 * that shipping pre-compiled packs would require — respecting the project's
 * dependency-safety rules — while still giving players real, drag-able compendia.
 *
 * Seeding is GM-only and idempotent. Documents carry a stable, name-derived
 * `_id`, so:
 *   - missing entries are created, and
 *   - on a seed-version bump, existing entries are UPDATED back to the shipped
 *     canonical data (name / type / img / system).
 * The upsert matters: without it a pack that once seeded badly (e.g. blank-named
 * advantage docs) would stay broken forever, because "create missing by _id"
 * never touches a doc that already exists. Bumping PACK_SEED_VERSION heals it.
 */

// Bump when the shipped catalog changes OR to force-heal existing worlds.
// v3: added Dueling Styles + Secret Societies compendia.
// v4: Secret Society Favor is now numeric (0), not the "0" HTML string.
// v5: adds the Sorceries (Core) pack — 116 effects across the 5 core traditions.
// v6: adds Ussura's Dar Matushki (Mother's Touch) — 8 Gifts + 5 Restrictions (129 total).
export const PACK_SEED_VERSION = 6;

const SEED_TARGETS = [
  { pack: 'theah.backgrounds', file: 'backgrounds' },
  { pack: 'theah.advantages', file: 'advantages' },
  { pack: 'theah.arcana', file: 'arcana' },
  { pack: 'theah.duelstyles', file: 'duelstyles' },
  { pack: 'theah.secretsocieties', file: 'secretsocieties' },
  { pack: 'theah.sorceries', file: 'sorceries' },
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
 * Bring one pack in line with its shipped JSON: create missing docs, and
 * (when `heal` is true) rewrite existing docs to the canonical name/type/img/
 * system. Returns { created, updated }.
 * @param {string} pack   Compendium collection id (e.g. "theah.advantages").
 * @param {object[]} docs Shipped documents.
 * @param {boolean} heal  Update existing docs, not just create missing ones.
 */
async function syncPack(pack, docs, heal) {
  const collection = game.packs.get(pack);
  if (!collection) return { created: 0, updated: 0 }; // pack not declared / not ready

  const wasLocked = collection.locked;
  if (wasLocked) await collection.configure({ locked: false });

  let created = 0;
  let updated = 0;
  let purged = 0;
  try {
    const cls = CONFIG[collection.metadata.type].documentClass;

    if (heal) {
      // Purge corrupt (blank-named) docs first — these are what make advantages
      // render as empty cards. Removing them lets the shipped set repopulate
      // cleanly, whatever _id the corrupt copies carried.
      const index = await collection.getIndex();
      const blankIds = index.filter((i) => !i.name || !String(i.name).trim()).map((i) => i._id);
      if (blankIds.length) {
        await cls.deleteDocuments(blankIds, { pack });
        purged = blankIds.length;
      }
    }

    const index = await collection.getIndex();
    const existing = new Set(index.map((i) => i._id));

    const toCreate = docs.filter((d) => !existing.has(d._id));
    if (toCreate.length) {
      await cls.createDocuments(toCreate, { pack, keepId: true });
      created = toCreate.length;
    }

    if (heal) {
      // Rewrite every shipped doc that still exists back to canonical data.
      const toUpdate = docs
        .filter((d) => existing.has(d._id))
        .map((d) => ({ _id: d._id, name: d.name, type: d.type, img: d.img, system: d.system }));
      if (toUpdate.length) {
        await cls.updateDocuments(toUpdate, { pack, diff: false, recursive: false });
        updated = toUpdate.length;
      }
    }
  } catch (e) {
    console.error(`Théah | failed seeding ${pack}`, e);
  } finally {
    if (wasLocked) await collection.configure({ locked: true });
  }
  return { created, updated: updated + purged };
}

/**
 * Seed the core compendia from bundled JSON. Only the GM writes to packs.
 * @param {object} [opts]
 * @param {boolean} [opts.force]  Ignore the version gate and heal every pack.
 * @returns {Promise<void>}
 */
export async function seedCompendia({ force = false } = {}) {
  if (!game.user?.isGM) return;

  const seededVersion = game.settings.get('theah', 'packSeedVersion') || 0;

  // Corruption = an empty pack OR any blank-named doc. Detect it every load so a
  // pack that seeded badly self-heals even at the current version (a version bump
  // alone wasn't enough — the old gate only checked for empty packs).
  const corrupt = SEED_TARGETS.some((t) => {
    const c = game.packs.get(t.pack);
    if (!c) return false;
    if (c.index.size === 0) return true;
    return c.index.some((i) => !i.name || !String(i.name).trim());
  });

  const heal = force || seededVersion < PACK_SEED_VERSION || corrupt;
  if (!heal) return;

  let created = 0;
  let updated = 0;
  for (const { pack, file } of SEED_TARGETS) {
    const docs = await loadSeedData(file);
    if (!docs) continue;
    // Heal existing docs too (purge blanks + rewrite to canonical) — repairs
    // packs that seeded badly in a prior version.
    const r = await syncPack(pack, docs, true);
    created += r.created;
    updated += r.updated;
  }

  await game.settings.set('theah', 'packSeedVersion', PACK_SEED_VERSION);
  if (created || updated) {
    ui.notifications?.info(
      game.i18n.format('SVNSEA2E.PacksSeeded', { count: created + updated }),
    );
    console.log(`Théah | seeded ${created} + repaired ${updated} compendium entries.`);
  }
}

/**
 * Force a full re-heal of the core compendia from the shipped JSON, ignoring the
 * version gate. Handy from the console: `game.theah.reseedCompendia()`.
 * @returns {Promise<void>}
 */
export async function reseedCompendia() {
  if (!game.user?.isGM) {
    ui.notifications?.warn('Only the GM can reseed the compendia.');
    return;
  }
  await seedCompendia({ force: true });
}
