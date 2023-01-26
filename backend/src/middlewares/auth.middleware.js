const jwt = require("jsonwebtoken");
let blacklist = require("../utils/blacklist");
let auth = async (req, res, next) => {
  const token = req.headers.access_token;
  if (!token || (blacklist && blacklist.includes(token))) {
    return res.sendStatus(403);
  } else {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.user = data;
      req.token = token;
      next();
    } catch (e) {
      return res.sendStatus(403);
    }
  }
};

module.exports = auth;
