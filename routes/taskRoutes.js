const express = require("express");
const router = express.Router();
const {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

// Créer une tâche pour un projet
router.post("/:projectId", auth, createTask);

// Voir toutes les tâches d'un projet
router.get("/:projectId", auth, getProjectTasks);

// Mettre à jour une tâche
router.put("/:id", auth, updateTask);

// Supprimer une tâche
router.delete("/:id", auth, deleteTask);

module.exports = router;

