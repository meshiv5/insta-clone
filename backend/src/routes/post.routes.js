const Router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const PostModel = require("../models/post.models");
const UserModel = require("../models/user.models");

Router.get("/", auth, async (req, res) => {
  try {
    let userId = req.user._id;
    let posts = await PostModel.find({ author: userId });
    res.status(200).send({ status: true, posts: posts });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});

Router.get("/all", auth, async (req, res) => {
  try {
    let userFull = await UserModel.findOne({ _id: req.user._id });
    let following = [...userFull.following, userFull._id];
    let posts = await PostModel.find({ author: { $in: following } })
      .sort({ createdAt: -1 })
      .populate("author");

    res.status(200).send({ status: true, posts: posts });
  } catch (e) {
    console.log(e.message);
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});

Router.delete("/:id", auth, async (req, res) => {
  try {
    let postId = req.params.id;
    await PostModel.deleteOne({ _id: postId });
    let userOG = await UserModel.findOne({ _id: req.user._id });
    let idx = userOG.posts.indexOf(postId);
    userOG.posts.splice(idx, 1);
    await userOG.save();
    res.status(200).send({ status: true, message: "Succesfully Deleted Post" });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});

Router.get("/post/:id", auth, async (req, res) => {
  try {
    let postId = req.params.id;
    let posts = await PostModel.findOne({ _id: postId }).populate("author");
    res.status(200).send({ status: true, posts: posts });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});

Router.get("/:id", auth, async (req, res) => {
  try {
    let userId = req.params.id;
    let posts = await PostModel.find({ author: userId }).populate("author");
    res.status(200).send({ status: true, posts: posts });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
Router.post("/like/:postId", auth, async (req, res) => {
  try {
    let { postId } = req.params;
    let ogUser = req.user._id;
    let post = await PostModel.findOne({ _id: postId });
    if (!post) res.status(400).send({ status: false, message: "Post Not Found" });
    if (!post.like.includes(ogUser)) post.like.push(ogUser);
    await post.save();
    return res.status(200).send({ status: true, message: "Liked Successfully " });
  } catch (e) {
    res.status(400).send({ status: false, message: e.message });
  }
});

Router.get("/likes/:postId", auth, async (req, res) => {
  try {
    let { postId } = req.params;
    let ogUser = req.user._id;
    let post = await PostModel.findOne({ _id: postId }).populate("author");
    if (!post) res.status(400).send({ status: false, message: "Post Doesn't Exist" });
    return res.status(200).send({ status: true, likedBy: post.like });
  } catch (e) {
    res.status(400).send({ status: false, message: e.message });
  }
});

Router.post("/unlike/:postId", auth, async (req, res) => {
  try {
    let { postId } = req.params;
    let ogUser = req.user._id;
    let post = await PostModel.findOne({ _id: postId });
    if (!post) res.status(400).send({ status: false, message: "Post Not Found" });
    if (post.like.includes(ogUser)) {
      let idx = post.like.indexOf(ogUser);
      post.like.splice(idx, 1);
    } else {
      return res.status(400).send({ status: false, message: "You Havent Liked This Post ." });
    }
    await post.save();
    return res.status(200).send({ status: true, message: "Liked Successfully " });
  } catch (e) {
    res.status(400).send({ status: false, message: e.message });
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
    const UserMain = await UserModel.findOne({ _id: postObj.author });
    UserMain.posts.push(post._id);
    await UserMain.save();
    res.status(200).send({ status: true, message: "Post created successfully !" });
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Reset Password" });
  }
});

// Comment On A Post
Router.post("/comment", auth, async (req, res) => {
  try {
    let { commentData } = req.body;
    let post = await PostModel.findOne({ _id: commentData.postId });
    post.comments.push(JSON.stringify(commentData));
    await post.save();
    res.status(200).send({ status: true, message: "Comment created successfully !" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured" });
  }
});

// Get All Comments

Router.get("/comment/:postId", auth, async (req, res) => {
  try {
    let { postId } = req.params;
    let post = await PostModel.findOne({ _id: postId });
    res.status(200).send({ status: true, comments: post.comments });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured" });
  }
});

// Delete Comment

Router.delete("/comment/:postId/:commentID", auth, async (req, res) => {
  try {
    let { postId, commentID } = req.params;
    let post = await PostModel.findOne({ _id: postId });

    let newComments = post.comments.filter((cmt) => {
      let xd = JSON.parse(cmt);
      if (xd.id != commentID) return cmt;
    });
    console.log(newComments);
    post.comments = [...newComments];
    await post.save();
    res.status(200).send({ status: true, message: "post deleted successfully !" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured" });
  }
});
module.exports = Router;
