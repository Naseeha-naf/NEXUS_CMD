require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes').router);
app.use('/api/satellites', require('./routes/satelliteRoutes'));
app.use('/api/telemetry', require('./routes/telemetryRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/predictions', require('./routes/predictionRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/copilot', require('./routes/copilotRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/satellite-mission-control')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start simulators after DB connect
    require('./services/telemetrySimulator').startSimulation();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
