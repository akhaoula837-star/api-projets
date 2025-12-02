const Project = require("../models/Project");


exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({ message: " le Projet est créé", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Projet nexiste pas " });

    res.status(200).json({ message: "Projet en mis à jour", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    res.status(200).json({ message: "le projet est supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
