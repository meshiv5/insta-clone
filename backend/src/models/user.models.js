const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 100,
    },
    password: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500,
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/dxyjefp4a/image/upload/v1673876314/2048px-Default_pfp.svg_foyepr.png",
    },
    bio: {
      type: String,
      default: "Visionary .",
    },
    followers: {
      type: [Number],
      default: [],
    },
    following: {
      type: [Number],
      default: [],
    },
    posts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("user", UserSchema);
UserModel.getJWT = async (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, name: user.name, email: user.email, profileImage: user.profileImage },
    process.env.SECRET_KEY,
    {
      expiresIn: "7days",
    }
  );
};
module.exports = UserModel;
