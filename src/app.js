const express = require("express");
const { connectDB } = require("./database");
const { adminAuth } = require("../src/middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/allUsers", (req, res) => {
  console.log("get All Users Data");
  res.send("feteched All Users Data");
});

app.delete("/admin/deleteUser", (req, res) => {
  console.log("delete user");
  res.send("Deleted User....");
});

connectDB()
  .then(() => {
    console.log("DB Connected ........");
    app.listen("3000", () => {
      console.log("Server is listening at port 3000");
    });
  })
  .catch((err) => {
    console.log("unable to Connect DB........");
  });
