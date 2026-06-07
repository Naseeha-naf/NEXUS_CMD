const express = require('express');
const { auth } = require('./authRoutes');
const EventHistory = require('../models/EventHistory');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await EventHistory.find().sort({ timestamp: -1 }).limit(100).populate('satelliteId', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
