import { ItemSheetSS2e } from './base.js';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ItemSheetSS2eSecretSociety extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'systems/theah/templates/items/secretsociety.hbs',
      width: 800,
      height: 700,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }
}
