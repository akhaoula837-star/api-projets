//pour importer la bib  mongoose 
const mongoose = require('mongoose');
//bish namlo la cnx m3a la bd mongo
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// neexporti la fonction connectDB
module.exports = connectDB;
