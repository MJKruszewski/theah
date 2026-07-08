import { template_schema_base, template_schema_details, template_schema_features } from "./shared";

const {
  NumberField,
  StringField
} = foundry.data.fields;

const playerSchema = {
  ...template_schema_base(),
  ...template_schema_details(),
  ...template_schema_features(),
  wealth: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  // Every Hero starts each game with 1 Hero Point (Core p.177). Default to 1 so a
  // PC created any way (Foundry's Create Actor, import, GM hand-build) — not just
  // via the Hero Creator — begins with it.
  heropts: new NumberField({ required: true, integer: true, min: 0, initial: 1 }),
  vile: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  corruptionpts: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
  redemption: new StringField(),
}

export class PlayerModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return playerSchema;
  }
}