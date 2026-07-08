import { ActorType } from '../enums.js';
import { getAllPackAdvantages, postThemedChat } from '../helpers.js';

const TRAITS = ['brawn', 'finesse', 'resolve', 'wits', 'panache'];

/** Minimal HTML escaper for user-entered Story text (no dependency on util APIs). */
const esc = (t) =>
  String(t ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/**
 * Step-by-step Hero advancement, faithful to the 7th Sea 2e Core Rulebook
 * ("Rewarding the Journey", pp.159-160). There is no XP — a Hero advances by
 * completing a Story whose single Reward is chosen up-front; the Reward's cost
 * (in Steps) sets how long the Story is. This wizard writes a structured Story
 * to the actor; the player then ticks off Steps on the sheet and claims the
 * Reward when the Story is done (see `applyStoryAdvancement`).
 *
 * Steps: Reward → Configure → Story (Goal + first Step) → Review.
 */
export class AdvancementCreator extends FormApplication {
  constructor(actor, options = {}) {
    super(actor, options);
    this.actor = actor;
    this._step = 0;
    this._catalog = null; // { advantages, virtues, hubris }
    this._wizard = {
      reward: '', // reward type key
      skill: '', // skillRaise
      trait: '', // traitIncrease / traitShift (raised)
      traitDown: '', // traitShift (lowered)
      advId: '', // advantage compendium id
      arcanaSlot: 'virtue', // arcanaChange: 'virtue' | 'hubris'
      arcanaId: '', // arcanaChange: new arcana compendium id
      bgId: '', // quirkChange: which Background item
      quirk: '', // quirkChange: new Quirk text
      name: '', // Story name / mantra
      goal: '', // the ending (Goal)
      firstStep: '', // the first Step
    };
  }

  static get STEPS() {
    return [
      { key: 'reward', label: 'SVNSEA2E.AdvStepReward' },
      { key: 'configure', label: 'SVNSEA2E.AdvStepConfigure' },
      { key: 'story', label: 'SVNSEA2E.AdvStepStory' },
      { key: 'review', label: 'SVNSEA2E.WizReview' },
    ];
  }

  /** The seven Reward types, in book order (Sorcery is gained as the Sorcery Advantage). */
  static get REWARDS() {
    return [
      { key: 'skillRaise', icon: 'fa-bullseye' },
      { key: 'traitIncrease', icon: 'fa-arrow-up-wide-short' },
      { key: 'traitShift', icon: 'fa-right-left' },
      { key: 'advantage', icon: 'fa-medal' },
      { key: 'arcanaChange', icon: 'fa-star-half-stroke' },
      { key: 'quirkChange', icon: 'fa-masks-theater' },
      { key: 'corruptionRemove', icon: 'fa-hand-holding-heart' },
    ];
  }

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['theah', 'advancement-creator'],
      template: 'systems/theah/templates/apps/advancement-creator.hbs',
      width: 720,
      height: 680,
      resizable: true,
      submitOnChange: false,
      submitOnClose: false,
      closeOnSubmit: false,
    });
  }

  /** @override */
  get title() {
    return game.i18n.localize('SVNSEA2E.AdvCreator');
  }

  /* -------------------------------------------- */
  /*  Catalog                                     */
  /* -------------------------------------------- */

  async _loadCatalog() {
    if (this._catalog) return this._catalog;
    const advantages = await this._loadPack('theah.advantages', 'advantages');
    const arcana = await this._loadPack('theah.arcana', 'arcana');
    const byName = (a, b) => (a.name || '').localeCompare(b.name || '');
    this._catalog = {
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

  /** Load from compendium; fall back to shipped packs-data JSON if it's empty/corrupt. */
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
  /*  Actor state helpers                         */
  /* -------------------------------------------- */

  _skillVal(key) {
    return this.actor.system.skills?.[key]?.value ?? 0;
  }

  _traitVal(key) {
    return this.actor.system.traits?.[key]?.value ?? 0;
  }

  _traitTotal() {
    return TRAITS.reduce((a, k) => a + this._traitVal(k), 0);
  }

  /** How many "increase a Trait" Rewards this Hero has already claimed (lifetime). */
  _traitIncreasesUsed() {
    return this.actor.items.filter(
      (i) =>
        i.type === 'story' &&
        i.system?.advancement?.type === 'traitIncrease' &&
        i.system?.advancement?.applied,
    ).length;
  }

  _corruption() {
    return this.actor.system.corruptionpts ?? 0;
  }

  _backgrounds() {
    return this.actor.items.filter((i) => i.type === 'background');
  }

  _ownsAdvantage(name) {
    return this.actor.items.some(
      (i) => i.type === 'advantage' && i.name?.toLowerCase() === name?.toLowerCase(),
    );
  }

  _advById(id) {
    return this._catalog?.advantages.find((a) => a._id === id) || null;
  }

  _arcById(id) {
    const list =
      this._wizard.arcanaSlot === 'hubris' ? this._catalog?.hubris : this._catalog?.virtues;
    return list?.find((a) => a._id === id) || null;
  }

  _advantageCost(adv) {
    return adv?.system?.cost?.normal ?? 1;
  }

  /* -------------------------------------------- */
  /*  Reward availability + step cost             */
  /* -------------------------------------------- */

  /** Which Rewards are legal for this Hero right now (with a reason if not). */
  _rewardAvailability() {
    const A = CONFIG.SVNSEA2E.advancement;
    const anySkillBelowMax = Object.values(this.actor.system.skills || {}).some(
      (s) => (s.value ?? 0) < A.skillMax,
    );
    const anyTraitBelowMax = TRAITS.some((k) => this._traitVal(k) < A.traitMax);
    const anyTraitAboveMin = TRAITS.some((k) => this._traitVal(k) > A.traitMin);
    const canIncreaseTrait =
      anyTraitBelowMax &&
      this._traitTotal() < A.traitTotalCap &&
      this._traitIncreasesUsed() < A.traitIncreaseLifetimeCap;
    return {
      skillRaise: { ok: anySkillBelowMax, reason: 'SVNSEA2E.AdvNoSkillRoom' },
      traitIncrease: { ok: canIncreaseTrait, reason: 'SVNSEA2E.AdvNoTraitRoom' },
      traitShift: { ok: anyTraitBelowMax && anyTraitAboveMin, reason: 'SVNSEA2E.AdvNoTraitRoom' },
      advantage: { ok: !!this._catalog?.advantages.length, reason: 'SVNSEA2E.AdvNoCompendia' },
      arcanaChange: {
        ok: !!(this._catalog?.virtues.length || this._catalog?.hubris.length),
        reason: 'SVNSEA2E.AdvNoCompendia',
      },
      quirkChange: { ok: !!this._backgrounds().length, reason: 'SVNSEA2E.AdvNoBackgrounds' },
      corruptionRemove: { ok: this._corruption() > 0, reason: 'SVNSEA2E.AdvNoCorruption' },
    };
  }

  /** Steps for the currently-configured Reward (0 until enough is chosen). */
  _stepCost() {
    const s = this._wizard;
    const A = CONFIG.SVNSEA2E.advancement;
    switch (s.reward) {
      case 'skillRaise':
        return s.skill ? Math.min(this._skillVal(s.skill) + 1, A.skillMax) : 0;
      case 'traitIncrease':
        return 5;
      case 'traitShift':
        return 4;
      case 'advantage':
        return s.advId ? this._advantageCost(this._advById(s.advId)) : 0;
      case 'arcanaChange':
        return 4;
      case 'quirkChange':
        return 3;
      case 'corruptionRemove':
        return 5;
      default:
        return 0;
    }
  }

  /* -------------------------------------------- */
  /*  Data                                        */
  /* -------------------------------------------- */

  /** @override */
  async getData() {
    await this._loadCatalog();
    const C = CONFIG.SVNSEA2E;
    const A = C.advancement;
    const s = this._wizard;
    const steps = this.constructor.STEPS.map((st, i) => ({
      ...st,
      num: i + 1,
      active: i === this._step,
      done: i < this._step,
    }));

    const avail = this._rewardAvailability();
    const data = {
      step: this._step,
      steps,
      stepNumber: this._step + 1,
      stepTotal: this.constructor.STEPS.length,
      isFirst: this._step === 0,
      isLast: this._step === this.constructor.STEPS.length - 1,
      state: s,
      stepCost: this._stepCost(),
      rewardChosen: !!s.reward,
    };

    // Step 0 — Reward cards.
    data.rewards = this.constructor.REWARDS.map((r) => ({
      key: r.key,
      icon: r.icon,
      label: game.i18n.localize(`SVNSEA2E.AdvR_${r.key}`),
      hint: game.i18n.localize(`SVNSEA2E.AdvH_${r.key}`),
      cost: game.i18n.localize(`SVNSEA2E.AdvC_${r.key}`),
      selected: s.reward === r.key,
      available: avail[r.key].ok,
      reason: avail[r.key].ok ? '' : game.i18n.localize(avail[r.key].reason),
    }));

    // Step 1 — Configure (depends on reward).
    data.configKey = s.reward;
    // Skills below the cap.
    data.skillChoices = Object.entries(C.skills)
      .map(([key, label]) => ({
        key,
        label,
        cur: this._skillVal(key),
        next: Math.min(this._skillVal(key) + 1, A.skillMax),
        atMax: this._skillVal(key) >= A.skillMax,
        selected: s.skill === key,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    // Traits.
    const traitRows = (predicate) =>
      TRAITS.map((key) => ({
        key,
        label: C.traits[key],
        cur: this._traitVal(key),
      })).filter(predicate);
    data.traitRaiseChoices = traitRows((t) => t.cur < A.traitMax).map((t) => ({
      ...t,
      next: t.cur + 1,
      selected: s.trait === t.key,
    }));
    data.traitLowerChoices = traitRows((t) => t.cur > A.traitMin).map((t) => ({
      ...t,
      next: t.cur - 1,
      selected: s.traitDown === t.key,
    }));
    data.traitTotal = this._traitTotal();
    data.traitTotalCap = A.traitTotalCap;
    data.traitIncreasesUsed = this._traitIncreasesUsed();
    data.traitIncreaseCap = A.traitIncreaseLifetimeCap;
    // Advantages (exclude Innate and those already owned unless multi-buy Sorcery).
    data.advantageChoices = this._catalog.advantages
      .filter((a) => !a.system?.innate)
      .map((a) => ({
        id: a._id,
        name: a.name,
        cost: this._advantageCost(a),
        owned: this._ownsAdvantage(a.name),
        sorcery: a.name?.toLowerCase() === 'sorcery',
        selected: s.advId === a._id,
        description: a.system?.description || '',
      }))
      .map((a) => ({ ...a, disabled: a.owned && !a.sorcery }));
    // Arcana.
    data.arcanaSlot = s.arcanaSlot;
    const arcList = s.arcanaSlot === 'hubris' ? this._catalog.hubris : this._catalog.virtues;
    data.arcanaChoices = arcList.map((a) => ({
      id: a._id,
      name: a.name,
      selected: s.arcanaId === a._id,
      description: a.system?.description || '',
    }));
    const arcSel = this._arcById(s.arcanaId);
    data.arcanaDesc = arcSel?.system?.description || '';
    // Quirk change.
    data.backgroundChoices = this._backgrounds().map((b) => ({
      id: b.id,
      name: b.name,
      quirk: b.system?.quirk || '',
      selected: s.bgId === b.id,
    }));
    // Corruption.
    data.corruption = this._corruption();
    data.corruptionAfter = Math.max(0, this._corruption() - 1);

    // Step 3 — Review.
    data.review = this._buildReview();

    data.emptyCatalog = !this._catalog.advantages.length;
    return data;
  }

  _buildReview() {
    return {
      name: this._wizard.name,
      reward: this._rewardSummary(),
      goal: this._wizard.goal,
      firstStep: this._wizard.firstStep,
      steps: this._stepCost(),
    };
  }

  /** Human-readable one-liner for the configured Reward. */
  _rewardSummary() {
    const C = CONFIG.SVNSEA2E;
    const s = this._wizard;
    const L = (k, d) => (d ? game.i18n.format(k, d) : game.i18n.localize(k));
    switch (s.reward) {
      case 'skillRaise':
        return s.skill
          ? L('SVNSEA2E.AdvLblSkill', {
              skill: C.skills[s.skill] || s.skill,
              rank: Math.min(this._skillVal(s.skill) + 1, C.advancement.skillMax),
            })
          : '';
      case 'traitIncrease':
        return s.trait
          ? L('SVNSEA2E.AdvLblTrait', {
              trait: C.traits[s.trait] || s.trait,
              rank: Math.min(this._traitVal(s.trait) + 1, C.advancement.traitMax),
            })
          : '';
      case 'traitShift':
        return s.trait && s.traitDown
          ? L('SVNSEA2E.AdvLblShift', {
              up: C.traits[s.trait] || s.trait,
              down: C.traits[s.traitDown] || s.traitDown,
            })
          : '';
      case 'advantage': {
        const adv = this._advById(s.advId);
        return adv ? L('SVNSEA2E.AdvLblAdvantage', { name: adv.name }) : '';
      }
      case 'arcanaChange': {
        const arc = this._arcById(s.arcanaId);
        return arc
          ? L('SVNSEA2E.AdvLblArcana', {
              slot: L(s.arcanaSlot === 'virtue' ? 'SVNSEA2E.Virtue' : 'SVNSEA2E.Hubris'),
              name: arc.name,
            })
          : '';
      }
      case 'quirkChange':
        return L('SVNSEA2E.AdvLblQuirk');
      case 'corruptionRemove':
        return L('SVNSEA2E.AdvLblCorruption');
      default:
        return '';
    }
  }

  /* -------------------------------------------- */
  /*  Listeners                                   */
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const root = html[0] ?? html;

    // Reward selection.
    root.querySelectorAll('[data-reward]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        const card = ev.currentTarget;
        if (card.classList.contains('disabled')) return;
        this._wizard.reward = card.dataset.reward;
        this.render(false);
      }),
    );

    // Generic single-select choices (skill / trait / advantage / arcana / bg).
    root.querySelectorAll('[data-choice]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        const t = ev.currentTarget;
        if (t.classList.contains('disabled')) return;
        this._wizard[t.dataset.choice] = t.dataset.value;
        this.render(false);
      }),
    );

    // Arcana slot toggle (virtue / hubris).
    root.querySelectorAll('[data-arcana-slot]').forEach((el) =>
      el.addEventListener('click', (ev) => {
        this._wizard.arcanaSlot = ev.currentTarget.dataset.arcanaSlot;
        this._wizard.arcanaId = '';
        this.render(false);
      }),
    );

    // Free-text fields persisted into state.
    root.querySelectorAll('[data-state]').forEach((el) =>
      el.addEventListener('change', (ev) => {
        this._wizard[ev.currentTarget.dataset.state] = ev.currentTarget.value;
      }),
    );

    // Navigation.
    root.querySelector('[data-nav="back"]')?.addEventListener('click', () => this._nav(-1));
    root.querySelector('[data-nav="next"]')?.addEventListener('click', () => this._nav(+1));
    root.querySelector('[data-nav="finish"]')?.addEventListener('click', () => this._finish());
  }

  _readTextInputs() {
    const root = this.element?.[0] ?? this.element;
    if (!root) return;
    for (const el of root.querySelectorAll('[data-state]')) {
      this._wizard[el.dataset.state] = el.value;
    }
  }

  /* -------------------------------------------- */
  /*  Navigation + validation                     */
  /* -------------------------------------------- */

  _nav(delta) {
    if (this.constructor.STEPS[this._step].key === 'story') this._readTextInputs();
    if (delta > 0) {
      const err = this._validateStep();
      if (err) return ui.notifications.warn(err);
    }
    this._step = Math.max(0, Math.min(this.constructor.STEPS.length - 1, this._step + delta));
    this.render(false);
  }

  _validateStep() {
    const s = this._wizard;
    const A = CONFIG.SVNSEA2E.advancement;
    const L = (k) => game.i18n.localize(k);
    switch (this.constructor.STEPS[this._step].key) {
      case 'reward':
        if (!s.reward) return L('SVNSEA2E.AdvNeedReward');
        if (!this._rewardAvailability()[s.reward].ok) return L('SVNSEA2E.AdvRewardUnavailable');
        break;
      case 'configure': {
        const err = this._validateConfigure(A, L);
        if (err) return err;
        break;
      }
      case 'story':
        if (!s.name?.trim()) return L('SVNSEA2E.AdvNeedName');
        if (!s.goal?.trim()) return L('SVNSEA2E.AdvNeedGoal');
        break;
    }
    return null;
  }

  _validateConfigure(A, L) {
    const s = this._wizard;
    switch (s.reward) {
      case 'skillRaise':
        if (!s.skill) return L('SVNSEA2E.AdvPickSkill');
        if (this._skillVal(s.skill) >= A.skillMax) return L('SVNSEA2E.AdvSkillMaxed');
        break;
      case 'traitIncrease':
        if (!s.trait) return L('SVNSEA2E.AdvPickTrait');
        if (this._traitVal(s.trait) >= A.traitMax) return L('SVNSEA2E.AdvTraitMaxed');
        if (this._traitTotal() + 1 > A.traitTotalCap) return L('SVNSEA2E.AdvTraitTotalCap');
        if (this._traitIncreasesUsed() >= A.traitIncreaseLifetimeCap)
          return L('SVNSEA2E.AdvTraitTwice');
        break;
      case 'traitShift':
        if (!s.trait || !s.traitDown) return L('SVNSEA2E.AdvPickBothTraits');
        if (s.trait === s.traitDown) return L('SVNSEA2E.AdvDistinctTraits');
        if (this._traitVal(s.trait) >= A.traitMax) return L('SVNSEA2E.AdvTraitMaxed');
        if (this._traitVal(s.traitDown) <= A.traitMin) return L('SVNSEA2E.AdvTraitMinned');
        break;
      case 'advantage': {
        if (!s.advId) return L('SVNSEA2E.AdvPickAdvantage');
        const adv = this._advById(s.advId);
        if (adv && this._ownsAdvantage(adv.name) && adv.name.toLowerCase() !== 'sorcery')
          return L('SVNSEA2E.AdvAlreadyOwned');
        break;
      }
      case 'arcanaChange':
        if (!s.arcanaId) return L('SVNSEA2E.AdvPickArcana');
        break;
      case 'quirkChange':
        if (!s.bgId) return L('SVNSEA2E.AdvPickBackground');
        if (!s.quirk?.trim()) return L('SVNSEA2E.AdvNeedQuirk');
        break;
      case 'corruptionRemove':
        if (this._corruption() <= 0) return L('SVNSEA2E.AdvNoCorruption');
        break;
    }
    return null;
  }

  /* -------------------------------------------- */
  /*  Build + write the Story                     */
  /* -------------------------------------------- */

  _buildAdvancement() {
    const s = this._wizard;
    const A = CONFIG.SVNSEA2E.advancement;
    const adv = {
      active: true,
      type: s.reward,
      targetKey: '',
      targetKey2: '',
      targetName: '',
      targetUuid: '',
      newRank: 0,
      stepsTotal: this._stepCost(),
      stepsDone: 0,
      applied: false,
    };
    switch (s.reward) {
      case 'skillRaise':
        adv.targetKey = s.skill;
        adv.newRank = Math.min(this._skillVal(s.skill) + 1, A.skillMax);
        break;
      case 'traitIncrease':
        adv.targetKey = s.trait;
        adv.newRank = Math.min(this._traitVal(s.trait) + 1, A.traitMax);
        break;
      case 'traitShift':
        adv.targetKey = s.trait;
        adv.targetKey2 = s.traitDown;
        break;
      case 'advantage': {
        const a = this._advById(s.advId);
        adv.targetName = a?.name || '';
        adv.targetUuid = a ? `Compendium.theah.advantages.Item.${a._id}` : '';
        break;
      }
      case 'arcanaChange': {
        const a = this._arcById(s.arcanaId);
        adv.targetKey = s.arcanaSlot;
        adv.targetName = a?.name || '';
        adv.targetUuid = a ? `Compendium.theah.arcana.Item.${a._id}` : '';
        break;
      }
      case 'quirkChange':
        adv.targetKey = s.bgId;
        adv.targetName = s.quirk.trim();
        break;
      case 'corruptionRemove':
        break;
    }
    return adv;
  }

  async _finish() {
    if (this.constructor.STEPS[this._step].key === 'story') this._readTextInputs();
    // Re-validate the whole wizard.
    const saved = this._step;
    for (let i = 0; i < this.constructor.STEPS.length - 1; i++) {
      this._step = i;
      const err = this._validateStep();
      if (err) {
        this.render(false);
        return ui.notifications.warn(err);
      }
    }
    this._step = saved;

    const s = this._wizard;
    const advancement = this._buildAdvancement();
    const rewardHtml = `<p><strong>${this._rewardSummary()}</strong> — ${game.i18n.format(
      'SVNSEA2E.AdvStepsToGo',
      { n: advancement.stepsTotal },
    )}</p>`;

    await this.actor.createEmbeddedDocuments('Item', [
      {
        name: s.name.trim(),
        type: 'story',
        img: 'systems/theah/icons/item.svg',
        system: {
          description: '',
          endings: `<p>${esc(s.goal.trim())}</p>`,
          steps: s.firstStep?.trim() ? `<p>${esc(s.firstStep.trim())}</p>` : '',
          reward: rewardHtml,
          status: 'inprogress',
          advancement,
        },
      },
    ]);

    ui.notifications.info(game.i18n.format('SVNSEA2E.AdvStarted', { name: s.name.trim() }));
    await this.close();
    this.actor.sheet?.render(true);
  }

  /** FormApplication requires this; the wizard writes via _finish() instead. */
  async _updateObject() {}
}

/* -------------------------------------------- */
/*  Public API                                  */
/* -------------------------------------------- */

/**
 * Open the Advancement Creator for a player-character actor.
 * @param {Actor} actor
 */
export async function openAdvancementCreator(actor) {
  if (actor?.type !== ActorType.PLAYER) {
    return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizPlayerOnly'));
  }
  if (!game.packs.get('theah.advantages')) {
    return ui.notifications.warn(game.i18n.localize('SVNSEA2E.WizNoCompendia'));
  }
  try {
    await new AdvancementCreator(actor).render(true);
  } catch (err) {
    console.error('Théah | Advancement Creator failed to open', err);
    ui.notifications.error(game.i18n.localize('SVNSEA2E.WizOpenFailed'));
  }
}

/* -------------------------------------------- */
/*  Claiming a completed Story's Reward         */
/* -------------------------------------------- */

/** Resolve a compendium source object from a stored uuid (name is the fallback). */
async function resolvePackDoc(uuid, fallbackName, kind) {
  if (uuid) {
    try {
      const doc = await fromUuid(uuid);
      if (doc) return doc.toObject();
    } catch (e) {
      /* fall through to name lookup */
    }
  }
  if (!fallbackName) return null;
  if (kind === 'advantage') {
    const advs = await getAllPackAdvantages();
    const hit = advs.find((a) => a.name?.toLowerCase() === fallbackName.toLowerCase());
    return hit?.toObject ? hit.toObject() : hit || null;
  }
  // Arcana: search all Item compendia for a matching virtue/hubris.
  for (const pack of game.packs.filter((p) => p.metadata.type === 'Item')) {
    const idx = await pack.getIndex();
    const entry = idx.find(
      (e) =>
        (e.type === 'virtue' || e.type === 'hubris') &&
        e.name?.toLowerCase() === fallbackName.toLowerCase(),
    );
    if (entry) return (await pack.getDocument(entry._id)).toObject();
  }
  return null;
}

/**
 * Apply a completed advancement Story's Reward to the actor, enforcing the book
 * caps at claim time (they may have been reached mid-Story). Marks the Story
 * applied + complete and posts a public chat card. Called from the sheet when
 * the player clicks "Claim Reward".
 * @param {Actor} actor
 * @param {Item} story
 */
export async function applyStoryAdvancement(actor, story) {
  const adv = story.system?.advancement;
  const L = (k, d) => (d ? game.i18n.format(k, d) : game.i18n.localize(k));
  if (!adv || !adv.active) return;
  if (adv.applied) return ui.notifications.warn(L('SVNSEA2E.AdvAlreadyClaimed'));
  if ((adv.stepsDone || 0) < (adv.stepsTotal || 0))
    return ui.notifications.warn(L('SVNSEA2E.AdvNotComplete'));

  const C = CONFIG.SVNSEA2E;
  const A = C.advancement;
  let summary = '';

  switch (adv.type) {
    case 'skillRaise': {
      const key = adv.targetKey;
      const cur = actor.system.skills?.[key]?.value ?? 0;
      if (cur >= A.skillMax) return ui.notifications.warn(L('SVNSEA2E.AdvSkillMaxed'));
      const nv = Math.min(cur + 1, A.skillMax);
      await actor.update({ [`system.skills.${key}.value`]: nv });
      summary = L('SVNSEA2E.AdvLblSkill', { skill: C.skills[key] || key, rank: nv });
      break;
    }
    case 'traitIncrease': {
      const key = adv.targetKey;
      const cur = actor.system.traits?.[key]?.value ?? 0;
      const total = TRAITS.reduce((a, k) => a + (actor.system.traits?.[k]?.value ?? 0), 0);
      const used = actor.items.filter(
        (i) =>
          i.type === 'story' &&
          i.id !== story.id &&
          i.system?.advancement?.type === 'traitIncrease' &&
          i.system?.advancement?.applied,
      ).length;
      if (cur >= A.traitMax) return ui.notifications.warn(L('SVNSEA2E.AdvTraitMaxed'));
      if (total + 1 > A.traitTotalCap) return ui.notifications.warn(L('SVNSEA2E.AdvTraitTotalCap'));
      if (used >= A.traitIncreaseLifetimeCap)
        return ui.notifications.warn(L('SVNSEA2E.AdvTraitTwice'));
      await actor.update({ [`system.traits.${key}.value`]: cur + 1 });
      summary = L('SVNSEA2E.AdvLblTrait', { trait: C.traits[key] || key, rank: cur + 1 });
      break;
    }
    case 'traitShift': {
      const up = adv.targetKey;
      const down = adv.targetKey2;
      const cu = actor.system.traits?.[up]?.value ?? 0;
      const cd = actor.system.traits?.[down]?.value ?? 0;
      if (cu >= A.traitMax) return ui.notifications.warn(L('SVNSEA2E.AdvTraitMaxed'));
      if (cd <= A.traitMin) return ui.notifications.warn(L('SVNSEA2E.AdvTraitMinned'));
      await actor.update({
        [`system.traits.${up}.value`]: cu + 1,
        [`system.traits.${down}.value`]: cd - 1,
      });
      summary = L('SVNSEA2E.AdvLblShift', { up: C.traits[up] || up, down: C.traits[down] || down });
      break;
    }
    case 'advantage': {
      const source = await resolvePackDoc(adv.targetUuid, adv.targetName, 'advantage');
      if (!source) return ui.notifications.warn(L('SVNSEA2E.AdvSourceMissing'));
      const owns = actor.items.some((i) => i.type === 'advantage' && i.name === source.name);
      if (owns && source.name?.toLowerCase() !== 'sorcery')
        return ui.notifications.warn(L('SVNSEA2E.AdvAlreadyOwned'));
      delete source._id;
      await actor.createEmbeddedDocuments('Item', [source]);
      summary = L('SVNSEA2E.AdvLblAdvantage', { name: source.name });
      break;
    }
    case 'arcanaChange': {
      const slot = adv.targetKey; // 'virtue' | 'hubris'
      const source = await resolvePackDoc(adv.targetUuid, adv.targetName, 'arcana');
      if (!source) return ui.notifications.warn(L('SVNSEA2E.AdvSourceMissing'));
      const existing = actor.items.filter((i) => i.type === slot).map((i) => i.id);
      if (existing.length) await actor.deleteEmbeddedDocuments('Item', existing);
      delete source._id;
      await actor.createEmbeddedDocuments('Item', [source]);
      summary = L('SVNSEA2E.AdvLblArcana', {
        slot: L(slot === 'virtue' ? 'SVNSEA2E.Virtue' : 'SVNSEA2E.Hubris'),
        name: source.name,
      });
      break;
    }
    case 'quirkChange': {
      const bg = actor.items.get(adv.targetKey);
      if (bg) await bg.update({ 'system.quirk': `<p>${esc(adv.targetName)}</p>` });
      summary = L('SVNSEA2E.AdvLblQuirkDone', { quirk: adv.targetName });
      break;
    }
    case 'corruptionRemove': {
      const cur = actor.system.corruptionpts ?? 0;
      await actor.update({ 'system.corruptionpts': Math.max(0, cur - 1) });
      summary = L('SVNSEA2E.AdvLblCorruption');
      break;
    }
    default:
      return;
  }

  await story.update({ 'system.advancement.applied': true, 'system.status': 'complete' });

  const content = `
    <div class="theah theah-reward">
      <div class="item-head"><i class="fas fa-feather"></i> ${L('SVNSEA2E.AdvChatTitle', {
        name: actor.name,
      })}</div>
      <div class="reward-body">
        <div class="reward-story">&ldquo;${esc(story.name)}&rdquo;</div>
        <div class="reward-line"><i class="fas fa-trophy"></i> ${summary}</div>
      </div>
    </div>`;
  await postThemedChat({ actor, content });
}
