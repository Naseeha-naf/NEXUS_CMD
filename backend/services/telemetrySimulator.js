const Satellite = require('../models/Satellite');
const Telemetry = require('../models/Telemetry');
const riskEngine = require('./riskEngine');
const cron = require('node-cron');

const initialSatellites = [
  { name: 'SAT-Alpha', missionName: 'Earth Observation', launchDate: new Date('2023-01-15'), orbitType: 'LEO' },
  { name: 'SAT-Beta', missionName: 'Deep Space Relay', launchDate: new Date('2024-05-20'), orbitType: 'MEO' },
  { name: 'SAT-Gamma', missionName: 'Weather Monitoring', launchDate: new Date('2022-11-05'), orbitType: 'GEO' }
];

const generateNextValue = (current, min, max, maxDelta) => {
  const delta = (Math.random() * maxDelta * 2) - maxDelta;
  let next = current + delta;
  if (next < min) next = min + Math.random() * maxDelta;
  if (next > max) next = max - Math.random() * maxDelta;
  return next;
};

const state = {};

const generateTelemetry = async () => {
  try {
    const satellites = await Satellite.find({ status: 'Active' });
    
    for (const sat of satellites) {
      if (!state[sat._id]) {
        state[sat._id] = {
          batteryLevel: 90 + Math.random() * 10,
          temperature: 15 + Math.random() * 10,
          cpuUtilization: 30 + Math.random() * 20,
          signalStrength: 85 + Math.random() * 15,
          powerConsumption: 100 + Math.random() * 50,
          latency: 20 + Math.random() * 10
        };
      }
      
      const prev = state[sat._id];
      const next = {
        batteryLevel: generateNextValue(prev.batteryLevel, 10, 100, 2),
        temperature: generateNextValue(prev.temperature, -50, 80, 5),
        cpuUtilization: generateNextValue(prev.cpuUtilization, 10, 100, 10),
        signalStrength: generateNextValue(prev.signalStrength, 10, 100, 5),
        powerConsumption: generateNextValue(prev.powerConsumption, 50, 300, 20),
        latency: generateNextValue(prev.latency, 10, 500, 50)
      };
      
      state[sat._id] = next;

      await Telemetry.create({
        satelliteId: sat._id,
        ...next
      });

      await riskEngine.evaluateRisk(sat._id);
    }
  } catch (err) {
    console.error('Simulation error:', err);
  }
};

const startSimulation = async () => {
  for (const satData of initialSatellites) {
    await Satellite.findOneAndUpdate({ name: satData.name }, satData, { upsert: true, new: true });
  }
  console.log('Telemetry simulation started...');
  cron.schedule('*/5 * * * * *', generateTelemetry);
};

module.exports = { startSimulation };
