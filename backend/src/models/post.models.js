const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
    like: {
      type: [this.author],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = new mongoose.model("post", PostSchema);

module.exports = PostModel;
