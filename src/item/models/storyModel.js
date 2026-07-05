import { template_schema_base } from "./shared";

const {
  HTMLField, StringField, NumberField, BooleanField, SchemaField,
} = foundry.data.fields;

const storySchema = {
  ...template_schema_base(),
  reward: new HTMLField(),
  endings: new HTMLField(),
  steps: new HTMLField(),
  status: new StringField({ initial: 'current' }),
  // Structured advancement metadata written by the Advancement Creator. When
  // `active` is false the Story behaves like a plain free-text Story (backward
  // compatible with hand-made and seeded Stories). Book: Core Rulebook, "Making
  // a Hero" Step 7 (Stories) & "Rewarding the Journey", pp.159-160.
  advancement: new SchemaField({
    active: new BooleanField({ initial: false }),
    type: new StringField({ initial: '' }), // skillRaise|traitIncrease|traitShift|advantage|arcanaChange|quirkChange|corruptionRemove
    targetKey: new StringField({ initial: '' }), // skill/trait key, arcana slot, or background id
    targetKey2: new StringField({ initial: '' }), // second trait (shift: lowered)
    targetName: new StringField({ initial: '' }), // advantage/arcana name, or new quirk text
    targetUuid: new StringField({ initial: '' }), // compendium source uuid for advantage/arcana
    newRank: new NumberField({ initial: 0, integer: true, min: 0 }),
    stepsTotal: new NumberField({ initial: 0, integer: true, min: 0 }),
    stepsDone: new NumberField({ initial: 0, integer: true, min: 0 }),
    applied: new BooleanField({ initial: false }),
  }),
};

export class StoryModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return storySchema;
  }
}