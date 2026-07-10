const {
  StringField, HTMLField, BooleanField
} = foundry.data.fields;

const shipAdventureSchema = {
  description: new HTMLField(),   // the deed that earns the Adventure
  trigger: new HTMLField(),       // how the Adventure is earned (the deed)
  reward: new HTMLField(),        // the lasting bonus it grants
  // Adventures are earned once, in play (Core p.250). Unlike a hero Story (which
  // has N Steps), an Adventure is binary: earned or not. `earned` drives the
  // on-sheet tracker (a single toggle + highlight) — a conceptual adaptation of
  // the Story tracker, not the step-pip version.
  earned: new BooleanField({ initial: false }),
  infosource: new StringField(),
};

export class ShipAdventureModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipAdventureSchema;
  }
}
