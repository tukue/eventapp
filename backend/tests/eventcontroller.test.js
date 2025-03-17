const { getEvents } = require('../controllers/eventController');
const { fetchOpenEventConferences } = require('../services/openEventService');

jest.mock('../services/openEventService');

describe('getEvents', () => {
  let req, res;

  beforeEach(() => {
    req = { query: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return events', async () => {
    const mockEvents = [
      {
        attributes: {
          name: 'Event 1',
          description: 'Description 1',
          'location-name': 'Location 1',
          'thumbnail-image-url': 'http://example.com/thumb1.jpg',
          'large-image-url': 'http://example.com/large1.jpg',
        },
      },
    ];

    fetchOpenEventConferences.mockResolvedValue(mockEvents);

    await getEvents(req, res);

    expect(fetchOpenEventConferences).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockEvents);
  });

  it('should handle errors gracefully', async () => {
    const errorMessage = 'Failed to fetch events';
    fetchOpenEventConferences.mockRejectedValue(new Error(errorMessage));

    await getEvents(req, res);

    expect(fetchOpenEventConferences).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch events' });
  });
});