const { Schema, model } = require("mongoose");

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  images: { type: [String], default: [] },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = model("BlogPost", BlogPostSchema);