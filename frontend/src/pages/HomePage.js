"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventFilter from '../components/EventFilter/EventFilter';
import EventList from '../components/EventList/EventList';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL, {
          params: {
            search: searchTerm,
            page,
            limit: 5,
          },
        });
        const eventData = response.data.data.map(event => ({
          id: event.id,
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
        }));
        setEvents(prevEvents => [...prevEvents, ...eventData]);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [searchTerm, page]);

  const handleFilter = ({ searchTerm }) => {
    setSearchTerm(searchTerm);
    setEvents([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <EventFilter onFilter={handleFilter} />
      <EventList events={events} />
      {loading && <p>Loading...</p>}
      {!loading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default HomePage;