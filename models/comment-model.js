const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "BlogPost", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Comment", CommentSchema);