const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const GuideSchema = new Schema({
  description: { type: String },
  aboutMe: { type: String },
  location: { type: String, required: true },
  guests: { type: String },
});

module.exports = model("Guide", GuideSchema);
