const { Schema, model } = require("mongoose");

const RouteSchema = new Schema({
  name: { type: String, required: true },
  stops: [{ type: Schema.Types.ObjectId, ref: "Stop" }],
  trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
});

module.exports = model("Route", RouteSchema);
