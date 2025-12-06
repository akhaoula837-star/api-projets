const express = require("express");
const router = express.Router();
//c lontroleur mta3 luser
const {
  register,
  login,
  getProfile,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);
//exportation mta3 lrouter
module.exports = router;

