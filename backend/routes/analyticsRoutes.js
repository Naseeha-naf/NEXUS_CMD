const express = require('express');
const { auth } = require('./authRoutes');
const Satellite = require('../models/Satellite');
const Alert = require('../models/Alert');
const Prediction = require('../models/Prediction');

const router = express.Router();

router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalSatellites = await Satellite.countDocuments();
    const satellites = await Satellite.find();
    
    // Aggregate health scores by taking the latest prediction for each satellite
    let healthyCount = 0;
    let warningCount = 0;
    let criticalCount = 0;
    let totalHealthScore = 0;

    for (const sat of satellites) {
      const latestPred = await Prediction.findOne({ satelliteId: sat._id }).sort({ timestamp: -1 });
      if (latestPred) {
        totalHealthScore += latestPred.healthScore;
        if (latestPred.healthScore > 75) healthyCount++;
        else if (latestPred.healthScore > 25) warningCount++;
        else criticalCount++;
      } else {
        healthyCount++; // default
        totalHealthScore += 100;
      }
    }

    const avgHealthScore = totalSatellites > 0 ? totalHealthScore / totalSatellites : 100;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const alertsToday = await Alert.countDocuments({ timestamp: { $gte: startOfDay } });

    res.json({
      totalSatellites,
      healthyCount,
      warningCount,
      criticalCount,
      alertsToday,
      systemHealthPercentage: avgHealthScore.toFixed(1)
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
