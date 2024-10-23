const mongoose = require("mongoose");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@christsocial.yebjs0q.mongodb.net/?retryWrites=true&w=majority&appName=ChristSocial`
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
