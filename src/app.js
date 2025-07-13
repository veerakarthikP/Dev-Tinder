const express = require("express");
const { connectDB } = require("./config/database");
const { adminAuth } = require("../src/middlewares/auth");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohil",
    emailId: "virattetstetste@gmail.com",
    password: "pass123@",
  });
  try {
    await user.save();
    res.send("User Added Succesfully!!");
  } catch (err) {
    res.status(400).send("Error while saving the user:" + err.mesage);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connected ........");
    app.listen("3333", () => {
      console.log("Server is listening at port 3333");
    });
  })
  .catch((err) => {
    console.log("unable to Connect DB........");
  });
