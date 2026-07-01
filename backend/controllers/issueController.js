import Issue from "../models/Issue.js";

// GET /api/issues
export async function getAllIssues(req, res) {
  try {
    const { status, priority, search } = req.query;

    const query = {
      createdBy: req.user.id,
    };

    if (status && status !== "all") {
      query.status = status;
    }

    if (priority && priority !== "all") {
      query.priority = priority;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const issues = await Issue.find(query).sort({ createdAt: -1 });

    res.json(issues);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// GET /api/issues/:id
export async function getIssue(req, res) {
  try {
    const issue = await Issue.findOne({ id: req.params.id });

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    res.json(issue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// POST /api/issues
export async function createIssue(req, res) {
  try {
    const lastIssue = await Issue.findOne().sort({ createdAt: -1 });

    const nextNumber = lastIssue
      ? Number(lastIssue.id.split("-")[1]) + 1
      : 101;

    const newIssue = await Issue.create({
  id: `ISS-${nextNumber}`,
  title: req.body.title,
  description: req.body.description || "",
  reporter: req.user.name,
  status: req.body.status || "open",
  priority: req.body.priority || "medium",
  assignee: req.body.assignee || "",
  dueDate: req.body.dueDate || "",
  createdBy: req.user.id,
  
});
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// PUT /api/issues/:id
export async function updateIssue(req, res) {
  try {
    const issue = await Issue.findOne({
      id: req.params.id,
    });

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    if (issue.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    Object.assign(issue, req.body);

    await issue.save();

    res.json(issue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
// DELETE /api/issues/:id
export async function deleteIssue(req, res) {
  try {
    const issue = await Issue.findOne({
      id: req.params.id,
    });

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    if (issue.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await issue.deleteOne();

    res.json({
      message: "Issue deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}