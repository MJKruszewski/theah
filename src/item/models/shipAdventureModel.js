const {
  StringField, HTMLField
} = foundry.data.fields;

const shipAdventureSchema = {
  description: new HTMLField(),   // the deed that earns the Adventure
  trigger: new HTMLField(),
  reward: new HTMLField(),
  infosource: new StringField(),
};

export class ShipAdventureModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipAdventureSchema;
  }
}
