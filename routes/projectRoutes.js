const express = require("express");
const router = express.Router();
const {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

// Créer un projet
router.post("/", auth, createProject);

// Voir mes projets
router.get("/", auth, getMyProjects);

// Mettre à jour un projet
router.put("/:id", auth, updateProject);

// Supprimer un projet
router.delete("/:id", auth, deleteProject);

module.exports = router;
