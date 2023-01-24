const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");
const authenticate = async (socket, data, callback) => {
  const { token } = data;
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findOne({ _id: data._id });
    socket.user = user;
    callback(null, user, 1);
  } catch (error) {
    callback(error);
  }
};
module.exports = authenticate;
