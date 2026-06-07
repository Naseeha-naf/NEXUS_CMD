const express = require('express');
const { auth } = require('./authRoutes');
const Satellite = require('../models/Satellite');
const Prediction = require('../models/Prediction');
const Alert = require('../models/Alert');

const router = express.Router();

// Mock AI Copilot logic
router.post('/ask', auth, async (req, res) => {
  const { prompt } = req.body;
  const p = prompt.toLowerCase();

  try {
    // Basic contextual analysis of database
    const sats = await Satellite.find();
    const alerts = await Alert.find({ resolved: false });
    const predictions = await Prediction.find().sort({ timestamp: -1 }).limit(10);
    
    let responseText = "I'm monitoring the orbital constellation. How can I assist you further?";

    if (p.includes('health') || p.includes('status')) {
      const activeAlerts = alerts.length;
      let criticalSats = [];
      predictions.forEach(pred => {
        if (pred.warningLevel === 'Critical' && !criticalSats.includes(pred.satelliteId.toString())) {
          criticalSats.push(pred.satelliteId);
        }
      });
      responseText = `The constellation is currently tracking ${sats.length} active assets. We have ${activeAlerts} unresolved alerts. `;
      if (criticalSats.length > 0) {
        responseText += `Warning: ${criticalSats.length} satellite(s) are in critical condition based on the latest AI Risk Engine evaluations.`;
      } else {
        responseText += `All systems are operating within nominal parameters. No critical failures forecasted.`;
      }
    } else if (p.includes('alert') || p.includes('explain alert')) {
      if (alerts.length === 0) {
        responseText = "There are no active alerts. The system is nominal.";
      } else {
        const critical = alerts.filter(a => a.severity === 'Critical');
        responseText = `There are ${alerts.length} active alerts. ${critical.length} of these are critical. Common issues involve temperature spikes and battery degradation. Please check the Alert Center for specific mitigation protocols.`;
      }
    } else if (p.includes('risk') || p.includes('prediction') || p.includes('explain risk')) {
      const highestRisk = predictions.sort((a,b) => b.failureRiskPercentage - a.failureRiskPercentage)[0];
      if (highestRisk && highestRisk.failureRiskPercentage > 30) {
        responseText = `The highest predicted risk is currently associated with a ${highestRisk.predictedIssue}. The failure probability is estimated at ${highestRisk.failureRiskPercentage.toFixed(1)}%. Recommendation: ${highestRisk.recommendedAction}.`;
      } else {
        responseText = "Risk scores are currently very low across the board. The telemetry trends remain stable.";
      }
    } else {
      responseText = "Received your query. Analyzing telemetry signatures... The orbital parameters remain stable. For specific details on risk, health, or alerts, please specify in your prompt.";
    }

    // Simulate AI typing delay
    setTimeout(() => {
      res.json({ response: responseText });
    }, 1500);

  } catch (err) {
    res.status(500).send('Copilot Error');
  }
});

module.exports = router;
