const { fetchOpenEventConferences } = require('../services/dbEventService');
const axios = require('axios');
const Event = require('../models/Event');

jest.mock('axios');
jest.mock('../models/Event');

describe('fetchOpenEventConferences', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and store events', async () => {
    const mockEvents = [
      {
        attributes: {
          name: 'Event 1',
          description: 'Description 1',
          'location-name': 'Location 1',
          'thumbnail-image-url': 'http://example.com/thumb1.jpg',
          'large-image-url': 'http://example.com/large1.jpg',
          'icon-image-url': 'http://example.com/icon1.jpg',
          'chat-room-name': 'Chat Room 1',
          timezone: 'UTC',
          privacy: 'public',
          'payment-currency': 'USD',
          'owner-name': 'Owner 1',
          'owner-description': 'Owner Description 1',
        },
      },
    ];

    axios.get.mockResolvedValue({ data: { data: mockEvents } });
    Event.create.mockResolvedValue();

    const events = await fetchOpenEventConferences();

    expect(events).toEqual(mockEvents);
    expect(Event.create).toHaveBeenCalledWith({
      name: 'Event 1',
      description: 'Description 1',
      location: 'Location 1',
      thumbnailImageUrl: 'http://example.com/thumb1.jpg',
      largeImageUrl: 'http://example.com/large1.jpg',
      iconImageUrl: 'http://example.com/icon1.jpg',
      chatRoomName: 'Chat Room 1',
      timezone: 'UTC',
      privacy: 'public',
      paymentCurrency: 'USD',
      ownerName: 'Owner 1',
      ownerDescription: 'Owner Description 1',
    });
  });

  it('should handle API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchOpenEventConferences()).rejects.toThrow('API Error');
    expect(Event.create).not.toHaveBeenCalled();
  });

  it('should handle empty event data', async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });

    const events = await fetchOpenEventConferences();

    expect(events).toEqual([]);
    expect(Event.create).not.toHaveBeenCalled();
  });

  it('should handle missing event attributes', async () => {
    const mockEvents = [
      {
        attributes: {
          name: 'Event 1',
        },
      },
    ];

    axios.get.mockResolvedValue({ data: { data: mockEvents } });
    Event.create.mockResolvedValue();

    const events = await fetchOpenEventConferences();

    expect(events).toEqual(mockEvents);
    expect(Event.create).toHaveBeenCalledWith({
      name: 'Event 1',
      description: undefined,
      location: undefined,
      thumbnailImageUrl: undefined,
      largeImageUrl: undefined,
      iconImageUrl: undefined,
      chatRoomName: undefined,
      timezone: undefined,
      privacy: undefined,
      paymentCurrency: undefined,
      ownerName: undefined,
      ownerDescription: undefined,
    });
  });
});