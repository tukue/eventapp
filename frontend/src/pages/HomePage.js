"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/EventList/EventList';
import EventFilter from '../components/EventFilter/EventFilter';

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
        setEvents(prevEvents => [...prevEvents, ...response.data.data]);
        console.log(response.data.data);  
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