// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const recentEvents = [
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
];

function Home() {
  return (
    <div>
      <h2>Recent Events</h2>
      <div className="events-list">
        {recentEvents.map(event => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <div className="event-item">
              <img src={event.imageUrl} alt={event.name} />
              <h3>{event.name}</h3>
              <p>{event.date}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <Link to="/events" className="view-all-btn">View All Events</Link>

      <section className="about-info">
        <h2>About Us</h2>
        <p>Some information about the hosting entity.</p>
        <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
        <p>Instagram: <a href="https://instagram.com/example">example</a></p>
        <p>Phone: +1234567890</p>
      </section>
    </div>
  );
}

export default Home;