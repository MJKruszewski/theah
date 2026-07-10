import ActorSheetSS2e from './base.js';
import { getItems, postThemedChat } from '../../helpers.js';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ActorSheetSS2eShip extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['theah', 'sheet', 'actor', 'ship'],
      template: 'systems/theah/templates/actors/ship.hbs',
      width: 900,
      height: 760,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'history',
        },
      ],
    });
  }

  // Nation → flag-dot color for the Origin card / rail.
  static ORIGIN_DOT = {
    avalon: '#b23b3b', castille: '#c9a24b', eisen: '#7a7f86', montaigne: '#3f6fb0',
    sarmatia: '#8a5cb0', ussura: '#5c9bb0', vodacce: '#3f8f6a', vesten: '#4a6f8f',
    exotic: '#b07a3f',
  };

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareShipItems(data, sheetData) {
    const sys = data.document.system;
    const L = (k, d) => (d ? game.i18n.format(k, d) : game.i18n.localize(k));

    // Compendium-driven history & adventures.
    sheetData.origins = getItems(data, 'shiporigin');
    sheetData.originItem = sheetData.origins[0] || null;
    sheetData.backgrounds = getItems(data, 'shipbackground');
    sheetData.adventures = getItems(data, 'shipadventure');

    // Identity.
    sheetData.shipClass = sys.class;
    sheetData.homeport = sys.homeport;
    sheetData.flag = sys.flag;
    sheetData.origin = sys.origin;              // legacy free-text fallback
    sheetData.crewstatus = sys.crewstatus || 'happy';
    sheetData.cargo = sys.cargo;
    sheetData.cargocap = sys.cargocap;          // derived (Vodacce / Gold Drives…)
    sheetData.wealth = sys.wealth;
    sheetData.crewData = sys.crew;              // { value, max, squadmax } (max/squadmax derived)
    sheetData.shipBonuses = sys.shipBonuses || { hull: [], crew: [], cargo: [] };

    // Cargo Hold — crate slots up to capacity (Core p.253). Filled slots carry a
    // named lot + note (destination / worth); the rest render as empty crates.
    const hold = sys.cargohold || [];
    const cap = sys.cargocap ?? 0;
    const slotCount = Math.max(cap, hold.length);
    sheetData.cargoSlots = Array.from({ length: slotCount }, (_, i) => {
      const c = hold[i];
      return c
        ? { index: i, filled: true, name: c.name, note: c.note }
        : { index: i, filled: false };
    });
    sheetData.cargoUsed = hold.length;
    sheetData.canAddCargo = hold.length < cap;

    // Origin flag-dot color.
    if (sheetData.originItem) {
      const n = sheetData.originItem.system?.nation;
      sheetData.originDot = this.constructor.ORIGIN_DOT[n] || 'var(--gold)';
    }

    // Hull — Hits track (5 per Critical) + Critical-Hit seals (Crippled at max).
    const hits = sys.hits;
    const crit = sys.criticals;
    sheetData.hits = hits;
    sheetData.criticals = crit;
    sheetData.hitsPerCritical = Math.ceil(hits.max / crit.max);
    sheetData.hitPips = Array.from({ length: hits.max }, (_, i) => {
      const n = i + 1;
      return {
        n,
        filled: (hits.value ?? 0) >= n,
        band5: n % sheetData.hitsPerCritical === 0 && n < hits.max,
      };
    });
    sheetData.critSeals = Array.from({ length: crit.max }, (_, i) => {
      const level = i + 1;
      return { level, filled: (crit.value ?? 0) >= level };
    });

    // Book-accurate Hull status (no invented intermediate names): Seaworthy →
    // Battered (N Critical Hits) → Crippled (Sunk if she takes another Hit).
    const cv = crit.value ?? 0;
    if (cv >= crit.max) {
      sheetData.crippled = true;
      sheetData.hullStatus = { key: 'crippled', label: L('SVNSEA2E.HullStateCrippled'), note: L('SVNSEA2E.HullCrippledEffect') };
    } else if (cv > 0) {
      sheetData.hullStatus = { key: 'battered', label: L('SVNSEA2E.HullStateBattered'), note: L('SVNSEA2E.HullCritNote', { n: cv, max: crit.max }) };
    } else {
      sheetData.hullStatus = { key: 'seaworthy', label: L('SVNSEA2E.HullStateSeaworthy'), note: L('SVNSEA2E.HullHitsNote', { per: sheetData.hitsPerCritical }) };
    }

    // Crew — the full complement (derived: 10 base, Eisen 15, +Adventures) divides
    // into up to squadmax Squads; each Squad rolls dice = its Strength (Core p.253).
    // Squads are the tracked crew state (Wounds reduce a Squad's Strength).
    const crewMax = sys.crew?.max ?? 10;
    const squadMax = sys.crew?.squadmax ?? 2;
    const squads = sys.squads || [];
    sheetData.crewMax = crewMax;
    sheetData.squadMax = squadMax;
    // A squad is inline ({name,strength}) or a linked Brute Squad actor (actorId);
    // for a linked squad the Strength/name/portrait come live from that actor.
    const squadStrength = (sq) => {
      if (!sq.actorId) return sq.strength | 0;
      const a = game.actors?.get(sq.actorId);
      return a ? (a.system?.traits?.strength?.value | 0) : 0;
    };
    sheetData.squads = squads.map((sq, i) => {
      const linked = sq.actorId ? game.actors?.get(sq.actorId) : null;
      const missing = !!sq.actorId && !linked;
      const strength = squadStrength(sq);
      return {
        index: i,
        linked: !!sq.actorId,
        missing,
        actorId: sq.actorId,
        img: linked?.img,
        name: linked ? linked.name : sq.name,
        strength,
        pips: Array.from({ length: Math.max(0, strength) }, () => 1),
      };
    });
    sheetData.squadAllocated = squads.reduce((n, sq) => n + squadStrength(sq), 0);
    sheetData.squadUnallocated = Math.max(0, crewMax - sheetData.squadAllocated);
    sheetData.squadOverAllocated = sheetData.squadAllocated > crewMax;
    sheetData.canAddSquad = squads.length < squadMax;

    // Quick-division presets: the book's enumerated splits of a 10-Crew Ship, plus
    // an even split for any complement. Applying one replaces the Squad list.
    const presets = [{ key: 'single', label: `${crewMax}`, split: [crewMax] }];
    if (squadMax >= 2) {
      const hi = Math.ceil(crewMax / 2);
      presets.push({ key: 'even2', label: `${hi} / ${crewMax - hi}`, split: [hi, crewMax - hi] });
    }
    if (crewMax === 10 && squadMax === 2) {
      presets.push({ key: 's82', label: '8 / 2', split: [8, 2] });
      presets.push({ key: 's73', label: '7 / 3', split: [7, 3] });
      presets.push({ key: 's64', label: '6 / 4', split: [6, 4] });
    }
    if (squadMax >= 3) {
      const t = Math.floor(crewMax / 3);
      presets.push({ key: 'even3', label: `${crewMax - 2 * t} / ${t} / ${t}`, split: [crewMax - 2 * t, t, t] });
    }
    sheetData.squadPresets = presets.map((p) => ({ ...p, splitStr: p.split.join(',') }));
  }

  /**
   * Process any flags that the actor might have that would affect the sheet .
   *
   * @param {Obejct} data The data object to update with any flag data.
   * @param {Object} flags The set of flags for the Actor
   */
  _processFlags(data, flags, sheetData) {
    let theah = flags.theah;

    if (!theah) theah = {};
    if (!theah.shipsCrew) theah.shipsCrew = {};
    if (!theah.shipsCrew.members) theah.shipsCrew.members = [];

    const crew = {
      captain: {
        label: game.i18n.localize('SVNSEA2E.Captain'),
        cssClass: 'captain',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'captain',
        },
      },
      firstmate: {
        label: game.i18n.localize('SVNSEA2E.FirstMate'),
        cssClass: 'firstmate',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'firstmate',
        },
      },
      quartermaster: {
        label: game.i18n.localize('SVNSEA2E.QuaterMaster'),
        cssClass: 'quartermaster',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'quartermaster',
        },
      },
      accountant: {
        label: game.i18n.localize('SVNSEA2E.Accountant'),
        cssClass: 'accountant',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'accountant',
        },
      },
      boatswain: {
        label: game.i18n.localize('SVNSEA2E.Boatswain'),
        cssClass: 'boatswain',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'boatswain',
        },
      },
      shipsmaster: {
        label: game.i18n.localize('SVNSEA2E.ShipsMaster'),
        cssClass: 'shipsmaster',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'shipsmaster',
        },
      },
      captaintops: {
        label: game.i18n.localize('SVNSEA2E.CaptainTops'),
        cssClass: 'captaintops',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'captaintops',
        },
      },
      surgeon: {
        label: game.i18n.localize('SVNSEA2E.Surgeon'),
        cssClass: 'surgeon',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'surgeon',
        },
      },
      cook: {
        label: game.i18n.localize('SVNSEA2E.Cook'),
        cssClass: 'cook',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'cook',
        },
      },
      mastergunner: {
        label: game.i18n.localize('SVNSEA2E.MasterGunner'),
        cssClass: 'mastergunner',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'mastergunner',
        },
      },
      mastermariner: {
        label: game.i18n.localize('SVNSEA2E.MasterMariner'),
        cssClass: 'mastermariner',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'mastermariner',
        },
      },
      midshipmen: {
        label: game.i18n.localize('SVNSEA2E.Midshipmen'),
        cssClass: 'midshipmen',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'midshipmen',
        },
      },
      powdermonkey: {
        label: game.i18n.localize('SVNSEA2E.PowderMonkey'),
        cssClass: 'powdermonkey',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'powdermonkey',
        },
      },
      ableseaman: {
        label: game.i18n.localize('SVNSEA2E.AbleSeaman'),
        cssClass: 'ableseaman',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'ableseaman',
        },
      },
      seaman: {
        label: game.i18n.localize('SVNSEA2E.Seaman'),
        cssClass: 'seaman',
        actors: [],
        dataset: {
          type: 'shipsCrew',
          role: 'seaman',
        },
      },
    };

    const [
      ableseaman,
      accountant,
      boatswain,
      captain,
      captaintops,
      cook,
      firstmate,
      mastergunner,
      mastermariner,
      midshipmen,
      powdermonkey,
      quartermaster,
      seaman,
      shipsmaster,
      surgeon,
    ] = theah.shipsCrew.members.reduce(
      (arr, id) => {
        const actor = game.actors.get(id);

        if (!actor) return arr;

        const crewMember = actor.getFlag('theah', 'crewMember') || null;
        if (!crewMember) return arr;

        if (crewMember.role === 'ableseaman') arr[0].push(actor);
        else if (crewMember.role === 'accountant') arr[1].push(actor);
        else if (crewMember.role === 'boatswain') arr[2].push(actor);
        else if (crewMember.role === 'captain') arr[3].push(actor);
        else if (crewMember.role === 'captaintops') arr[4].push(actor);
        else if (crewMember.role === 'cook') arr[5].push(actor);
        else if (crewMember.role === 'firstmate') arr[6].push(actor);
        else if (crewMember.role === 'mastergunner') arr[7].push(actor);
        else if (crewMember.role === 'mastermariner') arr[8].push(actor);
        else if (crewMember.role === 'midshipmen') arr[9].push(actor);
        else if (crewMember.role === 'powdermonkey') arr[10].push(actor);
        else if (crewMember.role === 'quartermaster') arr[11].push(actor);
        else if (crewMember.role === 'seaman') arr[12].push(actor);
        else if (crewMember.role === 'shipsmaster') arr[13].push(actor);
        else if (crewMember.role === 'surgeon') arr[14].push(actor);

        return arr;
      },
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    );

    crew.ableseaman.actors = ableseaman;
    crew.accountant.actors = accountant;
    crew.boatswain.actors = boatswain;
    crew.captain.actors = captain;
    crew.captaintops.actors = captaintops;
    crew.cook.actors = cook;
    crew.firstmate.actors = firstmate;
    crew.mastergunner.actors = mastergunner;
    crew.mastermariner.actors = mastermariner;
    crew.midshipmen.actors = midshipmen;
    crew.powdermonkey.actors = powdermonkey;
    crew.quartermaster.actors = quartermaster;
    crew.seaman.actors = seaman;
    crew.shipsmaster.actors = shipsmaster;
    crew.surgeon.actors = surgeon;

    // Book-accurate duty tooltip for each officer role header (Core pp.244-246).
    const duties = CONFIG.SVNSEA2E.officerDuties || {};
    for (const [key, role] of Object.entries(crew)) {
      role.tip = duties[key] ? game.i18n.localize(duties[key]) : '';
    }

    sheetData.crew = Object.values(crew);
  }

  /* -------------------------------------------- */

  /**
   * Handle a click on a Hull Hit pip or Critical-Hit seal. Mirrors the hero
   * death-spiral logic (_processWounds): 5 Hits per Critical Hit, so clicking a
   * Hit pip that crosses a band auto-adds a Critical Hit, and clicking a seal
   * sets the Critical count while clamping Hits into the resulting band.
   * @param {Event} event
   * @private
   */
  _processHull(event) {
    const actor = this.document;
    const sys = actor.system;
    const edata = event.target.dataset;
    const eValue = +edata.value;
    const step = Math.ceil(sys.hits.max / sys.criticals.max); // 5 per Critical Hit
    let hits = sys.hits.value;
    let crit = sys.criticals.value;

    if (edata.type === 'hits') {
      hits = eValue;
      const estimate = Math.trunc(hits / step);
      if (estimate > sys.criticals.value) crit = estimate;
      if (eValue === 1 && sys.hits.value === 1) hits = 0;
    } else {
      if (eValue > sys.criticals.value) crit = eValue;
      else if (eValue === sys.criticals.value) crit = sys.criticals.value - 1;
      else crit = eValue;
      // Keep Hits inside the resulting Critical-Hit band so the derived seal
      // count stays consistent (mirrors the wound death-spiral clamp).
      const cap = (crit + 1) * step - 1;
      if (hits > cap) hits = cap;
    }

    actor.update({ 'system.hits.value': hits, 'system.criticals.value': crit });
  }

  /**
   * ±1 stepper for a single Squad's Strength, clamped so the Crew's total
   * allocation never exceeds the full complement (crew.max).
   * @param {Event} event
   * @private
   */
  _onSquadStrengthStep(event) {
    event.preventDefault();
    const i = Number(event.currentTarget.dataset.index);
    const delta = Number(event.currentTarget.dataset.delta) || 0;
    const squads = foundry.utils.duplicate(this.actor.system.squads || []);
    if (i < 0 || i >= squads.length) return;
    // Linked Brute-Squad squads take their Strength from the actor — not editable here.
    if (squads[i].actorId) return;
    const crewMax = this.actor.system.crew?.max ?? 10;
    // Other squads' Strength counts against the budget — including linked Brute
    // Squads, whose Strength is live on their actor (stored strength is 0).
    const strengthOf = (sq) => {
      if (!sq.actorId) return Number(sq.strength) || 0;
      const a = game.actors?.get(sq.actorId);
      return a ? Number(a.system?.traits?.strength?.value) || 0 : 0;
    };
    const others = squads.reduce((n, sq, idx) => (idx === i ? n : n + strengthOf(sq)), 0);
    const cap = Math.max(0, crewMax - others); // this Squad may take at most the unallocated remainder
    const cur = Number(squads[i].strength) || 0;
    // "+" only fills the unallocated remainder and never reduces the Squad (so it's
    // a no-op when the Crew is already over-allocated); "−" always decrements.
    const next = delta > 0 ? Math.min(cur + delta, Math.max(cur, cap)) : Math.max(0, cur + delta);
    if (next === cur) return;
    squads[i].strength = next;
    this.actor.update({ 'system.squads': squads });
  }

  /**
   * Rename an inline Squad. Squad names are NOT form inputs (so the ArrayField
   * never round-trips through a submit), so a change handler writes the full array.
   * @param {Event} event
   * @private
   */
  _onSquadRename(event) {
    const i = Number(event.currentTarget.dataset.index);
    const squads = foundry.utils.duplicate(this.actor.system.squads || []);
    if (i < 0 || i >= squads.length || squads[i].actorId) return;
    const name = event.currentTarget.value;
    if (name === (squads[i].name || '')) return;
    squads[i].name = name;
    this.actor.update({ 'system.squads': squads });
  }

  /**
   * Roll a Crew Squad's dice pool (Core p.253): a Squad rolls dice equal to its
   * Strength, makes Raises (sets of 10) and spends them all on one action. Reuses
   * the shared Raises math + dice-row renderer and posts a themed `.theah-pool` card.
   * @param {Event} event
   * @private
   */
  async _onSquadRoll(event) {
    event.preventDefault();
    const i = Number(event.currentTarget.dataset.index);
    const sq = (this.actor.system.squads || [])[i];
    if (!sq) return;
    // Resolve Strength/name — from the linked Brute Squad actor, or the inline value.
    const linked = sq.actorId ? game.actors?.get(sq.actorId) : null;
    const strength = sq.actorId
      ? (linked ? Number(linked.system?.traits?.strength?.value) || 0 : 0)
      : Number(sq.strength) || 0;
    const sqName = (linked ? linked.name : sq.name) || game.i18n.format('SVNSEA2E.SquadN', { n: i + 1 });
    if (strength <= 0) {
      return ui.notifications.warn(game.i18n.localize('SVNSEA2E.SquadNoDice'));
    }

    const roll = new Roll(`${strength}d10`);
    await roll.evaluate();
    if (game.dice3d) {
      try {
        await game.dice3d.showForRoll(roll, game.user, true);
      } catch (e) {
        /* Dice So Nice is optional */
      }
    }

    const dice = roll.dice[0].results.map((r) => r.result);
    const target = this.constructor.RAISE_TARGET;
    const { raises, combos, used } = this.constructor.computeRaises(dice, target);
    const diceHtml = this.constructor.renderDiceRow(dice, used);
    const L = (k) => game.i18n.localize(k);
    const combosText = combos.length ? combos.join('   ·   ') : L('SVNSEA2E.NoRaises');
    const name = sqName;
    const raisesInfo = L('SVNSEA2E.RaisesInfo');

    const content = `
      <div class="theah theah-pool theah-squad">
        <div class="pool-head"><i class="fas fa-users"></i> ${game.i18n.format('SVNSEA2E.SquadRolls', { name, n: strength })} &middot; ${L('SVNSEA2E.SetsOfTen')}</div>
        <div class="pool-body">
          <div class="dice">${diceHtml}</div>
          <div class="raises"><span class="big">${raises}</span><div><div class="lab" data-tooltip="${raisesInfo}">${L('SVNSEA2E.RaisesLabel')} <i class="fas fa-circle-info"></i></div><div class="combos">${combosText}</div></div></div>
        </div>
        <div class="pool-reroll squad-note"><i class="fas fa-anchor"></i> ${L('SVNSEA2E.SquadRollNote')}</div>
      </div>`;

    await postThemedChat({ actor: this.actor, content, rolls: [roll], sound: CONFIG.sounds.dice });
  }

  /**
   * Apply a quick-division preset: divide the Crew complement into inline Squads
   * (Core p.253). Linked Brute-Squad squads are attached units, NOT part of the
   * complement being divided, so they are preserved untouched; the preset only
   * rebuilds the inline squads, filling the slots that remain under squadmax.
   * @param {Event} event
   * @private
   */
  _onApplySquadPreset(event) {
    event.preventDefault();
    const split = String(event.currentTarget.dataset.split || '')
      .split(',')
      .map((n) => Math.max(0, parseInt(n, 10) || 0))
      .filter((n) => n > 0);
    if (!split.length) return;
    const existing = this.actor.system.squads || [];
    const linked = existing.filter((sq) => sq.actorId);               // keep linked Brute Squads
    const inlineExisting = existing.filter((sq) => !sq.actorId);      // reuse their names by index
    const squadMax = this.actor.system.crew?.squadmax ?? 2;
    const room = Math.max(0, squadMax - linked.length);
    const inline = split.slice(0, room).map((strength, idx) => ({
      name: inlineExisting[idx]?.name || game.i18n.format('SVNSEA2E.SquadN', { n: linked.length + idx + 1 }),
      strength,
      actorId: '',
    }));
    this.actor.update({ 'system.squads': [...linked, ...inline] });
  }

  /**
   * ±1 stepper for the Ship's Treasury (Wealth).
   * @param {Event} event
   * @private
   */
  _onTreasuryStep(event) {
    event.preventDefault();
    const delta = Number(event.currentTarget.dataset.delta) || 0;
    const cur = Number(this.actor.system.wealth) || 0;
    this.actor.update({ 'system.wealth': Math.max(0, cur + delta) });
  }

  /**
   * Add a new empty Cargo lot to the Hold (up to capacity).
   * @param {Event} event
   * @private
   */
  _onAddCargo(event) {
    event.preventDefault();
    const hold = foundry.utils.duplicate(this.actor.system.cargohold || []);
    const cap = this.actor.system.cargocap ?? 0;
    if (hold.length >= cap) {
      return ui.notifications.warn(game.i18n.format('SVNSEA2E.CargoFull', { n: cap }));
    }
    hold.push({ name: '', note: '' });
    this.actor.update({ 'system.cargohold': hold });
  }

  /**
   * Remove a Cargo lot from the Hold by index.
   * @param {Event} event
   * @private
   */
  _onRemoveCargo(event) {
    event.preventDefault();
    const i = Number(event.currentTarget.dataset.index);
    const hold = foundry.utils.duplicate(this.actor.system.cargohold || []);
    if (i < 0 || i >= hold.length) return;
    hold.splice(i, 1);
    this.actor.update({ 'system.cargohold': hold });
  }

  /**
   * Toggle whether a Ship Adventure has been earned (Core p.250). Adventures are
   * binary (earned once, in play), so the tracker is a single toggle rather than
   * the hero Story's step-pips — a conceptual adaptation.
   * @param {Event} event
   * @private
   */
  _onToggleAdventureEarned(event) {
    event.preventDefault();
    const id = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(id);
    if (!item) return;
    item.update({ 'system.earned': !item.system.earned });
  }

  /**
   * Add a new Crew Squad (up to squadmax).
   * @param {Event} event
   * @private
   */
  _onSquadAdd(event) {
    event.preventDefault();
    const squads = foundry.utils.duplicate(this.actor.system.squads || []);
    const max = this.actor.system.crew?.squadmax ?? 2;
    if (squads.length >= max) {
      return ui.notifications.warn(game.i18n.format('SVNSEA2E.SquadMax', { n: max }));
    }
    squads.push({ name: game.i18n.format('SVNSEA2E.SquadN', { n: squads.length + 1 }), strength: 0 });
    this.actor.update({ 'system.squads': squads });
  }

  /**
   * Remove a Crew Squad by index.
   * @param {Event} event
   * @private
   */
  _onSquadRemove(event) {
    event.preventDefault();
    const i = Number(event.currentTarget.dataset.index);
    const squads = foundry.utils.duplicate(this.actor.system.squads || []);
    if (i < 0 || i >= squads.length) return;
    squads.splice(i, 1);
    this.actor.update({ 'system.squads': squads });
  }

  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {HTML} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);

    if (!this.options.editable) return;

    // Hull — clicking a Hit pip or a Critical-Hit seal (mirrors the hero wound track).
    html.find('.rail-hull .track i').on('click', (ev) => this._processHull(ev));
    html.find('.rail-hull .spiral .seal').on('click', (ev) => this._processHull(ev));
    // Treasury stepper; Squad strength steppers + division presets + add/remove.
    html.find('.treasury-step').on('click', (ev) => this._onTreasuryStep(ev));
    html.find('.squad-str-step').on('click', (ev) => this._onSquadStrengthStep(ev));
    html.find('.squad-preset').on('click', (ev) => this._onApplySquadPreset(ev));
    html.find('.squad-add').on('click', (ev) => this._onSquadAdd(ev));
    html.find('.squad-remove').on('click', (ev) => this._onSquadRemove(ev));
    html.find('.squad-roll').on('click', (ev) => this._onSquadRoll(ev));
    html.find('.squad-open').on('click', (ev) => this._onOpenSquadActor(ev));
    html.find('.sq-name').on('change', (ev) => this._onSquadRename(ev));

    // Ship compendium pickers (Origins / Backgrounds / Adventures — sorcery-style window).
    html.find('.browse-ship-pack').on('click', (ev) => this._onBrowseShipPack(ev));
    // Cargo Hold crates + Adventure earned toggle.
    html.find('.cargo-add').on('click', (ev) => this._onAddCargo(ev));
    html.find('.cargo-remove').on('click', (ev) => this._onRemoveCargo(ev));
    html.find('.adventure-earn').on('click', (ev) => this._onToggleAdventureEarned(ev));

    html.find('.crew-roster .item-delete').click(this._onRemoveFromCrew.bind(this));

    const crewhandler = (ev) => this._onDragCrewStart(ev);
    html.find('.crew-roster li.item').each((i, li) => {
      li.setAttribute('draggable', true);
      li.addEventListener('dragstart', crewhandler, false);
    });

    // The <ol class="items-list crew-roster"> IS the drop-target list (there is
    // no descendant .items-list), so bind dragover on the container itself.
    html.find('ol.crew-roster').each((i, li) => {
      li.addEventListener('dragover', this._onCrewDragOver.bind(this), false);
    });

    html.find('.crew-roster li.item-header').each((i, li) => {
      li.addEventListener('dragenter', this._onCrewDragEnter, false);
      li.addEventListener('dragleave', this._onCrewDragLeave, false);
    });
  }

  /** @override */
  async _onDrop(event) {
    event.preventDefault();

    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    } catch (err) {
      return false;
    }

    if (!data) return false;

    // Case 1 - Dropped Item
    if (data.type === 'Item') {
      return this._onDropItem(event, data);
    }

    // Case 2 - Dropped Actor: a Brute Squad fills a Crew Squad (Core p.253 — a
    // Squad "acts like a Brute Squad"); any other actor joins the officer roster.
    if (data.type === 'Actor') {
      const dropped = await Actor.implementation.fromDropData(data);
      if (dropped?.type === 'brute') {
        return this._onSquadDrop(dropped);
      }
      return this._onCrewDrop(event, data);
    }
  }

  /**
   * Attach a dropped Brute Squad actor as a linked Crew Squad (up to squadmax).
   * Its Strength is read live from the actor; the ship stores only its id.
   * @param {Actor} actor  The dropped Brute Squad.
   * @private
   */
  async _onSquadDrop(actor) {
    const squads = foundry.utils.duplicate(this.actor.system.squads || []);
    const max = this.actor.system.crew?.squadmax ?? 2;
    if (squads.length >= max) {
      return ui.notifications.warn(game.i18n.format('SVNSEA2E.SquadMax', { n: max }));
    }
    if (squads.some((s) => s.actorId === actor.id)) {
      return ui.notifications.warn(game.i18n.localize('SVNSEA2E.SquadAlreadyAttached'));
    }
    squads.push({ actorId: actor.id, name: actor.name, strength: 0 });
    await this.actor.update({ 'system.squads': squads });
  }

  /**
   * Open a linked Brute Squad's own sheet.
   * @param {Event} event
   * @private
   */
  _onOpenSquadActor(event) {
    event.preventDefault();
    const id = event.currentTarget.dataset.actorId;
    game.actors?.get(id)?.sheet?.render(true);
  }

  /**
   * Handles drop events for the Crew list
   *
   * @param {Event}  event The originating drop event
   * @param {object} data  The data transfer object.
   */
  async _onCrewDrop(event, data) {
    event.preventDefault();

    $(event.target).css('background', '');

    if (!data.uuid) return false;

    const c = this.actor.getFlag('theah', 'shipsCrew');
    let crew;


    if (c) crew = foundry.utils.duplicate(c);
    else {
      crew = {
        members: [],
      };
    }

    const actor = await Actor.implementation.fromDropData(data);
    if (!actor) return false;

    if (!crew.members) {
      crew.members = [actor.id];
    } else if (!crew.members.includes(actor.id)) {
      crew.members.push(actor.id);
    }

    const role = event.target.dataset.role;

    await actor.setCrewMemberRole(this.actor.id, role);
    this.actor
      .update({
        'flags.theah.shipsCrew': crew,
      })
      .then(this.render(false));

    return false;
  }

  /**
   * Handles dragenter for the crews tab
   * @param {Event} event The originating dragenter event
   */
  _onCrewDragEnter(event) {
    $(event.target).css('background', 'rgba(0,0,0,0.3)');
  }

  /**
   * Handles dragleave for the crews tab
   * @param {Event} event The originating dragleave event
   */
  _onCrewDragLeave(event) {
    $(event.target).css('background', '');
  }

  /**
   * Handle dragging crew members on the sheet.
   *
   * @param {Event} event Originating dragstart event
   */
  _onDragCrewStart(event) {
    const actorId = event.currentTarget.dataset.actorId;
    const actor = game.actors.get(actorId);

    const dragData = {
      type: 'Actor',
      id: actor.id,
      data: actor.data,
    };

    if (this.actor.isToken) dragData.tokenId = actorId;
    event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  }

  /**
   * Handles ondragover for crew drag-n-drop
   *
   * @param {Event} event Orgininating ondragover event
   */
  _onCrewDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  /**
   * Handles updating this crew's role on the ship.
   *
   * @param {Event} event The originating click event
   */
  async _onChangeCrewRole(event) {
    event.preventDefault();

    const actorId = event.currentTarget.parentElement.dataset.actorId;
    const actor = game.actors.get(actorId);

    await actor.setCrewMemberRole(this.actor.id);
  }

  /**
   * Remove an actor from the crew.
   *
   * @param {Event} event The originating click event
   */
  async _onRemoveFromCrew(event) {
    event.preventDefault();

    const actorId = $(event.currentTarget).parents('.item').data('actorId');
    const actor = game.actors.get(actorId);

    await actor.removeFromCrew();

    const shipsCrew = this.actor.getFlag('theah', 'shipsCrew');

    if (!shipsCrew) return;

    const updateData = shipsCrew.members.filter((val) => val !== actor.id);

    await this.actor.update({
      'flags.theah.shipsCrew.members': updateData,
    });
  }
}
