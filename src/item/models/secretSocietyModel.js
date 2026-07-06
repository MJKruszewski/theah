import { template_schema_base } from "./shared";

const {
  HTMLField,
} = foundry.data.fields;

const secretSocietySchema = {
  ...template_schema_base(),
  concern: new HTMLField(),
  earnfavor: new HTMLField(),
  // callupon holds an HTML list (matches system.json htmlFields + the {{editor}}
  // in the item sheet); it was a StringField, which merely happened to work.
  callupon: new HTMLField(),
  favor: new HTMLField(),
};

export class SecretSocietyModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
  return secretSocietySchema;
  }
}