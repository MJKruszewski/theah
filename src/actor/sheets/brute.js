import ActorSheetSS2e from './base.js';
import { postThemedChat } from '../../helpers.js';

/**
 * Brute Squad sheet (Core p.191-192). A Brute Squad has one stat — Strength —
 * which is both its health and its threat: Heroes cut it down (each Raise -1) and
 * on its turn it deals Wounds equal to its current Strength. The sheet renders
 * Strength as a "muster" rank of thug figures, with a type-driven Special Ability.
 */
export class ActorSheetSS2eBrute extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['theah', 'sheet', 'actor', 'brute'],
      template: 'systems/theah/templates/actors/brute.hbs',
      width: 760,
      height: 720,
    });
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) return;

    // Muster: click a figure to set the Squad's current Strength; steppers and a
    // "Muster" (restore to full) button adjust it too.
    html.find('.muster .fig').on('click', this._onMusterFigure.bind(this));
    html.find('.muster-ctl .str-step').on('click', this._onStrengthStep.bind(this));
    html.find('.muster-ctl .muster-btn').on('click', this._onMusterFull.bind(this));

    // Squad type: re-render so the Special Ability card reflects the choice.
    html.find('.squad-type-select').on('change', this._onSquadTypeChange.bind(this));

    // Activate the Special Ability (spend a Danger Point) → themed chat card.
    html.find('.activate-ability').on('click', this._onActivateAbility.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Click a muster figure to set current Strength. Clicking the top-most standing
   * figure toggles it down by one (so you can lop off the last member); clicking
   * a fallen figure restores up to that level.
   * @param {Event} event
   * @private
   */
  _onMusterFigure(event) {
    event.preventDefault();
    const level = Number(event.currentTarget.dataset.level) || 0;
    const cur = this.actor.system.traits?.strength?.value ?? 0;
    const next = level === cur ? level - 1 : level;
    this._setStrength(next);
  }

  /**
   * ±1 stepper for current Strength (−1 = a Hero spends a Raise).
   * @param {Event} event
   * @private
   */
  _onStrengthStep(event) {
    event.preventDefault();
    const delta = Number(event.currentTarget.dataset.delta) || 0;
    const cur = this.actor.system.traits?.strength?.value ?? 0;
    this._setStrength(cur + delta);
  }

  /**
   * Muster the Squad back to full Strength.
   * @param {Event} event
   * @private
   */
  _onMusterFull(event) {
    event.preventDefault();
    this._setStrength(this.actor.system.traits?.strength?.max ?? 0);
  }

  /**
   * Write current Strength, clamped to [0, max]. No-op when unchanged (so the
   * document's resource card doesn't post spuriously).
   * @param {number} value
   * @private
   */
  _setStrength(value) {
    const max = this.actor.system.traits?.strength?.max ?? 0;
    const cur = this.actor.system.traits?.strength?.value ?? 0;
    const next = Math.max(0, Math.min(value, max));
    if (next === cur) return;
    this.actor.update({ 'system.traits.strength.value': next });
  }

  /**
   * Persist the chosen Squad type and re-render (the Ability card is derived).
   * @param {Event} event
   * @private
   */
  _onSquadTypeChange(event) {
    event.preventDefault();
    this.actor.update({ 'system.squadtype': event.currentTarget.value });
  }

  /**
   * Activate the Squad's Special Ability — announce it to chat, reminding the GM
   * to spend a Danger Point (Core p.192). The Ability occurs in addition to the
   * Squad's normal Wounds; it is not auto-resolved (it's a GM adjudication).
   * @param {Event} event
   * @private
   */
  async _onActivateAbility(event) {
    event.preventDefault();
    const sys = this.actor.system;
    const type = sys.squadtype || '';
    const abilities = CONFIG.SVNSEA2E.bruteAbilities || {};
    let abilityName;
    let abilityDesc;
    if (abilities[type]) {
      abilityName = game.i18n.localize(abilities[type].name);
      abilityDesc = game.i18n.localize(abilities[type].desc);
    } else {
      abilityName = sys.ability?.name || '';
      abilityDesc = sys.ability?.description || '';
    }
    if (!abilityDesc) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const content = `
      <div class="theah theah-brute ability">
        <div class="brute-head"><i class="fas fa-bolt-lightning"></i> ${L('SVNSEA2E.BruteActivates', { name: this.actor.name })}</div>
        <div class="brute-body">
          <div class="brute-ability-name">${abilityName}</div>
          <div class="brute-ability-desc">${abilityDesc}</div>
          <div class="brute-cost"><i class="fas fa-triangle-exclamation"></i> ${L('SVNSEA2E.BruteAbilityCost')}</div>
        </div>
      </div>`;

    await postThemedChat({ actor: this.actor, content });
  }
}
