const mongoose = require("mongoose");

const connectDB = async () => {
  const dbName = "pedoderma_admin";

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${dbName}`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Mongo DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
