const { Schema, model } = require("mongoose");

const CitySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  // guide: { type: Schema.Types.ObjectId, ref: "Guide", required: true },
  // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("City", CitySchema);
