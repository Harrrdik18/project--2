const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Add after routes
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File is too large. Maximum size is 10MB' });
    }
    return res.status(400).json({ error: error.message });
  } else if (error.message === 'Invalid file type') {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  next(error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 