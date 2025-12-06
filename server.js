//hedha server main file
require('dotenv').config();
//importation mta3 les packages w les routes
const express = require('express');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoutes');
const projectRoute = require('./routes/projectRoutes');
const taskRoute = require('./routes/taskRoutes');
const app = express();
//middleware bch ykhdem json
app.use(express.json());
//connexion bch nconnecti ldatabase
connectDB();
//definir les routes
app.use('/api/users', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);
//route test
app.get('/', (req, res) => {
  res.send('API ISIDS en fonctionnement...');
});
//w hedha yekhdem 3al port 5000 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
