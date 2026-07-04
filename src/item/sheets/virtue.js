import { SVNSEA2E } from '../../config.js';
import { ItemSheetSS2e } from './base.js';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ItemSheetSS2eVirtue extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: 'systems/theah/templates/items/arcana.hbs',
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
