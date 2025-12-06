
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//hedi schema mta3 luser 
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','manager'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

//hashing password 9bal ma nsavei luser
userSchema.pre('save', async function(){
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//hedhi methode bech ncompariw beha lpassword mta3 luser m3a lifel bd 
userSchema.methods.comparePassword = async function(candidate){
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);//bish nexportiw lmodel mte3 luser
