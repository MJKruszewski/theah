const {
  StringField, HTMLField
} = foundry.data.fields;

const shipOriginSchema = {
  description: new HTMLField(),
  bonus: new HTMLField(),
  nation: new StringField(),
  infosource: new StringField(),
};

export class ShipOriginModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return shipOriginSchema;
  }
}
