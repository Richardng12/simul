const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
