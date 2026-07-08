import { postThemedChat } from '../helpers.js';

/**
 * GM tool for framing a Risk before the Heroes roll: describe the Situation and
 * Approach, then list the Consequences and Opportunities (each with a Raise cost
 * and an optional Time Limit), and post it to the table as a themed chat card.
 * Book: "How Risks Work", Core p.172-173; Time Limits p.179.
 * @extends {FormApplication}
 */
export class RiskBuilder extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: 'theah-risk-builder',
      classes: ['theah', 'risk-builder-app'],
      template: 'systems/theah/templates/apps/risk-builder.hbs',
      title: game.i18n.localize('SVNSEA2E.RiskBuilder'),
      width: 560,
      height: 'auto',
      closeOnSubmit: false,
      submitOnChange: false,
      submitOnClose: false,
      resizable: true,
    });
  }

  constructor(options = {}) {
    super({}, options);
    this.risk = {
      id: null, // set when the working Risk was loaded from / saved to the library
      name: '',
      situation: '',
      // Heroes in the scene + the Trait+Skill (Approach) each will roll. In an
      // Action Sequence every Hero rolls their own pool against the shared Risk
      // (Core p.179) — this list is who's in the scene.
      participants: [],
      consequences: [{ desc: '', cost: 1, time: '' }],
      opportunities: [],
    };
  }

  /** The GM's saved-Risk library (world setting). */
  _savedRisks() {
    return game.settings.get('theah', 'savedRisks') || [];
  }

  async _setSavedRisks(list) {
    await game.settings.set('theah', 'savedRisks', list);
  }

  /** @override */
  render(force = false, options = {}) {
    if (!game.user.isGM) {
      ui.notifications?.warn(game.i18n.localize('SVNSEA2E.GMOnly'));
      return this;
    }
    return super.render(force, options);
  }

  /** Player-character actors, the Trait choices and the Skill choices used by the
   *  scene participant selects. */
  _sceneChoices() {
    const C = CONFIG.SVNSEA2E;
    const L = (k) => game.i18n.localize(k);
    const pcActors = (game.actors?.contents || game.actors || [])
      .filter((a) => a.type === 'playercharacter')
      .map((a) => ({ id: a.id, name: a.name }));
    const traitChoices = ['brawn', 'finesse', 'resolve', 'wits', 'panache'].map((k) => ({ key: k, label: L(C.traits[k]) }));
    const skillChoices = Object.entries(C.skills)
      .map(([k, l]) => ({ key: k, label: L(l) }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { pcActors, traitChoices, skillChoices };
  }

  /** @override */
  getData() {
    const { pcActors, traitChoices, skillChoices } = this._sceneChoices();
    // Decorate each scene participant with select-lists (marking the current
    // choice) and the live pool size (Trait value + Skill value).
    const participants = (this.risk.participants || []).map((p, i) => {
      const actor = game.actors?.get(p.actorId);
      const tv = actor?.system?.traits?.[p.trait]?.value ?? 0;
      const sv = actor?.system?.skills?.[p.skill]?.value ?? 0;
      const pool = actor && p.trait && p.skill ? tv + sv : null;
      return {
        index: i,
        pool,
        actors: pcActors.map((a) => ({ ...a, selected: a.id === p.actorId })),
        traits: traitChoices.map((t) => ({ ...t, selected: t.key === p.trait })),
        skills: skillChoices.map((s) => ({ ...s, selected: s.key === p.skill })),
      };
    });
    // Book example Consequences/Opportunities (Core p.174), grouped by Action for
    // <optgroup>s, so the GM can insert a starting row and edit it.
    const C = CONFIG.SVNSEA2E;
    const L = (k) => game.i18n.localize(k);
    const groupBy = (arr) => {
      const m = new Map();
      for (const e of arr || []) {
        const g = L(e.group);
        if (!m.has(g)) m.set(g, []);
        m.get(g).push({ text: e.text });
      }
      return [...m.entries()].map(([group, items]) => ({ group, items }));
    };
    return {
      risk: this.risk,
      participants,
      hasActors: pcActors.length > 0,
      exampleConsequences: groupBy(C.riskExamples?.consequences),
      exampleOpportunities: groupBy(C.riskExamples?.opportunities),
      // Library entries (name only for the list; full data lives in the setting).
      savedRisks: this._savedRisks().map((r) => ({ id: r.id, name: r.name || game.i18n.localize('SVNSEA2E.RiskUntitled') })),
      hasSaved: this._savedRisks().length > 0,
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const el = html[0] ?? html;
    el.querySelectorAll('.rb-add').forEach((b) =>
      b.addEventListener('click', (ev) => this._onAddRow(ev)),
    );
    el.querySelectorAll('.rb-remove').forEach((b) =>
      b.addEventListener('click', (ev) => this._onRemoveRow(ev)),
    );
    el.querySelector('.rb-post')?.addEventListener('click', (ev) => this._onPost(ev));
    el.querySelector('.rb-save')?.addEventListener('click', (ev) => this._onSave(ev));
    el.querySelector('.rb-new')?.addEventListener('click', (ev) => this._onNew(ev));
    el.querySelectorAll('.rb-load').forEach((b) =>
      b.addEventListener('click', (ev) => this._onLoadSaved(ev.currentTarget.dataset.id)),
    );
    el.querySelectorAll('.rb-post-saved').forEach((b) =>
      b.addEventListener('click', (ev) => this._onPostSaved(ev.currentTarget.dataset.id)),
    );
    el.querySelectorAll('.rb-delete').forEach((b) =>
      b.addEventListener('click', (ev) => this._onDeleteSaved(ev.currentTarget.dataset.id)),
    );
    el.querySelectorAll('.rb-example-pick').forEach((s) =>
      s.addEventListener('change', (ev) => this._onInsertExample(ev)),
    );
    el.querySelector('.rb-add-participant')?.addEventListener('click', (ev) => this._onAddParticipant(ev));
    el.querySelectorAll('.rb-remove-participant').forEach((b) =>
      b.addEventListener('click', (ev) => this._onRemoveParticipant(ev)),
    );
    // Re-render on a participant select change so the pool badge updates live.
    el.querySelectorAll('.rb-participant select').forEach((s) =>
      s.addEventListener('change', () => { this._readForm(this.form); this.render(false); }),
    );
  }

  /**
   * Scrape the current form values back into `this.risk` so edits survive a
   * re-render (adding/removing a row) or a post.
   * @param {HTMLElement} root
   * @private
   */
  _readForm(root) {
    this.risk.name = root.querySelector('[name="name"]')?.value ?? '';
    this.risk.situation = root.querySelector('[name="situation"]')?.value ?? '';
    this.risk.participants = Array.from(root.querySelectorAll('.rb-participant')).map((row) => ({
      actorId: row.querySelector('.rb-p-actor')?.value ?? '',
      trait: row.querySelector('.rb-p-trait')?.value ?? '',
      skill: row.querySelector('.rb-p-skill')?.value ?? '',
    }));
    for (const kind of ['consequence', 'opportunity']) {
      const list = kind === 'consequence' ? 'consequences' : 'opportunities';
      this.risk[list] = Array.from(root.querySelectorAll(`.rb-row[data-kind="${kind}"]`)).map((row) => ({
        desc: row.querySelector('.rb-desc')?.value ?? '',
        cost: Math.max(0, parseInt(row.querySelector('.rb-cost')?.value) || 0),
        time: row.querySelector('.rb-time')?.value?.trim() ?? '',
      }));
    }
  }

  _onAddRow(event) {
    event.preventDefault();
    this._readForm(this.form);
    const kind = event.currentTarget.dataset.kind;
    const list = kind === 'consequence' ? 'consequences' : 'opportunities';
    this.risk[list].push({ desc: '', cost: 1, time: '' });
    this.render(false);
  }

  _onAddParticipant(event) {
    event.preventDefault();
    this._readForm(this.form);
    // Default the actor to the first PC not already in the scene, for convenience.
    const { pcActors } = this._sceneChoices();
    const taken = new Set(this.risk.participants.map((p) => p.actorId));
    const next = pcActors.find((a) => !taken.has(a.id));
    this.risk.participants.push({ actorId: next?.id || '', trait: '', skill: '' });
    this.render(false);
  }

  _onRemoveParticipant(event) {
    event.preventDefault();
    this._readForm(this.form);
    this.risk.participants.splice(Number(event.currentTarget.dataset.i), 1);
    this.render(false);
  }

  /** Insert a book example (Core p.174) as a new Consequence/Opportunity row. */
  _onInsertExample(event) {
    const text = event.currentTarget.value;
    if (!text) return;
    this._readForm(this.form);
    const list = event.currentTarget.dataset.kind === 'consequence' ? 'consequences' : 'opportunities';
    this.risk[list].push({ desc: text, cost: 1, time: '' });
    this.render(false);
  }

  _onRemoveRow(event) {
    event.preventDefault();
    this._readForm(this.form);
    const kind = event.currentTarget.dataset.kind;
    const i = Number(event.currentTarget.dataset.i);
    const list = kind === 'consequence' ? 'consequences' : 'opportunities';
    this.risk[list].splice(i, 1);
    this.render(false);
  }

  /**
   * Build the themed Risk chat-card HTML from a risk object, or return null with
   * a warning if it lacks the minimum content (a Situation or a Consequence).
   * @param {object} r  A risk ({situation, participants, consequences, opportunities}).
   * @returns {string|null}
   * @private
   */
  _buildCard(r) {
    const cons = (r.consequences || []).filter((c) => c.desc?.trim());
    const opps = (r.opportunities || []).filter((o) => o.desc?.trim());

    if (!r.situation?.trim() && !cons.length) {
      ui.notifications.warn(game.i18n.localize('SVNSEA2E.RiskNeedsContent'));
      return null;
    }
    if (!cons.length) {
      ui.notifications.warn(game.i18n.localize('SVNSEA2E.RiskNoConsequences'));
      return null;
    }

    const esc = (s) =>
      String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    const L = (k) => game.i18n.localize(k);
    const F = (k, d) => game.i18n.format(k, d);

    const rowHtml = (item) => {
      const time = item.time
        ? ` <span class="rg-time">${esc(F('SVNSEA2E.ByRaise', { n: esc(String(item.time)) }))}</span>`
        : '';
      return `<li><span class="rg-cost" data-tooltip="${L('SVNSEA2E.RiskRaisesHint')}">${item.cost}</span> <span class="rg-desc">${esc(item.desc)}</span>${time}</li>`;
    };

    const consBlock = `
      <div class="risk-group consequences">
        <div class="rg-title" data-tooltip="${L('SVNSEA2E.RiskConsequencesHint')}"><i class="fas fa-skull-crossbones"></i> ${L('SVNSEA2E.RiskConsequences')}</div>
        <ul>${cons.map(rowHtml).join('')}</ul>
      </div>`;
    const oppsBlock = opps.length
      ? `
      <div class="risk-group opportunities">
        <div class="rg-title" data-tooltip="${L('SVNSEA2E.RiskOpportunitiesHint')}"><i class="fas fa-hand-sparkles"></i> ${L('SVNSEA2E.RiskOpportunities')}</div>
        <ul>${opps.map(rowHtml).join('')}</ul>
      </div>`
      : '';
    // Heroes in the scene: each rolls their own Trait+Skill pool against the Risk.
    const C = CONFIG.SVNSEA2E;
    const sceneRows = (r.participants || [])
      .filter((p) => p.actorId && p.trait && p.skill)
      .map((p) => {
        const actor = game.actors?.get(p.actorId);
        const tv = actor?.system?.traits?.[p.trait]?.value ?? 0;
        const sv = actor?.system?.skills?.[p.skill]?.value ?? 0;
        const appr = `${L(C.traits[p.trait] || p.trait)} + ${L(C.skills[p.skill] || p.skill)}`;
        return `<li><span class="rs-hero">${esc(actor?.name ?? '—')}</span> <span class="rs-appr">${esc(appr)}</span> <span class="rs-pool" data-tooltip="${L('SVNSEA2E.RiskPoolHint')}">${tv + sv}d10</span></li>`;
      })
      .join('');
    const sceneBlock = sceneRows
      ? `<div class="risk-group scene"><div class="rg-title" data-tooltip="${L('SVNSEA2E.RiskSceneHint')}"><i class="fas fa-users"></i> ${L('SVNSEA2E.RiskScene')}</div><ul class="risk-scene">${sceneRows}</ul></div>`
      : '';
    const nameBlock = r.name?.trim() ? `<div class="risk-name">${esc(r.name)}</div>` : '';
    const situationBlock = r.situation?.trim()
      ? `<div class="risk-situation">${esc(r.situation)}</div>`
      : '';

    return `
      <div class="theah theah-risk">
        <div class="risk-head"><i class="fas fa-triangle-exclamation"></i> ${L('SVNSEA2E.RiskCardTitle')}</div>
        <div class="risk-body">
          ${nameBlock}
          ${situationBlock}
          ${sceneBlock}
          ${consBlock}
          ${oppsBlock}
          <div class="risk-example"><span class="rx-lbl">${L('SVNSEA2E.RiskExampleTitle')}</span> ${L('SVNSEA2E.RiskExample')}</div>
        </div>
      </div>`;
  }

  async _onPost(event) {
    event.preventDefault();
    this._readForm(this.form);
    const content = this._buildCard(this.risk);
    if (!content) return;
    await postThemedChat({ content });
    ui.notifications.info(game.i18n.localize('SVNSEA2E.RiskPosted'));
  }

  /* -------------------------------------------- */
  /*  Saved-Risk library                          */
  /* -------------------------------------------- */

  /** Save the working Risk to the library (create, or update if it was loaded). */
  async _onSave(event) {
    event.preventDefault();
    this._readForm(this.form);
    if (!this.risk.name?.trim()) {
      return ui.notifications.warn(game.i18n.localize('SVNSEA2E.RiskNeedsName'));
    }
    const list = this._savedRisks().slice();
    const entry = foundry.utils.deepClone(this.risk);
    if (!entry.id) entry.id = foundry.utils.randomID();
    const idx = list.findIndex((r) => r.id === entry.id);
    if (idx >= 0) list[idx] = entry;
    else list.push(entry);
    await this._setSavedRisks(list);
    this.risk.id = entry.id; // keep editing the same entry
    ui.notifications.info(game.i18n.format('SVNSEA2E.RiskSaved', { name: entry.name.trim() }));
    this.render(false);
  }

  /** Start a fresh, empty Risk (does not touch the library). */
  _onNew(event) {
    event.preventDefault();
    this.risk = { id: null, name: '', situation: '', participants: [], consequences: [{ desc: '', cost: 1, time: '' }], opportunities: [] };
    this.render(false);
  }

  /** Load a saved Risk into the form for editing / posting. */
  _onLoadSaved(id) {
    const found = this._savedRisks().find((r) => r.id === id);
    if (!found) return;
    this.risk = foundry.utils.deepClone(found);
    // Backfill fields older saves might lack.
    this.risk.consequences ??= [];
    this.risk.opportunities ??= [];
    this.render(false);
  }

  /** Post a saved Risk straight to chat without loading it into the form. */
  async _onPostSaved(id) {
    const found = this._savedRisks().find((r) => r.id === id);
    if (!found) return;
    const content = this._buildCard(found);
    if (!content) return;
    await postThemedChat({ content });
    ui.notifications.info(game.i18n.localize('SVNSEA2E.RiskPosted'));
  }

  /** Delete a saved Risk from the library (with confirmation). */
  async _onDeleteSaved(id) {
    const found = this._savedRisks().find((r) => r.id === id);
    if (!found) return;
    const ok = await Dialog.confirm({
      title: game.i18n.localize('SVNSEA2E.RiskDelete'),
      content: `<p>${game.i18n.format('SVNSEA2E.RiskDeleteConfirm', { name: found.name || '—' })}</p>`,
    });
    if (!ok) return;
    await this._setSavedRisks(this._savedRisks().filter((r) => r.id !== id));
    if (this.risk.id === id) this.risk.id = null; // it's now an unsaved draft
    this.render(false);
  }

  /** @override */
  async _updateObject() {}
}

/**
 * Open the GM Risk Builder (GM only). Exposed as game.theah.openRiskBuilder().
 */
export function openRiskBuilder() {
  if (!game.user.isGM) {
    return ui.notifications?.warn(game.i18n.localize('SVNSEA2E.GMOnly'));
  }
  new RiskBuilder().render(true);
}
