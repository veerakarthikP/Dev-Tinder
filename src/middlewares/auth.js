const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!!");
    }
    const decoded = jwt.verify(token, "Guru@954");
    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new Error("Error:" + err.message);
  }
};

module.exports = userAuth;
