import React, { useState } from 'react';
import './EventFilter.css';

const EventFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFilter = () => {
    onFilter({ searchTerm, date });
  };

  return (
    <div className="event-filter">
      <input
        type="text"
        placeholder="Search events"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default EventFilter;