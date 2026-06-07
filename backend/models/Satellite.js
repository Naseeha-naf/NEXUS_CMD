const mongoose = require('mongoose');

const satelliteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  missionName: { type: String, required: true },
  launchDate: { type: Date, required: true },
  orbitType: { type: String, enum: ['LEO', 'MEO', 'GEO', 'HEO'], required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'Maintenance', 'Deorbited'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Satellite', satelliteSchema);
