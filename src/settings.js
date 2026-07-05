/**
 * Attribute stamped on <html> to select the sheet theme. Paper is the default
 * (the `:root` tokens); "sea" is opt-in. Kept in one place so the setting, the
 * apply helper and the in-sheet toggle all agree.
 */
export const THEME_ATTR = 'data-theah-theme';

/**
 * Apply the chosen theme by stamping the attribute on the document root. The
 * CSS reacts live (custom-property cascade) — no sheet re-render needed.
 * @param {string} value  'paper' | 'sea'
 */
export const applyTheahTheme = function (value) {
  const theme = value === 'sea' ? 'sea' : 'paper';
  document.documentElement.setAttribute(THEME_ATTR, theme);
};

export const registerSystemSettings = function () {
  /**
   * Track the system version upon which point a migration was last applied
   */
  game.settings.register('theah', 'systemMigrationVersion', {
    name: 'System Migration Version',
    scope: 'world',
    config: false,
    type: String,
    default: 0,
  });

  /**
   * Highest compendium-seed version applied to this world (see src/packs.js).
   */
  game.settings.register('theah', 'packSeedVersion', {
    scope: 'world',
    config: false,
    type: Number,
    default: 0,
  });

  /**
   * Sheet theme — per client. Paper (aged sea-chart) is the default; "Night at
   * Sea" is the dark variant. Foundry surfaces this in Configure Settings, and
   * the in-sheet toggle flips the same setting.
   */
  game.settings.register('theah', 'theme', {
    name: 'SVNSEA2E.SettingThemeName',
    hint: 'SVNSEA2E.SettingThemeHint',
    scope: 'client',
    config: true,
    type: String,
    choices: {
      paper: 'SVNSEA2E.ThemePaper',
      sea: 'SVNSEA2E.ThemeSea',
    },
    default: 'paper',
    onChange: (value) => applyTheahTheme(value),
  });
};
