const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const GuideSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cities: [{ type: Schema.Types.ObjectId, ref: "City" }],
  description: { type: String },
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    vk: { type: String },
    telegram: { type: String },
  },
  languages: [{ type: String }],
  guests: { type: String },
  interests: [{ type: String }],
  status: { type: String, default: "pending" },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
});

module.exports = model("Guide", GuideSchema);
