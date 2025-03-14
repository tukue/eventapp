import React, { useState } from 'react';
// import './EventFilter.css';
import styles from './EventFilter.module.css';

const EventFilter = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = () => {
    onFilter({ searchTerm });
  };

  return (
    <div className="event-filter">
      <input
        type="text"
        placeholder="Search events"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default EventFilter;