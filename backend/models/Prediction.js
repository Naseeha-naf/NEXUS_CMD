const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  satelliteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Satellite', required: true },
  riskScore: { type: Number, required: true }, // 0-100
  healthScore: { type: Number, required: true }, // 0-100
  warningLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  failureRiskPercentage: { type: Number, required: true },
  predictedIssue: { type: String, required: true }, // e.g., 'Thermal Failure Risk', 'Battery Degradation'
  recommendedAction: { type: String, required: true }, // e.g., 'Enable cooling systems', 'Reduce payload power'
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);
