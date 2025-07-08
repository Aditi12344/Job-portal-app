import dotenv from "dotenv";
dotenv.config(); // Load env variables from Render or .env

import app from "./app.js";
import cors from "cors";

// ✅ Correct CORS setup
app.use(
  cors({
    origin: "https://job-portal-app-aqz5.vercel.app", // ✅ Correct URL here
    credentials: true,
  })
);

import cloudinary from "cloudinary";
import dbConnection from "./database/dbConnection.js";

// ✅ Connect to MongoDB
dbConnection();

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Start Express server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
