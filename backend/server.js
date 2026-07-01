import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import issueRoutes from "./routes/issues.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Issue Tracker Backend is running 🚀",
  });
});

app.use("/api/issues", issueRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.get("/api/stats", (req, res) => {
  res.json({
    open: 0,
    inProgress: 0,
    closed: 0,
    urgent: 0,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `🚀 Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });