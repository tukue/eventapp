import React from 'react';
import DOMPurify from 'dompurify';
import styles from './EventList.module.css';
// import './EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <h2>{event.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }}></p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Timezone:</strong> {event.timezone}</p>
          <p><strong>Privacy:</strong> {event.privacy}</p>
          <p><strong>Payment Currency:</strong> {event.paymentCurrency}</p>
          <p><strong>Owner Name:</strong> {event.ownerName}</p>
          <p><strong>Owner Description:</strong> {event.ownerDescription}</p>
          <p><strong>Chat Room Name:</strong> {event.chatRoomName}</p>
          {event.thumbnailImageUrl && <img src={event.thumbnailImageUrl} alt={event.name} />}
          {event.largeImageUrl && <img src={event.largeImageUrl} alt={event.name} />}
          {event.iconImageUrl && <img src={event.iconImageUrl} alt={event.name} />}
        </div>
      ))}
    </div>
  );
};

export default EventList;