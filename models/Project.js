const mongoose = require('mongoose');
// hedha shema tee lprojet 
const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  statut: { type: String, enum: ['en cours','termine','en pause'], default: 'en cours' },
  createdAt: { type: Date, default: Date.now }
});
//exportation mta3 lmodel project
module.exports = mongoose.model('Project', projectSchema);
