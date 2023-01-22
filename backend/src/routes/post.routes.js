const Router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const PostModel = require("../models/post.models");

Router.get("/", auth, async (req, res) => {
  try {
    let userId = req.user._id;
    let posts = await PostModel.find({ author: userId });
    res.status(200).send({ status: true, posts: posts });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + "Already Exists . Try To Login Or Reset Password" });
  }
});

Router.post("/", auth, async (req, res) => {
  try {
    let postObj = {
      author: req.user._id,
      image: req.body.image,
      caption: req.body.caption,
    };
    let post = new PostModel(postObj);
    await post.save();
    res.status(200).send({ status: true, message: "Post created successfully !" });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Reset Password" });
  }
});
module.exports = Router;
