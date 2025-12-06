const mongoose = require('mongoose');
//hedha shema mta3 task
const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  statut: { type: String, enum: ['todo','doing','done'], default: 'todo' },
  deadline: { type: Date },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
//w hedhi lexportation mtee3 lmodel task
module.exports = mongoose.model('Task', taskSchema);
