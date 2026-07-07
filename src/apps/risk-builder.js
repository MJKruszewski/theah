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
      situation: '',
      approach: '',
      consequences: [{ desc: '', cost: 1, time: '' }],
      opportunities: [],
    };
  }

  /** @override */
  render(force = false, options = {}) {
    if (!game.user.isGM) {
      ui.notifications?.warn(game.i18n.localize('SVNSEA2E.GMOnly'));
      return this;
    }
    return super.render(force, options);
  }

  /** @override */
  getData() {
    return { risk: this.risk };
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
  }

  /**
   * Scrape the current form values back into `this.risk` so edits survive a
   * re-render (adding/removing a row) or a post.
   * @param {HTMLElement} root
   * @private
   */
  _readForm(root) {
    this.risk.situation = root.querySelector('[name="situation"]')?.value ?? '';
    this.risk.approach = root.querySelector('[name="approach"]')?.value ?? '';
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

  _onRemoveRow(event) {
    event.preventDefault();
    this._readForm(this.form);
    const kind = event.currentTarget.dataset.kind;
    const i = Number(event.currentTarget.dataset.i);
    const list = kind === 'consequence' ? 'consequences' : 'opportunities';
    this.risk[list].splice(i, 1);
    this.render(false);
  }

  async _onPost(event) {
    event.preventDefault();
    this._readForm(this.form);
    const r = this.risk;
    const cons = r.consequences.filter((c) => c.desc.trim());
    const opps = r.opportunities.filter((o) => o.desc.trim());

    if (!r.situation.trim() && !cons.length) {
      return ui.notifications.warn(game.i18n.localize('SVNSEA2E.RiskNeedsContent'));
    }
    if (!cons.length) {
      return ui.notifications.warn(game.i18n.localize('SVNSEA2E.RiskNoConsequences'));
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
    const situationBlock = r.situation.trim()
      ? `<div class="risk-situation">${esc(r.situation)}</div>`
      : '';
    const approachBlock = r.approach.trim()
      ? `<div class="risk-approach"><span class="ra-lbl" data-tooltip="${L('SVNSEA2E.RiskApproachHint')}">${L('SVNSEA2E.RiskApproach')}:</span> ${esc(r.approach)}</div>`
      : '';

    const content = `
      <div class="theah theah-risk">
        <div class="risk-head"><i class="fas fa-triangle-exclamation"></i> ${L('SVNSEA2E.RiskCardTitle')}</div>
        <div class="risk-body">
          ${situationBlock}
          ${approachBlock}
          ${consBlock}
          ${oppsBlock}
          <div class="risk-example"><span class="rx-lbl">${L('SVNSEA2E.RiskExampleTitle')}</span> ${L('SVNSEA2E.RiskExample')}</div>
        </div>
      </div>`;

    await postThemedChat({ content });
    ui.notifications.info(game.i18n.localize('SVNSEA2E.RiskPosted'));
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
