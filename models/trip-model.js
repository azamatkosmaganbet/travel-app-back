const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const TripSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  guide: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Trip", TripSchema);
