const asyncHandler = require("express-async-handler");
const Issue = require("../models/Issue");
const { ApiError } = require("../middleware/errorMiddleware");

// CREATE ISSUE
exports.createIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.create(req.body);
  res.status(201).json({ success: true, data: issue });
});

// GET ALL ISSUES
exports.getIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find().sort({ createdAt: -1 });
  res.json({ success: true, data: issues });
});

// GET SINGLE ISSUE
exports.getIssueById = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) throw new ApiError("Issue not found", 404);

  res.json({ success: true, data: issue });
});

// UPDATE ISSUE
exports.updateIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!issue) throw new ApiError("Issue not found", 404);

  res.json({ success: true, data: issue });
});

// DELETE ISSUE
exports.deleteIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findByIdAndDelete(req.params.id);

  if (!issue) throw new ApiError("Issue not found", 404);

  res.json({ success: true, message: "Issue deleted" });
});