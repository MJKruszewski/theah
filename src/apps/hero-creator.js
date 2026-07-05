import { ActorType } from '../enums.js';

/**
 * Step-by-step Hero creation, faithful to the 7th Sea 2e Core Rulebook
 * ("Making a Hero", pp.137-164). The wizard walks the player through the book's
 * steps, enforces every budget/cap, pulls Backgrounds / Advantages / Arcana
 * from the compendia (no home-brew), and writes the finished Hero to the actor
 * in one pass.
 *
 * Steps: Concept & Nation → Traits (+ Nation Bonus) → Backgrounds → Skills →
 * Advantages → Arcana → Review.
 */
export class HeroCreator extends FormApplication {
  constructor(actor, options = {}) {
    super(actor, options);
    this.actor = actor;
    this._step = 0;
    this._catalog = null; // { backgrounds, advantages, virtues, hubris }
    // NB: NOT `_state` — Application reserves `this._wizard` for its render-state
    // integer and overwrites it on render, which would wipe the wizard's data.
    this._wizard = {
      name: actor.name && actor.name !== 'New Actor' ? actor.name : '',
      epithet: actor.system.epithet || '',
      concept: '',
      nation: actor.system.nation || 'none',
      religion: actor.system.religion || '',
      traitAlloc: { brawn: 0, finesse: 0, resolve: 0, wits: 0, panache: 0 },
      nationBonusTrait: null,
      backgrounds: [], // compendium ids (max 2)
      skillAlloc: {}, // skill key -> allocated points
      advantages: [], // compendium ids (purchased)
      virtueId: null,
      hubrisId: null,
    };
  }

  static get STEPS() {
    return [
      { key: 'concept', label: 'SVNSEA2E.WizConcept' },
      { key: 'traits', label: 'SVNSEA2E.Traits' },
      { key: 'backgrounds', label: 'SVNSEA2E.Backgrounds' },
      { key: 'skills', label: 'SVNSEA2E.Skills' },
      { key: 'advantages', label: 'SVNSEA2E.Advantages' },
      { key: 'arcana', label: 'SVNSEA2E.Arcana' },
      { key: 'review', label: 'SVNSEA2E.WizReview' },
    ];
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['theah', 'hero-creator'],
      template: 'systems/theah/templates/apps/hero-creator.hbs',
      width: 760,
      height: 720,
      resizable: true,
      submitOnChange: false,
      submitOnClose: false,
      closeOnSubmit: false,
    });
  }

  /** @override */
  get title() {
    return game.i18n.localize('SVNSEA2E.HeroCreator');
  }

  /* -------------------------------------------- */
  /*  Catalog                                     */
  /* -------------------------------------------- */

  async _loadCatalog() {
    if (this._catalog) return this._catalog;
    const backgrounds = await this._loadPack('theah.backgrounds', 'backgrounds');
    const advantages = await this._loadPack('theah.advantages', 'advantages');
    const arcana = await this._loadPack('theah.arcana', 'arcana');
    const byName = (a, b) => (a.name || '').localeCompare(b.name || '');
    this._catalog = {
      backgrounds: backgrounds.sort(byName),
      advantages: advantages.sort(byName),
      virtues: arcana.filter((i) => i.type === 'virtue').sort(byName),
      hubris: arcana.filter((i) => i.type === 'hubris').sort(byName),
    };
    return this._catalog;
  }

  async _packDocs(packId) {
    const pack = game.packs.get(packId);
    if (!pack) return [];
    const docs = await pack.getDocuments();
    return docs.map((d) => d.toObject());
  }

  /**
   * Load a category from its compendium, falling back to the shipped
   * `packs-data/<file>.json` when the compendium is missing, empty, or corrupt
   * (blank-named docs). This is why the wizard now works even if a world's
   * compendium never seeded properly: it always has real, valid data to show and
   * to clone onto the actor.
   * @param {string} packId  Compendium collection id.
   * @param {string} file    Base filename under packs-data/.
   * @returns {Promise<object[]>}
   */
  async _loadPack(packId, file) {
    const docs = await this._packDocs(packId);
    const valid = docs.filter((d) => d && d.name && String(d.name).trim());
    if (valid.length) return valid;
    console.warn(`Théah | compendium "${packId}" empty or corrupt — loading shipped ${file}.json instead.`);
    try {
      const res = await fetch(`systems/theah/packs-data/${file}.json`);
      if (res.ok) {
        const shipped = await res.json();
        if (Array.isArray(shipped) && shipped.length) return shipped;
      }
    } catch (e) {
      console.error(`Théah | failed loading shipped ${file}.json`, e);
    }
    return docs;
  }

  /* -------------------------------------------- */
  /*  Derived rules                               */
  /* -------------------------------------------- */

  /** Selected background objects, in pick order. */
  _selectedBackgrounds() {
    return this._wizard.backgrounds
      .map((id) => this._catalog.backgrounds.find((b) => b._id === id))
      .filter(Boolean);
  }

  /** Skill map: { key: { label, bg, alloc, final } } — bg from Backgrounds, alloc from the 10 points. */
  _derivedSkills() {
    const out = {};
    for (const [key, label] of Object.entries(CONFIG.SVNSEA2E.skills)) {
      out[key] = { label, bg: 0, alloc: this._wizard.skillAlloc[key] || 0 };
    }
    for (const bg of this._selectedBackgrounds()) {
      for (const sk of bg.system.skills || []) {
        if (out[sk]) out[sk].bg += 1; // rank 1, +1 more on overlap → rank 2
      }
    }
    for (const key of Object.keys(out)) out[key].final = out[key].bg + out[key].alloc;
    return out;
  }

  _skillPointsSpent() {
    return Object.values(this._wizard.skillAlloc).reduce((a, b) => a + (b || 0), 0);
  }

  /** Advantage cost for the chosen Nation (applies the national discount if any). */
  _advantageCost(adv) {
    const cost = adv.system?.cost?.normal ?? 1;
    const discounts = adv.flags?.theah?.nationalDiscounts || [];
    if (discounts.includes(this._wizard.nation)) {
      return Math.max(1, adv.system?.cost?.reducecost || cost - 1);
    }
    return cost;
  }

  _advantageSpent() {
    return this._wizard.advantages
      .map((id) => this._catalog.advantages.find((a) => a._id === id))
      .filter(Boolean)
      .reduce((sum, a) => sum + this._advantageCost(a), 0);
  }

  /** Free Advantage names granted by the chosen Backgrounds (deduplicated). */
  _freeAdvantageNames() {
    const names = new Set();
    for (const bg of this._selectedBackgrounds()) {
      for (const name of bg.system.advantages || []) names.add(name);
    }
    return [...names];
  }

  _traitFinal(key) {
    const bonus = this._wizard.nationBonusTrait === key ? 1 : 0;
    return CONFIG.SVNSEA2E.creation.traitStart + (this._wizard.traitAlloc[key] || 0) + bonus;
  }

  _traitPointsSpent() {
    return Object.values(this._wizard.traitAlloc).reduce((a, b) => a + (b || 0), 0);
  }

  _nativeLanguage() {
    return CONFIG.SVNSEA2E.languages[this._wizard.nation] ? this._wizard.nation : null;
  }

  /* -------------------------------------------- */
  /*  Data                                        */
  /* -------------------------------------------- */

  /** @override */
  async getData() {
    await this._loadCatalog();
    const C = CONFIG.SVNSEA2E;
    const steps = this.constructor.STEPS.map((s, i) => ({
      ...s,
      index: i,
      num: i + 1,
      active: i === this._step,
      done: i < this._step,
    }));
    const stepKey = this.constructor.STEPS[this._step].key;

    const data = {
      step: this._step,
      stepKey,
      steps,
      stepNumber: this._step + 1,
      stepTotal: this.constructor.STEPS.length,
      isFirst: this._step === 0,
      isLast: this._step === this.constructor.STEPS.length - 1,
      state: this._wizard,
      config: C,
      nations: C.nations,
      religions: null,
    };

    // Concept — nation chosen from cards (consistent with Backgrounds / Arcana),
    // each card showing its +1 Traits and national sorcery so there's no hunting
    // through a dropdown.
    const L = (s) => game.i18n.localize(s);
    data.nationCards = Object.entries(C.nations)
      .filter(([key]) => key !== 'none')
      .map(([key, label]) => {
        const bonusKeys = C.nationBonus[key] || [];
        const sorcKey = C.nationSorcery[key];
        return {
          key,
          label: L(label),
          bonus: bonusKeys.length ? bonusKeys.map((k) => L(C.traits[k])).join(' / ') : L('SVNSEA2E.WizAnyTrait'),
          sorcery: sorcKey ? L(C.sorceryTypes[sorcKey] || sorcKey) : '',
          selected: this._wizard.nation === key,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    // Traits
    const bonusChoices = C.nationBonus[this._wizard.nation] || Object.keys(C.traits).filter((t) => !['influence', 'strength'].includes(t));
    data.traits = ['brawn', 'finesse', 'resolve', 'wits', 'panache'].map((key) => ({
      key,
      label: C.traits[key],
      alloc: this._wizard.traitAlloc[key] || 0,
      bonus: this._wizard.nationBonusTrait === key,
      canBonus: bonusChoices.includes(key),
      final: this._traitFinal(key),
    }));
    data.traitPointsSpent = this._traitPointsSpent();
    data.traitPointsTotal = C.creation.traitPoints;
    data.traitPointsLeft = C.creation.traitPoints - this._traitPointsSpent();
    data.nationBonusTrait = this._wizard.nationBonusTrait;

    // Backgrounds
    data.backgroundList = this._catalog.backgrounds.map((b) => ({
      id: b._id,
      name: b.name,
      selected: this._wizard.backgrounds.includes(b._id),
      skills: (b.system.skills || []).map((s) => C.skills[s] || s).join(', '),
      advantages: (b.system.advantages || []).join(', '),
      quirk: foundry.utils.getProperty(b, 'system.quirk') || '',
      description: b.system.description || '',
    }));
    data.backgroundsPicked = this._wizard.backgrounds.length;
    data.backgroundsNeeded = C.creation.backgroundsCount;

    // Skills
    const skills = this._derivedSkills();
    data.skills = Object.entries(skills).map(([key, v]) => ({
      key,
      label: v.label,
      bg: v.bg,
      alloc: v.alloc,
      final: v.final,
      atCap: v.final >= C.creation.skillCreationCap,
    }));
    data.skillPointsTotal = C.creation.skillPoints;
    data.skillPointsSpent = this._skillPointsSpent();
    data.skillPointsLeft = C.creation.skillPoints - this._skillPointsSpent();
    data.skillCap = C.creation.skillCreationCap;

    // Advantages
    data.freeAdvantages = this._freeAdvantageNames();
    data.advantageList = this._catalog.advantages.map((a) => ({
      id: a._id,
      name: a.name,
      cost: this._advantageCost(a),
      selected: this._wizard.advantages.includes(a._id),
      free: data.freeAdvantages.includes(a.name),
      description: a.system.description || '',
    }));
    data.advPointsTotal = C.creation.advantagePoints;
    data.advPointsSpent = this._advantageSpent();
    data.advPointsLeft = C.creation.advantagePoints - this._advantageSpent();

    // Arcana — full pick lists with descriptions shown upfront (not after select)
    data.virtues = this._catalog.virtues.map((v) => ({
      id: v._id,
      name: v.name,
      selected: this._wizard.virtueId === v._id,
      description: v.system.description || '',
    }));
    data.hubris = this._catalog.hubris.map((h) => ({
      id: h._id,
      name: h.name,
      selected: this._wizard.hubrisId === h._id,
      description: h.system.description || '',
    }));

    // Review
    data.review = this._buildReview(skills);
    data.emptyCatalog = !this._catalog.backgrounds.length;

    return data;
  }

  _buildReview(skills) {
    const C = CONFIG.SVNSEA2E;
    const native = this._nativeLanguage();
    const langs = [C.creation.baseLanguage, native].filter(Boolean).map((l) => C.languages[l] || l);
    const virtue = this._catalog.virtues.find((v) => v._id === this._wizard.virtueId);
    const hubris = this._catalog.hubris.find((h) => h._id === this._wizard.hubrisId);
    const purchased = this._wizard.advantages
      .map((id) => this._catalog.advantages.find((a) => a._id === id))
      .filter(Boolean)
      .map((a) => a.name);
    return {
      name: this._wizard.name,
      nation: C.nations[this._wizard.nation],
      traits: ['brawn', 'finesse', 'resolve', 'wits', 'panache'].map((k) => ({ label: C.traits[k], value: this._traitFinal(k) })),
      skills: Object.entries(skills)
        .filter(([, v]) => v.final > 0)
        .map(([k, v]) => ({ label: v.label, value: v.final })),
      backgrounds: this._selectedBackgrounds().map((b) => b.name),
      freeAdvantages: this._freeAdvantageNames(),
      purchased,
      virtue: virtue?.name,
      hubris: hubris?.name,
      languages: langs,
      heroPoints: C.creation.startingHeroPoints,
    };
  }

  /* -------------------------------------------- */
  /*  Listeners                                   */
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const root = html[0] ?? html;

    // Persist free-text fields into state as they change.
    root.querySelectorAll('[data-state]').forEach((el) => {
      el.addEventListener('change', (ev) => {
        this._wizard[ev.currentTarget.dataset.state] = ev.currentTarget.value;
      });
    });

    // Nation pick cards (single-select).
    root.querySelectorAll('[data-nation-pick]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        this._readConceptInputs(); // preserve typed name/epithet/religion/concept
        this._wizard.nation = ev.currentTarget.dataset.nationPick;
        this._wizard.nationBonusTrait = null; // nation change invalidates the bonus Trait
        this.render(false);
      }),
    );

    // Trait allocation.
    root.querySelectorAll('[data-trait-inc]').forEach((el) =>
      el.addEventListener('click', (ev) => this._allocTrait(ev.currentTarget.dataset.traitInc, +1)),
    );
    root.querySelectorAll('[data-trait-dec]').forEach((el) =>
      el.addEventListener('click', (ev) => this._allocTrait(ev.currentTarget.dataset.traitDec, -1)),
    );
    root.querySelectorAll('[data-bonus-trait]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        this._wizard.nationBonusTrait = ev.currentTarget.dataset.bonusTrait;
        this.render(false);
      }),
    );

    // Background toggle.
    root.querySelectorAll('[data-bg-toggle]').forEach((el) =>
      el.addEventListener('click', (ev) => this._toggleBackground(ev.currentTarget.dataset.bgToggle)),
    );

    // Skill allocation.
    root.querySelectorAll('[data-skill-inc]').forEach((el) =>
      el.addEventListener('click', (ev) => this._allocSkill(ev.currentTarget.dataset.skillInc, +1)),
    );
    root.querySelectorAll('[data-skill-dec]').forEach((el) =>
      el.addEventListener('click', (ev) => this._allocSkill(ev.currentTarget.dataset.skillDec, -1)),
    );

    // Advantage toggle.
    root.querySelectorAll('[data-adv-toggle]').forEach((el) =>
      el.addEventListener('click', (ev) => this._toggleAdvantage(ev.currentTarget.dataset.advToggle)),
    );

    // Arcana pick cards (single-select each column; click again to clear).
    root.querySelectorAll('[data-arcana-pick]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        const field = ev.currentTarget.dataset.arcanaPick; // virtueId | hubrisId
        const id = ev.currentTarget.dataset.arcId;
        this._wizard[field] = this._wizard[field] === id ? null : id;
        this.render(false);
      }),
    );

    // Navigation.
    root.querySelector('[data-nav="back"]')?.addEventListener('click', () => this._nav(-1));
    root.querySelector('[data-nav="next"]')?.addEventListener('click', () => this._nav(+1));
    root.querySelector('[data-nav="finish"]')?.addEventListener('click', () => this._finish());
  }

  _readConceptInputs() {
    const root = this.element[0] ?? this.element;
    for (const el of root.querySelectorAll('[data-state]')) {
      this._wizard[el.dataset.state] = el.value;
    }
  }

  _allocTrait(key, delta) {
    const C = CONFIG.SVNSEA2E.creation;
    const cur = this._wizard.traitAlloc[key] || 0;
    if (delta > 0) {
      if (this._traitPointsSpent() >= C.traitPoints) return;
      if (this._traitFinal(key) >= C.rankCap) return;
      this._wizard.traitAlloc[key] = cur + 1;
    } else if (cur > 0) {
      this._wizard.traitAlloc[key] = cur - 1;
    }
    this.render(false);
  }

  _toggleBackground(id) {
    const idx = this._wizard.backgrounds.indexOf(id);
    if (idx >= 0) this._wizard.backgrounds.splice(idx, 1);
    else if (this._wizard.backgrounds.length < CONFIG.SVNSEA2E.creation.backgroundsCount)
      this._wizard.backgrounds.push(id);
    else return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizTwoBackgrounds'));
    // Re-clamp skill allocations against new background ranks.
    this._clampSkillAlloc();
    this.render(false);
  }

  _clampSkillAlloc() {
    const skills = this._derivedSkills();
    const cap = CONFIG.SVNSEA2E.creation.skillCreationCap;
    for (const [key, v] of Object.entries(skills)) {
      const maxAlloc = Math.max(0, cap - v.bg);
      if ((this._wizard.skillAlloc[key] || 0) > maxAlloc) this._wizard.skillAlloc[key] = maxAlloc;
    }
  }

  _allocSkill(key, delta) {
    const C = CONFIG.SVNSEA2E.creation;
    const skills = this._derivedSkills();
    const cur = this._wizard.skillAlloc[key] || 0;
    if (delta > 0) {
      if (this._skillPointsSpent() >= C.skillPoints) return;
      if (skills[key].final >= C.skillCreationCap) return;
      this._wizard.skillAlloc[key] = cur + 1;
    } else if (cur > 0) {
      this._wizard.skillAlloc[key] = cur - 1;
    }
    this.render(false);
  }

  _toggleAdvantage(id) {
    const idx = this._wizard.advantages.indexOf(id);
    if (idx >= 0) {
      this._wizard.advantages.splice(idx, 1);
    } else {
      const adv = this._catalog.advantages.find((a) => a._id === id);
      if (!adv) return;
      if (this._advantageSpent() + this._advantageCost(adv) > CONFIG.SVNSEA2E.creation.advantagePoints)
        return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizAdvBudget'));
      this._wizard.advantages.push(id);
    }
    this.render(false);
  }

  /* -------------------------------------------- */
  /*  Navigation + validation                     */
  /* -------------------------------------------- */

  _nav(delta) {
    if (this._step === 0) this._readConceptInputs();
    if (delta > 0) {
      const err = this._validateStep();
      if (err) return ui.notifications.warn(err);
    }
    this._step = Math.max(0, Math.min(this.constructor.STEPS.length - 1, this._step + delta));
    this.render(false);
  }

  _validateStep() {
    const C = CONFIG.SVNSEA2E.creation;
    const L = (k) => game.i18n.localize(k);
    switch (this.constructor.STEPS[this._step].key) {
      case 'concept':
        if (!this._wizard.name?.trim()) return L('SVNSEA2E.WizNeedName');
        if (!this._wizard.nation || this._wizard.nation === 'none') return L('SVNSEA2E.WizNeedNation');
        break;
      case 'traits':
        if (this._traitPointsSpent() !== C.traitPoints) return L('SVNSEA2E.WizSpendTraits');
        if (!this._wizard.nationBonusTrait) return L('SVNSEA2E.WizNeedBonus');
        break;
      case 'backgrounds':
        if (this._wizard.backgrounds.length !== C.backgroundsCount) return L('SVNSEA2E.WizTwoBackgrounds');
        break;
      case 'skills':
        if (this._skillPointsSpent() !== C.skillPoints) return L('SVNSEA2E.WizSpendSkills');
        break;
      case 'arcana':
        if (!this._wizard.virtueId || !this._wizard.hubrisId) return L('SVNSEA2E.WizNeedArcana');
        break;
    }
    return null;
  }

  /* -------------------------------------------- */
  /*  Apply                                        */
  /* -------------------------------------------- */

  async _finish() {
    // Validate everything still holds.
    const saved = this._step;
    for (let s = 0; s < this.constructor.STEPS.length - 1; s++) {
      this._step = s;
      const err = this._validateStep();
      if (err) {
        this.render(false);
        return ui.notifications.warn(err);
      }
    }
    this._step = saved;

    const C = CONFIG.SVNSEA2E;
    const cr = C.creation;

    // 1) Core actor data.
    const traits = {};
    for (const k of ['brawn', 'finesse', 'resolve', 'wits', 'panache']) {
      traits[`system.traits.${k}.value`] = this._traitFinal(k);
    }
    const skills = this._derivedSkills();
    const skillUpdate = {};
    for (const [k, v] of Object.entries(skills)) skillUpdate[`system.skills.${k}.value`] = Math.min(v.final, cr.rankCap);

    const native = this._nativeLanguage();
    const languages = [...new Set([cr.baseLanguage, native].filter(Boolean))];

    await this.actor.update({
      name: this._wizard.name.trim(),
      'system.epithet': this._wizard.epithet?.trim() || '',
      'system.nation': this._wizard.nation,
      'system.religion': this._wizard.religion?.trim() || '',
      'system.concept': this._wizard.concept || '',
      'system.heropts': cr.startingHeroPoints,
      'system.wealth': 0,
      'system.reputation': '',
      'system.languages': languages,
      ...traits,
      ...skillUpdate,
    });

    // 2) Embedded items: backgrounds, granted + purchased advantages, arcana.
    const toCreate = [];
    const seenAdvNames = new Set();

    for (const bg of this._selectedBackgrounds()) {
      const obj = foundry.utils.deepClone(bg);
      delete obj._id;
      toCreate.push(obj);
    }

    // Free advantages from Backgrounds + purchased advantages (deduped by name).
    const advByName = new Map(this._catalog.advantages.map((a) => [a.name, a]));
    const grant = (adv) => {
      if (!adv || seenAdvNames.has(adv.name)) return;
      seenAdvNames.add(adv.name);
      const obj = foundry.utils.deepClone(adv);
      delete obj._id;
      toCreate.push(obj);
    };
    for (const name of this._freeAdvantageNames()) grant(advByName.get(name));
    for (const id of this._wizard.advantages) grant(this._catalog.advantages.find((a) => a._id === id));

    const virtue = this._catalog.virtues.find((v) => v._id === this._wizard.virtueId);
    const hubris = this._catalog.hubris.find((h) => h._id === this._wizard.hubrisId);
    for (const arc of [virtue, hubris]) {
      if (!arc) continue;
      const obj = foundry.utils.deepClone(arc);
      delete obj._id;
      toCreate.push(obj);
    }

    if (toCreate.length) await this.actor.createEmbeddedDocuments('Item', toCreate);

    ui.notifications.info(game.i18n.format('SVNSEA2E.WizDone', { name: this._wizard.name.trim() }));
    await this.close();
    this.actor.sheet?.render(true);
  }

  /** FormApplication requires this; the wizard applies via _finish() instead. */
  async _updateObject() {}
}

/**
 * Open the Hero Creator for a player-character actor.
 * @param {Actor} actor
 */
export async function openHeroCreator(actor) {
  if (actor?.type !== ActorType.PLAYER) {
    return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizPlayerOnly'));
  }
  if (!game.packs.get('theah.backgrounds')) {
    return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizNoCompendia'));
  }
  try {
    await new HeroCreator(actor).render(true);
  } catch (err) {
    console.error('Théah | Hero Creator failed to open', err);
    ui.notifications.error(game.i18n.localize('SVNSEA2E.WizOpenFailed'));
  }
}
