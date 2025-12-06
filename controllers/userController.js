const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");//importation mta3 jwt 

//fct bech tnajm tgenerati token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//controller bech ya3ml register luser jdida
exports.register = async (req, res) => {
  try {
    const { nom, login, password, role } = req.body;

    const exists = await User.findOne({ login });
    if (exists) return res.status(400).json({ message: "Login déjà utilisé" });

    const newUser = await User.create({
      nom,
      login,
      password,
      role: role || "user"
    });

    res.status(201).json({
      message: "Utilisateur créé",
      user: { id: newUser._id, nom, login, role: newUser.role },
      token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//controller bch ya3ml login luser mawjouda 

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Login ou mot de passe incorrect" });

    res.status(200).json({
      message: "Connexion réussie",
      user: { id: user._id, nom: user.nom, login: user.login, role: user.role },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

//controller bch yjib profil mte3 luser lmechya 
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
