import mongoose from "mongoose";

export async function cleanDatabase(): Promise<void> {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

export async function dropDatabase(): Promise<void> {
  await mongoose.connection.dropDatabase();
}
