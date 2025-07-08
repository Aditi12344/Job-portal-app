import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: "Job_Portal",
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log(`Failed to connect: ${error}`);
  });
};

export default dbConnection;
