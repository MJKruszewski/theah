import { template_schema_base } from "./shared";

const {
  HTMLField, NumberField,
} = foundry.data.fields;

const secretSocietySchema = {
  ...template_schema_base(),
  concern: new HTMLField(),
  earnfavor: new HTMLField(),
  // callupon holds an HTML list (matches system.json htmlFields + the {{editor}}
  // in the item sheet); it was a StringField, which merely happened to work.
  callupon: new HTMLField(),
  // Favor is a live numeric tally the player earns/spends during play (Core
  // p.259). It was an HTMLField (wrong) — now an integer with a +/- stepper on
  // the sheet. Coerces cleanly from the old "0" string on load.
  favor: new NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0 }),
};

export class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
  return secretSocietySchema;
  }
}