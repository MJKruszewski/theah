/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  // Define template paths to load
  const templatePaths = [
    // Actor Sheet Partials
    'systems/theah/templates/actors/parts/actor-name.hbs',
    'systems/theah/templates/actors/parts/actor-traits.hbs',
    'systems/theah/templates/actors/parts/actor-overview.hbs',
    'systems/theah/templates/actors/parts/actor-prowess.hbs',
    'systems/theah/templates/actors/parts/actor-stories.hbs',
    'systems/theah/templates/actors/parts/actor-arcana.hbs',
    'systems/theah/templates/actors/parts/actor-concept.hbs',
    'systems/theah/templates/actors/parts/actor-advantages.hbs',
    'systems/theah/templates/actors/parts/actor-sorcery.hbs',
    'systems/theah/templates/actors/parts/actor-inventory.hbs',
    'systems/theah/templates/actors/parts/actor-fate.hbs',
    'systems/theah/templates/actors/parts/actor-villainy.hbs',
    'systems/theah/templates/actors/parts/actor-vtraits.hbs',
    'systems/theah/templates/actors/parts/actor-wounds.hbs',

    // Item Sheet Partials
    'systems/theah/templates/items/parts/item-header.hbs',
    'systems/theah/templates/items/parts/item-description.hbs',

    // Applications
    'systems/theah/templates/apps/hero-creator.hbs',
    'systems/theah/templates/apps/advancement-creator.hbs',
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};
