const Telemetry = require('../models/Telemetry');
const Alert = require('../models/Alert');
const Prediction = require('../models/Prediction');
const EventHistory = require('../models/EventHistory');

const evaluateRisk = async (satelliteId) => {
  // get last 10 telemetry readings to analyze trends
  const history = await Telemetry.find({ satelliteId }).sort({ timestamp: -1 }).limit(10);
  if (history.length === 0) return;

  const latest = history[0];
  
  let healthScore = 100;
  
  // Battery penalty
  if (latest.batteryLevel < 20) healthScore -= 30;
  else if (latest.batteryLevel < 50) healthScore -= 10;
  
  // Temp penalty
  if (latest.temperature > 60 || latest.temperature < -40) healthScore -= 30;
  else if (latest.temperature > 40 || latest.temperature < -20) healthScore -= 10;
  
  // CPU penalty
  if (latest.cpuUtilization > 90) healthScore -= 20;
  else if (latest.cpuUtilization > 70) healthScore -= 10;
  
  // Signal penalty
  if (latest.signalStrength < 20) healthScore -= 20;
  else if (latest.signalStrength < 50) healthScore -= 10;

  healthScore = Math.max(0, healthScore);
  
  // Trend analysis
  let tempTrend = 0;
  let batteryTrend = 0;
  if (history.length > 1) {
    tempTrend = history[0].temperature - history[history.length - 1].temperature;
    batteryTrend = history[0].batteryLevel - history[history.length - 1].batteryLevel;
  }

  let riskScore = 100 - healthScore;
  let warningLevel = 'Low';
  if (riskScore > 75) warningLevel = 'Critical';
  else if (riskScore > 50) warningLevel = 'High';
  else if (riskScore > 25) warningLevel = 'Medium';

  let predictedIssue = 'None';
  let recommendedAction = 'Continue normal operations';
  let failureRiskPercentage = Math.min(riskScore + (tempTrend > 5 ? 10 : 0) + (batteryTrend < -5 ? 10 : 0), 100);

  if (failureRiskPercentage > 70) {
    if (latest.temperature > 50 && tempTrend > 0) {
      predictedIssue = 'Thermal Failure Risk';
      recommendedAction = 'Enable cooling systems; reduce payload power.';
    } else if (latest.batteryLevel < 30 && batteryTrend < 0) {
      predictedIssue = 'Battery Degradation';
      recommendedAction = 'Switch to power-saving mode; reposition solar panels.';
    } else if (latest.cpuUtilization > 85) {
      predictedIssue = 'Compute Overload';
      recommendedAction = 'Restart non-critical sub-systems.';
    } else if (latest.signalStrength < 30) {
      predictedIssue = 'Communication Failure Risk';
      recommendedAction = 'Realign antenna; switch frequency band.';
    } else {
      predictedIssue = 'General System Failure Risk';
      recommendedAction = 'Perform complete diagnostic check.';
    }
  }

  // Save Prediction
  await Prediction.create({
    satelliteId,
    riskScore,
    healthScore,
    warningLevel,
    failureRiskPercentage,
    predictedIssue,
    recommendedAction
  });

  // Log to Event History if there's a significant risk
  if (riskScore > 25) {
    await EventHistory.create({
      satelliteId,
      eventType: 'Prediction',
      description: `Risk updated: ${riskScore}/100. Classification: ${warningLevel}. Expected issue: ${predictedIssue}`
    });
  }

  // Generate Alerts if necessary
  if (latest.batteryLevel < 20) {
    await Alert.create({ satelliteId, message: 'Critical Low Battery', severity: 'Critical', metric: 'Battery' });
    await EventHistory.create({ satelliteId, eventType: 'Alert', description: 'Critical Low Battery alert generated.' });
  } else if (latest.batteryLevel < 40) {
    await Alert.create({ satelliteId, message: 'Low Battery Warning', severity: 'Warning', metric: 'Battery' });
    await EventHistory.create({ satelliteId, eventType: 'Alert', description: 'Low Battery Warning generated.' });
  }

  if (latest.temperature > 65) {
    await Alert.create({ satelliteId, message: 'Critical High Temperature', severity: 'Critical', metric: 'Temperature' });
    await EventHistory.create({ satelliteId, eventType: 'Alert', description: 'Critical High Temperature alert generated.' });
  } else if (latest.temperature > 50) {
    await Alert.create({ satelliteId, message: 'High Temperature Warning', severity: 'Warning', metric: 'Temperature' });
    await EventHistory.create({ satelliteId, eventType: 'Alert', description: 'High Temperature Warning generated.' });
  }
};

module.exports = { evaluateRisk };
