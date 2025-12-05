const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statut: { type: String, enum: ['en cours','termine','en pause'], default: 'en cours' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
