const Task = require("../models/Task");
const Project = require("../models/Project");
//controlleur bech ykhalik tecrati task jdida f projet mo3ayenn 
exports.createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline } = req.body;
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    const task = await Task.create({
      titre,
      description,
      statut: statut || 'todo',
      deadline,
      projet: projectId,
    });

    res.status(201).json({ message: "Tâche créée", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//w hedha bish yjib les tasks mtee3 projet mo3ayen
exports.getProjectTasks = async (req, res) => {
  try {
    const { search, sort, statut } = req.query;
    let query = { projet: req.params.projectId };
    
    if (search) {
      query.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
      query.projet = req.params.projectId;
    }
    
    if (statut) {
      query.statut = statut;
    }

    let tasks = Task.find(query).populate('utilisateurAssigne', 'nom login');
    
    if (sort) {
      tasks = tasks.sort(sort);
    }

    const result = await tasks;
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//lcontroller hedha bish yapdayti task mo3ayna 
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    res.status(200).json({ message: "Tâche mise à jour", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//hedha chyaaml assigation mtaa task luser mo7aded
exports.assignTask = async (req, res) => {
  try {
    const { utilisateurAssigne } = req.body;
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { utilisateurAssigne },
      { new: true }
    ).populate('utilisateurAssigne', 'nom login');
    
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    res.status(200).json({ message: "Tâche assignée", task });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//welcontrolleur hedha chifasakh taskh mo3ayna 
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tâche introuvable" });

    res.status(200).json({ message: "Tâche supprimée" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
