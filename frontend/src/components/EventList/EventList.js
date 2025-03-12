import React from 'react';
import './EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event.id} className="event-item">
          <h3>{event.attributes.name}</h3>
          <p>{event.attributes.description}</p>
          <p><strong>Location:</strong> {event.attributes.location_name}</p>
          <p><strong>Starts At:</strong> {new Date(event.attributes.starts_at).toLocaleString()}</p>
          <p><strong>Ends At:</strong> {new Date(event.attributes.ends_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;