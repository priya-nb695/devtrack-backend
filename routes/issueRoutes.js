const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");

router.route("/")
  .post(protect, createIssue)
  .get(protect, getIssues);

router.route("/:id")
  .get(protect, getIssueById)
  .put(protect, updateIssue)
  .delete(protect, deleteIssue);

module.exports = router;