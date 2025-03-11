import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';
import EventFilter from '../components/EventFilter';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_URL);
        console.log('Fetched events:', response.data); // Log the response data
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <EventFilter />
      <EventList events={events} />
    </div>
  );
};

export default HomePage;