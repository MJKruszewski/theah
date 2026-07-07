var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/config.js
var SVNSEA2E = {};
SVNSEA2E.ASCII = `
==================================================
  _____ _   _       ____
 |___  | |_| |__   / ___|  ___  __ _
    / /| __| '_ \\  \\___ \\ / _ \\/ _\` |
   / / | |_| | | |  ___) |  __/ (_| |
  /_/   \\__|_| |_| |____/ \\___|\\__,_|
==================================================`;
SVNSEA2E.itemTypes = {
  advantage: "SVNSEA2E.Advantage",
  artifact: "SVNSEA2E.Artifact",
  background: "SVNSEA2E.Background",
  duelstyle: "SVNSEA2E.DuelStyle",
  monsterquality: "SVNSEA2E.MonsterQuality",
  scheme: "SVNSEA2E.Scheme",
  secretsociety: "SVNSEA2E.SecretSociety",
  shipadventure: "SVNSEA2E.ShipAdventure",
  shipbackground: "SVNSEA2E.ShipBackground",
  sorcery: "SVNSEA2E.Sorcery",
  story: "SVNSEA2E.Story",
  hubris: "SVNSEA2E.Hubris",
  virtue: "SVNSEA2E.Virtue"
};
SVNSEA2E.actorTypes = {
  brute: "SVNSEA2E.Brute",
  playercharacter: "SVNSEA2E.PlayerCharacter",
  monster: "SVNSEA2E.Monster",
  villain: "SVNSEA2E.Villain",
  ship: "SVNSEA2E.Ship",
  hero: "SVNSEA2E.Hero"
};
SVNSEA2E.nations = {
  none: "SVNSEA2E.Empty",
  aksum: "SVNSEA2E.NationAksum",
  anatol: "SVNSEA2E.NationAnatol",
  aragosta: "SVNSEA2E.NationAragosta",
  ashur: "SVNSEA2E.NationAshur",
  avalon: "SVNSEA2E.NationAvalon",
  castille: "SVNSEA2E.NationCastille",
  eisen: "SVNSEA2E.NationEisen",
  highland: "SVNSEA2E.NationHighland",
  inismore: "SVNSEA2E.NationInismore",
  jaragua: "SVNSEA2E.NationJaragua",
  khemet: "SVNSEA2E.NationKhemet",
  kuraq: "SVNSEA2E.NationKuraq",
  labucca: "SVNSEA2E.NationLaBucca",
  maghreb: "SVNSEA2E.NationMaghreb",
  manden: "SVNSEA2E.NationManden",
  mbey: "SVNSEA2E.NationMbey",
  montaigne: "SVNSEA2E.NationMontaigne",
  nahuaca: "SVNSEA2E.NationNahuaca",
  numa: "SVNSEA2E.NationNuma",
  persis: "SVNSEA2E.NationPersis",
  rahuri: "SVNSEA2E.NationRahuri",
  sarmatia: "SVNSEA2E.NationSarmatia",
  sarmion: "SVNSEA2E.NationSarmion",
  tribes: "SVNSEA2E.NationTribes",
  tzakkan: "SVNSEA2E.NationTzakkan",
  ussura: "SVNSEA2E.NationUssura",
  vesten: "SVNSEA2E.NationVesten",
  vodacce: "SVNSEA2E.NationVodacce"
};
SVNSEA2E.languages = {
  amizagh: "SVNSEA2E.LanguageAmizagh",
  awkari: "SVNSEA2E.LanguageAwkari",
  avalon: "SVNSEA2E.LanguageAvalonian",
  aztlani: "SVNSEA2E.LanguageAztlani",
  castille: "SVNSEA2E.LanguageCastillian",
  eisen: "SVNSEA2E.LanguageEisen",
  highland: "SVNSEA2E.LanguageHighlander",
  hylicia: "SVNSEA2E.LanguageHylicia",
  inismore: "SVNSEA2E.LanguageInish",
  jaragua: "SVNSEA2E.LanguageJaragua",
  katabic: "SVNSEA2E.LanguageKatabic",
  mande: "SVNSEA2E.LanguageMande",
  montaigne: "SVNSEA2E.LanguageMontaigne",
  nahuati: "SVNSEA2E.LanguageNahuati",
  njaay: "SVNSEA2E.LanguageNjaay",
  numa: "SVNSEA2E.LanguageNuma",
  persis: "SVNSEA2E.LanguagePersis",
  pirate: "SVNSEA2E.LanguagePirate",
  rahuri: "SVNSEA2E.LanguageRahuri",
  rzeczpospolita: "SVNSEA2E.LanguageRzeczpospolita",
  sarmatia: "SVNSEA2E.LanguageCuronian",
  sarmion: "SVNSEA2E.LanguageDibre",
  sahidic: "SVNSEA2E.LanguageSahidic",
  taiya: "SVNSEA2E.LanguageTaiya",
  thean: "SVNSEA2E.LanguageThean",
  ussura: "SVNSEA2E.LanguageUssurian",
  vesten: "SVNSEA2E.LanguageVesten",
  vodacce: "SVNSEA2E.LanguageVodacce",
  xweda: "SVNSEA2E.LanguageXweda",
  zeeg: "SVNSEA2E.LanguageZeeg"
};
SVNSEA2E.traits = {
  brawn: "SVNSEA2E.TraitBrawn",
  finesse: "SVNSEA2E.TraitFinesse",
  resolve: "SVNSEA2E.TraitResolve",
  wits: "SVNSEA2E.TraitWits",
  panache: "SVNSEA2E.TraitPanache",
  influence: "SVNSEA2E.TraitInfluence",
  strength: "SVNSEA2E.TraitStrength"
};
SVNSEA2E.traitDesc = {
  brawn: "SVNSEA2E.TraitDescBrawn",
  finesse: "SVNSEA2E.TraitDescFinesse",
  resolve: "SVNSEA2E.TraitDescResolve",
  wits: "SVNSEA2E.TraitDescWits",
  panache: "SVNSEA2E.TraitDescPanache",
  influence: "SVNSEA2E.TraitDescInfluence",
  strength: "SVNSEA2E.TraitDescStrength"
};
SVNSEA2E.skills = {
  aim: "SVNSEA2E.SkillAim",
  athletics: "SVNSEA2E.SkillAthletics",
  brawl: "SVNSEA2E.SkillBrawl",
  convince: "SVNSEA2E.SkillConvince",
  empathy: "SVNSEA2E.SkillEmpathy",
  hide: "SVNSEA2E.SkillHide",
  intimidate: "SVNSEA2E.SkillIntimidate",
  notice: "SVNSEA2E.SkillNotice",
  perform: "SVNSEA2E.SkillPerform",
  ride: "SVNSEA2E.SkillRide",
  sailing: "SVNSEA2E.SkillSailing",
  scholarship: "SVNSEA2E.SkillScholarship",
  tempt: "SVNSEA2E.SkillTempt",
  theft: "SVNSEA2E.SkillTheft",
  warfare: "SVNSEA2E.SkillWarfare",
  weaponry: "SVNSEA2E.SkillWeaponry"
};
SVNSEA2E.skillDesc = {
  aim: "SVNSEA2E.SkillDescAim",
  athletics: "SVNSEA2E.SkillDescAthletics",
  brawl: "SVNSEA2E.SkillDescBrawl",
  convince: "SVNSEA2E.SkillDescConvince",
  empathy: "SVNSEA2E.SkillDescEmpathy",
  hide: "SVNSEA2E.SkillDescHide",
  intimidate: "SVNSEA2E.SkillDescIntimidate",
  notice: "SVNSEA2E.SkillDescNotice",
  perform: "SVNSEA2E.SkillDescPerform",
  ride: "SVNSEA2E.SkillDescRide",
  sailing: "SVNSEA2E.SkillDescSailing",
  scholarship: "SVNSEA2E.SkillDescScholarship",
  tempt: "SVNSEA2E.SkillDescTempt",
  theft: "SVNSEA2E.SkillDescTheft",
  warfare: "SVNSEA2E.SkillDescWarfare",
  weaponry: "SVNSEA2E.SkillDescWeaponry"
};
SVNSEA2E.creation = {
  traitStart: 2,
  // every Trait begins at Rank 2
  traitPoints: 2,
  // free points to raise Traits (before the Nation Bonus)
  skillPoints: 10,
  // extra Skill points beyond Backgrounds
  skillCreationCap: 3,
  // no Skill above Rank 3 at creation
  rankCap: 5,
  // universal cap
  advantagePoints: 5,
  // points to buy Advantages
  backgroundsCount: 2,
  // pick two different Backgrounds
  startingHeroPoints: 1,
  baseLanguage: "thean"
  // Old Théan, known by every Hero
};
SVNSEA2E.advancement = {
  traitMax: 5,
  // no Trait above Rank 5
  traitMin: 2,
  // no Trait below Rank 2
  traitTotalCap: 15,
  // at most 15 total Ranks of Traits
  traitIncreaseLifetimeCap: 2,
  // the "increase a Trait" Reward may be taken twice, ever
  skillMax: 5,
  // no Skill above Rank 5
  // Step costs per Reward type. A string means "computed" (see AdvancementCreator).
  stepCost: {
    skillRaise: "newRank",
    // Steps = the new Skill Rank
    traitIncrease: 5,
    traitShift: 4,
    advantage: "cost",
    // Steps = the Advantage's point cost
    arcanaChange: 4,
    quirkChange: 3,
    corruptionRemove: 5
  }
};
SVNSEA2E.nationBonus = {
  avalon: ["panache", "resolve"],
  inismore: ["panache", "wits"],
  highland: ["brawn", "finesse"],
  castille: ["finesse", "wits"],
  eisen: ["brawn", "resolve"],
  montaigne: ["finesse", "panache"],
  sarmatia: ["brawn", "panache"],
  ussura: ["resolve", "wits"],
  vesten: ["brawn", "wits"],
  vodacce: ["finesse", "resolve"]
};
SVNSEA2E.nationSorcery = {
  avalon: "glamour",
  highland: "glamour",
  eisen: "hex",
  montaigne: "porte",
  sarmatia: "sanderis",
  vodacce: "sorte",
  // women Heroes only
  ussura: "darm"
};
SVNSEA2E.storyStatuses = {
  none: "SVNSEA2E.Empty",
  abandoned: "SVNSEA2E.StatusAbandoned",
  complete: "SVNSEA2E.StatusComplete",
  inprogress: "SVNSEA2E.StatusInProgress",
  future: "SVNSEA2E.StatusFuture"
};
SVNSEA2E.sorceryTypes = {
  none: "SVNSEA2E.Empty",
  hex: "SVNSEA2E.SorceryHexenwerk",
  glamour: "SVNSEA2E.SorceryGlamour",
  knight: "SVNSEA2E.SorceryAvalonKnight",
  alquimia: "SVNSEA2E.SorceryAlquimia",
  galdr: "SVNSEA2E.SorceryGaldr",
  darm: "SVNSEA2E.SorceryDarMatushki",
  tura: "SVNSEA2E.SorceryTurasTouch",
  porte: "SVNSEA2E.SorceryPorte",
  sanderis: "SVNSEA2E.SorcerySanderis",
  sorte: "SVNSEA2E.SorcerySorte",
  charter: "SVNSEA2E.SorceryCharter",
  kapsevi: "SVNSEA2E.SorceryKapSevi",
  mystirios: "SVNSEA2E.SorceryMystirios",
  mohwoo: "SVNSEA2E.SorceryMohwoo",
  prophet: "SVNSEA2E.SorceryProphet",
  chozeh: "SVNSEA2E.SorceryChozeh",
  khahesh: "SVNSEA2E.SorceryKhaheshAhura",
  mithaq: "SVNSEA2E.SorceryMithaq",
  nawaru: "SVNSEA2E.SorceryNawaru",
  wayak: "SVNSEA2E.SorceryWayak",
  wanuy: "SVNSEA2E.SorceryWanuy",
  heka: "SVNSEA2E.SorceryHeka",
  melbur: "SVNSEA2E.SorceryMelbur",
  redtouch: "SVNSEA2E.SorceryRedTouch"
};
SVNSEA2E.sorceryDesc = {
  hex: "SVNSEA2E.SorceryDescHex",
  glamour: "SVNSEA2E.SorceryDescGlamour",
  knight: "SVNSEA2E.SorceryDescGlamour",
  porte: "SVNSEA2E.SorceryDescPorte",
  sanderis: "SVNSEA2E.SorceryDescSanderis",
  sorte: "SVNSEA2E.SorceryDescSorte",
  darm: "SVNSEA2E.SorceryDescDarm"
};
SVNSEA2E.durations = {
  none: "SVNSEA2E.Empty",
  scene: "SVNSEA2E.Scene"
};
SVNSEA2E.sorceryCats = {
  none: "SVNSEA2E.Empty",
  ahura: "SVNSEA2E.Ahura",
  ahpulul: "SVNSEA2E.Ahpulul",
  amulet: "SVNSEA2E.Amulet",
  deal: "SVNSEA2E.Deal",
  disruption: "SVNSEA2E.Disruption",
  favor: "SVNSEA2E.Favor",
  gift: "SVNSEA2E.Gift",
  glamour: "SVNSEA2E.Glamour",
  gros: "SVNSEA2E.Gros",
  inscription: "SVNSEA2E.Inscription",
  knight: "SVNSEA2E.Knight",
  manifestation: "SVNSEA2E.Manifestation",
  mark: "SVNSEA2E.Mark",
  miracle: "SVNSEA2E.Miracle",
  path: "SVNSEA2E.Path",
  restriction: "SVNSEA2E.Restriction",
  script: "SVNSEA2E.Script",
  talisman: "SVNSEA2E.Talisman",
  tesse: "SVNSEA2E.Tesse",
  task: "SVNSEA2E.Task",
  thiqa: "SVNSEA2E.Thiqa",
  ti: "SVNSEA2E.Ti",
  turrus: "SVNSEA2E.Turrus",
  turn: "SVNSEA2E.Turn",
  juvenilia: "SVNSEA2E.Juvenilia",
  magnum: "SVNSEA2E.MagnumOpus",
  futhark: "SVNSEA2E.Futhark",
  patron: "SVNSEA2E.Patron",
  unguents: "SVNSEA2E.Unguents"
};
SVNSEA2E.sorcerySubcats = {
  none: "SVNSEA2E.Empty",
  advanced: "SVNSEA2E.Advanced",
  common: "SVNSEA2E.Common",
  baxan: "SVNSEA2E.Baxan",
  major: "SVNSEA2E.Major",
  minor: "SVNSEA2E.Minor",
  pixan: "SVNSEA2E.Pixan",
  rare: "SVNSEA2E.Rare",
  great: "SVNSEA2E.Great",
  small: "SVNSEA2E.Small"
};
SVNSEA2E.crewStatuses = {
  none: "SVNSEA2E.Empty",
  happy: "SVNSEA2E.Happy",
  dissatisfied: "SVNSEA2E.Dissatisfied",
  mutinous: "SVNSEA2E.Mutinous"
};
SVNSEA2E.artifactTypes = {
  deathtoken: "SVNSEA2E.DeathToken",
  syrneth: "SVNSEA2E.Syrneth",
  thiqa: "SVNSEA2E.Thiqa",
  tailsman: "SVNSEA2E.Tailsman",
  inscription: "SVNSEA2E.Inscription",
  mbey: "SVNSEA2E.Mbey",
  wonder: "SVNSEA2E.Wonder",
  tatoo: "SVNSEA2E.Tatoo"
};
SVNSEA2E.shipRoles = {
  captain: "SVNSEA2E.Captain",
  firstmate: "SVNSEA2E.FirstMate",
  quartermaster: "SVNSEA2E.QuaterMaster",
  accountant: "SVNSEA2E.Accountant",
  boatswain: "SVNSEA2E.Boatswain",
  shipsmaster: "SVNSEA2E.ShipsMaster",
  mastergunner: "SVNSEA2E.MasterGunner",
  mastermariner: "SVNSEA2E.MasterMariner",
  captaintops: "SVNSEA2E.CaptainTops",
  cook: "SVNSEA2E.Cook",
  surgeon: "SVNSEA2E.Surgeon",
  midshipmen: "SVNSEA2E.Midshipmen",
  ableseaman: "SVNSEA2E.AbleSeaman",
  seaman: "SVNSEA2E.Seaman"
};
SVNSEA2E.match10 = {
  two: [
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    [5, 5]
  ],
  three: [
    [1, 1, 8],
    [1, 2, 7],
    [1, 3, 6],
    [1, 4, 5],
    [2, 2, 6],
    [2, 3, 5],
    [4, 4, 2],
    [3, 3, 4]
  ]
};
SVNSEA2E.match15 = {
  two: [
    [4, 11],
    [5, 10],
    [6, 9],
    [7, 8]
  ],
  three: [
    [1, 3, 11],
    [1, 4, 10],
    [1, 5, 9],
    [1, 6, 8],
    [1, 7, 7],
    [2, 2, 11],
    [2, 3, 10],
    [2, 4, 9],
    [2, 5, 8],
    [2, 6, 7],
    [3, 3, 9],
    [3, 4, 8],
    [3, 5, 7],
    [6, 6, 3],
    [4, 4, 7],
    [4, 5, 6],
    [5, 5, 5]
  ]
};
SVNSEA2E.match20 = {
  two: [
    [10, 10],
    [11, 9]
  ],
  three: [
    [1, 8, 11],
    [1, 9, 10],
    [2, 9, 9],
    [2, 10, 8],
    [2, 11, 7],
    [3, 6, 11],
    [3, 7, 10],
    [3, 8, 9],
    [4, 5, 11],
    [4, 6, 10],
    [4, 7, 9],
    [4, 8, 8],
    [5, 5, 10],
    [5, 6, 9],
    [5, 7, 8],
    [6, 6, 8],
    [6, 7, 7]
  ]
};

// src/settings.js
var THEME_ATTR = "data-theah-theme";
var applyTheahTheme = function(value) {
  const theme = value === "sea" ? "sea" : "paper";
  document.documentElement.setAttribute(THEME_ATTR, theme);
};
var registerSystemSettings = function() {
  game.settings.register("theah", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: 0
  });
  game.settings.register("theah", "packSeedVersion", {
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });
  game.settings.register("theah", "theme", {
    name: "SVNSEA2E.SettingThemeName",
    hint: "SVNSEA2E.SettingThemeHint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      paper: "SVNSEA2E.ThemePaper",
      sea: "SVNSEA2E.ThemeSea"
    },
    default: "paper",
    onChange: (value) => applyTheahTheme(value)
  });
};

// src/packs.js
var PACK_SEED_VERSION = 6;
var SEED_TARGETS = [
  { pack: "theah.backgrounds", file: "backgrounds" },
  { pack: "theah.advantages", file: "advantages" },
  { pack: "theah.arcana", file: "arcana" },
  { pack: "theah.duelstyles", file: "duelstyles" },
  { pack: "theah.secretsocieties", file: "secretsocieties" },
  { pack: "theah.sorceries", file: "sorceries" }
];
async function loadSeedData(file) {
  try {
    const res = await fetch(`systems/theah/packs-data/${file}.json`);
    if (!res.ok) return null;
    const docs = await res.json();
    return Array.isArray(docs) && docs.length ? docs : null;
  } catch (e) {
    console.warn(`Th\xE9ah | could not load seed data for ${file}`, e);
    return null;
  }
}
async function syncPack(pack, docs, heal) {
  const collection = game.packs.get(pack);
  if (!collection) return { created: 0, updated: 0 };
  const wasLocked = collection.locked;
  if (wasLocked) await collection.configure({ locked: false });
  let created = 0;
  let updated = 0;
  let purged = 0;
  try {
    const cls = CONFIG[collection.metadata.type].documentClass;
    if (heal) {
      const index2 = await collection.getIndex();
      const blankIds = index2.filter((i) => !i.name || !String(i.name).trim()).map((i) => i._id);
      if (blankIds.length) {
        await cls.deleteDocuments(blankIds, { pack });
        purged = blankIds.length;
      }
    }
    const index = await collection.getIndex();
    const existing = new Set(index.map((i) => i._id));
    const toCreate = docs.filter((d) => !existing.has(d._id));
    if (toCreate.length) {
      await cls.createDocuments(toCreate, { pack, keepId: true });
      created = toCreate.length;
    }
    if (heal) {
      const toUpdate = docs.filter((d) => existing.has(d._id)).map((d) => ({ _id: d._id, name: d.name, type: d.type, img: d.img, system: d.system }));
      if (toUpdate.length) {
        await cls.updateDocuments(toUpdate, { pack, diff: false, recursive: false });
        updated = toUpdate.length;
      }
    }
  } catch (e) {
    console.error(`Th\xE9ah | failed seeding ${pack}`, e);
  } finally {
    if (wasLocked) await collection.configure({ locked: true });
  }
  return { created, updated: updated + purged };
}
async function seedCompendia({ force = false } = {}) {
  if (!game.user?.isGM) return;
  const seededVersion = game.settings.get("theah", "packSeedVersion") || 0;
  const corrupt = SEED_TARGETS.some((t) => {
    const c = game.packs.get(t.pack);
    if (!c) return false;
    if (c.index.size === 0) return true;
    return c.index.some((i) => !i.name || !String(i.name).trim());
  });
  const heal = force || seededVersion < PACK_SEED_VERSION || corrupt;
  if (!heal) return;
  let created = 0;
  let updated = 0;
  for (const { pack, file } of SEED_TARGETS) {
    const docs = await loadSeedData(file);
    if (!docs) continue;
    const r = await syncPack(pack, docs, true);
    created += r.created;
    updated += r.updated;
  }
  await game.settings.set("theah", "packSeedVersion", PACK_SEED_VERSION);
  if (created || updated) {
    ui.notifications?.info(
      game.i18n.format("SVNSEA2E.PacksSeeded", { count: created + updated })
    );
    console.log(`Th\xE9ah | seeded ${created} + repaired ${updated} compendium entries.`);
  }
}
async function reseedCompendia() {
  if (!game.user?.isGM) {
    ui.notifications?.warn("Only the GM can reseed the compendia.");
    return;
  }
  await seedCompendia({ force: true });
}

// src/templates.js
var preloadHandlebarsTemplates = async function() {
  const templatePaths = [
    // Actor Sheet Partials
    "systems/theah/templates/actors/parts/actor-name.hbs",
    "systems/theah/templates/actors/parts/actor-traits.hbs",
    "systems/theah/templates/actors/parts/actor-overview.hbs",
    "systems/theah/templates/actors/parts/actor-prowess.hbs",
    "systems/theah/templates/actors/parts/actor-stories.hbs",
    "systems/theah/templates/actors/parts/actor-arcana.hbs",
    "systems/theah/templates/actors/parts/actor-concept.hbs",
    "systems/theah/templates/actors/parts/actor-advantages.hbs",
    "systems/theah/templates/actors/parts/actor-sorcery.hbs",
    "systems/theah/templates/actors/parts/actor-inventory.hbs",
    "systems/theah/templates/actors/parts/actor-fate.hbs",
    "systems/theah/templates/actors/parts/actor-villainy.hbs",
    "systems/theah/templates/actors/parts/actor-vtraits.hbs",
    "systems/theah/templates/actors/parts/actor-wounds.hbs",
    // Item Sheet Partials
    "systems/theah/templates/items/parts/item-header.hbs",
    "systems/theah/templates/items/parts/item-description.hbs",
    // Applications
    "systems/theah/templates/apps/hero-creator.hbs",
    "systems/theah/templates/apps/advancement-creator.hbs"
  ];
  return loadTemplates(templatePaths);
};

// src/helpers.js
var skillsToSheetData = (actorData, CONFIG2) => Object.entries(actorData.skills).map(([s, skill]) => ({
  ...skill,
  name: s,
  label: CONFIG2.SVNSEA2E.skills[s],
  desc: game.i18n.localize(`SVNSEA2E.SkillInfo_${s}`)
})).sort((a, b) => a.label.localeCompare(b.label));
var getItems = (data, type) => data.items.filter((item) => item.type === type);
function postThemedChat({ actor, speaker, content, rolls, sound } = {}) {
  const data = {
    speaker: speaker ?? ChatMessage.getSpeaker(actor ? { actor } : {}),
    content
  };
  if (rolls && rolls.length) data.rolls = rolls;
  if (sound) data.sound = sound;
  ChatMessage.applyRollMode(data, game.settings.get("core", "rollMode"));
  return ChatMessage.create(data);
}
async function getAllPackAdvantages() {
  let itemPacks = game.packs.filter((p) => p.metadata.type === "Item");
  const bar = async (p, i) => {
    return await p.getDocument(i._id);
  };
  const foo = async (p) => {
    const items = await p.getIndex();
    return await Promise.all(
      items.filter((i) => i.type === "advantage").map((i) => bar(p, i))
    );
  };
  let a = await Promise.all(itemPacks.map((p) => foo(p)));
  return a.flatMap((a2) => a2);
}
var GLAMOR_NATIONS = ["highland", "avalon", "insmore"];
var isValidGlamorIsles = (actor) => GLAMOR_NATIONS.includes(actor.system.nation);

// src/enums.js
var ActorType = {
  PLAYER: "playercharacter",
  HERO: "hero",
  VILLAIN: "villain",
  MONSTER: "monster",
  BRUTE: "brute",
  SHIP: "ship",
  DANGERPOINTS: "dangerpts"
};
var ItemTypes = {
  ADVANTAGE: "advantage",
  ARTIFACT: "artifact",
  BACKGROUND: "background",
  DUEL_STYLE: "duelstyle",
  MONSTER_QUALITY: "monsterquality",
  SCHEME: "scheme",
  SECRET_SOCIETY: "secretsociety",
  SHIP_ADVENTURE: "shipadventure",
  SHIP_BACKGROUND: "shipbackground",
  SORCERY: "sorcery",
  STORY: "story",
  VIRTUE: "virtue",
  HUBRIS: "hubris"
};

// src/actor/models/bruteModel.js
var {
  HTMLField,
  SchemaField,
  NumberField,
  StringField
} = foundry.data.fields;
var bruteSchema = {
  wounds: new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    max: new NumberField({ required: true, integer: true, min: 0, initial: 20 })
  }),
  traits: new SchemaField({
    strength: new SchemaField({
      value: new NumberField({ required: true, integer: true, min: 1, initial: 5 }),
      min: new NumberField({ required: true, integer: true, min: 1, initial: 1 }),
      max: new NumberField({ required: true, integer: true, min: 1, initial: 20 })
    })
  }),
  ability: new SchemaField({
    name: new StringField(),
    description: new HTMLField()
  })
};
var BruteModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return bruteSchema;
  }
};

// src/actor/models/dangerPointsModel.js
var {
  NumberField: NumberField2
} = foundry.data.fields;
var dangerPointsSchema = {
  points: new NumberField2({ required: true, integer: true, min: 0, initial: 5 })
};
var DangerPointsModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return dangerPointsSchema;
  }
};

// src/actor/models/shared.js
var {
  HTMLField: HTMLField2,
  SchemaField: SchemaField2,
  NumberField: NumberField3,
  StringField: StringField2,
  ArrayField
} = foundry.data.fields;
var template_schema_base = () => ({
  initiative: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
  wounds: new SchemaField2({
    // Book Death Spiral: 4 Wounds per Dramatic Wound × 4 Dramatic Wounds = 16.
    value: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
    min: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
    max: new NumberField3({ required: true, integer: true, min: 0, initial: 16 })
  }),
  dwounds: new SchemaField2({
    value: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
    min: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
    max: new NumberField3({ required: true, integer: true, min: 0, initial: 4 })
  })
});
var template_schema_details = () => ({
  nation: new StringField2(),
  epithet: new StringField2(),
  religion: new StringField2(),
  age: new NumberField3({ required: true, integer: true, min: 0, initial: 20 }),
  reputation: new StringField2(),
  languages: new ArrayField(new StringField2()),
  equipment: new StringField2(),
  concept: new HTMLField2({ initial: "<h3>Concept</h3><h3>Biography</h3>" })
});
var template_schema_features = () => ({
  traits: new SchemaField2({
    brawn: generateTrait(2),
    finesse: generateTrait(2),
    resolve: generateTrait(2),
    wits: generateTrait(2),
    panache: generateTrait(2)
  }),
  skills: new SchemaField2({
    aim: generateTrait(0),
    athletics: generateTrait(0),
    brawl: generateTrait(0),
    convince: generateTrait(0),
    empathy: generateTrait(0),
    hide: generateTrait(0),
    intimidate: generateTrait(0),
    notice: generateTrait(0),
    perform: generateTrait(0),
    ride: generateTrait(0),
    sailing: generateTrait(0),
    scholarship: generateTrait(0),
    tempt: generateTrait(0),
    theft: generateTrait(0),
    warfare: generateTrait(0),
    weaponry: generateTrait(0)
  })
});
var template_schema_vtraits = () => ({
  traits: new SchemaField2({
    influence: new SchemaField2({
      value: new NumberField3({ required: true, integer: true, min: 0, initial: 5 }),
      min: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
      max: new NumberField3({ required: true, integer: true, min: 0, initial: 20 })
    }),
    strength: new SchemaField2({
      value: new NumberField3({ required: true, integer: true, min: 1, initial: 5 }),
      min: new NumberField3({ required: true, integer: true, min: 1, initial: 1 }),
      max: new NumberField3({ required: true, integer: true, min: 0, initial: 20 })
    })
  })
});
var generateTrait = (initial = 0) => new SchemaField2({
  value: new NumberField3({ required: true, integer: true, min: 0, initial }),
  min: new NumberField3({ required: true, integer: true, min: 0, initial: 0 }),
  max: new NumberField3({ required: true, integer: true, min: 0, initial: 5 })
});

// src/actor/models/heroModel.js
var heroSchema = {
  ...template_schema_base(),
  ...template_schema_details(),
  ...template_schema_features()
};
var HeroModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return heroSchema;
  }
};

// src/actor/models/monsterModel.js
var {
  NumberField: NumberField4,
  SchemaField: SchemaField3
} = foundry.data.fields;
var monsterSchema = {
  ...template_schema_base(),
  ...template_schema_vtraits(),
  fear: generateTrait()
};
var MonsterModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return monsterSchema;
  }
};

// src/actor/models/playerModel.js
var {
  NumberField: NumberField5,
  StringField: StringField3
} = foundry.data.fields;
var playerSchema = {
  ...template_schema_base(),
  ...template_schema_details(),
  ...template_schema_features(),
  wealth: new NumberField5({ required: true, integer: true, min: 0, initial: 0 }),
  heropts: new NumberField5({ required: true, integer: true, min: 0, initial: 0 }),
  vile: new NumberField5({ required: true, integer: true, min: 0, initial: 0 }),
  corruptionpts: new NumberField5({ required: true, integer: true, min: 0, initial: 0 }),
  redemption: new StringField3()
};
var PlayerModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return playerSchema;
  }
};

// src/actor/models/shipModel.js
var {
  NumberField: NumberField6,
  StringField: StringField4,
  HTMLField: HTMLField3
} = foundry.data.fields;
var shipSchema = {
  ...template_schema_base(),
  background: new StringField4(),
  class: new StringField4(),
  cargo: new HTMLField3(),
  origin: new StringField4(),
  crewstatus: new StringField4(),
  wealth: new NumberField6({ required: true, integer: true, min: 0, initial: 0 })
};
var ShipModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipSchema;
  }
};

// src/actor/models/villainModel.js
var {
  StringField: StringField5
} = foundry.data.fields;
var villainSchema = {
  ...template_schema_base(),
  ...template_schema_details(),
  ...template_schema_vtraits(),
  servants: new StringField5()
};
var VillainModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return villainSchema;
  }
};

// src/item/models/shared.js
var {
  HTMLField: HTMLField4,
  StringField: StringField6
} = foundry.data.fields;
var template_schema_base2 = () => ({
  description: new HTMLField4(),
  infosource: new StringField6()
});

// src/item/models/advantageModel.js
var {
  HTMLField: HTMLField5,
  SchemaField: SchemaField4,
  NumberField: NumberField7,
  StringField: StringField7,
  FilePathField,
  ArrayField: ArrayField2,
  BooleanField
} = foundry.data.fields;
var advantageSchema = {
  ...template_schema_base2(),
  cost: new SchemaField4({
    normal: new NumberField7({ initial: 1, required: true }),
    reducecost: new NumberField7()
  }),
  knack: new BooleanField({ initial: false }),
  innate: new BooleanField({ initial: false })
};
var AdvantageModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return advantageSchema;
  }
};

// src/item/models/artifactModel.js
var {
  StringField: StringField8
} = foundry.data.fields;
var artifactSchema = {
  ...template_schema_base2(),
  artifactType: new StringField8()
};
var ArtifactModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return artifactSchema;
  }
};

// src/item/models/backgroundModel.js
var {
  HTMLField: HTMLField6,
  StringField: StringField9,
  ArrayField: ArrayField3
} = foundry.data.fields;
var backgroundSchema = {
  ...template_schema_base2(),
  quirk: new HTMLField6(),
  skills: new ArrayField3(new StringField9()),
  advantages: new ArrayField3(new StringField9()),
  nation: new StringField9()
};
var BackgroundModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return backgroundSchema;
  }
};

// src/item/models/duelStyleModel.js
var {
  HTMLField: HTMLField7
} = foundry.data.fields;
var duelStyleSchema = {
  ...template_schema_base2(),
  bonus: new HTMLField7()
};
var DuelStyleModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return duelStyleSchema;
  }
};

// src/item/models/monsterQualityModel.js
var monsterQualitySchema = {
  ...template_schema_base2()
};
var MonsterQualityModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return monsterQualitySchema;
  }
};

// src/item/models/schemeModel.js
var {
  SchemaField: SchemaField5,
  NumberField: NumberField8
} = foundry.data.fields;
var schemeSchema = {
  ...template_schema_base2(),
  influence: new SchemaField5({
    value: new NumberField8({ required: true, integer: true, min: 0, initial: 0 }),
    min: new NumberField8({ required: true, integer: true, min: 0, initial: 0 }),
    max: new NumberField8({ required: true, integer: true, min: 0, initial: 40 })
  })
};
var SchemeModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return schemeSchema;
  }
};

// src/item/models/shipAdventureModel.js
var shipAdventureSchema = {
  ...template_schema_base2()
};
var ShipAdventureModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipAdventureSchema;
  }
};

// src/item/models/shipBackgroundModel.js
var shipBackgroundSchema = {
  ...template_schema_base2()
};
var ShipBackgroundModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipBackgroundSchema;
  }
};

// src/item/models/virtueModel.js
var {
  HTMLField: HTMLField8,
  SchemaField: SchemaField6,
  NumberField: NumberField9,
  StringField: StringField10,
  FilePathField: FilePathField2,
  ArrayField: ArrayField4,
  BooleanField: BooleanField2
} = foundry.data.fields;
var virtueSchema = {
  ...template_schema_base2()
};
var VirtueModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return virtueSchema;
  }
};

// src/item/models/hubrisModel.js
var hubrisSchema = {
  ...template_schema_base2()
};
var HubrisModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return hubrisSchema;
  }
};

// src/item/models/secretSocietyModel.js
var {
  HTMLField: HTMLField9,
  NumberField: NumberField10
} = foundry.data.fields;
var secretSocietySchema = {
  ...template_schema_base2(),
  concern: new HTMLField9(),
  earnfavor: new HTMLField9(),
  // callupon holds an HTML list (matches system.json htmlFields + the {{editor}}
  // in the item sheet); it was a StringField, which merely happened to work.
  callupon: new HTMLField9(),
  // Favor is a live numeric tally the player earns/spends during play (Core
  // p.259). It was an HTMLField (wrong) — now an integer with a +/- stepper on
  // the sheet. Coerces cleanly from the old "0" string on load.
  favor: new NumberField10({ required: true, nullable: false, integer: true, initial: 0, min: 0 })
};
var SecretSocietyModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return secretSocietySchema;
  }
};

// src/item/models/sorceryModel.js
var {
  StringField: StringField11
} = foundry.data.fields;
var sorcerySchema = {
  ...template_schema_base2(),
  sorctype: new StringField11(),
  sorcdur: new StringField11(),
  sorccat: new StringField11(),
  sorcsubcat: new StringField11()
};
var SorceryModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return sorcerySchema;
  }
};

// src/item/models/storyModel.js
var {
  HTMLField: HTMLField10,
  StringField: StringField12,
  NumberField: NumberField11,
  BooleanField: BooleanField3,
  SchemaField: SchemaField7
} = foundry.data.fields;
var storySchema = {
  ...template_schema_base2(),
  reward: new HTMLField10(),
  endings: new HTMLField10(),
  steps: new HTMLField10(),
  status: new StringField12({ initial: "current" }),
  // Structured advancement metadata written by the Advancement Creator. When
  // `active` is false the Story behaves like a plain free-text Story (backward
  // compatible with hand-made and seeded Stories). Book: Core Rulebook, "Making
  // a Hero" Step 7 (Stories) & "Rewarding the Journey", pp.159-160.
  advancement: new SchemaField7({
    active: new BooleanField3({ initial: false }),
    type: new StringField12({ initial: "" }),
    // skillRaise|traitIncrease|traitShift|advantage|arcanaChange|quirkChange|corruptionRemove
    targetKey: new StringField12({ initial: "" }),
    // skill/trait key, arcana slot, or background id
    targetKey2: new StringField12({ initial: "" }),
    // second trait (shift: lowered)
    targetName: new StringField12({ initial: "" }),
    // advantage/arcana name, or new quirk text
    targetUuid: new StringField12({ initial: "" }),
    // compendium source uuid for advantage/arcana
    newRank: new NumberField11({ initial: 0, integer: true, min: 0 }),
    stepsTotal: new NumberField11({ initial: 0, integer: true, min: 0 }),
    stepsDone: new NumberField11({ initial: 0, integer: true, min: 0 }),
    applied: new BooleanField3({ initial: false })
  })
};
var StoryModel = class extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return storySchema;
  }
};

// src/actor/actor.js
var SvnSea2EActor = class extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
    const actorData = this.system;
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
    actorData.villainy = parseInt(actorData.traits.strength.value) + parseInt(actorData.traits.influence.value);
    actorData.wounds.max = parseInt(actorData.traits.strength.value + 1) * actorData.dwounds.max;
    actorData.wounds.value = this._validateMinMaxData(
      actorData.wounds.value,
      actorData.wounds.min,
      actorData.wounds.max
    );
  }
  /**
   * Prepare Brute type specific data
   */
  _prepareBruteData(actorData) {
    actorData.traits.strength.value = this._validateMinMaxData(
      actorData.traits.strength.value,
      actorData.traits.strength.min,
      actorData.traits.strength.max
    );
    actorData.wounds.max = actorData.traits.strength.value;
    if (parseInt(actorData.wounds.max) < parseInt(actorData.wounds.value)) {
      actorData.wounds.value = actorData.wounds.max;
    }
  }
  /**
   * Prepare Ship type specific data
   */
  _prepareShipData(actorData) {
  }
  /**
   * Remove a member from the crew
   */
  async removeFromCrew() {
    await this.unsetFlag("theah", "crewMember");
  }
  /**
   * Set a crew member's role
   */
  async setCrewMemberRole(shipId, role) {
    return this.setFlag("theah", "crewMember", {
      shipId,
      role
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
      actorData.wounds.max
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
    const w = foundry.utils.getProperty(changed, "system.wounds.value");
    const d = foundry.utils.getProperty(changed, "system.dwounds.value");
    if (w !== void 0 || d !== void 0) {
      options.theahPriorWounds = {
        w: this.system.wounds?.value ?? 0,
        d: this.system.dwounds?.value ?? 0
      };
    }
    const c = foundry.utils.getProperty(changed, "system.corruptionpts");
    if (c !== void 0) {
      options.theahPriorCorruption = this.system.corruptionpts ?? 0;
    }
  }
  /** @override */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    if (userId === game.user.id && !options.theahSilent) {
      if (options.theahPriorWounds) {
        this._reactToWoundChange(options.theahPriorWounds);
      }
      if (options.theahPriorCorruption !== void 0) {
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
    const L = (k, data) => data ? game.i18n.format(k, data) : game.i18n.localize(k);
    const name = this.name;
    const gained = delta > 0;
    const headline = gained ? L("SVNSEA2E.CorruptionGains", { name, n: delta }) : L("SVNSEA2E.CorruptionSheds", { name, n: -delta });
    const note = newC > 0 ? L("SVNSEA2E.CorruptionRisk", { n: newC }) : L("SVNSEA2E.CorruptionClean", { name });
    const content = `
      <div class="theah theah-corruption${gained ? " severe" : ""}">
        <div class="corr-head"><i class="fas ${gained ? "fa-skull" : "fa-dove"}"></i> ${headline}</div>
        <div class="corr-body">
          <div class="corr-stats"><span class="cs"><b>${newC}</b>/${cMax} ${L("SVNSEA2E.Corruption")}</span></div>
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
    const L = (k, data) => data ? game.i18n.format(k, data) : game.i18n.localize(k);
    const name = this.name;
    const dwEffects = [
      "",
      "SVNSEA2E.DwEffect1",
      "SVNSEA2E.DwEffect2",
      "SVNSEA2E.DwEffect3",
      "SVNSEA2E.DwEffect4"
    ];
    let headline;
    let severe = false;
    let icon = "fa-droplet";
    if (dD > 0) {
      severe = true;
      icon = "fa-heart-crack";
      headline = newD >= dMax ? L("SVNSEA2E.WoundHelpless", { name }) : L("SVNSEA2E.DramaticSuffers", { name });
    } else if (dD < 0) {
      icon = "fa-heart";
      headline = L("SVNSEA2E.DramaticHeals", { name });
    } else if (dW > 0) {
      headline = L("SVNSEA2E.WoundTakes", { name, n: dW, s: dW === 1 ? "" : "s" });
    } else {
      icon = "fa-heart";
      headline = L("SVNSEA2E.WoundRecovers", { name });
    }
    const effectKey = dwEffects[Math.min(newD, dMax)];
    const effect = newD > 0 && effectKey ? game.i18n.localize(effectKey) : "";
    const dwLine = dMax > 0 ? `<span class="ws dw"><b>${newD}</b>/${dMax} ${L("SVNSEA2E.DramaticWounds")}</span>` : "";
    const content = `
      <div class="theah theah-wound${severe ? " severe" : ""}">
        <div class="wound-head"><i class="fas ${icon}"></i> ${headline}</div>
        <div class="wound-body">
          <div class="wound-stats">
            <span class="ws"><b>${newW}</b>/${wMax} ${L("SVNSEA2E.Wounds")}</span>
            ${dwLine}
          </div>
          ${effect ? `<div class="wound-effect">${effect}</div>` : ""}
        </div>
      </div>`;
    await postThemedChat({ actor: this, content });
    if (dD !== 0 && typeof this.toggleStatusEffect === "function") {
      try {
        await this.toggleStatusEffect("unconscious", { active: newD >= dMax });
      } catch (e) {
      }
    }
  }
};

// src/apps/language-selector.js
var LanguageSelector = class extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "language-selector",
      classes: ["theah"],
      title: game.i18n.localize("SVNSEA2E.ActorLangSelect"),
      template: "systems/theah/templates/apps/language-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const langs = this.object.system.languages;
    const choices = foundry.utils.duplicate(this.options.choices);
    for (const [k, v] of Object.entries(choices)) {
      choices[k] = {
        label: v,
        chosen: langs ? langs.includes(k) : false
      };
    }
    return {
      choices
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(event, formData) {
    const updateData = {};
    const chosen = [];
    for (const [k, v] of Object.entries(formData)) {
      if (v) {
        chosen.push(k);
      }
    }
    updateData["system.languages"] = chosen;
    if (this.options.minimum && chosen.length < this.options.minimum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    }
    if (this.options.maximum && chosen.length > this.options.maximum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    }
    this.object.update(updateData);
  }
};

// src/apps/hero-creator.js
var HeroCreator = class extends FormApplication {
  constructor(actor, options = {}) {
    super(actor, options);
    this.actor = actor;
    this._step = 0;
    this._catalog = null;
    this._wizard = {
      name: actor.name && actor.name !== "New Actor" ? actor.name : "",
      epithet: actor.system.epithet || "",
      concept: "",
      nation: actor.system.nation || "none",
      religion: actor.system.religion || "",
      age: actor.system.age || "",
      traitAlloc: { brawn: 0, finesse: 0, resolve: 0, wits: 0, panache: 0 },
      nationBonusTrait: null,
      backgrounds: [],
      // compendium ids (max 2)
      skillAlloc: {},
      // skill key -> allocated points
      advantages: [],
      // compendium ids (purchased)
      virtueId: null,
      hubrisId: null,
      duelStyleId: null,
      // compendium id (chosen when Duelist Academy is bought)
      societyId: null
      // compendium id (optional single Secret Society, or null)
    };
  }
  static get STEPS() {
    return [
      { key: "concept", label: "SVNSEA2E.WizConcept" },
      { key: "traits", label: "SVNSEA2E.Traits" },
      { key: "backgrounds", label: "SVNSEA2E.Backgrounds" },
      { key: "skills", label: "SVNSEA2E.Skills" },
      { key: "advantages", label: "SVNSEA2E.Advantages" },
      { key: "arcana", label: "SVNSEA2E.Arcana" },
      { key: "prowess", label: "SVNSEA2E.WizProwess" },
      { key: "review", label: "SVNSEA2E.WizReview" }
    ];
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "hero-creator"],
      template: "systems/theah/templates/apps/hero-creator.hbs",
      width: 760,
      height: 720,
      resizable: true,
      submitOnChange: false,
      submitOnClose: false,
      closeOnSubmit: false
    });
  }
  /** @override */
  get title() {
    return game.i18n.localize("SVNSEA2E.HeroCreator");
  }
  /* -------------------------------------------- */
  /*  Catalog                                     */
  /* -------------------------------------------- */
  async _loadCatalog() {
    if (this._catalog) return this._catalog;
    const backgrounds = await this._loadPack("theah.backgrounds", "backgrounds");
    const advantages = await this._loadPack("theah.advantages", "advantages");
    const arcana = await this._loadPack("theah.arcana", "arcana");
    const duelstyles = await this._loadPack("theah.duelstyles", "duelstyles");
    const secretsocieties = await this._loadPack("theah.secretsocieties", "secretsocieties");
    const byName = (a, b) => (a.name || "").localeCompare(b.name || "");
    this._catalog = {
      backgrounds: backgrounds.sort(byName),
      advantages: advantages.sort(byName),
      virtues: arcana.filter((i) => i.type === "virtue").sort(byName),
      hubris: arcana.filter((i) => i.type === "hubris").sort(byName),
      duelstyles: duelstyles.sort(byName),
      secretsocieties: secretsocieties.sort(byName)
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
    console.warn(`Th\xE9ah | compendium "${packId}" empty or corrupt \u2014 loading shipped ${file}.json instead.`);
    try {
      const res = await fetch(`systems/theah/packs-data/${file}.json`);
      if (res.ok) {
        const shipped = await res.json();
        if (Array.isArray(shipped) && shipped.length) return shipped;
      }
    } catch (e) {
      console.error(`Th\xE9ah | failed loading shipped ${file}.json`, e);
    }
    return docs;
  }
  /* -------------------------------------------- */
  /*  Derived rules                               */
  /* -------------------------------------------- */
  /** Selected background objects, in pick order. */
  _selectedBackgrounds() {
    return this._wizard.backgrounds.map((id) => this._catalog.backgrounds.find((b) => b._id === id)).filter(Boolean);
  }
  /** Skill map: { key: { label, bg, alloc, final } } — bg from Backgrounds, alloc from the 10 points. */
  _derivedSkills() {
    const out = {};
    for (const [key, label] of Object.entries(CONFIG.SVNSEA2E.skills)) {
      out[key] = { label, bg: 0, alloc: this._wizard.skillAlloc[key] || 0 };
    }
    for (const bg of this._selectedBackgrounds()) {
      for (const sk of bg.system.skills || []) {
        if (out[sk]) out[sk].bg += 1;
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
    return this._wizard.advantages.map((id) => this._catalog.advantages.find((a) => a._id === id)).filter(Boolean).reduce((sum, a) => sum + this._advantageCost(a), 0);
  }
  /** Free Advantage names granted by the chosen Backgrounds (deduplicated). */
  _freeAdvantageNames() {
    const names = /* @__PURE__ */ new Set();
    for (const bg of this._selectedBackgrounds()) {
      for (const name of bg.system.advantages || []) names.add(name);
    }
    return [...names];
  }
  /**
   * Dueling Styles are learned by purchasing the Duelist Academy Advantage
   * (Core p.154 / p.234). The wizard offers a Style pick when that Advantage is
   * bought (purchased, or granted free by a Background).
   * @returns {boolean}
   */
  _hasDuelistAcademy() {
    const names = new Set(this._freeAdvantageNames());
    for (const id of this._wizard.advantages) {
      const adv = this._catalog.advantages.find((a) => a._id === id);
      if (adv) names.add(adv.name);
    }
    return names.has("Duelist Academy");
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
  /**
   * The national bloodline Sorcery granted by the chosen Nation, if any
   * (Eisen → Hexenwerk, Montaigne → Porté, …). Null for nations without a
   * core sorcery.
   * @returns {{key: string, label: string}|null}
   */
  _bloodlineSorcery() {
    const C = CONFIG.SVNSEA2E;
    const key = C.nationSorcery[this._wizard.nation];
    if (!key) return null;
    return { key, label: game.i18n.localize(C.sorceryTypes[key] || key) };
  }
  /** Display name for an advantage — the generic "Sorcery" advantage is labelled
   *  with the hero's national bloodline so it reads e.g. "Sorcery (Hexenwerk)". */
  _advDisplayName(name) {
    if (name !== "Sorcery") return name;
    const b = this._bloodlineSorcery();
    return b ? `${name} (${b.label})` : name;
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
      done: i < this._step
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
      religions: null
    };
    const L = (s) => game.i18n.localize(s);
    data.nationCards = Object.entries(C.nations).filter(([key]) => key !== "none").map(([key, label]) => {
      const bonusKeys = C.nationBonus[key] || [];
      const sorcKey = C.nationSorcery[key];
      return {
        key,
        label: L(label),
        // Per-trait chips so hovering "Panache" shows Panache's blurb, etc.
        bonusList: bonusKeys.map((k) => ({ label: L(C.traits[k]), tip: L(C.traitDesc[k] || "") })),
        anyTrait: bonusKeys.length ? "" : L("SVNSEA2E.WizAnyTrait"),
        sorcery: sorcKey ? L(C.sorceryTypes[sorcKey] || sorcKey) : "",
        sorceryTip: sorcKey ? L(C.sorceryDesc[sorcKey] || "") : "",
        selected: this._wizard.nation === key
      };
    }).sort((a, b) => a.label.localeCompare(b.label));
    const bonusChoices = C.nationBonus[this._wizard.nation] || Object.keys(C.traits).filter((t) => !["influence", "strength"].includes(t));
    data.traits = ["brawn", "finesse", "resolve", "wits", "panache"].map((key) => ({
      key,
      label: C.traits[key],
      tip: L(C.traitDesc[key] || ""),
      alloc: this._wizard.traitAlloc[key] || 0,
      bonus: this._wizard.nationBonusTrait === key,
      canBonus: bonusChoices.includes(key),
      final: this._traitFinal(key)
    }));
    data.traitPointsSpent = this._traitPointsSpent();
    data.traitPointsTotal = C.creation.traitPoints;
    data.traitPointsLeft = C.creation.traitPoints - this._traitPointsSpent();
    data.nationBonusTrait = this._wizard.nationBonusTrait;
    data.backgroundList = this._catalog.backgrounds.map((b) => ({
      id: b._id,
      name: b.name,
      selected: this._wizard.backgrounds.includes(b._id),
      skills: (b.system.skills || []).map((s) => C.skills[s] || s).join(", "),
      advantages: (b.system.advantages || []).join(", "),
      quirk: foundry.utils.getProperty(b, "system.quirk") || "",
      description: b.system.description || ""
    }));
    data.backgroundsPicked = this._wizard.backgrounds.length;
    data.backgroundsNeeded = C.creation.backgroundsCount;
    const skills = this._derivedSkills();
    data.skills = Object.entries(skills).map(([key, v]) => ({
      key,
      label: v.label,
      tip: L(C.skillDesc[key] || ""),
      bg: v.bg,
      alloc: v.alloc,
      final: v.final,
      atCap: v.final >= C.creation.skillCreationCap
    }));
    data.skillPointsTotal = C.creation.skillPoints;
    data.skillPointsSpent = this._skillPointsSpent();
    data.skillPointsLeft = C.creation.skillPoints - this._skillPointsSpent();
    data.skillCap = C.creation.skillCreationCap;
    data.freeAdvantages = this._freeAdvantageNames();
    data.advantageList = this._catalog.advantages.map((a) => ({
      id: a._id,
      name: this._advDisplayName(a.name),
      cost: this._advantageCost(a),
      selected: this._wizard.advantages.includes(a._id),
      free: data.freeAdvantages.includes(a.name),
      description: a.system.description || ""
    }));
    data.advPointsTotal = C.creation.advantagePoints;
    data.advPointsSpent = this._advantageSpent();
    data.advPointsLeft = C.creation.advantagePoints - this._advantageSpent();
    data.virtues = this._catalog.virtues.map((v) => ({
      id: v._id,
      name: v.name,
      selected: this._wizard.virtueId === v._id,
      description: v.system.description || ""
    }));
    data.hubris = this._catalog.hubris.map((h) => ({
      id: h._id,
      name: h.name,
      selected: this._wizard.hubrisId === h._id,
      description: h.system.description || ""
    }));
    data.hasDuelistAcademy = this._hasDuelistAcademy();
    data.duelstyleList = (this._catalog.duelstyles || []).map((d) => ({
      id: d._id,
      name: d.name,
      selected: this._wizard.duelStyleId === d._id,
      description: d.system.bonus || d.system.description || ""
    }));
    data.societyList = (this._catalog.secretsocieties || []).map((s) => ({
      id: s._id,
      name: s.name,
      selected: this._wizard.societyId === s._id,
      description: s.system.concern || s.system.description || ""
    }));
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
    const purchased = this._wizard.advantages.map((id) => this._catalog.advantages.find((a) => a._id === id)).filter(Boolean).map((a) => this._advDisplayName(a.name));
    const duelStyle = this._hasDuelistAcademy() ? (this._catalog.duelstyles || []).find((d) => d._id === this._wizard.duelStyleId) : null;
    const society = (this._catalog.secretsocieties || []).find((s) => s._id === this._wizard.societyId);
    return {
      name: this._wizard.name,
      nation: game.i18n.localize(C.nations[this._wizard.nation] || ""),
      traits: ["brawn", "finesse", "resolve", "wits", "panache"].map((k) => ({ label: C.traits[k], value: this._traitFinal(k) })),
      skills: Object.entries(skills).filter(([, v]) => v.final > 0).map(([k, v]) => ({ label: v.label, value: v.final })),
      backgrounds: this._selectedBackgrounds().map((b) => b.name),
      freeAdvantages: this._freeAdvantageNames().map((n) => this._advDisplayName(n)),
      purchased,
      virtue: virtue?.name,
      hubris: hubris?.name,
      duelStyle: duelStyle?.name,
      society: society?.name,
      languages: langs,
      heroPoints: C.creation.startingHeroPoints
    };
  }
  /* -------------------------------------------- */
  /*  Listeners                                   */
  /* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const root = html[0] ?? html;
    root.querySelectorAll("[data-state]").forEach((el) => {
      el.addEventListener("change", (ev) => {
        this._wizard[ev.currentTarget.dataset.state] = ev.currentTarget.value;
      });
    });
    root.querySelectorAll("[data-nation-pick]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        this._readConceptInputs();
        this._wizard.nation = ev.currentTarget.dataset.nationPick;
        this._wizard.nationBonusTrait = null;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-trait-inc]").forEach(
      (el) => el.addEventListener("click", (ev) => this._allocTrait(ev.currentTarget.dataset.traitInc, 1))
    );
    root.querySelectorAll("[data-trait-dec]").forEach(
      (el) => el.addEventListener("click", (ev) => this._allocTrait(ev.currentTarget.dataset.traitDec, -1))
    );
    root.querySelectorAll("[data-bonus-trait]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        this._wizard.nationBonusTrait = ev.currentTarget.dataset.bonusTrait;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-bg-toggle]").forEach(
      (el) => el.addEventListener("click", (ev) => this._toggleBackground(ev.currentTarget.dataset.bgToggle))
    );
    root.querySelectorAll("[data-skill-inc]").forEach(
      (el) => el.addEventListener("click", (ev) => this._allocSkill(ev.currentTarget.dataset.skillInc, 1))
    );
    root.querySelectorAll("[data-skill-dec]").forEach(
      (el) => el.addEventListener("click", (ev) => this._allocSkill(ev.currentTarget.dataset.skillDec, -1))
    );
    root.querySelectorAll("[data-pick-perk]").forEach(
      (el) => el.addEventListener("click", (ev) => this._toggleAdvantage(ev.currentTarget.dataset.pickPerk))
    );
    root.querySelectorAll("[data-arcana-pick]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        const field = ev.currentTarget.dataset.arcanaPick;
        const id = ev.currentTarget.dataset.arcId;
        this._wizard[field] = this._wizard[field] === id ? null : id;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-duelstyle-pick]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        const id = ev.currentTarget.dataset.duelstylePick;
        this._wizard.duelStyleId = this._wizard.duelStyleId === id ? null : id;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-society-pick]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        const id = ev.currentTarget.dataset.societyPick;
        this._wizard.societyId = this._wizard.societyId === id ? null : id;
        this.render(false);
      })
    );
    root.querySelector('[data-nav="back"]')?.addEventListener("click", () => this._nav(-1));
    root.querySelector('[data-nav="next"]')?.addEventListener("click", () => this._nav(1));
    root.querySelector('[data-nav="finish"]')?.addEventListener("click", () => this._finish());
  }
  _readConceptInputs() {
    const root = this.element[0] ?? this.element;
    for (const el of root.querySelectorAll("[data-state]")) {
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
    else return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizTwoBackgrounds"));
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
        return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizAdvBudget"));
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
      case "concept":
        if (!this._wizard.name?.trim()) return L("SVNSEA2E.WizNeedName");
        if (!this._wizard.nation || this._wizard.nation === "none") return L("SVNSEA2E.WizNeedNation");
        break;
      case "traits":
        if (this._traitPointsSpent() !== C.traitPoints) return L("SVNSEA2E.WizSpendTraits");
        if (!this._wizard.nationBonusTrait) return L("SVNSEA2E.WizNeedBonus");
        break;
      case "backgrounds":
        if (this._wizard.backgrounds.length !== C.backgroundsCount) return L("SVNSEA2E.WizTwoBackgrounds");
        break;
      case "skills":
        if (this._skillPointsSpent() !== C.skillPoints) return L("SVNSEA2E.WizSpendSkills");
        break;
      case "arcana":
        if (!this._wizard.virtueId || !this._wizard.hubrisId) return L("SVNSEA2E.WizNeedArcana");
        break;
      case "prowess":
        if (this._hasDuelistAcademy() && !this._wizard.duelStyleId) return L("SVNSEA2E.WizNeedDuelStyle");
        break;
    }
    return null;
  }
  /* -------------------------------------------- */
  /*  Apply                                        */
  /* -------------------------------------------- */
  async _finish() {
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
    const traits = {};
    for (const k of ["brawn", "finesse", "resolve", "wits", "panache"]) {
      traits[`system.traits.${k}.value`] = this._traitFinal(k);
    }
    const skills = this._derivedSkills();
    const skillUpdate = {};
    for (const [k, v] of Object.entries(skills)) skillUpdate[`system.skills.${k}.value`] = Math.min(v.final, cr.rankCap);
    const native = this._nativeLanguage();
    const languages = [...new Set([cr.baseLanguage, native].filter(Boolean))];
    await this.actor.update({
      name: this._wizard.name.trim(),
      "system.epithet": this._wizard.epithet?.trim() || "",
      "system.nation": this._wizard.nation,
      "system.religion": this._wizard.religion?.trim() || "",
      "system.age": this._wizard.age?.trim() || "",
      "system.concept": this._wizard.concept || "",
      "system.heropts": cr.startingHeroPoints,
      "system.wealth": 0,
      "system.reputation": "",
      "system.languages": languages,
      ...traits,
      ...skillUpdate
    });
    const toCreate = [];
    const seenAdvNames = /* @__PURE__ */ new Set();
    for (const bg of this._selectedBackgrounds()) {
      const obj = foundry.utils.deepClone(bg);
      delete obj._id;
      toCreate.push(obj);
    }
    const advByName = new Map(this._catalog.advantages.map((a) => [a.name, a]));
    const blood = this._bloodlineSorcery();
    const grant = (adv) => {
      if (!adv || seenAdvNames.has(adv.name)) return;
      seenAdvNames.add(adv.name);
      const obj = foundry.utils.deepClone(adv);
      delete obj._id;
      if (adv.name === "Sorcery" && blood) {
        obj.name = `${adv.name} (${blood.label})`;
        obj.system = obj.system || {};
        obj.system.description = `<p><em>${game.i18n.localize("SVNSEA2E.WizBloodline")}: ${blood.label}.</em></p>` + (obj.system.description || "");
        obj.flags = foundry.utils.mergeObject(obj.flags || {}, { theah: { sorctype: blood.key } });
      }
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
    const duelStyle = this._hasDuelistAcademy() ? (this._catalog.duelstyles || []).find((d) => d._id === this._wizard.duelStyleId) : null;
    const society = (this._catalog.secretsocieties || []).find((s) => s._id === this._wizard.societyId);
    for (const it of [duelStyle, society]) {
      if (!it) continue;
      const obj = foundry.utils.deepClone(it);
      delete obj._id;
      toCreate.push(obj);
    }
    if (toCreate.length) await this.actor.createEmbeddedDocuments("Item", toCreate);
    ui.notifications.info(game.i18n.format("SVNSEA2E.WizDone", { name: this._wizard.name.trim() }));
    await this.close();
    this.actor.sheet?.render(true);
  }
  /** FormApplication requires this; the wizard applies via _finish() instead. */
  async _updateObject() {
  }
};
async function openHeroCreator(actor) {
  if (actor?.type !== ActorType.PLAYER) {
    return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizPlayerOnly"));
  }
  if (!game.packs.get("theah.backgrounds")) {
    return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizNoCompendia"));
  }
  try {
    await new HeroCreator(actor).render(true);
  } catch (err) {
    console.error("Th\xE9ah | Hero Creator failed to open", err);
    ui.notifications.error(game.i18n.localize("SVNSEA2E.WizOpenFailed"));
  }
}

// src/apps/advancement-creator.js
var TRAITS = ["brawn", "finesse", "resolve", "wits", "panache"];
var esc = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
);
var AdvancementCreator = class extends FormApplication {
  constructor(actor, options = {}) {
    super(actor, options);
    this.actor = actor;
    this._step = 0;
    this._catalog = null;
    this._wizard = {
      reward: "",
      // reward type key
      skill: "",
      // skillRaise
      trait: "",
      // traitIncrease / traitShift (raised)
      traitDown: "",
      // traitShift (lowered)
      advId: "",
      // advantage compendium id
      arcanaSlot: "virtue",
      // arcanaChange: 'virtue' | 'hubris'
      arcanaId: "",
      // arcanaChange: new arcana compendium id
      bgId: "",
      // quirkChange: which Background item
      quirk: "",
      // quirkChange: new Quirk text
      name: "",
      // Story name / mantra
      goal: "",
      // the ending (Goal)
      firstStep: ""
      // the first Step
    };
  }
  static get STEPS() {
    return [
      { key: "reward", label: "SVNSEA2E.AdvStepReward" },
      { key: "configure", label: "SVNSEA2E.AdvStepConfigure" },
      { key: "story", label: "SVNSEA2E.AdvStepStory" },
      { key: "review", label: "SVNSEA2E.WizReview" }
    ];
  }
  /** The eight Reward types, in book order (Sorcery is gained as the Sorcery Advantage). */
  static get REWARDS() {
    return [
      { key: "skillRaise", icon: "fa-bullseye" },
      { key: "traitIncrease", icon: "fa-arrow-up-wide-short" },
      { key: "traitShift", icon: "fa-right-left" },
      { key: "advantage", icon: "fa-medal" },
      { key: "arcanaChange", icon: "fa-star-half-stroke" },
      { key: "quirkChange", icon: "fa-masks-theater" },
      { key: "corruptionRemove", icon: "fa-hand-holding-heart" }
    ];
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "advancement-creator"],
      template: "systems/theah/templates/apps/advancement-creator.hbs",
      width: 720,
      height: 680,
      resizable: true,
      submitOnChange: false,
      submitOnClose: false,
      closeOnSubmit: false
    });
  }
  /** @override */
  get title() {
    return game.i18n.localize("SVNSEA2E.AdvCreator");
  }
  /* -------------------------------------------- */
  /*  Catalog                                     */
  /* -------------------------------------------- */
  async _loadCatalog() {
    if (this._catalog) return this._catalog;
    const advantages = await this._loadPack("theah.advantages", "advantages");
    const arcana = await this._loadPack("theah.arcana", "arcana");
    const byName = (a, b) => (a.name || "").localeCompare(b.name || "");
    this._catalog = {
      advantages: advantages.sort(byName),
      virtues: arcana.filter((i) => i.type === "virtue").sort(byName),
      hubris: arcana.filter((i) => i.type === "hubris").sort(byName)
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
    console.warn(`Th\xE9ah | compendium "${packId}" empty or corrupt \u2014 loading shipped ${file}.json instead.`);
    try {
      const res = await fetch(`systems/theah/packs-data/${file}.json`);
      if (res.ok) {
        const shipped = await res.json();
        if (Array.isArray(shipped) && shipped.length) return shipped;
      }
    } catch (e) {
      console.error(`Th\xE9ah | failed loading shipped ${file}.json`, e);
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
      (i) => i.type === "story" && i.system?.advancement?.type === "traitIncrease" && i.system?.advancement?.applied
    ).length;
  }
  _corruption() {
    return this.actor.system.corruptionpts ?? 0;
  }
  _backgrounds() {
    return this.actor.items.filter((i) => i.type === "background");
  }
  _ownsAdvantage(name) {
    return this.actor.items.some(
      (i) => i.type === "advantage" && i.name?.toLowerCase() === name?.toLowerCase()
    );
  }
  _advById(id) {
    return this._catalog?.advantages.find((a) => a._id === id) || null;
  }
  _arcById(id) {
    const list = this._wizard.arcanaSlot === "hubris" ? this._catalog?.hubris : this._catalog?.virtues;
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
      (s) => (s.value ?? 0) < A.skillMax
    );
    const anyTraitBelowMax = TRAITS.some((k) => this._traitVal(k) < A.traitMax);
    const anyTraitAboveMin = TRAITS.some((k) => this._traitVal(k) > A.traitMin);
    const canIncreaseTrait = anyTraitBelowMax && this._traitTotal() < A.traitTotalCap && this._traitIncreasesUsed() < A.traitIncreaseLifetimeCap;
    return {
      skillRaise: { ok: anySkillBelowMax, reason: "SVNSEA2E.AdvNoSkillRoom" },
      traitIncrease: { ok: canIncreaseTrait, reason: "SVNSEA2E.AdvNoTraitRoom" },
      traitShift: { ok: anyTraitBelowMax && anyTraitAboveMin, reason: "SVNSEA2E.AdvNoTraitRoom" },
      advantage: { ok: !!this._catalog?.advantages.length, reason: "SVNSEA2E.AdvNoCompendia" },
      arcanaChange: {
        ok: !!(this._catalog?.virtues.length || this._catalog?.hubris.length),
        reason: "SVNSEA2E.AdvNoCompendia"
      },
      quirkChange: { ok: !!this._backgrounds().length, reason: "SVNSEA2E.AdvNoBackgrounds" },
      corruptionRemove: { ok: this._corruption() > 0, reason: "SVNSEA2E.AdvNoCorruption" }
    };
  }
  /** Steps for the currently-configured Reward (0 until enough is chosen). */
  _stepCost() {
    const s = this._wizard;
    const A = CONFIG.SVNSEA2E.advancement;
    switch (s.reward) {
      case "skillRaise":
        return s.skill ? Math.min(this._skillVal(s.skill) + 1, A.skillMax) : 0;
      case "traitIncrease":
        return 5;
      case "traitShift":
        return 4;
      case "advantage":
        return s.advId ? this._advantageCost(this._advById(s.advId)) : 0;
      case "arcanaChange":
        return 4;
      case "quirkChange":
        return 3;
      case "corruptionRemove":
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
      done: i < this._step
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
      rewardChosen: !!s.reward
    };
    data.rewards = this.constructor.REWARDS.map((r) => ({
      key: r.key,
      icon: r.icon,
      label: game.i18n.localize(`SVNSEA2E.AdvR_${r.key}`),
      hint: game.i18n.localize(`SVNSEA2E.AdvH_${r.key}`),
      cost: game.i18n.localize(`SVNSEA2E.AdvC_${r.key}`),
      selected: s.reward === r.key,
      available: avail[r.key].ok,
      reason: avail[r.key].ok ? "" : game.i18n.localize(avail[r.key].reason)
    }));
    data.configKey = s.reward;
    data.skillChoices = Object.entries(C.skills).map(([key, label]) => ({
      key,
      label,
      cur: this._skillVal(key),
      next: Math.min(this._skillVal(key) + 1, A.skillMax),
      atMax: this._skillVal(key) >= A.skillMax,
      selected: s.skill === key
    })).sort((a, b) => a.label.localeCompare(b.label));
    const traitRows = (predicate) => TRAITS.map((key) => ({
      key,
      label: C.traits[key],
      cur: this._traitVal(key)
    })).filter(predicate);
    data.traitRaiseChoices = traitRows((t) => t.cur < A.traitMax).map((t) => ({
      ...t,
      next: t.cur + 1,
      selected: s.trait === t.key
    }));
    data.traitLowerChoices = traitRows((t) => t.cur > A.traitMin).map((t) => ({
      ...t,
      next: t.cur - 1,
      selected: s.traitDown === t.key
    }));
    data.traitTotal = this._traitTotal();
    data.traitTotalCap = A.traitTotalCap;
    data.traitIncreasesUsed = this._traitIncreasesUsed();
    data.traitIncreaseCap = A.traitIncreaseLifetimeCap;
    data.advantageChoices = this._catalog.advantages.filter((a) => !a.system?.innate).map((a) => ({
      id: a._id,
      name: a.name,
      cost: this._advantageCost(a),
      owned: this._ownsAdvantage(a.name),
      sorcery: a.name?.toLowerCase() === "sorcery",
      selected: s.advId === a._id,
      description: a.system?.description || ""
    })).map((a) => ({ ...a, disabled: a.owned && !a.sorcery }));
    data.arcanaSlot = s.arcanaSlot;
    const arcList = s.arcanaSlot === "hubris" ? this._catalog.hubris : this._catalog.virtues;
    data.arcanaChoices = arcList.map((a) => ({
      id: a._id,
      name: a.name,
      selected: s.arcanaId === a._id,
      description: a.system?.description || ""
    }));
    const arcSel = this._arcById(s.arcanaId);
    data.arcanaDesc = arcSel?.system?.description || "";
    data.backgroundChoices = this._backgrounds().map((b) => ({
      id: b.id,
      name: b.name,
      quirk: b.system?.quirk || "",
      selected: s.bgId === b.id
    }));
    data.corruption = this._corruption();
    data.corruptionAfter = Math.max(0, this._corruption() - 1);
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
      steps: this._stepCost()
    };
  }
  /** Human-readable one-liner for the configured Reward. */
  _rewardSummary() {
    const C = CONFIG.SVNSEA2E;
    const s = this._wizard;
    const L = (k, d) => d ? game.i18n.format(k, d) : game.i18n.localize(k);
    switch (s.reward) {
      case "skillRaise":
        return s.skill ? L("SVNSEA2E.AdvLblSkill", {
          skill: C.skills[s.skill] || s.skill,
          rank: Math.min(this._skillVal(s.skill) + 1, C.advancement.skillMax)
        }) : "";
      case "traitIncrease":
        return s.trait ? L("SVNSEA2E.AdvLblTrait", {
          trait: C.traits[s.trait] || s.trait,
          rank: Math.min(this._traitVal(s.trait) + 1, C.advancement.traitMax)
        }) : "";
      case "traitShift":
        return s.trait && s.traitDown ? L("SVNSEA2E.AdvLblShift", {
          up: C.traits[s.trait] || s.trait,
          down: C.traits[s.traitDown] || s.traitDown
        }) : "";
      case "advantage": {
        const adv = this._advById(s.advId);
        return adv ? L("SVNSEA2E.AdvLblAdvantage", { name: adv.name }) : "";
      }
      case "arcanaChange": {
        const arc = this._arcById(s.arcanaId);
        return arc ? L("SVNSEA2E.AdvLblArcana", {
          slot: L(s.arcanaSlot === "virtue" ? "SVNSEA2E.Virtue" : "SVNSEA2E.Hubris"),
          name: arc.name
        }) : "";
      }
      case "quirkChange":
        return L("SVNSEA2E.AdvLblQuirk");
      case "corruptionRemove":
        return L("SVNSEA2E.AdvLblCorruption");
      default:
        return "";
    }
  }
  /* -------------------------------------------- */
  /*  Listeners                                   */
  /* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const root = html[0] ?? html;
    root.querySelectorAll("[data-reward]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        const card = ev.currentTarget;
        if (card.classList.contains("disabled")) return;
        this._wizard.reward = card.dataset.reward;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-choice]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        const t = ev.currentTarget;
        if (t.classList.contains("disabled")) return;
        this._wizard[t.dataset.choice] = t.dataset.value;
        this.render(false);
      })
    );
    root.querySelectorAll("[data-arcana-slot]").forEach(
      (el) => el.addEventListener("click", (ev) => {
        this._wizard.arcanaSlot = ev.currentTarget.dataset.arcanaSlot;
        this._wizard.arcanaId = "";
        this.render(false);
      })
    );
    root.querySelectorAll("[data-state]").forEach(
      (el) => el.addEventListener("change", (ev) => {
        this._wizard[ev.currentTarget.dataset.state] = ev.currentTarget.value;
      })
    );
    root.querySelector('[data-nav="back"]')?.addEventListener("click", () => this._nav(-1));
    root.querySelector('[data-nav="next"]')?.addEventListener("click", () => this._nav(1));
    root.querySelector('[data-nav="finish"]')?.addEventListener("click", () => this._finish());
  }
  _readTextInputs() {
    const root = this.element?.[0] ?? this.element;
    if (!root) return;
    for (const el of root.querySelectorAll("[data-state]")) {
      this._wizard[el.dataset.state] = el.value;
    }
  }
  /* -------------------------------------------- */
  /*  Navigation + validation                     */
  /* -------------------------------------------- */
  _nav(delta) {
    if (this.constructor.STEPS[this._step].key === "story") this._readTextInputs();
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
      case "reward":
        if (!s.reward) return L("SVNSEA2E.AdvNeedReward");
        if (!this._rewardAvailability()[s.reward].ok) return L("SVNSEA2E.AdvRewardUnavailable");
        break;
      case "configure": {
        const err = this._validateConfigure(A, L);
        if (err) return err;
        break;
      }
      case "story":
        if (!s.name?.trim()) return L("SVNSEA2E.AdvNeedName");
        if (!s.goal?.trim()) return L("SVNSEA2E.AdvNeedGoal");
        break;
    }
    return null;
  }
  _validateConfigure(A, L) {
    const s = this._wizard;
    switch (s.reward) {
      case "skillRaise":
        if (!s.skill) return L("SVNSEA2E.AdvPickSkill");
        if (this._skillVal(s.skill) >= A.skillMax) return L("SVNSEA2E.AdvSkillMaxed");
        break;
      case "traitIncrease":
        if (!s.trait) return L("SVNSEA2E.AdvPickTrait");
        if (this._traitVal(s.trait) >= A.traitMax) return L("SVNSEA2E.AdvTraitMaxed");
        if (this._traitTotal() + 1 > A.traitTotalCap) return L("SVNSEA2E.AdvTraitTotalCap");
        if (this._traitIncreasesUsed() >= A.traitIncreaseLifetimeCap)
          return L("SVNSEA2E.AdvTraitTwice");
        break;
      case "traitShift":
        if (!s.trait || !s.traitDown) return L("SVNSEA2E.AdvPickBothTraits");
        if (s.trait === s.traitDown) return L("SVNSEA2E.AdvDistinctTraits");
        if (this._traitVal(s.trait) >= A.traitMax) return L("SVNSEA2E.AdvTraitMaxed");
        if (this._traitVal(s.traitDown) <= A.traitMin) return L("SVNSEA2E.AdvTraitMinned");
        break;
      case "advantage": {
        if (!s.advId) return L("SVNSEA2E.AdvPickAdvantage");
        const adv = this._advById(s.advId);
        if (adv && this._ownsAdvantage(adv.name) && adv.name.toLowerCase() !== "sorcery")
          return L("SVNSEA2E.AdvAlreadyOwned");
        break;
      }
      case "arcanaChange":
        if (!s.arcanaId) return L("SVNSEA2E.AdvPickArcana");
        break;
      case "quirkChange":
        if (!s.bgId) return L("SVNSEA2E.AdvPickBackground");
        if (!s.quirk?.trim()) return L("SVNSEA2E.AdvNeedQuirk");
        break;
      case "corruptionRemove":
        if (this._corruption() <= 0) return L("SVNSEA2E.AdvNoCorruption");
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
      targetKey: "",
      targetKey2: "",
      targetName: "",
      targetUuid: "",
      newRank: 0,
      stepsTotal: this._stepCost(),
      stepsDone: 0,
      applied: false
    };
    switch (s.reward) {
      case "skillRaise":
        adv.targetKey = s.skill;
        adv.newRank = Math.min(this._skillVal(s.skill) + 1, A.skillMax);
        break;
      case "traitIncrease":
        adv.targetKey = s.trait;
        adv.newRank = Math.min(this._traitVal(s.trait) + 1, A.traitMax);
        break;
      case "traitShift":
        adv.targetKey = s.trait;
        adv.targetKey2 = s.traitDown;
        break;
      case "advantage": {
        const a = this._advById(s.advId);
        adv.targetName = a?.name || "";
        adv.targetUuid = a ? `Compendium.theah.advantages.Item.${a._id}` : "";
        break;
      }
      case "arcanaChange": {
        const a = this._arcById(s.arcanaId);
        adv.targetKey = s.arcanaSlot;
        adv.targetName = a?.name || "";
        adv.targetUuid = a ? `Compendium.theah.arcana.Item.${a._id}` : "";
        break;
      }
      case "quirkChange":
        adv.targetKey = s.bgId;
        adv.targetName = s.quirk.trim();
        break;
      case "corruptionRemove":
        break;
    }
    return adv;
  }
  async _finish() {
    if (this.constructor.STEPS[this._step].key === "story") this._readTextInputs();
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
    const rewardHtml = `<p><strong>${this._rewardSummary()}</strong> \u2014 ${game.i18n.format(
      "SVNSEA2E.AdvStepsToGo",
      { n: advancement.stepsTotal }
    )}</p>`;
    await this.actor.createEmbeddedDocuments("Item", [
      {
        name: s.name.trim(),
        type: "story",
        img: "systems/theah/icons/item.svg",
        system: {
          description: "",
          endings: `<p>${esc(s.goal.trim())}</p>`,
          steps: s.firstStep?.trim() ? `<p>${esc(s.firstStep.trim())}</p>` : "",
          reward: rewardHtml,
          status: "inprogress",
          advancement
        }
      }
    ]);
    ui.notifications.info(game.i18n.format("SVNSEA2E.AdvStarted", { name: s.name.trim() }));
    await this.close();
    this.actor.sheet?.render(true);
  }
  /** FormApplication requires this; the wizard writes via _finish() instead. */
  async _updateObject() {
  }
};
async function openAdvancementCreator(actor) {
  if (actor?.type !== ActorType.PLAYER) {
    return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizPlayerOnly"));
  }
  if (!game.packs.get("theah.advantages")) {
    return ui.notifications.warn(game.i18n.localize("SVNSEA2E.WizNoCompendia"));
  }
  try {
    await new AdvancementCreator(actor).render(true);
  } catch (err) {
    console.error("Th\xE9ah | Advancement Creator failed to open", err);
    ui.notifications.error(game.i18n.localize("SVNSEA2E.WizOpenFailed"));
  }
}
async function resolvePackDoc(uuid, fallbackName, kind) {
  if (uuid) {
    try {
      const doc = await fromUuid(uuid);
      if (doc) return doc.toObject();
    } catch (e) {
    }
  }
  if (!fallbackName) return null;
  if (kind === "advantage") {
    const advs = await getAllPackAdvantages();
    const hit = advs.find((a) => a.name?.toLowerCase() === fallbackName.toLowerCase());
    return hit?.toObject ? hit.toObject() : hit || null;
  }
  for (const pack of game.packs.filter((p) => p.metadata.type === "Item")) {
    const idx = await pack.getIndex();
    const entry = idx.find(
      (e) => (e.type === "virtue" || e.type === "hubris") && e.name?.toLowerCase() === fallbackName.toLowerCase()
    );
    if (entry) return (await pack.getDocument(entry._id)).toObject();
  }
  return null;
}
async function applyStoryAdvancement(actor, story) {
  const adv = story.system?.advancement;
  const L = (k, d) => d ? game.i18n.format(k, d) : game.i18n.localize(k);
  if (!adv || !adv.active) return;
  if (adv.applied) return ui.notifications.warn(L("SVNSEA2E.AdvAlreadyClaimed"));
  if ((adv.stepsDone || 0) < (adv.stepsTotal || 0))
    return ui.notifications.warn(L("SVNSEA2E.AdvNotComplete"));
  const C = CONFIG.SVNSEA2E;
  const A = C.advancement;
  let summary = "";
  switch (adv.type) {
    case "skillRaise": {
      const key = adv.targetKey;
      const cur = actor.system.skills?.[key]?.value ?? 0;
      if (cur >= A.skillMax) return ui.notifications.warn(L("SVNSEA2E.AdvSkillMaxed"));
      const nv = Math.min(cur + 1, A.skillMax);
      await actor.update({ [`system.skills.${key}.value`]: nv });
      summary = L("SVNSEA2E.AdvLblSkill", { skill: C.skills[key] || key, rank: nv });
      break;
    }
    case "traitIncrease": {
      const key = adv.targetKey;
      const cur = actor.system.traits?.[key]?.value ?? 0;
      const total = TRAITS.reduce((a, k) => a + (actor.system.traits?.[k]?.value ?? 0), 0);
      const used = actor.items.filter(
        (i) => i.type === "story" && i.id !== story.id && i.system?.advancement?.type === "traitIncrease" && i.system?.advancement?.applied
      ).length;
      if (cur >= A.traitMax) return ui.notifications.warn(L("SVNSEA2E.AdvTraitMaxed"));
      if (total + 1 > A.traitTotalCap) return ui.notifications.warn(L("SVNSEA2E.AdvTraitTotalCap"));
      if (used >= A.traitIncreaseLifetimeCap)
        return ui.notifications.warn(L("SVNSEA2E.AdvTraitTwice"));
      await actor.update({ [`system.traits.${key}.value`]: cur + 1 });
      summary = L("SVNSEA2E.AdvLblTrait", { trait: C.traits[key] || key, rank: cur + 1 });
      break;
    }
    case "traitShift": {
      const up = adv.targetKey;
      const down = adv.targetKey2;
      const cu = actor.system.traits?.[up]?.value ?? 0;
      const cd = actor.system.traits?.[down]?.value ?? 0;
      if (cu >= A.traitMax) return ui.notifications.warn(L("SVNSEA2E.AdvTraitMaxed"));
      if (cd <= A.traitMin) return ui.notifications.warn(L("SVNSEA2E.AdvTraitMinned"));
      await actor.update({
        [`system.traits.${up}.value`]: cu + 1,
        [`system.traits.${down}.value`]: cd - 1
      });
      summary = L("SVNSEA2E.AdvLblShift", { up: C.traits[up] || up, down: C.traits[down] || down });
      break;
    }
    case "advantage": {
      const source = await resolvePackDoc(adv.targetUuid, adv.targetName, "advantage");
      if (!source) return ui.notifications.warn(L("SVNSEA2E.AdvSourceMissing"));
      const owns = actor.items.some((i) => i.type === "advantage" && i.name === source.name);
      if (owns && source.name?.toLowerCase() !== "sorcery")
        return ui.notifications.warn(L("SVNSEA2E.AdvAlreadyOwned"));
      delete source._id;
      await actor.createEmbeddedDocuments("Item", [source]);
      summary = L("SVNSEA2E.AdvLblAdvantage", { name: source.name });
      break;
    }
    case "arcanaChange": {
      const slot = adv.targetKey;
      const source = await resolvePackDoc(adv.targetUuid, adv.targetName, "arcana");
      if (!source) return ui.notifications.warn(L("SVNSEA2E.AdvSourceMissing"));
      const existing = actor.items.filter((i) => i.type === slot).map((i) => i.id);
      if (existing.length) await actor.deleteEmbeddedDocuments("Item", existing);
      delete source._id;
      await actor.createEmbeddedDocuments("Item", [source]);
      summary = L("SVNSEA2E.AdvLblArcana", {
        slot: L(slot === "virtue" ? "SVNSEA2E.Virtue" : "SVNSEA2E.Hubris"),
        name: source.name
      });
      break;
    }
    case "quirkChange": {
      const bg = actor.items.get(adv.targetKey);
      if (bg) await bg.update({ "system.quirk": `<p>${esc(adv.targetName)}</p>` });
      summary = L("SVNSEA2E.AdvLblQuirkDone", { quirk: adv.targetName });
      break;
    }
    case "corruptionRemove": {
      const cur = actor.system.corruptionpts ?? 0;
      await actor.update({ "system.corruptionpts": Math.max(0, cur - 1) });
      summary = L("SVNSEA2E.AdvLblCorruption");
      break;
    }
    default:
      return;
  }
  await story.update({ "system.advancement.applied": true, "system.status": "complete" });
  const content = `
    <div class="theah theah-reward">
      <div class="item-head"><i class="fas fa-feather"></i> ${L("SVNSEA2E.AdvChatTitle", {
    name: actor.name
  })}</div>
      <div class="reward-body">
        <div class="reward-story">&ldquo;${esc(story.name)}&rdquo;</div>
        <div class="reward-line"><i class="fas fa-trophy"></i> ${summary}</div>
      </div>
    </div>`;
  await postThemedChat({ actor, content });
}

// src/combat.js
function updateInitiative(actorId, raise) {
  const nRaise = parseFloat(raise);
  const activeCombat = game.combats.filter((combat) => combat.active);
  if (activeCombat.length > 0) {
    activeCombat.forEach((combat) => {
      const actors = combat.combatants.filter((c) => c.actor.id === actorId);
      if (actors.length > 0) {
        combat.combatants.filter((c) => c.actor.id === actorId).map((c) => {
          c.update({ initiative: parseFloat(nRaise) });
        });
      }
    });
  }
  game.actors.filter((a) => a.id === actorId).forEach((a) => {
    a.update({ system: { initiative: nRaise } });
  });
}

// src/roll/roll.js
var _getIndexes = function(rolls, tomatch) {
  const values = [];
  values.push(rolls.indexOf(tomatch[0]));
  if (tomatch[0] === tomatch[1]) {
    values.push(rolls.indexOf(tomatch[1], values[0] + 1));
  } else {
    values.push(rolls.indexOf(tomatch[1]));
  }
  if (tomatch.length > 2) {
    if (tomatch[0] === tomatch[2]) {
      values.push(rolls.indexOf(tomatch[2], values[1] + 1));
    } else {
      values.push(rolls.indexOf(tomatch[2]));
    }
  }
  return values;
};
var _addRaise = function(threshold = 10, incThreshold = false) {
  let raises = 1;
  if (threshold === 15 && !incThreshold || threshold === 20 && incThreshold)
    raises++;
  return raises;
};
var _leftOverDice = function(rolls, threshold = 10, incThreshold = false) {
  let total = 0;
  const response = {
    rolls: [],
    combos: [],
    raises: 0
  };
  let currentUsedDice = [];
  let index = rolls.length;
  while (index > 0) {
    index--;
    if (index > 0 && total === 0) {
      total += parseInt(rolls[0]) + parseInt(rolls[index]);
      currentUsedDice.push(rolls.splice(index, 1));
      currentUsedDice.push(rolls.splice(0, 1));
      index--;
    } else {
      total += parseInt(rolls[0]);
      currentUsedDice.push(rolls.splice(0, 1));
    }
    if (total >= threshold) {
      response["raises"] += _addRaise(threshold, incThreshold);
      response["combos"].push(
        currentUsedDice.sort((a, b) => a - b).join(" + ")
      );
      currentUsedDice = [];
      total = 0;
    }
  }
  response["rolls"] = currentUsedDice;
  return response;
};
var _calculBonusDice = function(form) {
  const flairDice = form.flairDice?.checked ? 1 : 0;
  const interpretationDice = form.interpretationDice?.checked ? 1 : 0;
  const heroDices = parseInt(form.useForMe?.value || 0);
  const helpDices = parseInt(form.useForHelpMe?.value || 0) * 3;
  return parseInt(form.bonusDice.value) + flairDice + interpretationDice + heroDices + helpDices;
};
var _spendHeroPoint = function(form, actor) {
  const heroDices = parseInt(form.useForMe?.value || 0);
  const heroPts = actor.system.heropts || 0;
  if (heroDices > heroPts) {
    ui.notifications.error(game.i18n.format("SVNSEA2E.NotEnoughHero", {}));
    return false;
  }
  if (heroDices > 0) {
    actor.update({
      data: { heropts: heroPts - heroDices }
    });
  }
  return true;
};
async function roll({
  rolldata = {},
  actor = {},
  data = {},
  form = {},
  template,
  title
}) {
  if (actor.type !== ActorType.VILLAIN && actor.type !== ActorType.MONSTER && !_spendHeroPoint(form, actor)) {
    console.error("not enought hero point");
    return false;
  }
  const skillDice = parseInt(rolldata["skilldice"]);
  const nd = skillDice + parseInt(form.trait.value) + _calculBonusDice(form);
  const incThreshold = form.increaseThreshold !== void 0 ? form.increaseThreshold.checked : 0;
  const addOneToDice = form.addOneToDice !== void 0 ? form.addOneToDice.checked : false;
  const r = new Roll(`${nd}d10${rolldata["explode"] ? "x" : ""}`);
  await r.evaluate();
  const rolls = getSortedRolls(r).map((d) => addOneToDice ? d + 1 : d);
  const exploded = rolldata["explode"];
  if (incThreshold) rolldata.threshold += 5;
  const matcharr = rolldata["threshold"] === 15 ? CONFIG.SVNSEA2E.match15 : rolldata["threshold"] === 20 ? CONFIG.SVNSEA2E.match20 : CONFIG.SVNSEA2E.match10;
  let raises = 0;
  let combos = [];
  if (rolldata["threshold"] === 10) {
    let i2 = rolls.length;
    while (i2--) {
      if (rolls[i2] >= 10) {
        raises++;
        combos.push(rolls[i2]);
        rolls.splice(i2, 1);
      } else if (rolls[i2] < 10) {
        break;
      }
    }
  }
  if (form.joieDeVivreAdvantage?.checked) {
    let i2 = rolls.length;
    while (i2--) {
      if (rolls[i2] <= skillDice) {
        raises++;
        combos.push(rolls[i2]);
        rolls.splice(i2, 1);
      }
    }
  }
  for (let c = 0; c < matcharr.two.length; c++) {
    let vals2 = _getIndexes(rolls, matcharr.two[c]);
    while (vals2[0] > -1 && vals2[1] > -1) {
      raises += _addRaise(rolldata["threshold"], incThreshold);
      combos.push(
        rolls[vals2[0]].toString() + " + " + rolls[vals2[1]].toString()
      );
      rolls.splice(vals2[0], 1);
      rolls.splice(rolls.indexOf(matcharr.two[c][1]), 1);
      vals2 = _getIndexes(rolls, matcharr.two[c]);
    }
  }
  for (let c = 0; c < matcharr.three.length; c++) {
    var vals = _getIndexes(rolls, matcharr.three[c]);
    while (vals[0] > -1 && vals[1] > -1 && vals[2] > -1) {
      raises += _addRaise(rolldata["threshold"], incThreshold);
      combos.push(
        rolls[vals[0]].toString() + " + " + rolls[vals[1]].toString() + " + " + rolls[vals[2]].toString()
      );
      rolls.splice(vals[0], 1);
      rolls.splice(rolls.indexOf(matcharr.three[c][1]), 1);
      rolls.splice(rolls.indexOf(matcharr.three[c][2]), 1);
      vals = _getIndexes(rolls, matcharr.three[c]);
    }
  }
  let i = rolls.length;
  let rerolled = false;
  let reroll = "";
  const sortedRolls = getSortedRolls(r);
  if (i > 0 && rolldata["reroll"]) {
    const orgroll = addOneToDice ? rolls[0] - 1 : rolls[0];
    rolls[0] = Math.floor(Math.random() * 10) + 1;
    reroll = game.i18n.format("SVNSEA2E.Reroll", {
      roll1: orgroll,
      roll2: rolls[0]
    });
    rerolled = true;
    for (let k = 0; k < sortedRolls.length; k++) {
      if (sortedRolls[k] == orgroll) {
        sortedRolls[k] = rolls[0];
        break;
      }
    }
    if (addOneToDice) rolls[0] = rolls[0] + 1;
    sortedRolls.sort(rollComparator);
    rolls.sort(rollComparator);
  }
  if (rolldata["threshold"] == 10) {
    let j = rolls.length;
    while (j--) {
      if (rolls[j] >= 10) {
        raises++;
        combos.push(rolls[j]);
        rolls.splice(j, 1);
        i = rolls.length;
      } else if (rolls[j] < 10) {
        break;
      }
    }
  }
  let leftdata = _leftOverDice(rolls, rolldata["threshold"], incThreshold);
  combos.push(...leftdata["combos"]);
  raises += leftdata["raises"];
  if (leftdata["rolls"].length > 0 && (!incThreshold && rolldata["threshold"] == 15 || incThreshold && rolldata["threshold"] == 20)) {
    let leftdata2 = _leftOverDice(
      leftdata["rolls"],
      rolldata["threshold"] - 5,
      incThreshold
    );
    combos.push(...leftdata2["combos"]);
    raises += leftdata2["raises"];
    leftdata = leftdata2;
  }
  const messageOptions = {
    rollmode: "gmroll"
  };
  let thresholdmsg = rolldata["threshold"].toString();
  if (incThreshold)
    thresholdmsg = rolldata["threshold"].toString() + " " + game.i18n.localize("SVNSEA2E.GMIncreasedThreshold");
  const unusedDice = leftdata["rolls"].length;
  const templateData = {
    actor,
    raisetxt: raises > 1 ? game.i18n.localize("SVNSEA2E.Raises") : game.i18n.localize("SVNSEA2E.Raise"),
    unusedDiceTxt: unusedDice > 1 ? game.i18n.localize("SVNSEA2E.UnusedDice") : game.i18n.localize("SVNSEA2E.UnusedDie"),
    data,
    exploded,
    explosions: game.i18n.format("SVNSEA2E.RollsExploded"),
    hasAddOneToDice: addOneToDice,
    addOneToDiced: game.i18n.format("SVNSEA2E.AddOneToDiced"),
    labels: data.labels,
    rolls: sortedRolls,
    raises,
    rCombos: game.i18n.localize("SVNSEA2E.RaiseCombos"),
    combos: combos.map((c) => `${c}`),
    rerolled,
    reroll,
    unusedDice,
    dicesNumber: nd,
    threshold: game.i18n.format("SVNSEA2E.RollThreshold", {
      threshold: thresholdmsg
    })
  };
  const html = await renderTemplate(template, templateData);
  const rollMode = game.settings.get("core", "rollMode");
  const chatData = {
    user: game.user.id,
    type: CONST.CHAT_MESSAGE_STYLES.OTHER,
    content: html,
    image: actor.img,
    speaker: {
      actor: actor.id,
      token: actor.token,
      alias: actor.name
    },
    flavor: title,
    blind: rollMode === "blindroll",
    // Toggle default roll mode
    whisper: ["gmroll", "blindroll"].includes(rollMode) ? ChatMessage.getWhisperRecipients("GM") : void 0
  };
  if (game.dice3d) {
    game.dice3d.showForRoll(r).then(() => {
      ChatMessage.create(chatData);
    });
  } else {
    ChatMessage.create(chatData);
  }
  return r;
}
function rollComparator(a, b) {
  return a - b;
}
function getSortedRolls(roll2) {
  return roll2.terms[0].results.map((dr) => dr.result).sort((a, b) => a - b);
}

// src/actor/sheets/base.js
var ActorSheetSS2e = class extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      width: 1050,
      height: 750
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData(options) {
    const data = super.getData(options);
    const actor = data.document;
    const actorData = actor.system;
    const { isOwner: owner, limited } = this.document;
    const sheetData = {
      owner,
      limited,
      options: this.options,
      editable: this.isEditable,
      cssClass: owner ? "editable" : "locked",
      isGM: game.user.isGM,
      isCorrupt: actorData.corruptionpts > 0,
      isPlayerCharacter: actor.type === ActorType.PLAYER,
      isHero: actor.type === ActorType.HERO,
      isVillain: actor.type === ActorType.VILLAIN,
      isMonster: actor.type === ActorType.MONSTER,
      isNotBrute: actor.type !== ActorType.BRUTE,
      hasSkills: typeof actorData.skills !== "undefined",
      hasLanguages: typeof actorData.languages !== "undefined",
      config: CONFIG.SVNSEA2E,
      dtypes: ["String", "Number", "Boolean"],
      // Core Actor data:
      name: actor.name,
      img: actor.img,
      initiative: actorData.initiative,
      age: actorData.age,
      nation: actorData.nation,
      epithet: actorData.epithet,
      wealth: actorData.wealth,
      heropts: actorData.heropts,
      corruptionpts: actorData.corruptionpts,
      wounds: actorData.wounds,
      dwounds: actorData.dwounds,
      traits: this._prepareTraits(actor),
      selectedlangs: this._prepareLanguages(actor),
      // Concept tab.
      religion: actorData.religion,
      reputation: actorData.reputation,
      concept: actorData.concept,
      arcana: actorData.arcana,
      // Inventory Tab
      equipment: actorData.equipment,
      // Fate Tab
      redemption: actorData.redemption
    };
    const dw = actorData.dwounds;
    if (dw && dw.max) {
      const dwTips = ["", "SVNSEA2E.DwTip1", "SVNSEA2E.DwTip2", "SVNSEA2E.DwTip3", "SVNSEA2E.DwTip4"];
      sheetData.dwoundSeals = Array.from({ length: dw.max }, (_, i) => {
        const level = i + 1;
        return {
          level,
          filled: (dw.value ?? 0) >= level,
          tip: game.i18n.localize(dwTips[Math.min(level, 4)] || "")
        };
      });
    }
    sheetData.sorceryTradition = this._detectSorceryTradition(actor);
    if (actor.type === ActorType.PLAYER) {
      this._prepareCharacterItems(data, sheetData);
    } else if (actor.type === ActorType.HERO) {
      this._prepareHeroItems(data, sheetData);
    } else if (actor.type === ActorType.VILLAIN) {
      this._prepareVillainItems(data, sheetData);
    } else if (actor.type === ActorType.MONSTER) {
      this._prepareMonsterItems(data, sheetData);
    } else if (actor.type === ActorType.SHIP) {
      this._prepareShipItems(data, sheetData);
      this._processFlags(actorData, actor.flags, sheetData);
    } else if (actor.type === ActorType.DANGERPOINTS) {
      sheetData.points = actorData.points;
    } else if (actor.type === ActorType.BRUTE) {
      sheetData.ability = actorData.ability;
    }
    if (Array.isArray(sheetData.stories)) {
      sheetData.stories = sheetData.stories.map((s) => this._decorateStory(s));
    }
    return sheetData;
  }
  /* -------------------------------------------- */
  /**
   * Build a sheet-friendly view of a Story, adding step-tracker fields for
   * structured advancement Stories (plain Stories pass through untouched).
   * @param {Object} s   A Story item (document or source object).
   * @private
   */
  _decorateStory(s) {
    const adv = foundry.utils.getProperty(s, "system.advancement");
    const view = {
      _id: s._id ?? s.id,
      name: s.name,
      editlabel: s.editlabel,
      deletelabel: s.deletelabel,
      isAdvancement: !!(adv && adv.active)
    };
    if (!view.isAdvancement) return view;
    const total = adv.stepsTotal || 0;
    const done = Math.min(adv.stepsDone || 0, total);
    view.stepsTotal = total;
    view.stepsDone = done;
    view.pips = Array.from({ length: total }, (_, i) => ({ n: i + 1, filled: i < done }));
    view.complete = total > 0 && done >= total;
    view.claimable = view.complete && !adv.applied;
    view.applied = !!adv.applied;
    view.rewardLabel = this._advRewardLabel(adv);
    view.goal = this._stripTags(foundry.utils.getProperty(s, "system.endings") || "");
    return view;
  }
  /**
   * Determine which national Sorcery tradition this Hero practices, so the
   * Sorcery tab can name it even before any effect items are added. Prefers the
   * `flags.theah.sorctype` the Hero Creator stamps on the "Sorcery" advantage;
   * falls back to owning any "Sorcery" advantage + the nation's bloodline (so
   * heroes built before that stamp existed still show their tradition).
   * @param {Actor} actor
   * @returns {{key:string,label:string,desc:string}|null}
   * @private
   */
  _detectSorceryTradition(actor) {
    const C = CONFIG.SVNSEA2E;
    const NORM = { knight: "glamour" };
    const make = (raw) => {
      const k = raw ? NORM[raw] || raw : raw;
      return k ? {
        key: k,
        label: game.i18n.localize(C.sorceryTypes?.[k] || k),
        desc: game.i18n.localize(C.sorceryDesc?.[k] || "")
      } : null;
    };
    let hasSorceryAdv = false;
    for (const it of actor.items) {
      if (it.type !== "advantage") continue;
      const flagged = foundry.utils.getProperty(it, "flags.theah.sorctype");
      if (flagged) return make(flagged);
      if (/\bSorcery\b/i.test(it.name)) hasSorceryAdv = true;
    }
    return hasSorceryAdv ? make(C.nationSorcery?.[actor.system?.nation]) : null;
  }
  /** Strip HTML tags for a short inline preview of the Story's Goal. */
  _stripTags(html) {
    return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  /** Localized one-line label for an advancement Reward. */
  _advRewardLabel(adv) {
    const C = CONFIG.SVNSEA2E;
    const L = (k, d) => d ? game.i18n.format(k, d) : game.i18n.localize(k);
    switch (adv.type) {
      case "skillRaise":
        return L("SVNSEA2E.AdvLblSkill", { skill: C.skills[adv.targetKey] || adv.targetKey, rank: adv.newRank });
      case "traitIncrease":
        return L("SVNSEA2E.AdvLblTrait", { trait: C.traits[adv.targetKey] || adv.targetKey, rank: adv.newRank });
      case "traitShift":
        return L("SVNSEA2E.AdvLblShift", {
          up: C.traits[adv.targetKey] || adv.targetKey,
          down: C.traits[adv.targetKey2] || adv.targetKey2
        });
      case "advantage":
        return L("SVNSEA2E.AdvLblAdvantage", { name: adv.targetName });
      case "arcanaChange":
        return L("SVNSEA2E.AdvLblArcana", {
          slot: L(adv.targetKey === "virtue" ? "SVNSEA2E.Virtue" : "SVNSEA2E.Hubris"),
          name: adv.targetName
        });
      case "quirkChange":
        return L("SVNSEA2E.AdvLblQuirk");
      case "corruptionRemove":
        return L("SVNSEA2E.AdvLblCorruption");
      default:
        return "";
    }
  }
  /**
   * Tick a Story's Steps up/down (click a pip; click the current pip to undo it).
   * @param {Event} event
   * @private
   */
  async _onStoryStep(event) {
    event.preventDefault();
    event.stopPropagation();
    const el = event.currentTarget;
    const story = this.actor.items.get(el.dataset.storyId);
    if (!story) return;
    const adv = story.system.advancement;
    if (!adv?.active || adv.applied) return;
    const n = Number(el.dataset.step);
    let done = adv.stepsDone || 0;
    done = done === n ? n - 1 : n;
    done = Math.max(0, Math.min(done, adv.stepsTotal));
    await story.update({ "system.advancement.stepsDone": done });
  }
  /**
   * Claim a completed advancement Story's Reward (applies it to the actor).
   * @param {Event} event
   * @private
   */
  async _onStoryClaim(event) {
    event.preventDefault();
    event.stopPropagation();
    const story = this.actor.items.get(event.currentTarget.dataset.storyId);
    if (story) await applyStoryAdvancement(this.actor, story);
  }
  /* -------------------------------------------- */
  _prepareButtonTitles(data) {
    for (const item of Object.values(data)) {
      item.editlabel = game.i18n.format("SVNSEA2E.EditLabel", {
        label: data.name
      });
      item.deletelabel = game.i18n.format("SVNSEA2E.DeleteLabel", {
        label: data.name
      });
    }
  }
  /* -------------------------------------------- */
  /**
   * Returns a sheet-friendly list of traits with the localized label.
   *
   * @param actor
   * @returns {(*&{name: *, label: *})[]|*[]}
   * @private
   */
  _prepareTraits(actor) {
    return ![ActorType.SHIP, ActorType.DANGERPOINTS].includes(actor.type) ? Object.entries(actor.system.traits).map(([t, trait]) => ({
      ...trait,
      name: t,
      label: CONFIG.SVNSEA2E.traits[t],
      desc: game.i18n.localize(`SVNSEA2E.TraitInfo_${t}`)
    })) : [];
  }
  /* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) return;
    html.find(".language-selector").on("click", this._onLanguageSelector.bind(this));
    html.find(".evil-act-roll").on("click", this._onEvilAct.bind(this));
    html.find(".favor-step").on("click", this._onFavorStep.bind(this));
    html.find(".item-to-chat").on("click", this._onItemToChat.bind(this));
    html.find(".add-1-initiative").on("click", this._onAddInitiative.bind(this));
    html.find(".minus-1-initiative").on("click", this._onMinusInitiative.bind(this));
    html.find(".item-create").on("click", this._onItemCreate.bind(this));
    html.find(".open-compendium").on("click", this._onOpenCompendium.bind(this));
    html.find(".browse-sorcery").on("click", this._onBrowseSorcery.bind(this));
    html.find(".create-hero-btn").on("click", (event) => {
      event.preventDefault();
      openHeroCreator(this.actor);
    });
    html.find(".new-advancement").on("click", (event) => {
      event.preventDefault();
      openAdvancementCreator(this.actor);
    });
    html.find(".story-step").on("click", this._onStoryStep.bind(this));
    html.find(".story-claim").on("click", this._onStoryClaim.bind(this));
    html.find(".item-edit").on("click", this._onItemEdit.bind(this));
    html.find(".item-delete").on("click", this._onItemDelete.bind(this));
    html.find(".item h4.item-name").on("click", (event) => this._onItemSummary(event));
    if (this.actor.type === ActorType.PLAYER || this.actor.type === ActorType.HERO) {
      html.find(".rollable").on("click", this._onHeroRoll.bind(this));
    } else if (this.actor.type === ActorType.VILLAIN || this.actor.type === ActorType.MONSTER) {
      html.find(".rollable").on("click", this._onVillainRoll.bind(this));
    }
    html.find(".theme-toggle").on("click", (event) => {
      event.preventDefault();
      const current = game.settings.get("theah", "theme");
      game.settings.set("theah", "theme", current === "sea" ? "paper" : "sea");
    });
    const roller = html.find(".roller");
    if (roller.length) {
      const rollerEl = roller[0];
      const refresh = () => this._updatePoolFormula(rollerEl);
      roller.find(".rp-trait, .rp-skill, .rp-threshold").on("change", refresh);
      roller.find(".roll-pool").on("click", (event) => this._onPoolRoll(event));
      refresh();
    }
    html.find(".fillable.fa-circle, .fillable.rating").on("click", (event) => this._processCircle(event));
    if (this.actor.type === ActorType.BRUTE) {
      html.find(".fillable.fa-heart, .fillable.wound").on("click", (event) => this._processBruteWounds(event));
    } else {
      html.find(".fillable.fa-heart, .fillable.wound").on("click", (event) => this._processWounds(event));
    }
    if (this.actor.isOwner) {
      const handler = (ev) => this._onDragItemStart(ev);
      html.find("li.item").each((i, li) => {
        if (li.classList.contains("inventory-header")) return;
        li.setAttribute("draggable", true);
        li.addEventListener("dragstart", handler, false);
      });
    }
  }
  _onAddInitiative(event) {
    event.preventDefault();
    const initiative = (this.actor.system.initiative || 0) + 1;
    console.log("new initiative", initiative);
    updateInitiative(this.actor.id, initiative);
  }
  _onMinusInitiative(event) {
    event.preventDefault();
    const initiative = (this.actor.system.initiative || 0) - 1;
    updateInitiative(this.actor.id, initiative);
  }
  /* -------------------------------------------- */
  /**
   * Step a Secret Society's Favor up or down (Prowess tab). Favor is a live
   * numeric tally the player earns/spends during play; it never drops below 0.
   * @param {Event} event   The originating click on a .favor-step button.
   * @private
   */
  async _onFavorStep(event) {
    event.preventDefault();
    event.stopPropagation();
    const row = event.currentTarget.closest("[data-item-id]");
    const item = this.actor.items.get(row?.dataset.itemId);
    if (!item) return;
    const delta = Number(event.currentTarget.dataset.favorDelta) || 0;
    const prior = Number(item.system.favor) || 0;
    const next = Math.max(0, prior + delta);
    if (next === prior) return;
    await item.update({ "system.favor": next });
    this.constructor._postFavorChange(this.actor, item, prior, next);
  }
  /**
   * Post a themed chat card when a Secret Society's Favor changes (earned or
   * spent), so the whole table sees the shift in standing.
   * @param {Actor} actor
   * @param {Item}  item   The secret society item.
   * @param {number} prior
   * @param {number} next
   * @private
   */
  static _postFavorChange(actor, item, prior, next) {
    const L = (k) => game.i18n.localize(k);
    const up = next > prior;
    const headline = up ? L("SVNSEA2E.FavorEarned") : L("SVNSEA2E.FavorSpent");
    const icon = up ? "fa-hand-holding-heart" : "fa-hand-holding-dollar";
    const content = `
      <div class="theah theah-item theah-favor ${up ? "up" : "down"}">
        <div class="ti-head"><div class="ti-title">
          <span class="ti-name"><i class="fas ${icon}"></i> ${item.name}</span>
          <span class="ti-sub">${headline}</span>
        </div></div>
        <div class="ti-body-wrap"><div class="ti-sec"><div class="ti-body">
          ${L("SVNSEA2E.Favor")}: <b>${prior}</b> &rarr; <b>${next}</b>
        </div></div></div>
      </div>`;
    postThemedChat({ actor, content });
  }
  /* -------------------------------------------- */
  /**
   * Post an item's rules to chat as a themed card so the table can read it
   * (advantages, backgrounds, arcana, dueling styles, secret societies, …).
   * @param {Event} event   The originating click on a .item-to-chat control.
   * @private
   */
  async _onItemToChat(event) {
    event.preventDefault();
    event.stopPropagation();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li?.dataset.itemId);
    if (!item) return;
    await postThemedChat({ actor: this.actor, content: this.constructor._itemChatContent(item) });
  }
  /**
   * Build the themed `.theah-item` chat card for an item, adapting the fields
   * shown to the item type. The system's HTML fields are static markup (no
   * embedded @UUID links), so they're inserted verbatim.
   * @param {Item} item
   * @returns {string}
   * @private
   */
  static _itemChatContent(item) {
    const L = (k) => game.i18n.localize(k);
    const s = item.system || {};
    const secs = [];
    const add = (label, html) => {
      if (html === void 0 || html === null || String(html).trim() === "") return;
      secs.push(
        `<div class="ti-sec"><span class="ti-lbl">${label}</span><div class="ti-body">${html}</div></div>`
      );
    };
    const ICONS = {
      advantage: "fa-award",
      background: "fa-scroll",
      duelstyle: "fa-khanda",
      secretsociety: "fa-user-secret",
      virtue: "fa-hands-praying",
      hubris: "fa-masks-theater",
      sorcery: "fa-hat-wizard",
      artifact: "fa-gem",
      story: "fa-book-open"
    };
    const icon = ICONS[item.type] || "fa-scroll";
    let sub = "";
    switch (item.type) {
      case "advantage":
        sub = `${L("SVNSEA2E.Advantages")} &middot; ${L("SVNSEA2E.Cost")} ${s.cost?.normal ?? 1}`;
        add(L("SVNSEA2E.Description"), s.description);
        break;
      case "background":
        sub = L("SVNSEA2E.Backgrounds");
        add(L("SVNSEA2E.Description"), s.description);
        add(L("SVNSEA2E.Quirk"), s.quirk);
        break;
      case "duelstyle":
        sub = L("SVNSEA2E.DuelingStyles");
        add(L("SVNSEA2E.Description"), s.description);
        add(L("SVNSEA2E.Bonus"), s.bonus);
        break;
      case "secretsociety":
        sub = `${L("SVNSEA2E.SecretSociety")} &middot; ${L("SVNSEA2E.Favor")} ${s.favor ?? 0}`;
        add(L("SVNSEA2E.Description"), s.description);
        add(L("SVNSEA2E.Concern"), s.concern);
        add(L("SVNSEA2E.EarnFavor"), s.earnfavor);
        add(L("SVNSEA2E.UseFavor"), s.callupon);
        break;
      case "virtue":
        sub = L("SVNSEA2E.Virtue");
        add(L("SVNSEA2E.Description"), s.description);
        break;
      case "hubris":
        sub = L("SVNSEA2E.Hubris");
        add(L("SVNSEA2E.Description"), s.description);
        break;
      case "sorcery": {
        const C = CONFIG.SVNSEA2E;
        const tt = C.sorceryTypes?.[s.sorctype];
        const cat = s.sorccat && s.sorccat !== "none" ? C.sorceryCats?.[s.sorccat] : null;
        const scat = s.sorcsubcat && s.sorcsubcat !== "none" ? C.sorcerySubcats?.[s.sorcsubcat] : null;
        const parts = [tt ? L(tt) : L("SVNSEA2E.Sorcery"), cat ? L(cat) : null, scat ? L(scat) : null].filter(Boolean);
        sub = [...new Set(parts)].join(" &middot; ");
        add(L("SVNSEA2E.Description"), s.description);
        break;
      }
      default:
        add(L("SVNSEA2E.Description"), s.description);
    }
    const img = item.img && !item.img.includes("mystery-man") ? `<img src="${item.img}" alt="" />` : "";
    return `
      <div class="theah theah-item">
        <div class="ti-head">${img}<div class="ti-title"><span class="ti-name"><i class="fas ${icon}"></i> ${item.name}</span>${sub ? `<span class="ti-sub">${sub}</span>` : ""}</div></div>
        ${secs.length ? `<div class="ti-body-wrap">${secs.join("")}</div>` : ""}
      </div>`;
  }
  /* -------------------------------------------- */
  /**
   * GM-only: the Hero commits an Evil Act. Per Core p.203 the Nth Evil Act
   * grants N Corruption (cumulative totals 1 / 3 / 6 / 10), then the GM rolls
   * 1d10 — a result ≤ the Hero's *new* Corruption total means they Fall from
   * Grace and become a Villain. The Corruption is applied automatically; the
   * update is silent so the rich card below supersedes the generic gain card.
   * @param {Event} event   The originating click event.
   * @private
   */
  async _onEvilAct(event) {
    event.preventDefault();
    if (!game.user.isGM) return;
    const actor = this.actor;
    const max = 10;
    const cur = actor.system.corruptionpts ?? 0;
    const priorActs = Math.floor((Math.sqrt(8 * cur + 1) - 1) / 2);
    const actNumber = priorActs + 1;
    const newTotal = Math.min(max, cur + actNumber);
    const gain = newTotal - cur;
    const maxed = gain === 0;
    const confirmed = await Dialog.confirm({
      title: game.i18n.localize("SVNSEA2E.EvilAct"),
      content: `<p>${maxed ? game.i18n.format("SVNSEA2E.EvilActConfirmMaxed", { name: actor.name }) : game.i18n.format("SVNSEA2E.EvilActConfirm", {
        name: actor.name,
        act: actNumber,
        gain,
        total: newTotal
      })}</p>`,
      defaultYes: false
    });
    if (!confirmed) return;
    await actor.update({ "system.corruptionpts": newTotal }, { theahSilent: true });
    const r = new Roll("1d10");
    await r.evaluate();
    if (game.dice3d) {
      try {
        await game.dice3d.showForRoll(r, game.user, true);
      } catch (e) {
      }
    }
    const die = r.total;
    const fell = die <= newTotal;
    const L = (k, data) => data ? game.i18n.format(k, data) : game.i18n.localize(k);
    const verdict = fell ? L("SVNSEA2E.FallFromGrace", { name: actor.name }) : L("SVNSEA2E.HeldTheLine", { name: actor.name, die });
    const headline = maxed ? L("SVNSEA2E.FallFromGraceCheck") : L("SVNSEA2E.EvilActN", { act: actNumber });
    const gainStat = maxed ? "" : `<span class="cs"><b>+${gain}</b> ${L("SVNSEA2E.Corruption")}</span>`;
    const content = `
      <div class="theah theah-corruption evil-act${fell ? " fell" : ""}">
        <div class="corr-head"><i class="fas fa-skull"></i> ${headline}</div>
        <div class="corr-body">
          <div class="corr-stats">
            ${gainStat}
            <span class="cs"><b>${newTotal}</b>/${max} ${L("SVNSEA2E.Total")}</span>
          </div>
          <div class="corr-roll">1d10 &rarr; <b class="${fell ? "bad" : "good"}">${die}</b> ${L("SVNSEA2E.VsCorruption", { n: newTotal })}</div>
          <div class="corr-verdict${fell ? " fell" : ""}">${verdict}</div>
        </div>
      </div>`;
    await postThemedChat({ actor, content, rolls: [r], sound: CONFIG.sounds.dice });
  }
  /* -------------------------------------------- */
  /**
   * Prepare the Languages that the Actor has selected for use with the LanguageSelector application
   * @param {Object} actor       The actor
   * @private
   */
  _prepareLanguages(actor) {
    if (![ActorType.PLAYER, ActorType.HERO, ActorType.VILLAIN].includes(actor.type))
      return void 0;
    console.log(actor);
    console.log(actor.system);
    console.log(actor.system.languages);
    return actor.system.languages.reduce(
      (languages, language) => ({
        ...languages,
        [language]: CONFIG.SVNSEA2E.languages[language]
      }),
      {}
    );
  }
  /* -------------------------------------------- */
  /**
   * Process the effects of clicking on a circle
   * @param {Object} event      event sent
   * @private
   */
  async _processCircle(event) {
    const actor = this.document;
    const actorData = actor.system;
    const dataSet = event.target.dataset;
    let updateObj = {};
    let dataSetValue = parseInt(dataSet.value);
    let tval = 0;
    if (dataSetValue === 1) {
      switch (dataSet.type) {
        case "skill":
          tval = actorData.skills[dataSet.key].value;
          break;
        case "trait":
          if (dataSet.key === "influence" || dataSet.key === "strength") {
            tval = actorData.traits[dataSet.key].value;
          } else {
            dataSetValue = 2;
          }
          break;
        case "corrupt":
          tval = actorData[dataSet.key];
          break;
        case "fear":
          tval = actorData[dataSet.key].value;
          break;
      }
      if (tval === 1) {
        dataSetValue = 0;
      }
    }
    updateObj[dataSet.name] = dataSetValue;
    return actor.update(updateObj);
  }
  /* -------------------------------------------- */
  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */
  _processBruteWounds(event) {
    const actor = this.document;
    const actorData = actor.system;
    let updateObj = {};
    updateObj["system.wounds.value"] = Number(event.target.dataset.value);
    if (actorData.wounds.value == 1 && event.target.dataset.value == 1)
      updateObj["system.wounds.value"] = 0;
    actor.update(updateObj);
  }
  /* -------------------------------------------- */
  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */
  _processWounds(event) {
    const actor = this.document;
    const actorData = actor.system;
    const edata = event.target.dataset;
    let updateObj = {};
    let wounds = actorData.wounds.value;
    let dwounds = actorData.dwounds.value;
    const eValue = +edata.value;
    const nWoundByStep = Math.ceil(actorData.wounds.max / actorData.dwounds.max);
    if (edata.type === "wounds") {
      wounds = eValue;
      dwounds = actorData.dwounds.value;
      const dwestimate = Math.trunc(wounds / nWoundByStep);
      if (dwestimate > actorData.dwounds.value) dwounds = dwestimate;
      if (edata.value == 1 && actorData.wounds.value == 1) wounds = 0;
    } else {
      if (eValue > actorData.dwounds.value) dwounds = eValue;
      else if (eValue == actorData.dwounds.value)
        dwounds = actorData.dwounds.value - 1;
      else dwounds = eValue;
      const cap = (dwounds + 1) * nWoundByStep - 1;
      if (wounds > cap) wounds = cap;
    }
    updateObj["system.wounds.value"] = wounds;
    updateObj["system.dwounds.value"] = dwounds;
    actor.update(updateObj);
  }
  /* -------------------------------------------- */
  /**
   * Handle spawning the languageSelector application which allows a checkbox of multiple language options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onLanguageSelector(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const options = {
      title: game.i18n.localize("SVNSEA2E.Languages"),
      choices: CONFIG.SVNSEA2E[a.dataset.options]
    };
    new LanguageSelector(this.actor, options).render(true);
  }
  /* -------------------------------------------- */
  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset.
   * @param {Event} event          The originating click event.
   * @returns {Promise<Item5e[]>}  The newly created item.
   * @private
   */
  /**
   * Item types that must originate from a compendium — players cannot forge
   * custom copies of these. The "+ create" affordance for them is replaced by a
   * compendium browser, and drops of non-compendium copies are rejected.
   * @type {string[]}
   */
  static get COMPENDIUM_LOCKED_TYPES() {
    return ["advantage", "background", "virtue", "hubris", "duelstyle", "secretsociety", "sorcery"];
  }
  /**
   * Open a compendium so the player can browse and drag an entry onto the sheet.
   * @param {Event} event   The originating click event.
   * @private
   */
  _onOpenCompendium(event) {
    event.preventDefault();
    const pack = event.currentTarget.dataset.pack;
    const collection = game.packs.get(pack);
    if (!collection) {
      return ui.notifications.warn(game.i18n.localize("SVNSEA2E.CompendiumMissing"));
    }
    collection.render(true);
  }
  /* -------------------------------------------- */
  /**
   * Load all Sorcery effect docs as plain objects, preferring the world
   * compendium but falling back to the shipped JSON if it is empty/blank (per
   * the data-resilience rule — never fully trust the seeded pack).
   * @returns {Promise<object[]>}
   * @private
   */
  async _loadSorceryDocs() {
    const pack = game.packs.get("theah.sorceries");
    if (pack) {
      const docs = (await pack.getDocuments()).map((d) => d.toObject());
      const valid = docs.filter((d) => d.name && d.name.trim());
      if (valid.length) return valid;
    }
    try {
      const resp = await fetch("systems/theah/packs-data/sorceries.json");
      if (resp.ok) return await resp.json();
    } catch (e) {
    }
    return [];
  }
  /**
   * Open a focused Sorcery picker filtered to the Hero's bloodline tradition
   * (e.g. an Eisen Hero sees only Hexenwerk unguents, not all 116 effects).
   * Each entry has an "Add" button that clones it onto the actor. Falls back to
   * the full compendium window when no tradition can be determined.
   * @param {Event} event   The originating click event.
   * @private
   */
  async _onBrowseSorcery(event) {
    event.preventDefault();
    const C = CONFIG.SVNSEA2E;
    const L = (k) => game.i18n.localize(k);
    const trad = this._detectSorceryTradition(this.actor);
    const all = await this._loadSorceryDocs();
    if (!all.length) {
      return ui.notifications.warn(game.i18n.localize("SVNSEA2E.CompendiumMissing"));
    }
    const docs = trad ? all.filter((d) => d.system?.sorctype === trad.key) : all;
    if (!docs.length) {
      return ui.notifications.warn(game.i18n.localize("SVNSEA2E.NoSorceryEffects"));
    }
    const order = { major: 0, minor: 1, none: 2 };
    const catOrder = { gift: 0, restriction: 1 };
    docs.sort(
      (a, b) => (order[a.system?.sorcsubcat] ?? 9) - (order[b.system?.sorcsubcat] ?? 9) || (catOrder[a.system?.sorccat] ?? 9) - (catOrder[b.system?.sorccat] ?? 9) || a.name.localeCompare(b.name)
    );
    const rows = docs.map((d) => {
      const sc = d.system?.sorcsubcat;
      const cat = d.system?.sorccat;
      let tag = "";
      if (sc && sc !== "none") tag = L(C.sorcerySubcats?.[sc] || "");
      else if (cat === "gift" || cat === "restriction") tag = L(C.sorceryCats?.[cat] || "");
      return `<div class="sp-item">
          <div class="sp-row">
            <span class="sp-name">${d.name}</span>
            ${tag ? `<span class="sorc-tag tier">${tag}</span>` : ""}
            <button type="button" class="sp-add" data-add-id="${d._id}"><i class="fas fa-plus"></i> ${L("SVNSEA2E.Add")}</button>
          </div>
          ${d.system?.description ? `<div class="sp-desc">${d.system.description}</div>` : ""}
        </div>`;
    }).join("");
    const title = trad ? `${L("SVNSEA2E.BrowseSorcery")} \u2014 ${trad.label}` : L("SVNSEA2E.BrowseSorcery");
    const content = `<div class="theah sorcery-picker">
      <div class="sp-head"><i class="fas fa-hat-wizard"></i> <span class="sp-trad">${trad ? trad.label : L("SVNSEA2E.Sorcery")}</span> <span class="sp-count">${docs.length}</span></div>
      <div class="sp-list">${rows}</div>
    </div>`;
    new Dialog(
      {
        title,
        content,
        buttons: { close: { icon: '<i class="fas fa-check"></i>', label: L("SVNSEA2E.Close") } },
        default: "close",
        render: (html) => {
          const $html = html.jquery ? html : $(html);
          $html.on("click", ".sp-add", async (ev) => {
            ev.preventDefault();
            const btn = ev.currentTarget;
            const doc = docs.find((x) => x._id === btn.dataset.addId);
            if (!doc) return;
            const obj = foundry.utils.deepClone(doc);
            delete obj._id;
            await this.actor.createEmbeddedDocuments("Item", [obj]);
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-check"></i> ${L("SVNSEA2E.Added")}`;
          });
        }
      },
      { classes: ["theah", "dialog", "sorcery-picker-dialog"], width: 560 }
    ).render(true);
  }
  /* -------------------------------------------- */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const itemData = {
      name: game.i18n.localize(`SVNSEA2E.New${type}`),
      img: `systems/theah/icons/${type}.jpg`,
      type,
      data: foundry.utils.deepClone(header.dataset)
    };
    delete itemData.data.type;
    return this.actor.createEmbeddedDocuments("Item", [itemData]);
  }
  /* -------------------------------------------- */
  /**
   * Handle editing an existing Owned Item for the Actor.
   * @param {Event} event    The originating click event.
   * @returns {ItemSheet5e}  The rendered item sheet.
   * @private
   */
  _onItemEdit(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    return item.sheet.render(true);
  }
  /* -------------------------------------------- */
  /**
   * Handle deleting a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemDelete(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    if (item) {
      if (item.type === "background")
        await this._processBackgroundDelete(item);
      return item.delete();
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  async _onItemSummary(event) {
    event.preventDefault();
    const li = $(event.currentTarget).closest(".item");
    const item = this.actor.items.get(li.data("itemId"));
    const chatData = await item.getChatData({ secrets: this.actor.owner });
    if (li.hasClass("expanded")) {
      const summary = li.children(".item-summary");
      summary.slideUp(200, () => summary.remove());
    } else {
      const div = $(`<div class="item-summary">${chatData.description}</div>`);
      const metadata = $(
        `<div class="item-metdata">${chatData.metadatahtml}</div>`
      );
      div.append(metadata);
      li.append(div.hide());
      div.slideDown(200);
    }
    li.toggleClass("expanded");
  }
  /* -------------------------------------------- */
  /** @override */
  async _onDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    if (!data) return false;
    if (data.type === "Item") {
      return this._onDropItem(event, data);
    }
    if (data.type === "Actor") {
      return this._onDropActor(event, data);
    }
  }
  /* -------------------------------------------- */
  /**
   * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
   * @param {DragEvent} event   The drop event
   * @param {Object} data       The data transfer
   * @return {Object}           OwnedItem data _getIndexeso create
   * @private
   */
  async _onDropActor(event, data) {
  }
  /* -------------------------------------------- */
  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @return {Object}             OwnedItem data to create
   * @private
   */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    const item = await Item.implementation.fromDropData(data);
    const actor = this.actor;
    const sameActor = data.actorId === actor.id || actor.isToken && data.tokenId === actor.token.id;
    if (sameActor) return this._onSortItem(event, item);
    if (!game.user.isGM && this.constructor.COMPENDIUM_LOCKED_TYPES.includes(item.type) && !String(data.uuid || "").startsWith("Compendium.")) {
      ui.notifications.warn(
        game.i18n.format("SVNSEA2E.CompendiumOnly", { type: item.type })
      );
      return false;
    }
    const actorHasDrop = await this._doesActorHaveItem(item.type, item.name);
    if (item.type !== "sorcery" && actorHasDrop) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.ItemExists", {
          type: item.type,
          name: item.name
        })
      );
    }
    if (item.type === "background") {
      if (
        // If the background is nation specific the actor must be of the same nation.
        item.system.nation !== "none" && item.system.nation !== this.actor.system.nation || // Glamour Isles backgrounds applies to Highland, Avalon, and Inismore.
        item.system.nation === "gisles" && !isValidGlamorIsles(this.actor)
      ) {
        return ui.notifications.error(
          game.i18n.format("SVNSEA2E.WrongNation", {
            bgnation: game.i18n.localize(
              CONFIG.SVNSEA2E.nations[item.system.nation]
            ),
            anation: game.i18n.localize(
              CONFIG.SVNSEA2E.nations[this.actor.system.nation]
            ),
            name: item.name
          })
        );
      }
      await this._processBackgroundDrop(item);
    }
    return await this.actor.createEmbeddedDocuments("Item", [item]);
  }
  async _updateBackgroundSkills(item, adj) {
    const actorData = this.actor.system;
    const updateData = item.system.skills.reduce((updateData2, skill) => {
      const skillAdjustment = actorData.skills[skill].value + adj;
      const skillValue = Math.max(Math.min(skillAdjustment, 5), 0);
      return { ...updateData2, [`system.skills.${skill}.value`]: skillValue };
    }, {});
    await this.actor.update(updateData);
  }
  /* -------------------------------------------- */
  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param item for the item that has been dropped on the character sheet
   */
  async _processBackgroundDrop(item) {
    const backgroundData = item.system;
    for (const bAdvantage of backgroundData.advantages) {
      const gameAdvantage = game.items.find(
        (gItem) => gItem.name === bAdvantage
      );
      const packAdvantages = await getAllPackAdvantages();
      const packAdvantage = packAdvantages.find(
        (pa) => pa.name.toLowerCase() === bAdvantage.toLowerCase()
      );
      const assignedAdvantage = gameAdvantage || packAdvantage || null;
      if (!assignedAdvantage) {
        ui.notifications.error(
          game.i18n.format("SVNSEA2E.ItemDoesntExist", {
            name: bAdvantage
          })
        );
        continue;
      }
      const actorHas = await this._doesActorHaveItem(
        "advantage",
        assignedAdvantage.name
      );
      if (assignedAdvantage.type !== "sorcery" && actorHas) {
        ui.notifications.error(
          game.i18n.format("SVNSEA2E.ItemExists", {
            type: assignedAdvantage.type,
            name: assignedAdvantage.name
          })
        );
        continue;
      }
      await this.actor.createEmbeddedDocuments("Item", [
        foundry.utils.duplicate(assignedAdvantage)
      ]);
    }
    await this._updateBackgroundSkills(item, 1);
  }
  /* -------------------------------------------- */
  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param itemData data for the item that is being deleted
   */
  async _processBackgroundDelete(item) {
    const bkgData = item.system;
    await this._updateBackgroundSkills(item, -1);
    const charAdvs = await this._getAdvantages();
    for (let i = 0; i < bkgData.advantages.length; i++) {
      for (let j = 0; j < charAdvs.length; j++) {
        if (charAdvs[j].name === bkgData.advantages[i]) {
          await this.actor.deleteEmbeddedDocuments("Item", [charAdvs[j].id]);
        }
      }
    }
  }
  /* -------------------------------------------- */
  /**
   * Determine if the actor as any item records associated with it.
   * @private
   */
  async _doesActorHaveItem(type, name) {
    const found = this.actor.items.find(
      (item) => item.name === name && item.type === type
    );
    return !!found;
  }
  /* -------------------------------------------- */
  /**
   * Retrive the names of advantages
   * @private
   */
  async _getAdvantageNames() {
    return this.actor.items.filter((item) => item.type === "advantage").map((item) => item.name);
  }
  /* -------------------------------------------- */
  /**
   * Retrieve all advantages the character has assigned
   * @private
   */
  async _getAdvantages() {
    return this.actor.items.filter((item) => item.type === "advantage");
  }
  /* -------------------------------------------- */
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onHeroRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actor = this.actor;
    const data = this.actor.system;
    let skillValue = data.skills[dataset.label]["value"];
    let rolldata = {
      threshold: 10,
      explode: false,
      reroll: false,
      skilldice: skillValue
    };
    if (skillValue > 2) rolldata["reroll"] = true;
    if (skillValue >= 4) rolldata["threshold"] = 15;
    if (skillValue === 5 || data.dwounds.value === 3)
      rolldata["explode"] = true;
    const traits = {};
    for (const trait of Object.keys(data.traits)) {
      traits[CONFIG.SVNSEA2E.traits[trait]] = data.traits[trait].value;
    }
    const initialBonusDice = data.dwounds.value >= 1 ? 1 : 0;
    const template = "systems/theah/templates/chats/skill-roll-dialog.hbs";
    const dialogData = { data, traits, initialBonusDice };
    const html = await renderTemplate(template, dialogData);
    const title = game.i18n.format("SVNSEA2E.ApproachPromptTitle", {
      skill: CONFIG.SVNSEA2E.skills[dataset.label]
    });
    return new Promise((resolve) => {
      new Dialog(
        {
          title,
          content: html,
          buttons: {
            roll: {
              icon: '<img src="systems/theah/icons/d10.svg" class="d10">',
              label: game.i18n.localize("SVNSEA2E.Roll"),
              callback: (html2) => roll({
                rolldata,
                actor,
                data,
                form: html2[0].querySelector("form"),
                template: "systems/theah/templates/chats/roll-card.hbs",
                title: game.i18n.format("SVNSEA2E.ApproachRollChatTitle", {
                  trait: html2[0].querySelector("form").trait[html2[0].querySelector("form").trait.selectedIndex].text,
                  skill: CONFIG.SVNSEA2E.skills[dataset.label]
                })
              })
            }
          }
        },
        {}
      ).render(true);
    });
  }
  /* -------------------------------------------- */
  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onVillainRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actor = this.actor;
    const data = this.actor.system;
    let rolldata = {
      threshold: 10,
      explode: false,
      reroll: false,
      skilldice: 0
    };
    const template = "systems/theah/templates/chats/trait-roll-dialog.hbs";
    const initialBonusDice = data.dwounds.value >= 1 ? 1 : 0;
    const dialogData = {
      data,
      traitmax: data.villainy,
      initialBonusDice
    };
    const html = await renderTemplate(template, dialogData);
    const title = game.i18n.format("SVNSEA2E.TraitRollTitle", {
      trait: CONFIG.SVNSEA2E.traits[dataset.label]
    });
    return new Promise(() => {
      new Dialog(
        {
          title,
          content: html,
          buttons: {
            roll: {
              icon: '<img src="systems/theah/icons/d10.svg" class="d10">',
              label: game.i18n.localize("SVNSEA2E.Roll"),
              callback: (html2) => roll({
                rolldata,
                actor,
                data,
                form: html2[0].querySelector("form"),
                template: "systems/theah/templates/chats/roll-card.hbs",
                title
              })
            }
          }
        },
        {}
      ).render(true);
    });
  }
  /* -------------------------------------------- */
  /**
   * 7th Sea Raises engine: greedily group the dice into sets that each sum to
   * at least the threshold. Ported verbatim from the design preview so the
   * on-sheet roller behaves exactly like the gold-standard mock-up.
   * @param {number[]} dice        The rolled d10 face values.
   * @param {number} threshold     Sum needed per Raise (10 / 15 / 20).
   * @returns {{raises:number, combos:string[], used:number[]}}
   */
  static computeRaises(dice, threshold) {
    const arr = [...dice].sort((a, b) => b - a);
    const used = [];
    const combos = [];
    let raises = 0;
    while (arr.length) {
      const set = [arr.shift()];
      while (set.reduce((a, b) => a + b, 0) < threshold && arr.length) {
        set.push(arr.pop());
      }
      const sum = set.reduce((a, b) => a + b, 0);
      if (sum >= threshold) {
        raises++;
        combos.push(set.join("+"));
        used.push(...set);
      } else {
        break;
      }
    }
    return { raises, combos, used };
  }
  /* -------------------------------------------- */
  /**
   * Build the dice-tile row markup, flagging the dice consumed by Raises and
   * highlighting natural 10s.
   * @param {number[]} dice   Rolled values.
   * @param {number[]} used   Dice consumed by Raises.
   * @returns {string}
   */
  static renderDiceRow(dice, used) {
    const usedCopy = [...used];
    return dice.slice().sort((a, b) => b - a).map((d) => {
      let cls = "die" + (d === 10 ? " ten" : "");
      const idx = usedCopy.indexOf(d);
      if (idx > -1) {
        cls += " used";
        usedCopy.splice(idx, 1);
      }
      return `<div class="${cls}">${d}</div>`;
    }).join("");
  }
  /* -------------------------------------------- */
  /**
   * Recompute and display the pool size for the on-sheet roller.
   * @param {HTMLElement} rollerEl   The `.roller` container.
   * @private
   */
  _updatePoolFormula(rollerEl) {
    const t = parseInt(rollerEl.querySelector(".rp-trait")?.value) || 0;
    const s = parseInt(rollerEl.querySelector(".rp-skill")?.value) || 0;
    const el = rollerEl.querySelector(".pool-count");
    if (el) el.textContent = t + s;
  }
  /* -------------------------------------------- */
  /**
   * Roll the assembled dice pool, resolve Raises, render the result inline and
   * post a matching chat card.
   * @param {Event} event   The originating click event.
   * @private
   */
  async _onPoolRoll(event) {
    event.preventDefault();
    const rollerEl = event.currentTarget.closest(".roller");
    const traitSel = rollerEl.querySelector(".rp-trait");
    const skillSel = rollerEl.querySelector(".rp-skill");
    const t = parseInt(traitSel?.value) || 0;
    const s = parseInt(skillSel?.value) || 0;
    const threshold = parseInt(rollerEl.querySelector(".rp-threshold")?.value) || 10;
    const pool = t + s;
    if (pool <= 0) {
      return ui.notifications.warn(game.i18n.localize("SVNSEA2E.PoolEmpty"));
    }
    const r = new Roll(`${pool}d10`);
    await r.evaluate();
    if (game.dice3d) {
      try {
        await game.dice3d.showForRoll(r, game.user, true);
      } catch (e) {
      }
    }
    const dice = r.dice[0].results.map((d) => d.result);
    const { raises, combos, used } = this.constructor.computeRaises(dice, threshold);
    const diceHtml = this.constructor.renderDiceRow(dice, used);
    const combosText = combos.length ? combos.join("   \xB7   ") : game.i18n.localize("SVNSEA2E.NoRaises");
    rollerEl.querySelector(".dice").innerHTML = diceHtml;
    rollerEl.querySelector(".big").textContent = raises;
    rollerEl.querySelector(".combos").textContent = combosText;
    rollerEl.querySelector(".result").classList.add("show");
    const traitLabel = traitSel ? traitSel.options[traitSel.selectedIndex].text.split(" ")[0] : "";
    const skillLabel = skillSel ? skillSel.options[skillSel.selectedIndex].text.split(" ")[0] : "";
    const raisesLabel = game.i18n.localize("SVNSEA2E.RaisesLabel");
    const content = `
      <div class="theah theah-pool">
        <div class="pool-head">${skillLabel} <b>${s}</b> + ${traitLabel} <b>${t}</b> = <b>${pool}</b>d10 &middot; ${game.i18n.localize("SVNSEA2E.Threshold")} <b>${threshold}</b></div>
        <div class="pool-body">
          <div class="dice">${diceHtml}</div>
          <div class="raises"><span class="big">${raises}</span><div><div class="lab">${raisesLabel}</div><div class="combos">${combosText}</div></div></div>
        </div>
      </div>`;
    await postThemedChat({ actor: this.actor, content, rolls: [r], sound: CONFIG.sounds.dice });
  }
  /* -------------------------------------------- */
};

// src/actor/sheets/brute.js
var ActorSheetSS2eBrute = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "brute"],
      template: "systems/theah/templates/actors/brute.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentS: "ability"
        }
      ]
    });
  }
};

// src/actor/sheets/dangerpts.js
var ActorSheetSS2eDangerPts = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor"],
      template: "systems/theah/templates/actors/dangerpts.hbs",
      tabs: [
        {
          contentSelector: ".sheet-body"
        }
      ],
      width: 450,
      height: 250
    });
  }
  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {JQuery} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".dpminus").on("click", this._decreaseDP.bind(this, 1));
    html.find(".dpmminus").on("click", this._decreaseDP.bind(this, 2));
    html.find(".dpplus").on("click", this._increaseDP.bind(this, 1));
    html.find(".dppplus").on("click", this._increaseDP.bind(this, 2));
  }
  _decreaseDP(value, event) {
    let dp = 0;
    if (this.actor.system.points > value) {
      dp = parseInt(this.actor.system.points) - parseInt(value);
    }
    this.actor.update({
      system: {
        points: dp
      }
    }).then(this.render(false));
  }
  _increaseDP(value, event) {
    const dp = parseInt(this.actor.system.points) + parseInt(value);
    this.actor.update({
      system: {
        points: dp
      }
    }).then(this.render(false));
  }
};

// src/actor/sheets/hero.js
var ActorSheetSS2eHero = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "hero"],
      template: "systems/theah/templates/actors/hero.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareHeroItems(data, sheetData) {
    sheetData.skills = skillsToSheetData(data.document.system, CONFIG);
    sheetData.advantages = getItems(data, "advantage");
    sheetData.backgrounds = getItems(data, "background");
    sheetData.sorcery = getItems(data, "sorcery");
    sheetData.secretsocieties = getItems(data, "secretsociety");
    sheetData.stories = getItems(data, "story");
    sheetData.duelstyles = getItems(data, "duelstyle");
    sheetData.artifacts = getItems(data, "artifact");
    sheetData.virtues = getItems(data, "virtue");
    sheetData.hubriss = getItems(data, "hubris");
  }
};

// src/actor/sheets/monster.js
var ActorSheetSS2eMonster = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "monster"],
      template: "systems/theah/templates/actors/monster.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "features"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actor The actor data to prepare.
   * @param {Object} sheetData The sheet to prepare.
   *
   * @return {undefined}
   */
  _prepareMonsterItems(data, sheetData) {
    sheetData.fear = data.document.system.fear;
    sheetData.monsterqualities = getItems(data, "monsterquality");
    sheetData.virtues = getItems(data, "virtue");
    sheetData.hubriss = getItems(data, "hubris");
  }
};

// src/actor/sheets/playercharacter.js
var ActorSheetSS2ePlayerCharacter = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "pc"],
      template: "systems/theah/templates/actors/playercharacter.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(data, sheetData) {
    sheetData.skills = skillsToSheetData(data.document.system, CONFIG);
    sheetData.advantages = getItems(data, "advantage");
    sheetData.backgrounds = getItems(data, "background");
    sheetData.sorcery = getItems(data, "sorcery");
    sheetData.secretsocieties = getItems(data, "secretsociety");
    sheetData.stories = getItems(data, "story");
    sheetData.duelstyles = getItems(data, "duelstyle");
    sheetData.artifacts = getItems(data, "artifact");
    sheetData.virtues = getItems(data, "virtue");
    sheetData.hubriss = getItems(data, "hubris");
  }
};

// src/actor/sheets/ship.js
var ActorSheetSS2eShip = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "ship"],
      template: "systems/theah/templates/actors/ship.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "roster"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareShipItems(data, sheetData) {
    const actorData = data.document.system;
    sheetData.adventures = getItems(data, "shipadventure");
    sheetData.backgrounds = getItems(data, "shipbackground");
    sheetData.origin = actorData.origin;
    sheetData.class = actorData.class;
    sheetData.crewstatus = actorData.crewstatus;
    sheetData.cargo = actorData.cargo;
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
        label: game.i18n.localize("SVNSEA2E.Captain"),
        cssClass: "captain",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "captain"
        }
      },
      firstmate: {
        label: game.i18n.localize("SVNSEA2E.FirstMate"),
        cssClass: "firstmate",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "firstmate"
        }
      },
      quartermaster: {
        label: game.i18n.localize("SVNSEA2E.QuaterMaster"),
        cssClass: "quartermaster",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "quartermaster"
        }
      },
      accountant: {
        label: game.i18n.localize("SVNSEA2E.Accountant"),
        cssClass: "accountant",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "accountant"
        }
      },
      boatswain: {
        label: game.i18n.localize("SVNSEA2E.Boatswain"),
        cssClass: "boatswain",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "boatswain"
        }
      },
      shipsmaster: {
        label: game.i18n.localize("SVNSEA2E.ShipsMaster"),
        cssClass: "shipsmaster",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "shipsmaster"
        }
      },
      captaintops: {
        label: game.i18n.localize("SVNSEA2E.CaptainTops"),
        cssClass: "captaintops",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "captaintops"
        }
      },
      surgeon: {
        label: game.i18n.localize("SVNSEA2E.Surgeon"),
        cssClass: "surgeon",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "surgeon"
        }
      },
      cook: {
        label: game.i18n.localize("SVNSEA2E.Cook"),
        cssClass: "cook",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "cook"
        }
      },
      mastergunner: {
        label: game.i18n.localize("SVNSEA2E.MasterGunner"),
        cssClass: "mastergunner",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "mastergunner"
        }
      },
      mastermariner: {
        label: game.i18n.localize("SVNSEA2E.MasterMariner"),
        cssClass: "mastermariner",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "mastermariner"
        }
      },
      midshipmen: {
        label: game.i18n.localize("SVNSEA2E.Midshipmen"),
        cssClass: "midshipmen",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "midshipmen"
        }
      },
      powdermonkey: {
        label: game.i18n.localize("SVNSEA2E.PowderMonkey"),
        cssClass: "powdermonkey",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "powdermonkey"
        }
      },
      ableseaman: {
        label: game.i18n.localize("SVNSEA2E.AbleSeaman"),
        cssClass: "ableseaman",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "ableseaman"
        }
      },
      seaman: {
        label: game.i18n.localize("SVNSEA2E.Seaman"),
        cssClass: "seaman",
        actors: [],
        dataset: {
          type: "shipsCrew",
          role: "seaman"
        }
      }
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
      surgeon
    ] = theah.shipsCrew.members.reduce(
      (arr, id) => {
        const actor = game.actors.get(id);
        if (!actor) return arr;
        const crewMember = actor.getFlag("theah", "crewMember") || null;
        if (!crewMember) return arr;
        if (crewMember.role === "ableseaman") arr[0].push(actor);
        else if (crewMember.role === "accountant") arr[1].push(actor);
        else if (crewMember.role === "boatswain") arr[2].push(actor);
        else if (crewMember.role === "captain") arr[3].push(actor);
        else if (crewMember.role === "captaintops") arr[4].push(actor);
        else if (crewMember.role === "cook") arr[5].push(actor);
        else if (crewMember.role === "firstmate") arr[6].push(actor);
        else if (crewMember.role === "mastergunner") arr[7].push(actor);
        else if (crewMember.role === "mastermariner") arr[8].push(actor);
        else if (crewMember.role === "midshipmen") arr[9].push(actor);
        else if (crewMember.role === "powdermonkey") arr[10].push(actor);
        else if (crewMember.role === "quartermaster") arr[11].push(actor);
        else if (crewMember.role === "seaman") arr[12].push(actor);
        else if (crewMember.role === "shipsmaster") arr[13].push(actor);
        else if (crewMember.role === "surgeon") arr[14].push(actor);
        return arr;
      },
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
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
    sheetData.crew = Object.values(crew);
  }
  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {HTML} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) return;
    html.find(".roster .item-delete").click(this._onRemoveFromCrew.bind(this));
    const crewhandler = (ev) => this._onDragCrewStart(ev);
    html.find(".roster li.item").each((i, li) => {
      li.setAttribute("draggable", true);
      li.addEventListener("dragstart", crewhandler, false);
    });
    html.find(".roster .items-list").each((i, li) => {
      li.addEventListener("dragover", this._onCrewDragOver.bind(this), false);
    });
    html.find(".roster li.item-header").each((i, li) => {
      li.addEventListener("dragenter", this._onCrewDragEnter, false);
      li.addEventListener("dragleave", this._onCrewDragLeave, false);
    });
  }
  /** @override */
  async _onDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    if (!data) return false;
    if (data.type === "Item") {
      return this._onDropItem(event, data);
    }
    if (data.type === "Actor") {
      return this._onCrewDrop(event, data);
    }
  }
  /**
   * Handles drop events for the Crew list
   *
   * @param {Event}  event The originating drop event
   * @param {object} data  The data transfer object.
   */
  async _onCrewDrop(event, data) {
    event.preventDefault();
    $(event.target).css("background", "");
    if (!data.uuid) return false;
    const c = this.actor.getFlag("theah", "shipsCrew");
    let crew;
    if (c) crew = foundry.utils.duplicate(c);
    else {
      crew = {
        members: []
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
    this.actor.update({
      "flags.theah.shipsCrew": crew
    }).then(this.render(false));
    return false;
  }
  /**
   * Handles dragenter for the crews tab
   * @param {Event} event The originating dragenter event
   */
  _onCrewDragEnter(event) {
    $(event.target).css("background", "rgba(0,0,0,0.3)");
  }
  /**
   * Handles dragleave for the crews tab
   * @param {Event} event The originating dragleave event
   */
  _onCrewDragLeave(event) {
    $(event.target).css("background", "");
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
      type: "Actor",
      id: actor.id,
      data: actor.data
    };
    if (this.actor.isToken) dragData.tokenId = actorId;
    event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
  }
  /**
   * Handles ondragover for crew drag-n-drop
   *
   * @param {Event} event Orgininating ondragover event
   */
  _onCrewDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
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
    const actorId = $(event.currentTarget).parents(".item").data("actorId");
    const actor = game.actors.get(actorId);
    await actor.removeFromCrew();
    const shipsCrew = this.actor.getFlag("theah", "shipsCrew");
    if (!shipsCrew) return;
    const updateData = shipsCrew.members.filter((val) => val !== actor.id);
    await this.actor.update({
      "flags.theah.shipsCrew.members": updateData
    });
  }
};

// src/actor/sheets/villain.js
var ActorSheetSS2eVillain = class extends ActorSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "actor", "villain"],
      template: "systems/theah/templates/actors/villain.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "traits"
        }
      ]
    });
  }
  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareVillainItems(data, sheetData) {
    sheetData.villainy = data.document.system.villainy;
    sheetData.advantages = getItems(data, "advantage");
    sheetData.artifacts = getItems(data, "artifact");
    sheetData.sorcery = getItems(data, "sorcery");
    sheetData.schemes = getItems(data, "scheme");
    sheetData.virtues = getItems(data, "virtue");
    sheetData.hubriss = getItems(data, "hubris");
    sheetData.monsterqualities = getItems(data, "monsterquality");
  }
};

// src/item/item.js
var SvnSea2EItem = class extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
    const itemData = this.system;
    if (this.type === ItemTypes.SCHEME) {
      this._prepareSchemeData(itemData);
    } else if (itemData.type === ItemTypes.ADVANTAGE) {
      this._prepareAdvantageData(itemData);
    }
  }
  /**
   * Prepare an object of chat data used to display a card for the Item in the chat log
   * @param {Object} htmlOptions    Options used by the TextEditor.enrichHTML function
   * @return {Object}               An object of chat data to render
   */
  async getChatData(htmlOptions) {
    const data = foundry.utils.duplicate(this.system);
    data.metadatahtml = "";
    data.description = await TextEditor.enrichHTML(data.description, {
      htmlOptions,
      async: true
    });
    const fn = this[`_${this.type}ChatData`];
    if (fn) fn.bind(this)(data, htmlOptions);
    return data;
  }
  /**
   * Prepare chat data for an advantage
   * @param {Object} data    Options used by the TextEditor.enrichHTML function
   * @return {Object}               An object of chat data to render
   */
  _advantageChatData(data, htmlOptions) {
    const pts = data.cost.normal === 1 ? game.i18n.localize("SVNSEA2E.Point") : game.i18n.localize("SVNSEA2E.Points");
    data.metadatahtml = `<ul class="details-list"><li class="tag">${data.cost.normal} ${pts}</li>`;
    data.metadatahtml += data.cost.specreq ? '<li class="tag">' + data.cost.specreq + "</li>" : "";
    data.metadatahtml += data.knack ? '<li class="tag">' + game.i18n.localize("SVNSEA2E.Knack") + "</li>" : "";
    data.metadatahtml += data.innate ? '<li class="tag">' + game.i18n.localize("SVNSEA2E.Innate") + "</li>" : "";
    data.metadatahtml += "</ul>";
    return data;
  }
  _artifactChatData(data, htmlOptions) {
    const artifactType = data.artifactType === "none" ? "" : CONFIG.SVNSEA2E.artifactTypes[data.artifactType];
    data.metadatahtml = `<ul class="details-list"><li class="tag">${artifactType}</li></ul>`;
    return data;
  }
  _backgroundChatData(data, htmlOptions) {
    let skillNames = "";
    data.skills.forEach(
      (skl) => skillNames += `<li class="tag">${CONFIG.SVNSEA2E.skills[skl]}</li>`
    );
    let advNames = "";
    for (let i = 0; i < data.advantages.length; i++) {
      advNames += `<li class="tag">${data.advantages[i]}</li>`;
    }
    data.metadatahtml = `<h5>${game.i18n.localize("SVNSEA2E.Quirk")}</h5>
    <p>${data.quirk}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Skills")}</h5>
    <ul class="skills-list">
    ${skillNames}
    </ul>
    <h5>${game.i18n.localize("SVNSEA2E.Advantages")}</h5>
    <ul class="advantages-list">
    ${advNames}
    </ul>
`;
    return data;
  }
  _duelstyleChatData(data, htmlOptions) {
    data.metadatahtml = `
    <h5>${game.i18n.format("SVNSEA2E.Bonus")}</h5>
    <p>${data.bonus}</p>
      `;
    return data;
  }
  _schemeChatData(data, htmlOptions) {
    data.metadatahtml = "<p>" + game.i18n.format("SVNSEA2E.ChatInfluence", {
      influence: data.influence.toString()
    }) + "</p>";
    return data;
  }
  _secretsocietyChatData(data, htmlOptions) {
    data.metadatahtml = `
    <h5>${game.i18n.localize("SVNSEA2E.Concern")}</h5>
    <p>${data.concern}</p>
    <h5>${game.i18n.localize("SVNSEA2E.EarnFavor")}</h5>
    <p>${data.earnfavor}</p>
    <h5>${game.i18n.localize("SVNSEA2E.UseFavor")}</h5>
    <p>${data.callupon}</p>
`;
    return data;
  }
  _sorceryChatData(data, htmlOptions) {
    data.metadatahtml = `
    <ul class="tag-list">
    <li class="tag">${CONFIG.SVNSEA2E.sorceryTypes[data.sorctype]}</li>
    <li class="tag">${CONFIG.SVNSEA2E.sorcerySubcats[data.sorcsubcat]} ${CONFIG.SVNSEA2E.sorceryCats[data.sorccat]}</li>
    <li class="tag">${game.i18n.localize("SVNSEA2E.Duration")}: ${CONFIG.SVNSEA2E.durations[data.sorcdur]}</li>
    </ul>
`;
    return data;
  }
  _storyChatData(data, htmlOptions) {
    data.metadatahtml = `
    <h5>${game.i18n.localize("SVNSEA2E.Status")}</h5>
    <p>${CONFIG.SVNSEA2E.storyStatuses[data.status]}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Endings")}</h5>
    <p>${data.endings}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Steps")}</h5>
    <p>${data.steps}</p>
    <h5>${game.i18n.localize("SVNSEA2E.Reward")}</h5>
    <p>${data.reward}</p>
`;
    return data;
  }
  _validateMinMaxData(value, min, max) {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    }
    return value;
  }
  /**
   * Prepare advantage type specific data
   */
  _prepareAdvantageData(data) {
    data.cost.norm = this._validateMinMaxData(
      data.cost.norm,
      data.cost.min,
      data.cost.max
    );
  }
  /**
   * Prepare scheme type specific data
   */
  _prepareSchemeData(data) {
    data.influence.value = this._validateMinMaxData(
      data.influence.value,
      data.influence.min,
      data.influence.max
    );
  }
};

// src/apps/skill-selector.js
var SkillSelector = class extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "skill-selector",
      classes: ["theah"],
      title: game.i18n.localize("SVNSEA2E.BackgroundSkillSelect"),
      template: "systems/theah/templates/apps/skill-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const skills = this.object.system.skills;
    const choices = foundry.utils.duplicate(this.options.choices);
    for (const [k, v] of Object.entries(choices)) {
      choices[k] = {
        label: v,
        chosen: skills ? skills.includes(k) : false
      };
    }
    return {
      choices
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(event, formData) {
    const updateData = {};
    const chosen = [];
    for (const [k, v] of Object.entries(formData)) {
      if (v) {
        chosen.push(k);
      }
    }
    updateData["system.skills"] = chosen;
    if (this.options.minimum && chosen.length < this.options.minimum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    }
    if (this.options.maximum && chosen.length > this.options.maximum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    }
    this.object.update(updateData);
  }
};

// src/apps/advantage-selector.js
var AdvantageSelector = class extends FormApplication {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "advantage-selector",
      classes: ["theah"],
      title: game.i18n.localize("SVNSEA2E.BackgroundAdvantageSelect"),
      template: "systems/theah/templates/apps/advantage-selector.hbs",
      width: 320,
      height: "auto",
      choices: {},
      minimum: 0,
      maximum: null
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData() {
    const advantages = this.object.system.advantages;
    const choices = foundry.utils.duplicate(this.options.choices);
    for (const [k, v] of Object.entries(choices)) {
      choices[k] = {
        label: v,
        chosen: advantages ? advantages.includes(v) : false
      };
    }
    return {
      choices
    };
  }
  /* -------------------------------------------- */
  /** @override */
  _updateObject(event, formData) {
    const updateData = {};
    const chosen = [];
    for (const [k, v] of Object.entries(formData)) {
      if (v) {
        chosen.push(k);
      }
    }
    updateData["system.advantages"] = chosen;
    if (this.options.minimum && chosen.length < this.options.minimum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          min: this.options.minimum
        })
      );
    }
    if (this.options.maximum && chosen.length > this.options.maximum) {
      return ui.notifications.error(
        game.i18n.format("SVNSEA2E.AtLeastOptions", {
          max: this.options.maximum
        })
      );
    }
    this.object.update(updateData);
  }
};

// src/item/sheets/base.js
var ItemSheetSS2e = class extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["theah", "sheet", "item"],
      width: 600,
      height: 700
    });
  }
  /* -------------------------------------------- */
  /** @override */
  getData(options) {
    const data = super.getData(options);
    const item = data.document;
    const itemData = item.system;
    const { isOwner } = this.document;
    const sheetData = {
      owner: isOwner,
      itemType: SVNSEA2E.itemTypes[item.type],
      options: this.options,
      editable: this.isEditable,
      cssClass: isOwner ? "editable" : "locked",
      config: CONFIG.SVNSEA2E,
      dtypes: ["String", "Number", "Boolean"],
      name: item.name,
      img: item.img,
      type: item.type,
      infosource: itemData.infosource,
      description: itemData.description,
      quirk: itemData.quirk
    };
    if (item.type === "background") {
      sheetData.selectedskills = itemData.skills.map(
        (s) => CONFIG.SVNSEA2E.skills[s]
      );
      sheetData.selectedadvantages = itemData.advantages;
      sheetData.nation = itemData.nation;
    } else if (item.type === "advantage") {
      sheetData.normalCost = itemData.cost.normal;
      sheetData.reducedCost = itemData.cost.reducecost;
      sheetData.knack = itemData.knack;
      sheetData.innate = itemData.innate;
    } else if (item.type === "duelstyle") {
      sheetData.bonus = itemData.bonus;
    } else if (item.type === "scheme") {
      sheetData.influence = itemData.influence;
    } else if (item.type === "secretsociety") {
      sheetData.concern = itemData.concern;
      sheetData.favor = itemData.favor;
      sheetData.earnFavor = itemData.earnfavor;
      sheetData.callUpon = itemData.callupon;
    } else if (item.type === "sorcery") {
      sheetData.sorceryType = itemData.sorctype;
      sheetData.sorceryDuration = itemData.sorcdur;
      sheetData.sorceryCategory = itemData.sorccat;
      sheetData.sorcerySubCategory = itemData.sorcsubcat;
    } else if (item.type === "story") {
      sheetData.storyStatus = itemData.status;
      sheetData.reward = itemData.reward;
      sheetData.endings = itemData.endings;
      sheetData.steps = itemData.steps;
    } else if (item.type === "artifact") {
      sheetData.artifactType = itemData.artifactType;
    }
    return sheetData;
  }
  /* -------------------------------------------- */
  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }
  /* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".skill-selector").on("click", this._onSkillSelector.bind(this));
    html.find(".advantage-selector").on("click", this._onAdvantageSelector.bind(this));
  }
  /* -------------------------------------------- */
  _advCompare(object, value) {
    for (const property in object) {
      if (object[property] === value) {
        return true;
      }
    }
    return false;
  }
  async _getAllAdvantages() {
    const advantages = [];
    const items = game.items.directory.documents;
    for (let i2 = 0; i2 < items.length; i2++) {
      if (items[i2].type === "advantage") {
        advantages.push(items[i2].name);
      }
    }
    const packs = game.packs.entries;
    const worldAdv = foundry.utils.duplicate(advantages);
    for (var i = 0; i < packs.length; i++) {
      const pack = packs[i];
      if (pack.metadata.entity === "Item") {
        const pitems = await pack.getIndex();
        for (let j = 0; j < pitems.length; j++) {
          const document2 = await pack.getDocument(pitems[j]._id);
          const entry = document2.data;
          if (entry.type === "advantage" && !worldAdv.includes(entry.name)) {
            advantages.push(entry.name);
          }
        }
      }
    }
    return advantages;
  }
  /* -------------------------------------------- */
  /**
   * Handle spawning the skillSelector application which allows a checkbox of multiple skill options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onSkillSelector(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const options = {
      title: game.i18n.localize("SVNSEA2E.Skills"),
      choices: CONFIG.SVNSEA2E[a.dataset.options]
    };
    new SkillSelector(this.item, options).render(true);
  }
  /* -------------------------------------------- */
  /**
   * Handle spawning the advantageSelector application which allows a checkbox of multiple advantage options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  async _onAdvantageSelector(event) {
    event.preventDefault();
    const options = {
      title: game.i18n.localize("SVNSEA2E.Advantages"),
      choices: await this._getAllAdvantages()
    };
    new AdvantageSelector(this.item, options).render(true);
  }
};

// src/item/sheets/advantage.js
var ItemSheetSS2eAdvantage = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/advantage.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/artifact.js
var ItemSheetSS2eArtifact = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/artifact.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/background.js
var ItemSheetSS2eBackground = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/background.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/duelstyle.js
var ItemSheetSS2eDuelStyle = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/duelstyle.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/monsterquality.js
var ItemSheetSS2eMonsterQuality = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/monsterquality.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/scheme.js
var ItemSheetSS2eScheme = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/scheme.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/secretsociety.js
var ItemSheetSS2eSecretSociety = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/secretsociety.hbs",
      width: 800,
      height: 700,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/shipadventure.js
var ItemSheetSS2eShipAdventure = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/shipadventure.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/shipbackground.js
var ItemSheetSS2eShipBackground = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/shipbackground.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/sorcery.js
var ItemSheetSS2eSorcery = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/sorcery.hbs",
      width: 750,
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/story.js
var ItemSheetSS2eStory = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/story.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/eventhandler.js
function chatEventHandler() {
  $(document).find("#chat").on("click", ".initiative-tracker-add", _onAddToInitiativeTracker);
}
function _onAddToInitiativeTracker(event) {
  event.stopPropagation();
  event.preventDefault();
  console.log("7th Sea 2E | Add to initiative tracker");
  const dataset = event.currentTarget.dataset;
  updateInitiative(dataset.actor, dataset.raise);
}

// src/item/sheets/hubris.js
var ItemSheetSS2eHubris = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/arcana.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/item/sheets/virtue.js
var ItemSheetSS2eVirtue = class extends ItemSheetSS2e {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/theah/templates/items/arcana.hbs",
      tabs: [
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "description"
        }
      ]
    });
  }
};

// src/migration.js
var migration_exports = {};
__export(migration_exports, {
  migrateActorData: () => migrateActorData,
  migrateCompendium: () => migrateCompendium,
  migrateHubris: () => migrateHubris,
  migrateItemData: () => migrateItemData,
  migrateSceneData: () => migrateSceneData,
  migrateVirtue: () => migrateVirtue,
  migrateWorld: () => migrateWorld
});
var migrateWorld = async function() {
  ui.notifications.info(
    `Applying 7th Sea 2E System Migration for version ${game.system.version}. Please be patient and do not close your game or shut down your server.`,
    {
      permanent: true
    }
  );
  for (const a of game.actors.values()) {
    try {
      const updateData = migrateActorData(a);
      if (!foundry.utils.isEmpty(updateData)) {
        console.log(`Migrating Actor entity ${a.name}`);
        await a.update(updateData, {
          enforceTypes: false,
          theahSilent: true
          // don't fire wound chat cards during migration
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  for (const i of game.items.values()) {
    try {
      const updateData = migrateItemData(i);
      if (!foundry.utils.isEmpty(updateData)) {
        console.log(`Migrating Item entity ${i.name}`);
        await i.update(updateData, {
          enforceTypes: false
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
  const packs = game.packs.filter((p) => {
    return p.metadata.package === "world" && ["Actor", "Item", "Scene"].includes(p.metadata.entity);
  });
  for (let p of packs) {
    await migrateCompendium(p);
  }
  game.settings.set("theah", "systemMigrationVersion", game.system.version);
  ui.notifications.info(
    `7th Sea 2E System Migration to version ${game.system.version} completed!`,
    {
      permanent: true
    }
  );
};
var migrateCompendium = async function(pack) {
  const entity = pack.metadata.entity;
  if (!["Actor", "Item", "Scene"].includes(entity)) return;
  await pack.migrate();
  for (let ent of pack) {
    try {
      let updateData = null;
      if (entity === "Item") updateData = migrateItemData(ent.data);
      else if (entity === "Actor") updateData = migrateActorData(ent.data);
      else if (entity === "Scene") updateData = migrateSceneData(ent.data);
      if (!foundry.utils.isEmpty(updateData)) {
        expandObject(updateData);
        updateData["_id"] = ent._id;
        await pack.updateEntity(updateData);
        console.log(
          `Migrated ${entity} entity ${ent.name} in Compendium ${pack.collection}`
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log(
    `Migrated all ${entity} entities from Compendium ${pack.collection}`
  );
};
var migrateActorData = function(actor) {
  const updateData = {};
  if (actor.type === ActorType.PLAYER && actor.system.wealth == null) {
    updateData["system.wealth"] = 0;
  }
  if ((actor.type === ActorType.PLAYER || actor.type === ActorType.HERO) && actor.system.wounds.max != 16) {
    updateData["system.wounds.max"] = 16;
    if (actor.system.wounds.value > 16) updateData["system.wounds.value"] = 16;
  }
  if ((actor.type === ActorType.PLAYER || actor.type === ActorType.HERO || actor.type === ActorType.VILLAIN) && actor.system.nation === "rahuris") {
    updateData["system.nation"] = "rahuri";
  }
  if ((actor.type === ActorType.VILLAIN || actor.type === ActorType.MONSTER) && actor.system.traits.strength.max != 20) {
    updateData["system.traits.strength.max"] = 20;
    updateData["system.traits.influence.max"] = 20;
    updateData["system.traits.influence.min"] = 0;
  }
  if (actor.type === ActorType.BRUTE && actor.system.traits.strength.max != 20) {
    updateData["system.traits.strength.max"] = 20;
  }
  if (actor.type === ActorType.DANGERPOINTS && actor.system.points < 5) {
    updateData["system.points"] = 5;
  }
  if (actor.type === ActorType.MONSTER && actor.system.fear.max != 5) {
    updateData["system.fear.value"] = 0;
    updateData["system.fear.min"] = 0;
    updateData["system.fear.max"] = 5;
  }
  if (actor.type === ActorType.SHIP) {
    if (actor.system.crewstatus == null) {
      updateData["system.crewstatus"] = "";
    }
    if (actor.system.wealth == null) {
      updateData["system.wealth"] = "0";
    }
  }
  if (actor.type === ActorType.PLAYER || actor.type === ActorType.HERO || actor.type === ActorType.VILLAIN) {
    if (actor.system.arcana) {
      migrateVirtue(actor);
      migrateHubris(actor);
      actor.update({ "system.arcana": null }, { theahSilent: true });
    }
  }
  return updateData;
};
var migrateItemData = function(item) {
  const updateData = {};
  if (item.type === "secretsociety" && typeof item.system.favor === "undefined") {
    updateData["system.favor"] = 0;
  }
  if (item.type === "story" && typeof item.system.status === "undefined") {
    updateData["system.status"] = "current";
  }
  return updateData;
};
var migrateSceneData = function(scene) {
  return {};
};
var migrateVirtue = function(actor) {
  const virtue = actor.system.arcana.virtue;
  if (virtue.name) {
    const itemData = {
      name: virtue.name,
      img: `systems/theah/icons/item.svg`,
      type: "virtue",
      data: {
        description: virtue.description
      }
    };
    actor.document.createEmbeddedDocuments("Item", [itemData]);
  }
};
var migrateHubris = function(actor) {
  const hubris = actor.system.arcana.hubris;
  if (hubris.name) {
    const itemData = {
      name: hubris.name,
      img: `systems/theah/icons/item.svg`,
      type: "hubris",
      data: {
        description: hubris.description
      }
    };
    actor.document.createEmbeddedDocuments("Item", [itemData]);
  }
};

// src/toolbox/socket.js
var SOCKET_NAME = "system.theah";
var actions = {
  characterChange: "characterChanged"
};
function emitCharacterChange() {
  game.theah.toolbox.refresh();
  game.socket.emit(SOCKET_NAME, {
    type: actions.characterChange
  });
}

// src/toolbox/toolbox.js
var Toolbox = class extends FormApplication {
  /**
   * Settings
   */
  object = {};
  /**
   * Assign the default options
   * @override
   */
  static get defaultOptions() {
    const x = $(window).width();
    const y = $(window).height();
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "svnsea-toolbox",
      classes: ["toolbox"],
      template: "systems/theah/templates/toolbox/toolbox.hbs",
      title: game.i18n.localize("SVNSEA2E.Toolbox"),
      left: x - 650,
      top: 20,
      width: 300,
      closeOnSubmit: false,
      submitOnClose: false,
      submitOnChange: true,
      minimizable: true,
      resizable: true,
      dragDrop: [{ dropSelector: ".items" }]
    });
  }
  /**
   * Constructor
   * @param {ApplicationOptions} options
   */
  constructor(options = {}) {
    super(options);
    this._initialize();
  }
  /**
   * Refresh data (used from socket)
   */
  async refresh() {
    if (!game.user.isGM) {
      return;
    }
    this.object.showActors = this.object.items.map(
      (it) => game.actors.find((a) => `Actor.${a.id}` === it)
    );
    this.render(false);
  }
  /**
   * Initialize the values
   * @private
   */
  _initialize() {
    this.object = {
      items: []
    };
  }
  /**
   * @override
   */
  render(force = false, options = {}) {
    if (!game.user.isGM) {
      return;
    }
    this.position.height = "auto";
    return super.render(force, options);
  }
  /**
   * Construct and return the data object used to render the HTML template for this form application.
   * @param options
   * @return {Object}
   * @override
   */
  async getData(options = null) {
    const data = await super.getData(options);
    return {
      ...data
    };
  }
  /**
   * Listen to html elements
   * @param {jQuery} html HTML content of the sheet.
   * @override
   */
  activateListeners(html) {
    super.activateListeners(html);
  }
  /**
   * This method is called upon form submission after form data is validated
   * @param event    The initial triggering submission event
   * @param formData The object of validated form data with which to update the object
   * @returns        A Promise which resolves once the update operation has completed
   * @override
   */
  async _updateObject(event, formData) {
    this.render(false);
  }
  /** @override */
  async _onDrop(event) {
    if (!game.user.isGM) {
      return;
    }
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    if (!data) return false;
    if (data.type === "Actor") {
      return this._onDropActor(event, data);
    }
  }
  /**
   * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
   * @param {DragEvent} event   The drop event
   * @param {Object} data       The data transfer
   * @return {Object}           OwnedItem data _getIndexeso create
   * @private
   */
  async _onDropActor(event, data) {
    this.object.items.push(data.uuid);
    this.refresh();
  }
};

// src/theah.mjs
Hooks.once("init", async function() {
  console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System
    ${SVNSEA2E.ASCII}`);
  game.theah = {
    applications: {
      SvnSea2EActor,
      SvnSea2EItem
    },
    config: SVNSEA2E,
    migrations: migration_exports,
    toolbox: new Toolbox(),
    // GM console helper: repair the core compendia from the shipped JSON.
    reseedCompendia
  };
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };
  CONFIG.SVNSEA2E = SVNSEA2E;
  CONFIG.SVNSEA2E.natTypes = foundry.utils.duplicate(SVNSEA2E.nations);
  CONFIG.SVNSEA2E.natTypes.gisles = "SVNSEA2E.RegionGlamourIsles";
  CONFIG.Actor.documentClass = SvnSea2EActor;
  CONFIG.Item.documentClass = SvnSea2EItem;
  CONFIG.Actor.dataModels[ActorType.BRUTE] = BruteModel;
  CONFIG.Actor.dataModels[ActorType.DANGERPOINTS] = DangerPointsModel;
  CONFIG.Actor.dataModels[ActorType.HERO] = HeroModel;
  CONFIG.Actor.dataModels[ActorType.MONSTER] = MonsterModel;
  CONFIG.Actor.dataModels[ActorType.PLAYER] = PlayerModel;
  CONFIG.Actor.dataModels[ActorType.SHIP] = ShipModel;
  CONFIG.Actor.dataModels[ActorType.VILLAIN] = VillainModel;
  CONFIG.Item.dataModels[ItemTypes.ADVANTAGE] = AdvantageModel;
  CONFIG.Item.dataModels[ItemTypes.ARTIFACT] = ArtifactModel;
  CONFIG.Item.dataModels[ItemTypes.BACKGROUND] = BackgroundModel;
  CONFIG.Item.dataModels[ItemTypes.DUEL_STYLE] = DuelStyleModel;
  CONFIG.Item.dataModels[ItemTypes.MONSTER_QUALITY] = MonsterQualityModel;
  CONFIG.Item.dataModels[ItemTypes.SCHEME] = SchemeModel;
  CONFIG.Item.dataModels[ItemTypes.SECRET_SOCIETY] = SecretSocietyModel;
  CONFIG.Item.dataModels[ItemTypes.SHIP_ADVENTURE] = ShipAdventureModel;
  CONFIG.Item.dataModels[ItemTypes.SHIP_BACKGROUND] = ShipBackgroundModel;
  CONFIG.Item.dataModels[ItemTypes.VIRTUE] = VirtueModel;
  CONFIG.Item.dataModels[ItemTypes.HUBRIS] = HubrisModel;
  CONFIG.Item.dataModels[ItemTypes.SORCERY] = SorceryModel;
  CONFIG.Item.dataModels[ItemTypes.STORY] = StoryModel;
  registerSystemSettings();
  applyTheahTheme(game.settings.get("theah", "theme"));
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("theah", ActorSheetSS2ePlayerCharacter, {
    types: [ActorType.PLAYER],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eHero, {
    types: [ActorType.HERO],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eBrute, {
    types: [ActorType.BRUTE],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eMonster, {
    types: [ActorType.MONSTER],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eVillain, {
    types: [ActorType.VILLAIN],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eShip, {
    types: [ActorType.SHIP],
    makeDefault: true
  });
  Actors.registerSheet("theah", ActorSheetSS2eDangerPts, {
    types: [ActorType.DANGERPOINTS],
    makeDefault: true
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("theah", ItemSheetSS2eAdvantage, {
    types: [ItemTypes.ADVANTAGE],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eArtifact, {
    types: [ItemTypes.ARTIFACT],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eBackground, {
    types: [ItemTypes.BACKGROUND],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eDuelStyle, {
    types: [ItemTypes.DUEL_STYLE],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eMonsterQuality, {
    types: [ItemTypes.MONSTER_QUALITY],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eScheme, {
    types: [ItemTypes.SCHEME],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eSecretSociety, {
    types: [ItemTypes.SECRET_SOCIETY],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eShipAdventure, {
    types: [ItemTypes.SHIP_ADVENTURE],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eShipBackground, {
    types: [ItemTypes.SHIP_BACKGROUND],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eSorcery, {
    types: [ItemTypes.SORCERY],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eStory, {
    types: [ItemTypes.STORY],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eVirtue, {
    types: [ItemTypes.VIRTUE],
    makeDefault: true
  });
  Items.registerSheet("theah", ItemSheetSS2eHubris, {
    types: [ItemTypes.HUBRIS],
    makeDefault: true
  });
  Handlebars.registerHelper("concat", function() {
    var outStr = "";
    for (var arg in arguments) {
      if (typeof arguments[arg] !== "object") {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });
  Handlebars.registerHelper("toLowerCase", function(str) {
    return str.toLowerCase();
  });
  Handlebars.registerHelper("capitalize", function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  Handlebars.registerHelper("for", function(from, to, incr, block) {
    var accum = "";
    const count = parseInt(from) + parseInt(to);
    const nWoundByStep = Math.ceil((count - 1) / 4);
    for (var i = from; i < count; i += incr) {
      block.data.index = i;
      block.data.first = i === 0;
      block.data.last = i === to;
      block.data.mod = Math.trunc(i / nWoundByStep);
      block.data.remain = i % nWoundByStep;
      accum += block.fn(this);
    }
    return accum;
  });
  Handlebars.registerHelper("iff", function(a, operator, b, opts) {
    var bool = false;
    switch (operator) {
      case "==":
        bool = a == b;
        break;
      case "!=":
        bool = a != b;
        break;
      case ">=":
        bool = a >= b;
        break;
      case "<=":
        bool = a <= b;
        break;
      case ">":
        bool = a > b;
        break;
      case "<":
        bool = a < b;
        break;
      default:
        throw "Unknown operator " + operator;
    }
    if (bool) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  });
  preloadHandlebarsTemplates();
});
Hooks.once("ready", async function() {
  game.theah.packAdvs = await getAllPackAdvantages();
  console.log("7th Sea 2E | Loaded Compendium Advantages");
  let currentVersion = game.settings.get("theah", "systemMigrationVersion");
  if (!currentVersion) {
    currentVersion = "0.6";
  }
  const needMigration = true;
  if (needMigration && game.user.isGM) {
    migrateWorld();
  }
  chatEventHandler();
  await seedCompendia();
  game.theah.toolbox.render(true);
});
Hooks.once("setup", function() {
  const toLocalize = [
    "actorTypes",
    "natTypes",
    "artifactTypes",
    "crewStatuses",
    "durations",
    "itemTypes",
    "languages",
    "nations",
    "traits",
    "shipRoles",
    "skills",
    "sorceryTypes",
    "sorceryCats",
    "sorcerySubcats",
    "storyStatuses"
  ];
  const noSort = [];
  for (const o of toLocalize) {
    const localized = Object.entries(CONFIG.SVNSEA2E[o]).map((e) => {
      return [e[0], game.i18n.localize(e[1])];
    });
    if (!noSort.includes(o)) localized.sort((a, b) => a[1].localeCompare(b[1]));
    CONFIG.SVNSEA2E[o] = localized.reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {});
  }
});
Hooks.on("preCreateItem", function(document2, options, userId) {
  document2.updateSource({
    img: "systems/theah/icons/item.svg"
  });
});
Hooks.on("preCreateActor", function(document2, entity, options, userId) {
  const isPlayerSide = [ActorType.PLAYER, ActorType.HERO].includes(document2.type);
  const isFoe = [ActorType.VILLAIN, ActorType.MONSTER, ActorType.BRUTE].includes(document2.type);
  const D = CONST.TOKEN_DISPLAY_MODES;
  const P = CONST.TOKEN_DISPOSITIONS;
  document2.updateSource({
    img: "systems/theah/icons/portrait.svg",
    // Automatic token wiring: Wounds + Dramatic Wounds bars, sensible display
    // and linkage so a Hero's sheet and token always stay in sync.
    prototypeToken: {
      actorLink: isPlayerSide,
      displayName: isPlayerSide ? D.OWNER_HOVER : D.HOVER,
      displayBars: isPlayerSide ? D.OWNER_HOVER : D.HOVER,
      disposition: isPlayerSide ? P.FRIENDLY : isFoe ? P.HOSTILE : P.NEUTRAL,
      bar1: { attribute: "wounds" },
      bar2: { attribute: "dwounds" }
    }
  });
});
Hooks.on("updateActor", function() {
  emitCharacterChange();
});
Hooks.on("renderActorDirectory", (app, html, data) => {
  if (game.user.isGM) {
    const div = document.createElement("div");
    div.className = "header-actions action-buttons flexrow";
    const button = document.createElement("button");
    button.style.width = "95%";
    button.innerHTML = game.i18n.localize("SVNSEA2E.OpenToolbox");
    button.addEventListener("click", () => {
      game.theah.toolbox.render(true);
    });
    const el = html?.querySelector(".directory-header");
    const searchBox = el.querySelector("search");
    div.appendChild(button);
    el.insertBefore(div, searchBox);
  }
});
//# sourceMappingURL=theah.mjs.map
