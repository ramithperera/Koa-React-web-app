const mongoose = require("mongoose");

const dbConnect = () => {
  const dbConnStr = process.env.MONGODB_URL;

  mongoose.connect(dbConnStr, () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = { dbConnect };
