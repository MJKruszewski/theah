import { template_schema_base } from "./shared";

const {
  NumberField,
  StringField,
  HTMLField,
  SchemaField,
  ArrayField
} = foundry.data.fields;

// A Hull-damage sub-track {value,min,max}, mirroring the hero Wound track so the
// death-spiral handler (_processHull) and click logic can be shared.
const track = (max) => new SchemaField({
  value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  min: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  max: new NumberField({ required: true, integer: true, min: 0, initial: max }),
});

const shipSchema = {
  ...template_schema_base(),

  // Identity
  class: new StringField(),
  origin: new StringField(),        // legacy free-text Origin (the Origin item is authoritative)
  homeport: new StringField(),
  flag: new StringField(),
  background: new StringField(),     // legacy free-text; Backgrounds are items now
  crewstatus: new StringField({ initial: "happy" }),

  // Hull — Hits & Critical Hits (Core p.252). 5 Hits per Critical Hit; 4 Critical
  // Hits = Crippled; a Crippled Ship that takes a Hit is Sunk. This exactly
  // parallels the hero's 16 Wounds / 4 Dramatic Wounds (here 20 Hits / 4 Criticals,
  // step = 20/4 = 5), so the sheet reuses the death-spiral track + seal design.
  hits: track(20),
  criticals: track(4),

  // Crew — total Strength divides into Squads (Core p.253). A Ship has 10 Crew,
  // up to 2 Squads (Eisen: +5 Crew, up to 3 Squads). Each Squad rolls dice = its
  // Strength. `squads` is an optional explicit division; when empty the Crew acts
  // as one Squad of `crew.value` Strength.
  // Crew.value = the current full complement; crew.max = the derived complement
  // from Origin/Adventures (10 base, Eisen 15, +5/+1 from certain Adventures);
  // squadmax = how many Squads the Crew may divide into (2 base, Eisen 3). max +
  // squadmax are recomputed each prep in _prepareShipData (Core p.253, p.248).
  crew: new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
    max: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
    squadmax: new NumberField({ required: true, integer: true, min: 1, initial: 2 }),
  }),
  // A Squad is either an inline division of the Crew ({name, strength}) OR a
  // linked Brute Squad actor (actorId set) — a reusable, fully-statted unit whose
  // Strength is read live from the actor (Core p.253: a Squad "acts like a Brute
  // Squad"). actorId empty = inline squad.
  squads: new ArrayField(new SchemaField({
    name: new StringField(),
    strength: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
    actorId: new StringField(),
  })),

  // Cargo & Treasury (Core p.253). Capacity 2 (Vodacce 3); Treasury = Wealth,
  // halved each session or the Crew turns Mutinous. The Hold is a list of Cargo
  // crates (each a named lot + note, e.g. destination / worth), rendered as crate
  // slots up to `cargocap`. `cargo` (legacy free-text manifest) is kept for
  // backward-compat but no longer surfaced on the sheet.
  cargocap: new NumberField({ required: true, integer: true, min: 0, initial: 2 }),
  cargohold: new ArrayField(new SchemaField({
    name: new StringField(),
    note: new StringField(),
  })),
  cargo: new HTMLField(),
  wealth: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
}

export class ShipModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipSchema;
  }
}
