const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namasteguru:RUNEFUHte9v7ffBB@namaste-guru.6cspwsy.mongodb.net/"
  );
};

module.exports = { connectDB };
