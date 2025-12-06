const Project = require("../models/Project");
//controlleur bech ykhalik tecrati projet jdid 
exports.createProject = async (req, res) => {
  try {
    const { nom, description } = req.body;

    const project = await Project.create({
      nom,
      description,
      proprietaire: req.user.id,
    });

    res.status(201).json({ message: "Projet créé", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//whedha chiyjib les projets 
exports.getAllProjects = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let projects = Project.find(query).populate('proprietaire', 'nom login');
    
    if (sort) {
      projects = projects.sort(sort);
    }

    const result = await projects;
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//chijib lprojet mte3 luser lmechya 
exports.getMyProjects = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = { proprietaire: req.user.id };
    
    if (search) {
      query.$or = [
        { nom: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
      query.proprietaire = req.user.id;
    }

    let projects = Project.find(query);
    
    if (sort) {
      projects = projects.sort(sort);
    }

    const result = await projects;
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//w hedha chyaml mise a jour lprojet mo3ayna
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, proprietaire: req.user.id },
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Projet n'existe pas" });

    res.status(200).json({ message: "Projet mis à jour", project });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
//tawa chnamlo delete lprojet mo7aded
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      proprietaire: req.user.id,
    });

    if (!project) return res.status(404).json({ message: "Projet introuvable" });

    res.status(200).json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
