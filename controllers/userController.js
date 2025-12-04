const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


exports.register = async (req, res) => {
  try {
    const { name, login, password, role } = req.body;

    const exists = await User.findOne({ login });
    if (exists) return res.status(400).json({ message: "Login déjà utilisé" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      login,
      password: hashed,
      role: role || "user"
    });

    res.status(201).json({
      message: "Utilisateur créé",
      user: { id: newUser._id, name, login, role },
      token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Email ou mot de passe incorrect" });

    res.status(200).json({
      message: "Connexion réussie",
      user: { id: user._id, name: user.name, email },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
