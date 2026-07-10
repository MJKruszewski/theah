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
    // Stash the prior Wealth so _onUpdate can post an accurate earn/spend card.
    const wl = foundry.utils.getProperty(changed, 'system.wealth');
    if (wl !== undefined) {
      options.theahPriorWealth = this.system.wealth ?? 0;
    }
    // Stash the prior Hull state (Ship Hits / Critical Hits) so _onUpdate can post
    // a "takes a Hit / Critical Hit / Crippled" card.
    const h = foundry.utils.getProperty(changed, 'system.hits.value');
    const cr = foundry.utils.getProperty(changed, 'system.criticals.value');
    if (h !== undefined || cr !== undefined) {
      options.theahPriorHull = {
        h: this.system.hits?.value ?? 0,
        c: this.system.criticals?.value ?? 0,
      };
    }
    // Ship: stash prior Cargo hold, Crew Strength and Crew Morale so _onUpdate can
    // post load/unload, recruit/casualty and morale cards. (crewstatus/cargohold are
    // form fields present on every ship submit — the react methods early-return when
    // nothing meaningful changed, so a name/note edit posts nothing.)
    const cargo = foundry.utils.getProperty(changed, 'system.cargohold');
    if (cargo !== undefined) {
      options.theahPriorCargo = foundry.utils.deepClone(this.system.cargohold ?? []);
    }
    const crewv = foundry.utils.getProperty(changed, 'system.crew.value');
    if (crewv !== undefined) {
      options.theahPriorCrew = this.system.crew?.value ?? 0;
    }
    const morale = foundry.utils.getProperty(changed, 'system.crewstatus');
    if (morale !== undefined) {
      options.theahPriorMorale = this.system.crewstatus;
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
      if (options.theahPriorWealth !== undefined) {
        // Wealth is a shared field: Heroes get the personal-spending card, Ships
        // get the Treasury card (the Hero affordances are meaningless for a Ship).
        if (this.type === ActorType.SHIP) {
          this._reactToTreasuryChange(options.theahPriorWealth);
        } else if (this.type === ActorType.PLAYER) {
          this._reactToWealthChange(options.theahPriorWealth);
        }
      }
      if (options.theahPriorHull) {
        this._reactToHullChange(options.theahPriorHull);
      }
      // Ship resource cards: Cargo load/unload, Crew Strength, Crew Morale.
      if (this.type === ActorType.SHIP) {
        if (options.theahPriorCargo !== undefined) {
          this._reactToCargoChange(options.theahPriorCargo);
        }
        if (options.theahPriorCrew !== undefined) {
          this._reactToCrewChange(options.theahPriorCrew);
        }
        if (options.theahPriorMorale !== undefined) {
          this._reactToMoraleChange(options.theahPriorMorale);
        }
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
   * Post a themed public chat card describing a Wealth earn or spend. Fires for
   * ANY change to system.wealth (taler click, wizard, macro, the roller's
   * spend-to-reroll) because it lives on the document, not a sheet handler.
   * @param {number} prior  The pre-update Wealth value.
   * @private
   */
  async _reactToWealthChange(prior) {
    const newW = this.system.wealth ?? 0;
    const delta = newW - prior;
    if (delta === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const gained = delta > 0;
    const headline = gained
      ? L('SVNSEA2E.WealthGains', { name, n: delta })
      : L('SVNSEA2E.WealthSpends', { name, n: -delta });

    // Affordance note keyed to the Core spending thresholds (1 / 3 / 5 / 8-10).
    let affordKey = 'SVNSEA2E.WealthAfford0';
    if (newW >= 8) affordKey = 'SVNSEA2E.WealthAfford8';
    else if (newW >= 5) affordKey = 'SVNSEA2E.WealthAfford5';
    else if (newW >= 3) affordKey = 'SVNSEA2E.WealthAfford3';
    else if (newW >= 1) affordKey = 'SVNSEA2E.WealthAfford1';

    const content = `
      <div class="theah theah-wealth${gained ? '' : ' spend'}">
        <div class="wealth-head"><i class="fas fa-coins"></i> ${headline}</div>
        <div class="wealth-body">
          <div class="wealth-stats"><span class="wl"><b>${newW}</b> ${L('SVNSEA2E.WealthPts')}</span></div>
          <div class="wealth-note">${L(affordKey)}</div>
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });
  }

  /**
   * Post a themed public chat card describing a Ship's Treasury change. Ships
   * reuse system.wealth as their Treasury, but the Hero affordance guidance is
   * meaningless for a Ship — this card carries the Treasury / Mutiny rule instead
   * (Core p.253: halve the Treasury each session to pay the Crew, or they mutiny).
   * @param {number} prior  The pre-update Treasury (Wealth) value.
   * @private
   */
  async _reactToTreasuryChange(prior) {
    const newW = this.system.wealth ?? 0;
    const delta = newW - prior;
    if (delta === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const gained = delta > 0;
    const headline = gained
      ? L('SVNSEA2E.TreasuryGains', { name, n: delta })
      : L('SVNSEA2E.TreasurySpends', { name, n: -delta });

    const content = `
      <div class="theah theah-wealth${gained ? '' : ' spend'}">
        <div class="wealth-head"><i class="fas fa-coins"></i> ${headline}</div>
        <div class="wealth-body">
          <div class="wealth-stats"><span class="wl"><b>${newW}</b> ${L('SVNSEA2E.Treasury')}</span></div>
          <div class="wealth-note">${L('SVNSEA2E.TreasuryNote')}</div>
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });
  }

  /**
   * Post a themed public chat card when a Ship's Cargo hold changes. Fires only
   * on a meaningful load/unload — a lot's NAME appearing or disappearing — so
   * adding an empty crate or editing a note posts nothing. Reuses the Treasury/
   * Wealth card grammar with a crate icon.
   * @param {Array<{name:string,note:string}>} prior  The pre-update cargo hold.
   * @private
   */
  async _reactToCargoChange(prior) {
    const cur = this.system.cargohold ?? [];
    const priorNames = (prior || []).map((c) => (c.name || '').trim()).filter(Boolean);
    const curNames = cur.map((c) => (c.name || '').trim()).filter(Boolean);
    // Multiset diff by name: which named lots were added / removed.
    const added = [...curNames];
    const removed = [];
    for (const nm of priorNames) {
      const i = added.indexOf(nm);
      if (i >= 0) added.splice(i, 1);
      else removed.push(nm);
    }
    if (!added.length && !removed.length) return; // empty add/remove or note-only edit

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const cap = this.system.cargocap ?? 0;

    let headline;
    let icon;
    let spend = '';
    if (added.length && !removed.length) {
      headline = L('SVNSEA2E.CargoLoads', { name, what: added.join(', ') });
      icon = 'fa-box';
    } else if (removed.length && !added.length) {
      headline = L('SVNSEA2E.CargoUnloads', { name, what: removed.join(', ') });
      icon = 'fa-box-open';
      spend = ' spend';
    } else {
      headline = L('SVNSEA2E.CargoManifestChanges', { name });
      icon = 'fa-boxes-stacked';
    }

    const manifest = curNames.length ? curNames.join(', ') : L('SVNSEA2E.EmptyHold');
    const content = `
      <div class="theah theah-wealth theah-cargo${spend}">
        <div class="wealth-head"><i class="fas ${icon}"></i> ${headline}</div>
        <div class="wealth-body">
          <div class="wealth-stats"><span class="wl"><b>${cur.length} / ${cap}</b> ${L('SVNSEA2E.CargoHold')}</span></div>
          <div class="wealth-note">${manifest}</div>
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });
  }

  /**
   * Post a themed public chat card when a Ship's total Crew Strength changes
   * (recruiting or casualties). (Core p.253 — Crew Strength divides into Squads.)
   * @param {number} prior  The pre-update Crew Strength.
   * @private
   */
  async _reactToCrewChange(prior) {
    const cur = this.system.crew?.value ?? 0;
    const delta = cur - prior;
    if (delta === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;
    const gained = delta > 0;
    const headline = gained
      ? L('SVNSEA2E.CrewGains', { name, n: delta })
      : L('SVNSEA2E.CrewLoses', { name, n: -delta });

    const content = `
      <div class="theah theah-wealth theah-crew${gained ? '' : ' spend'}">
        <div class="wealth-head"><i class="fas fa-users"></i> ${headline}</div>
        <div class="wealth-body">
          <div class="wealth-stats"><span class="wl"><b>${cur}</b> ${L('SVNSEA2E.CrewStrength')}</span></div>
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });
  }

  /**
   * Post a themed public chat card when a Ship's Crew Morale changes. A Mutinous
   * Crew is the dangerous state, so it carries the warning note (Core p.253).
   * @param {string} prior  The pre-update crewstatus key.
   * @private
   */
  async _reactToMoraleChange(prior) {
    const cur = this.system.crewstatus;
    if (cur === prior) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const statusKey = CONFIG.SVNSEA2E?.crewStatuses?.[cur] || cur;
    const label = game.i18n.localize(statusKey);
    // "none" (the blank dropdown option) localizes to an empty label — skip it
    // rather than posting "…'s Crew is now ." with a dangling status.
    if (!label || !label.trim()) return;
    const severe = cur === 'mutinous';

    const content = `
      <div class="theah theah-wealth theah-morale${severe ? ' severe' : ''}">
        <div class="wealth-head"><i class="fas fa-flag"></i> ${L('SVNSEA2E.MoraleNow', { name: this.name, status: label })}</div>
        ${severe ? `<div class="wealth-body"><div class="wealth-note">${L('SVNSEA2E.MoraleMutinousNote')}</div></div>` : ''}
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

  /**
   * Post a themed public chat card describing a Ship's Hull change (Hits /
   * Critical Hits) and keep the token's "wrecked" status in sync with Crippled.
   * The Hull mirrors the hero death spiral: 5 Hits per Critical Hit, 4 Critical
   * Hits = Crippled, and a Crippled Ship that takes a Hit is Sunk (Core p.252).
   * @param {{h:number, c:number}} prior  The pre-update Hits / Criticals values.
   * @private
   */
  async _reactToHullChange(prior) {
    const s = this.system;
    const hMax = s.hits?.max ?? 0;
    const cMax = s.criticals?.max ?? 0;
    const newH = s.hits?.value ?? 0;
    const newC = s.criticals?.value ?? 0;
    const dH = newH - prior.h;
    const dC = newC - prior.c;
    if (dH === 0 && dC === 0) return;

    const L = (k, data) => (data ? game.i18n.format(k, data) : game.i18n.localize(k));
    const name = this.name;

    let headline;
    let severe = false;
    let icon = 'fa-bullseye';
    if (dC > 0) {
      severe = true;
      icon = 'fa-burst';
      headline =
        newC >= cMax
          ? L('SVNSEA2E.HullCrippled', { name })
          : L('SVNSEA2E.HullCriticalHit', { name });
    } else if (dC < 0) {
      icon = 'fa-hammer';
      headline = L('SVNSEA2E.HullCritHeals', { name });
    } else if (dH > 0) {
      headline = L('SVNSEA2E.HullTakesHit', { name, n: dH, s: dH === 1 ? '' : 's' });
    } else {
      icon = 'fa-hammer';
      headline = L('SVNSEA2E.HullRepaired', { name });
    }

    const crippled = newC >= cMax && cMax > 0;
    const effect = crippled
      ? L('SVNSEA2E.HullCrippledEffect')
      : newC > 0
        ? L('SVNSEA2E.HullCritNote', { n: newC, max: cMax })
        : '';

    const content = `
      <div class="theah theah-hull${severe ? ' severe' : ''}">
        <div class="hull-head"><i class="fas ${icon}"></i> ${headline}</div>
        <div class="hull-body">
          <div class="hull-stats">
            <span class="hs"><b>${newH}</b>/${hMax} ${L('SVNSEA2E.Hits')}</span>
            <span class="hs crit"><b>${newC}</b>/${cMax} ${L('SVNSEA2E.CriticalHits')}</span>
          </div>
          ${effect ? `<div class="hull-effect">${effect}</div>` : ''}
        </div>
      </div>`;

    await postThemedChat({ actor: this, content });

    // Keep the "wrecked" token status in sync only when the Critical count changed.
    if (dC !== 0 && typeof this.toggleStatusEffect === 'function') {
      try {
        await this.toggleStatusEffect('unconscious', { active: crippled });
      } catch (e) {
        /* status effects are optional / permission-gated */
      }
    }
  }
}
