const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
  satelliteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Satellite', required: true },
  timestamp: { type: Date, default: Date.now },
  batteryLevel: { type: Number, required: true }, // Percentage 0-100
  temperature: { type: Number, required: true }, // Celsius
  cpuUtilization: { type: Number, required: true }, // Percentage 0-100
  signalStrength: { type: Number, required: true }, // dBm or percentage
  powerConsumption: { type: Number, required: true }, // Watts
  latency: { type: Number, required: true }, // ms
});

module.exports = mongoose.model('Telemetry', telemetrySchema);
