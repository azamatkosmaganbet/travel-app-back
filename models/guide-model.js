const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const GuideSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guests: { type: String },
  status: { type: String, default: "pending" },
});

module.exports = model("Guide", GuideSchema);
