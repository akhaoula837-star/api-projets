const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

// Inscription
router.post("/register", register);

// Connexion
router.post("/login", login);

// Profil (token requis)
router.get("/me", auth, getProfile);

module.exports = router;

