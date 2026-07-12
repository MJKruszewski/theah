import { template_schema_base, template_schema_details, template_schema_features } from "./shared";

const {
  NumberField,
  StringField
} = foundry.data.fields;

// A Hero NPC (a Heroic ally or opposition, Core p.192) uses the SAME full Hero
// sheet as a player character, so its schema is identical to playerModel — Hero
// Points, Wealth, Corruption and Redemption included. (The two are kept in sync;
// if playerModel gains a field, add it here too.)
const heroSchema = {
  ...template_schema_base(),
  ...template_schema_details(),
  ...template_schema_features(),
  wealth: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  heropts: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
  vile: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  corruptionpts: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  redemption: new StringField(),
}

export class HeroModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return heroSchema;
  }
}
