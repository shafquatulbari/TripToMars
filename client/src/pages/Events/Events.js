// Events.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Events.css'

const eventsList = [
  {
    id: 1,
    name: 'Event 1',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  {
    id: 2,
    name: 'Event 2',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  {
    id: 3,
    name: 'Event 3',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  {
    id: 4,
    name: 'Event 4',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  {
    id: 5,
    name: 'Event 5',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  {
    id: 6,
    name: 'Event 6',
    date: 'Sept 20, 2023',
    imageUrl: 'path_to_image1.jpg'
  },
  // ... add more events
];

function Events() {
  return (
    <div>
      <h2>All Events</h2>
      <div className="events-list">
        {eventsList.map(event => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <div className="event-item">
              <img src={event.imageUrl} alt={event.name} />
              <h3>{event.name}</h3>
              <p>{event.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Events;