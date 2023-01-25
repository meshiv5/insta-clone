const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const UserModel = require("../models/user.models");
const generatePassword = require("../utils/generatePass");
const sendPassword = require("../utils/sendPassword");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");
const { body, validationResult } = require("express-validator");
const auth = require("../middlewares/auth.middleware");
let blacklist = require("../utils/blacklist");
userRouter.post("/signup", body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
  try {
    let { name, email, username, password } = req.body;
    if (name && email && username && password) {
      let hashedPassword = await bcrypt.hash(password, 10);
      let user = new UserModel({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      sendWelcomeEmail(email, name);
      res.status(200).send({ status: true, message: "User created succesfully ! Login To Conitnue" });
    } else {
      res.status(400).send({ status: false, message: "some error occured" });
    }
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Reset Password" });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    let usingEmail = false;
    let usingUsername = false;
    let { email, username, password } = req.body;
    if (email) usingEmail = true;
    else usingUsername = true;
    if ((email || username) && password) {
      let user = await UserModel.findOne(usingEmail ? { email: email } : { username: username });
      if (user) {
        let isMatched = await bcrypt.compare(password, user.password);
        if (isMatched && (email === user.email || username === user.username)) {
          let token = await UserModel.getJWT(user);
          res.clearCookie("access_token");
          res
            .cookie("access_token", token, {
              domain: "onrender.com",
              maxAge: 60 * 60 * 24 * 7,
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
              secure: process.env.NODE_ENV === "production",
              httpOnly: false,
            })
            .status(200)
            .send({ status: true, message: "Logged In Successfully" });
        } else {
          res.status(401).send({ status: true, message: "Wrong Password ! Try Again" });
        }
      } else {
        res.status(404).send({ status: true, message: "User Does Not Exist" });
      }
    } else {
      res.status(400).send({ status: false, message: "some error occured" });
    }
  } catch (e) {
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Change Password" });
  }
});

userRouter.post("/resetpassword", async (req, res) => {
  try {
    let usingEmail = false;
    let usingUsername = false;
    let { email, username } = req.body;
    if (email) usingEmail = true;
    else usingUsername = true;
    if (email || username) {
      let user = await UserModel.findOne(usingEmail ? { email: email } : { username: username });
      if (user) {
        if (email === user.email || username === user.username) {
          let newPassword = generatePassword();
          sendPassword(email, newPassword, user.name);
          let newPasswordHash = await bcrypt.hash(newPassword, 10);
          await UserModel.updateOne({ email: user.email }, { $set: { password: newPasswordHash } });
          res.status(200).send({ status: true, message: "New Password Sent To Your Email Succesfully" });
        } else {
          res.status(400).send({ status: false, message: "some error occured" });
        }
      } else {
        res.status(404).send({ status: false, message: "User Does Not Exist" });
      }
    } else {
      res.status(400).send({ status: false, message: "some error occured" });
    }
  } catch (e) {
    console.log(e.message);
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Change Password" });
  }
});
userRouter.patch("/edit/:id", auth, async (req, res) => {
  if (req.params.id == "details") {
    try {
      let user = await UserModel.findOne({ email: req.user.email });
      if (user) {
        await UserModel.updateOne({ email: user.email }, { $set: { name: req.body.name, username: req.body.username, bio: req.body.bio } });
        return res.status(200).send({ status: true, message: "New Data Updated" });
      } else {
        return res.status(404).send({ status: false, message: "User Does Not Exist" });
      }
    } catch (e) {
      console.log(e.message);
      let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
      return res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Change Password" });
    }
  }
  try {
    let user = await UserModel.findOne({ email: req.user.email });
    if (user) {
      await UserModel.updateOne({ email: user.email }, { $set: { [req.params.id]: req.body[req.params.id] } });
      res.status(200).send({ status: true, message: "New Data Updated" });
    } else {
      res.status(404).send({ status: false, message: "User Does Not Exist" });
    }
  } catch (e) {
    console.log(e.message);
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Change Password" });
  }
});

userRouter.patch("/change/password", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.user.email });
    if (user) {
      let ans = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!ans) throw new Error("Old Password Doesnt Match !");
      let newPassword = await bcrypt.hash(req.body.password, 10);
      await UserModel.updateOne({ email: user.email }, { $set: { password: newPassword } });
      res.status(200).send({ status: true, message: "New Data Updated" });
    } else {
      res.status(404).send({ status: false, message: "User Does Not Exist" });
    }
  } catch (e) {
    console.log(e.message);
    let paramsCausedError = Object.keys(e.keyValue || { "Some Details": 0 });
    res.status(400).send({ status: false, message: paramsCausedError[0] + " Already Exists . Try To Login Or Change Password" });
  }
});

userRouter.get("/logout", (req, res) => {
  const token = req.cookies.access_token;
  blacklist.push(token);
  res.clearCookie("access_token").status(200).send("Logged Out Succesfully !");
});

userRouter.get("/", auth, async (req, res) => {
  let finalUser = await UserModel.findOne({ _id: req.user._id });
  return res.status(200).json({ status: true, data: finalUser });
});

userRouter.get("/many", auth, async (req, res) => {
  let { search } = req.query;
  try {
    const regex = new RegExp(search, "i");
    let finalUser = await UserModel.find(search ? { name: { $regex: regex } } : {});
    if (!finalUser) throw new Error("Failed");
    return res.status(200).json({ status: true, data: finalUser });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Problem Occured" });
  }
});

userRouter.get("/:username", auth, async (req, res) => {
  try {
    let finalUser = await UserModel.findOne({ username: req.params.username });
    if (!finalUser) throw new Error("Failed");
    return res.status(200).json({ status: true, data: finalUser });
  } catch (e) {
    res.status(400).send({ status: false, message: "User Doesn't Exists" });
  }
});
userRouter.get("/getWithID/:userID", auth, async (req, res) => {
  try {
    let finalUser = await UserModel.findOne({ _id: req.params.userID });
    if (!finalUser) throw new Error("Failed");
    return res.status(200).json({ status: true, data: finalUser });
  } catch (e) {
    res.status(400).send({ status: false, message: "User Doesn't Exists" });
  }
});

userRouter.post("/follow/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id) {
      return res.status(400).send({ status: false, message: "You cant Follow Yourself" });
    }
    let userGettingFollower = await UserModel.findOne({ _id: id });
    let userWhoFollowing = await UserModel.findOne({ _id: req.user._id });
    userGettingFollower.followers.push(req.user._id);
    userWhoFollowing.following.push(id);
    await userGettingFollower.save();
    await userWhoFollowing.save();
    return res.status(200).json({ status: true, data: "Followed Successfully !" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
userRouter.post("/unfollow/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id) {
      return res.status(400).send({ status: false, message: "You cant Unfollow Yourself" });
    }
    let userGettingFollower = await UserModel.findOne({ _id: id });
    let userWhoFollowing = await UserModel.findOne({ _id: req.user._id });
    let firstIndex = userGettingFollower.followers.indexOf(req.user._id);
    let secondIndex = userWhoFollowing.following.indexOf(id);
    userGettingFollower.followers.pop(firstIndex);
    userWhoFollowing.following.pop(secondIndex);
    await userGettingFollower.save();
    await userWhoFollowing.save();
    return res.status(200).json({ status: true, data: "Unfollowed Successfully !" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});

module.exports = { userRouter };
