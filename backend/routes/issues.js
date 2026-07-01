import express from "express";

import {
  getAllIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect every route below
router.use(protect);

// GET all issues
router.get("/", getAllIssues);

// GET single issue
router.get("/:id", getIssue);

// CREATE issue
router.post("/", createIssue);

// UPDATE issue
router.put("/:id", updateIssue);

// DELETE issue
router.delete("/:id", deleteIssue);

export default router;