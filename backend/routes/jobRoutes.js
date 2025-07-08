import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Public Routes
router.get("/jobs", getAllJobs); // ✅ GET all jobs
router.get("/jobs/:id", isAuthenticated, getSingleJob); // ✅ GET job by ID

// Protected Routes
router.post("/jobs", isAuthenticated, postJob); // ✅ POST a job
router.get("/jobs/my", isAuthenticated, getMyJobs); // ✅ GET my jobs
router.put("/jobs/:id", isAuthenticated, updateJob); // ✅ UPDATE job
router.delete("/jobs/:id", isAuthenticated, deleteJob); // ✅ DELETE job

export default router;
