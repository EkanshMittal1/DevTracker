import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    reporter: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "open",
    },

    priority: {
      type: String,
      default: "medium",
    },

    assignee: {
      type: String,
      default: "",
    },

    dueDate: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Issue", issueSchema);