import { ActorType } from "./enums";

/**
 * Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs
 * @return {Promise}      A Promise which resolves once the migration is completed
 */
export const migrateWorld = async function () {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    {
      permanent: true,
    },
  );
  // Migrate World Actors
  for (const a of game.actors.values()) {
    try {
      const updateData = migrateActorData(a);
      if (!foundry.utils.isEmpty(updateData)) {
        console.log(`Migrating Actor entity ${a.name}`);
        await a.update(updateData, {
          enforceTypes: false,
          theahSilent: true, // don't fire wound chat cards during migration
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Migrate World Items
  for (const i of game.items.values()) {
    try {
      const updateData = migrateItemData(i);
      if (!foundry.utils.isEmpty(updateData)) {
        console.log(`Migrating Item entity ${i.name}`);
        await i.update(updateData, {
          enforceTypes: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Migrate World Compendium Packs
  const packs = game.packs.filter((p) => {
    return (
      p.metadata.package === 'world' &&
      ['Actor', 'Item', 'Scene'].includes(p.metadata.entity)
    );
  });
  for (let p of packs) {
    await migrateCompendium(p);
  }

  // Set the migration as complete
  game.settings.set('theah', 'systemMigrationVersion', game.system.version);
  ui.notifications.info(
    `7th Sea 2E System Migration to version ${game.system.version} completed!`,
    {
      permanent: true,
    },
  );
};

/* -------------------------------------------- */
/*  Entity Type Migration Helpers               */
/* -------------------------------------------- */

/**
 * Apply migration rules to all Entities within a single Compendium pack
 * @param pack
 * @return {Promise}
 */
export const migrateCompendium = async function (pack) {
  const entity = pack.metadata.entity;
  if (!['Actor', 'Item', 'Scene'].includes(entity)) return;

  // Begin by requesting server-side data model migration and get the migrated content
  await pack.migrate();

  // Iterate over compendium entries - applying fine-tuned migration functions
  for (let ent of pack) {
    try {
      let updateData = null;
      if (entity === 'Item') updateData = migrateItemData(ent.data);
      else if (entity === 'Actor') updateData = migrateActorData(ent.data);
      else if (entity === 'Scene') updateData = migrateSceneData(ent.data);
      if (!foundry.utils.isEmpty(updateData)) {
        expandObject(updateData);
        updateData['_id'] = ent._id;
        await pack.updateEntity(updateData);
        console.log(
          `Migrated ${entity} entity ${ent.name} in Compendium ${pack.collection}`,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log(
    `Migrated all ${entity} entities from Compendium ${pack.collection}`,
  );
};

/**
 * Migrate a single Actor entity to incorporate latest data model changes
 * Return an Object of updateData to be applied
 * @param {Actor} actor   The actor to Update
 * @return {Object}       The updateData to apply
 */
export const migrateActorData = function (actor) {
  const updateData = {};

  if (actor.type === ActorType.PLAYER && actor.system.wealth == null) {
    updateData['system.wealth'] = 0;
  }

  // Book-accurate Death Spiral: 16 Wounds (4 per Dramatic Wound). Only the
  // Hero-side actors carry a stored wounds.max; villain/monster wounds.max is
  // derived from Strength in prepareData, so migrating it would be pointless
  // churn (recomputed on every load).
  if (
    (actor.type === ActorType.PLAYER || actor.type === ActorType.HERO) &&
    actor.system.wounds.max != 16
  ) {
    updateData['system.wounds.max'] = 16;
    if (actor.system.wounds.value > 16) updateData['system.wounds.value'] = 16;
  }

  if (
    (actor.type === ActorType.PLAYER ||
      actor.type === ActorType.HERO ||
      actor.type === ActorType.VILLAIN) &&
    actor.system.nation === 'rahuris'
  ) {
    updateData['system.nation'] = 'rahuri';
  }

  if (
    (actor.type === ActorType.VILLAIN || actor.type === ActorType.MONSTER) &&
    actor.system.traits.strength.max != 20
  ) {
    updateData['system.traits.strength.max'] = 20;
    updateData['system.traits.influence.max'] = 20;
    updateData['system.traits.influence.min'] = 0;
  }

  if (
    actor.type === ActorType.BRUTE &&
    actor.system.traits.strength.max != 20
  ) {
    updateData['system.traits.strength.max'] = 20;
  }

  if (actor.type === ActorType.DANGERPOINTS && actor.system.points < 5) {
    updateData['system.points'] = 5;
  }

  if (actor.type === ActorType.MONSTER && actor.system.fear.max != 5) {
    updateData['system.fear.value'] = 0;
    updateData['system.fear.min'] = 0;
    updateData['system.fear.max'] = 5;
  }

  if (actor.type === ActorType.SHIP) {
    if (actor.system.crewstatus == null) {
      updateData['system.crewstatus'] = '';
    }
    if (actor.system.wealth == null) {
      updateData['system.wealth'] = '0';
    }
  }

  if (
    actor.type === ActorType.PLAYER ||
    actor.type === ActorType.HERO ||
    actor.type === ActorType.VILLAIN
  ) {
    if (actor.system.arcana) {
      migrateVirtue(actor);
      migrateHubris(actor);
      actor.update({ 'system.arcana': null }, { theahSilent: true });
    }
  }

  return updateData;
};

/**
 * Migrate a single Actor entity to incorporate latest data model changes
 * Return an Object of updateData to be applied
 * @param {Actor} actor   The actor to Update
 * @return {Object}       The updateData to apply
 */
export const migrateItemData = function (item) {
  const updateData = {};

  if (
    item.type === 'secretsociety' &&
    typeof item.system.favor === 'undefined'
  ) {
    updateData['system.favor'] = 0;
  }

  if (item.type === 'story' && typeof item.system.status === 'undefined') {
    updateData['system.status'] = 'current';
  }

  return updateData;
};

/* -------------------------------------------- */

/**
 * Migrate a single Scene entity to incorporate changes to the data model of it's actor data overrides
 * Return an Object of updateData to be applied
 * @param {Object} scene  The Scene data to Update
 * @return {Object}       The updateData to apply
 */
export const migrateSceneData = function (scene) {
  return {};
};

export const migrateVirtue = function (actor) {
  const virtue = actor.system.arcana.virtue;
  if (virtue.name) {
    const itemData = {
      name: virtue.name,
      img: `systems/theah/icons/item.svg`,
      type: 'virtue',
      data: {
        description: virtue.description,
      },
    };
    actor.document.createEmbeddedDocuments('Item', [itemData]);
  }
};

export const migrateHubris = function (actor) {
  const hubris = actor.system.arcana.hubris;
  if (hubris.name) {
    const itemData = {
      name: hubris.name,
      img: `systems/theah/icons/item.svg`,
      type: 'hubris',
      data: {
        description: hubris.description,
      },
    };
    actor.document.createEmbeddedDocuments('Item', [itemData]);
  }
};
