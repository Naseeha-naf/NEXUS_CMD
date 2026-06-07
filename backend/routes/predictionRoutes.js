const express = require('express');
const { auth } = require('./authRoutes');
const Prediction = require('../models/Prediction');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find().sort({ timestamp: -1 }).limit(100).populate('satelliteId', 'name');
    res.json(predictions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:satelliteId', auth, async (req, res) => {
  try {
    const predictions = await Prediction.find({ satelliteId: req.params.satelliteId }).sort({ timestamp: -1 }).limit(50);
    res.json(predictions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
