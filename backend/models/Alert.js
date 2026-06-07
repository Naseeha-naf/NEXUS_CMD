const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  satelliteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Satellite', required: true },
  message: { type: String, required: true },
  severity: { type: String, enum: ['Info', 'Warning', 'Critical'], required: true },
  metric: { type: String, required: true }, // e.g. 'Battery', 'Temperature', 'Overall Health'
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Alert', alertSchema);
