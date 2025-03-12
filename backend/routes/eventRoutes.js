const express = require('express');
const { fetchOpenEventConferences } = require('../services/openEventService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search, page = 1, limit = 5 } = req.query;
    const events = await fetchOpenEventConferences(search, page, limit);
    res.json({ data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;