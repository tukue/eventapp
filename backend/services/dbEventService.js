const axios = require('axios');
const Event = require('../models/Event');

const fetchOpenEventConferences = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.eventyay.com/v1/events?is_free=true';
  const response = await axios.get(apiUrl);
  const events = response.data.data;

  // Store events in the database
  for (const event of events) {
    await Event.create({
      name: event.attributes.name,
      description: event.attributes.description,
      location: event.attributes['location-name'],
      thumbnailImageUrl: event.attributes['thumbnail-image-url'],
      largeImageUrl: event.attributes['large-image-url'],
      iconImageUrl: event.attributes['icon-image-url'],
      chatRoomName: event.attributes['chat-room-name'],
      timezone: event.attributes.timezone,
      privacy: event.attributes.privacy,
      paymentCurrency: event.attributes['payment-currency'],
      ownerName: event.attributes['owner-name'],
      ownerDescription: event.attributes['owner-description'],
    });
  }

  return events;
};

module.exports = { fetchOpenEventConferences };