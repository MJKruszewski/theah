import { ActorType } from "../enums";
import { postThemedChat } from "../helpers.js";

/**
 * Extend the base Actor entity by definin`g` a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class SvnSea2EActor extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.system;

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    if (this.type === ActorType.PLAYER)
      this._preparePlayerCharacterData(actorData);
    if (this.type === ActorType.HERO) this._prepareHeroData(actorData);
    if (this.type === ActorType.VILLAIN || this.type === ActorType.MONSTER)
      this._prepareVillainData(actorData);
    if (this.type === ActorType.BRUTE) this._prepareBruteData(actorData);
    if (this.type === ActorType.SHIP) this._prepareShipData(actorData);
  }

  /**
   * Keep the value within the minimum and maxium values
   */
  _validateMinMaxData(value, min, max) {
    if (parseInt(value) > parseInt(max)) {
      return max;
    } else if (parseInt(value) < parseInt(min)) {
      return min;
    }
    return value;
  }

  /**
   * Prepare Character type specific data
   */
  _preparePlayerCharacterData(actorData) {
    this._prepareWounds(actorData);
    this._prepareTraits(actorData);
    this._prepareSkills(actorData);
  }

  /**
   * Prepare Hero type specific data
   */
  _prepareHeroData(actorData) {
    this._prepareWounds(actorData);
    this._prepareTraits(actorData);
    this._prepareSkills(actorData);
  }

  /**
   * Prepare Villain type specific data
   */
  _prepareVillainData(actorData) {
    this._prepareTraits(actorData);
    actorData.villainy =
      parseInt(actorData.traits.strength.value) +
      parseInt(actorData.traits.influence.value);
    actorData.wounds.max = parseInt(actorData.traits.strength.value + 1) * actorData.dwounds.max;
    actorData.wounds.value = this._validateMinMaxData(
      actorData.wounds.value,
      actorData.wounds.min,
      actorData.wounds.max,
    );
  }

  /**
   * Prepare Brute type specific data
   */
  _prepareBruteData(actorData) {
    actorData.traits.strength.value = this._validateMinMaxData(
      actorData.traits.strength.value,
      actorData.traits.strength.min,
      actorData.traits.strength.max,
    );
    actorData.wounds.max = actorData.traits.strength.value;
    if (parseInt(actorData.wounds.max) < parseInt(actorData.wounds.value)) {
      actorData.wounds.value = actorData.wounds.max;
    }
  }

  /**
   * Prepare Ship type specific data
   */
  _prepareShipData(actorData) {}

  /**
   * Remove a member from the crew
   */
  async removeFromCrew() {
    await this.unsetFlag('theah', 'crewMember');
  }

  /**
   * Set a crew member's role
   */
  async setCrewMemberRole(shipId, role) {
    return this.setFlag('theah', 'crewMember', {
      shipId: shipId,
      role: role,
    });
  }

  /**
   *
   */
  _prepareTraits(actorData) {
    for (const trait of Object.values(actorData.traits)) {
      trait.value = this._validateMinMaxData(trait.value, trait.min, trait.max);
    }
  }

  /**
   *
   */
  _prepareSkills(actorData) {
    for (const skill of Object.values(actorData.skills)) {
      skill.value = this._validateMinMaxData(skill.value, skill.min, skill.max);
    }
  }

  /**
   * Establish the wound values based on the min and max for the actor type
   */
  _prepareWounds(actorData) {
    actorData.wounds.value = this._validateMinMaxData(
      actorData.wounds.value,
      actorData.wounds.min,
      actorData.wounds.max,
    );
  }

  /* -------------------------------------------- */
  /*  Wound reactions (chat + token)              */
  /* -------------------------------------------- */

  /**
   * Stash the pre-update Wound / Dramatic Wound values so _onUpdate can post an
   * accurate "took / recovered" message for whichever client made the change.
   * @override
   */
  async _preUpdate(changed, options, user) {
    await super._preUpdate(changed, options, user);
    const w = foundry.utils.getProperty(changed, 'system.wounds.value');
    const d = foundry.utils.getProperty(changed, 'system.dwounds.value');
    if (w !== undefined || d !== undefined) {
      options.theahPriorWounds = {
        w: this.system.wounds?.value ?? 0,
        d: this.system.dwounds?.value ?? 0,
      };
    }
    // Stash the prior Corruption so _onUpdate can post an accurate gain/shed
    // card for whichever client made the change. (0 is a valid prior, so the
    // presence of the key — not its truthiness — is what _onUpdate checks.)
    const c = foundry.utils.getProperty(changed, 'system.corruptionpts');
    if (c !== undefined) {
      options.theahPriorCorruption = this.system.corruptionpts ?? 0;
    }
  }

  /** @override */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    // Only the client that made the change reacts, so the chat card and token
    // status update exactly once regardless of how many players are connected.
    if (userId === game.user.id && !options.theahSilent) {
      if (options.theahPriorWounds) {
        this._reactToWoundChange(options.theahPriorWounds);
      }
      if (options.theahPriorCorruption !== undefined) {
        this._reactToCorruptionChange(options.theahPriorCorruption);
      }
    }
  }

  /**
   * Post a themed public chat card describing a Corruption gain or shed. Fires
   * for ANY change to system.corruptionpts (pip click, wizard, macro) because
   * it lives on the document, not a sheet handler. The GM "Evil Act" button
   * suppresses this with {theahSilent:true} and posts its own richer card
   * (Corruption gain + Fall-from-Grace 1d10) instead.
   * @param {number} prior  The pre-update Corruption value.
   * @private
   */
  async _reactToCorruptionChange(prior) {
    const cMax = 10;
    const newC = this.system.corruptionpts ?? 0;
    const delta = newC - prior;
    if (delta === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const gained = delta > 0;
    const headline = gained
      ? L('SVNSEA2E.CorruptionGains', { name, n: delta })
      : L('SVNSEA2E.CorruptionSheds', { name, n: -delta });
    const note = newC > 0
      ? L('SVNSEA2E.CorruptionRisk', { n: newC })
      : L('SVNSEA2E.CorruptionClean', { name });

    const content = `
      <div class="theah theah-corruption${gained ? ' severe' : ''}">
        <div class="corr-head"><i class="fas ${gained ? 'fa-skull' : 'fa-dove'}"></i> ${headline}</div>
        <div class="corr-body">
          <div class="corr-stats"><span class="cs"><b>${newC}</b>/${cMax} ${L('SVNSEA2E.Corruption')}</span></div>
          <div class="corr-note">${note}</div>
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });
  }

  /**
   * Post a themed public chat card describing the Wound / Dramatic Wound change
   * and keep the token's "Helpless" status in sync with the death spiral.
   * @param {{w:number, d:number}} prior  The pre-update values.
   * @private
   */
  async _reactToWoundChange(prior) {
    const s = this.system;
    const wMax = s.wounds?.max ?? 0;
    const dMax = s.dwounds?.max ?? 0;
    const newW = s.wounds?.value ?? 0;
    const newD = s.dwounds?.value ?? 0;
    const dW = newW - prior.w;
    const dD = newD - prior.d;
    if (dW === 0 && dD === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const dwEffects = [
      '',
      'SVNSEA2E.DwEffect1',
      'SVNSEA2E.DwEffect2',
      'SVNSEA2E.DwEffect3',
      'SVNSEA2E.DwEffect4',
    ];

    let headline;
    let severe = false;
    let icon = 'fa-droplet';
    if (dD > 0) {
      severe = true;
      icon = 'fa-heart-crack';
      headline =
        newD >= dMax
          ? L('SVNSEA2E.WoundHelpless', { name })
          : L('SVNSEA2E.DramaticSuffers', { name });
    } else if (dD < 0) {
      icon = 'fa-heart';
      headline = L('SVNSEA2E.DramaticHeals', { name });
    } else if (dW > 0) {
      headline = L('SVNSEA2E.WoundTakes', { name, n: dW, s: dW === 1 ? '' : 's' });
    } else {
      icon = 'fa-heart';
      headline = L('SVNSEA2E.WoundRecovers', { name });
    }

    const effectKey = dwEffects[Math.min(newD, dMax)];
    const effect = newD > 0 && effectKey ? game.i18n.localize(effectKey) : '';

    // Brutes and other minions have no Dramatic-Wound track (dMax === 0); omit
    // the meaningless "0/0 Dramatic Wounds" line for them.
    const dwLine =
      dMax > 0
        ? `<span class="ws dw"><b>${newD}</b>/${dMax} ${L('SVNSEA2E.DramaticWounds')}</span>`
        : '';

    const content = `
      <div class="theah theah-wound${severe ? ' severe' : ''}">
        <div class="wound-head"><i class="fas ${icon}"></i> ${headline}</div>
        <div class="wound-body">
          <div class="wound-stats">
            <span class="ws"><b>${newW}</b>/${wMax} ${L('SVNSEA2E.Wounds')}</span>
            ${dwLine}
          </div>
          ${effect ? `<div class="wound-effect">${effect}</div>` : ''}
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });

    // Keep the "Helpless" token status in sync only when the DW count changed.
    if (dD !== 0 && typeof this.toggleStatusEffect === 'function') {
      try {
        await this.toggleStatusEffect('unconscious', { active: newD >= dMax });
      } catch (e) {
        /* status effects are optional / permission-gated */
      }
    }
  }
}
