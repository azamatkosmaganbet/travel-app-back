const { Schema, model } = require("mongoose");

const StopSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  route: { type: Schema.Types.ObjectId, ref: "Route", required: true },
});

module.exports = model("Stop", StopSchema);
