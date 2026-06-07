const express = require('express');
const { auth } = require('./authRoutes');
const Telemetry = require('../models/Telemetry');

const router = express.Router();

router.get('/:satelliteId', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const telemetry = await Telemetry.find({ satelliteId: req.params.satelliteId })
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(telemetry.reverse());
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
