import mongoose from "mongoose";
import dbConfig from "@/config/database.js";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached: Cached = {
  conn: null,
  promise: null,
};

const connectToDatabase = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(
        `${dbConfig.DB_URL}/${dbConfig.DB_NAME}`,
      );
    }

    cached.conn = await cached.promise;

    console.log("Connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
