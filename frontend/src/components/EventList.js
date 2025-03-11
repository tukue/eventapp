import React from 'react';

const EventList = ({ events }) => {
  console.log('Events:', events); // Log the events prop
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.attributes.name}</h2>
          <p>{event.attributes.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;