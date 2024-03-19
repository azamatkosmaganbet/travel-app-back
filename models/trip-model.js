const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const TripSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  city: { type: String },
  day: { type: Number, required: true },
  price: { type: Number, required: true },
  guide: { type: Schema.Types.ObjectId, ref: "User", required: true },
  routes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
});

module.exports = model("Trip", TripSchema);
