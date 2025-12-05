const express = require("express");
const router = express.Router();
const {
  createTask,
  getProjectTasks,
  updateTask,
  assignTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");
const isManager = require("../middleware/roleMiddleware");

router.post("/:projectId", auth, createTask);
router.get("/:projectId", auth, getProjectTasks);
router.put("/:id/assign", auth, isManager('manager'), assignTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
