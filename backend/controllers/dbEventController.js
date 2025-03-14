const { fetchAndStoreEvents } = require('../services/dbEventService');

const getAndStoreEvents = async (req, res) => {
  try {
    const openEventConferences = await fetchAndStoreEvents();
    res.json(openEventConferences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch and store events' });
  }
};

module.exports = { getAndStoreEvents };