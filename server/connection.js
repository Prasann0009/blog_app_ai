import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DEV_DATABASE_URL;

const MAX_DB_RETRY_CONNECTIONS = process.env.MAX_DB_RETRY_CONNECTIONS;

let retries = 0;

export async function connectToMongoDB() {
  try {
    retries++;
    const unused = await mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`connection error ${error.message}`);
    if (retries < MAX_DB_RETRY_CONNECTIONS) {
      console.log(`Connection failed retrying for ${retries + 1}th times`);
      connectToMongoDB();
    } else {
      console.log("Failed to connect: max retries exceeded");
    }
  }
}
