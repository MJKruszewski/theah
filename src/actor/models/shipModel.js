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
  crew: new SchemaField({
    value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
    squadmax: new NumberField({ required: true, integer: true, min: 1, initial: 2 }),
  }),
  squads: new ArrayField(new SchemaField({
    name: new StringField(),
    strength: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  })),

  // Cargo & Treasury (Core p.253). Capacity 2 (Vodacce 3); Treasury = Wealth,
  // halved each session or the Crew turns Mutinous.
  cargocap: new NumberField({ required: true, integer: true, min: 0, initial: 2 }),
  cargo: new HTMLField(),
  wealth: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
}

export class ShipModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipSchema;
  }
}
