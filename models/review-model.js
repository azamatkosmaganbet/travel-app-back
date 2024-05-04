const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Guide", required: true },
  reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Review", ReviewSchema);