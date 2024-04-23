const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const TripSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: Schema.Types.ObjectId, ref: "City" },
  day: { type: Number, required: true },
  price: { type: Number },
  guide: { type: Schema.Types.ObjectId, ref: "User", required: true },
  routes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
  availability: { type: Boolean, default: true },
});

module.exports = model("Trip", TripSchema);
