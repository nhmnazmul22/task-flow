import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  console.log("Database Connected");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("Database disconnected");
};
