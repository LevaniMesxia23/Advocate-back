import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.log("Error connecting to MongoDB");
    }
    process.exit(1);
  }
};

export default connectDB;
