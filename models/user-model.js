const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  name: { type: String, required: true },
  surname: { type: String },
  phone: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  registerDate: { type: Date, default: new Date() },
  activationLink: { type: String },
  role: {
    type: String,
    enum: ["tourist", "guide", "admin"],
    default: "guide",
  },
  description: { type: String },
  aboutMe: { type: String },
  location: { type: String },
  guests: { type: String },
});

module.exports = model("User", UserSchema);
