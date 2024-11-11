const mongoose = require("mongoose")

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/m-auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectDB();

const userSchema = new mongoose.Schema({
  email: {
    type : String,
    require: true
  },
  password: {
    type : String,
    require : true
  }
});

const db = new mongoose.model("users", userSchema);

module.exports = db





