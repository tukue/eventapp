const { fetchOpenEventConferences } = require('../services/openEventService');

const getEvents = async (req, res) => {
  try {
    const openEventConferences = await fetchOpenEventConferences();
    res.json(openEventConferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

module.exports = { getEvents };