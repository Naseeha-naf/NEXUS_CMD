const express = require('express');
const { auth } = require('./authRoutes');
const Satellite = require('../models/Satellite');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const satellites = await Satellite.find();
    res.json(satellites);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newSatellite = new Satellite(req.body);
    const satellite = await newSatellite.save();
    res.json(satellite);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const satellite = await Satellite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(satellite);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Satellite.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Satellite removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
