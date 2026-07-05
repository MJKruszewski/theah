// Build a self-contained preview of the redesigned Hero Creator steps
// (Concept/nation box, Advantages with descriptions, Arcana pick-lists),
// inlining the ACTUAL compiled dist/theah.css over the real markup with real
// compendium data. This is the wizard analogue of tools/build-harness.mjs:
// since Foundry can't be screenshotted here, this lets the user eyeball the
// exact render before reloading.
import { readFileSync, writeFileSync } from 'node:fs';

const ROOT = 'D:/Projects/7sea/theah';
const css = readFileSync(`${ROOT}/dist/theah.css`, 'utf8');
const advs = JSON.parse(readFileSync(`${ROOT}/public/packs-data/advantages.json`, 'utf8'));
const arcana = JSON.parse(readFileSync(`${ROOT}/public/packs-data/arcana.json`, 'utf8'));

const byName = (a, b) => a.name.localeCompare(b.name);
const virtues = arcana.filter((a) => a.type === 'virtue').sort(byName);
const hubris = arcana.filter((a) => a.type === 'hubris').sort(byName);

// A representative slice so the preview shows variety without being enormous.
const advSlice = advs.slice(0, 8);
const virtueSlice = virtues.slice(0, 6);
const hubrisSlice = hubris.slice(0, 6);

const cost = (a) => a.system?.cost?.normal ?? 1;

const advCard = (a, i) =>
  `<div class="wiz-adv${i === 1 ? ' selected' : ''}${i === 0 ? ' is-free' : ''}">
     <div class="adv-head">
       <span class="adv-cost">${cost(a)}</span>
       <span class="adv-name">${a.name}</span>
       ${i === 0 ? '<span class="adv-freebadge">free</span>' : ''}
       ${i === 1 ? '<i class="fas fa-check">✓</i>' : ''}
     </div>
     <div class="adv-desc">${a.system.description || ''}</div>
   </div>`;

const arcCard = (a, kind, sel) =>
  `<div class="arc-pick ${kind}${sel ? ' selected' : ''}">
     <div class="arc-pick-head"><span class="arc-pick-name">${a.name}</span>${sel ? '<i class="fas fa-check">✓</i>' : ''}</div>
     <div class="arc-pick-desc">${a.system.description || ''}</div>
   </div>`;

const steps = (active) =>
  ['Concept', 'Traits', 'Backgrounds', 'Skills', 'Advantages', 'Arcana', 'Review']
    .map(
      (label, i) =>
        `<li class="${i === active ? 'active' : ''} ${i < active ? 'done' : ''}"><span class="wiz-dot">${i + 1}</span>${label}</li>`,
    )
    .join('');

const html = `<style>
  body { margin: 0; background: #2a2622; color: #ddd; font-family: system-ui, sans-serif; }
  .preview-wrap { max-width: 820px; margin: 0 auto; padding: 24px 12px 60px; }
  .preview-label { font: 600 12px/1 ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; color: #b0873f; margin: 34px 4px 10px; }
  .preview-frame { border-radius: 8px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,.45); }
  /* Give the wizard form a bounded window like Foundry's application chrome. */
  .hero-creator-form { display: flex; flex-direction: column; max-height: 640px; background: var(--panel); }
  .hero-creator-form .fas { font-family: inherit; font-style: normal; }
${css}
</style>

<div class="preview-wrap">
  <p style="font:600 13px/1.5 system-ui;color:#cbb98a;margin:0 0 4px">Hero Creator — redesigned steps (paper theme)</p>
  <p style="font:400 12px/1.5 system-ui;color:#8a8378;margin:0">Faithful render: the actual compiled <code>dist/theah.css</code> over the real template markup and compendium data.</p>

  <p class="preview-label">Step 1 — Concept &amp; Nation (card picker)</p>
  <div class="preview-frame"><form class="hero-creator-form theah">
    <ol class="wiz-steps">${steps(0)}</ol>
    <div class="wiz-body">
      <div class="wiz-step">
        <p class="wiz-intro">Who is your Hero? Choose a name, a Nation and a concept. Your Nation shapes your Trait bonus, starting language and which sorcery is open to you.</p>
        <div class="wiz-fields">
          <label class="wiz-field"><span>Name</span><input type="text" value="Amélie de Trélan" /></label>
          <label class="wiz-field"><span>Epithet</span><input type="text" value="the Left-Handed" /></label>
          <label class="wiz-field"><span>Religion</span><input type="text" value="—" /></label>
          <label class="wiz-field wiz-field-wide"><span>Concept</span><textarea rows="3">Disgraced fencer turned spy for the Rose &amp; Cross.</textarea></label>
        </div>
        <div class="wiz-nation-block">
          <div class="wiz-nation-label">Nation <span class="wiz-nation-hint">The +1 applies to one of these Traits after your 2 free points. National sorcery is bought later as an Advantage.</span></div>
          <div class="wiz-nation-grid">
            ${[
              ['Avalon', 'Panache / Resolve', 'Knights of Avalon'],
              ['Castille', 'Finesse / Wits', ''],
              ['Eisen', 'Brawn / Resolve', 'Hexenwerk'],
              ['Montaigne', 'Finesse / Panache', 'Porté', true],
              ['Sarmatia', 'Brawn / Panache', 'Sanderis'],
              ['Ussura', 'Resolve / Wits', "Mother's Touch"],
              ['Vesten', 'Brawn / Wits', ''],
              ['Vodacce', 'Finesse / Resolve', 'Sorte'],
              ['Numa', 'Any Trait (GM\'s discretion)', ''],
            ].map(([n, b, s, sel]) =>
              `<div class="wiz-nation${sel ? ' selected' : ''}"><div class="nn">${n}${sel ? ' <i class="fas fa-check">✓</i>' : ''}</div><div class="nb">+1 ${b}${s ? ` <span class="nsorc">· ${s}</span>` : ''}</div></div>`,
            ).join('')}
          </div>
        </div>
      </div>
    </div>
    <footer class="wiz-nav"><button disabled>‹ Back</button><span class="wiz-count">Step 1 / 7</span><button>Next ›</button></footer>
  </form></div>

  <p class="preview-label">Step 5 — Advantages (each card shows its rules text)</p>
  <div class="preview-frame"><form class="hero-creator-form theah">
    <ol class="wiz-steps">${steps(4)}</ol>
    <div class="wiz-body">
      <div class="wiz-step">
        <p class="wiz-intro">Spend 5 points on Advantages. Backgrounds grant some for free.</p>
        <p class="wiz-budget">Points left: <b>3</b> / 5</p>
        <div class="wiz-adv-list">${advSlice.map(advCard).join('')}</div>
      </div>
    </div>
    <footer class="wiz-nav"><button>‹ Back</button><span class="wiz-count">Step 5 / 7</span><button>Next ›</button></footer>
  </form></div>

  <p class="preview-label">Step 6 — Arcana (descriptions visible upfront, click a card to choose)</p>
  <div class="preview-frame"><form class="hero-creator-form theah">
    <ol class="wiz-steps">${steps(5)}</ol>
    <div class="wiz-body">
      <div class="wiz-step">
        <p class="wiz-intro">Choose one Virtue and one Hubris. They need not share a card.</p>
        <div class="wiz-arcana">
          <div class="arc-col">
            <div class="arc-col-title">Virtue</div>
            <div class="arc-pick-list">${virtueSlice.map((a, i) => arcCard(a, 'virtue', i === 1)).join('')}</div>
          </div>
          <div class="arc-col">
            <div class="arc-col-title">Hubris</div>
            <div class="arc-pick-list">${hubrisSlice.map((a, i) => arcCard(a, 'hubris', i === 2)).join('')}</div>
          </div>
        </div>
      </div>
    </div>
    <footer class="wiz-nav"><button>‹ Back</button><span class="wiz-count">Step 6 / 7</span><button class="finish">✦ Create Hero</button></footer>
  </form></div>
</div>`;

writeFileSync(`${ROOT}/design/hero-creator-preview.html`, html);
console.log('Wrote design/hero-creator-preview.html');
