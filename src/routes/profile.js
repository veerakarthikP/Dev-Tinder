const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateProfileEditFields } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditFields(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully!!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (req.body.newPassword === req.body.oldPassword) {
      throw new Error("New password should not be same as old!!");
    }
    const loggedInUser = req.user;
    const user = await User.findOne({ emailId: loggedInUser.emailId });
    if (!(await user.validPassword(req.body.oldPassword))) {
      throw new Error("Somthing Went Wrong!!");
    }
    const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser.password = passwordHash;
    loggedInUser.save();
    res.send("Password updated successfully!!!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
