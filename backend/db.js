import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is Connected");
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
};

export default connectDB; 
