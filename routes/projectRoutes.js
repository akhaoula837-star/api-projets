const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");
const isManager = require("../middleware/roleMiddleware");

router.post("/", auth, createProject);
router.get("/all", auth, isManager('manager'), getAllProjects);
router.get("/", auth, getMyProjects);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
