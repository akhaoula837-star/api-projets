require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const authRoute = require('./routes/authRoutes');
const projectRoute = require('./routes/projectRoutes');
const taskRoute = require('./routes/taskRoutes');
const app = express();

app.use(express.json());

connectDB();


// Routes
app.use('/api/users', authRoute);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);

// Route test
app.get('/', (req, res) => {
  res.send('API ISIDS en fonctionnement...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
