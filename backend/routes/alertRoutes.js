const express = require('express');
const { auth } = require('./authRoutes');
const Alert = require('../models/Alert');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).populate('satelliteId', 'name');
    res.json(alerts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id/resolve', auth, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, { resolved: true }, { new: true });
    res.json(alert);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
