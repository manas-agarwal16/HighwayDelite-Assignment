import mongoose from "mongoose";

const DB = async (): Promise<void> => {
  try {

    if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
      throw new Error("Missing MONGODB_URI or DB_NAME in environment variables");
    }

    const connectDB = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(`MongoDB connected, DB HOST: ${connectDB.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DB connection error:", error.message);
    } else {
      console.error("Unknown DB connection error:", error);
    }
    throw error;
  }
};

export default DB;
