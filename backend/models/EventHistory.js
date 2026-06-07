const mongoose = require('mongoose');

const eventHistorySchema = new mongoose.Schema({
  satelliteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Satellite', required: false }, // Optional, as some events might be system-wide
  eventType: { type: String, required: true }, // e.g., 'Telemetry', 'Alert', 'Prediction', 'StatusChange'
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EventHistory', eventHistorySchema);
