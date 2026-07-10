const {
  HTMLField, SchemaField, NumberField, StringField,
} = foundry.data.fields;

// A Brute Squad has ONE statistic — Strength (Core p.191): the number of thugs
// in the Squad. Heroes reduce it by 1 per Raise; on its turn the Squad deals
// Wounds equal to its CURRENT Strength; at 0 it is defeated. So Strength is both
// the Squad's health and its threat — there is no separate Wound pool.
//   value = current Strength (thugs still standing)
//   max   = full Strength (the size the Squad musters at)
const bruteSchema = {
  // The type of Special Brute Squad (Core p.192), '' = a plain, untyped Squad.
  // A typed Squad has an Ability the GM activates for a Danger Point.
  squadtype: new StringField({ initial: "" }),
  traits: new SchemaField({
    strength: new SchemaField({
      value: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
      max: new NumberField({ required: true, integer: true, min: 0, initial: 5 }),
    }),
  }),
  // A custom Ability (name + rules text), used for untyped/homebrew Squads or to
  // override a typed Squad's book Ability.
  ability: new SchemaField({
    name: new StringField(),
    description: new HTMLField(),
  }),
};

export class BruteModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return bruteSchema;
  }
}
