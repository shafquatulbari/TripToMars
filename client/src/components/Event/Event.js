// Event.js

import React, { useState, useEffect } from 'react';
import './Event.css'

function Event({ match }) {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Fetch the event data based on event ID from match.params
    // For now, I'm going to use the static data but in a real-world scenario, 
    // you'd probably make an API call to fetch event details.
    const fetchedEvent = recentEvents.find(event => event.id === parseInt(match.params.eventId));
    setEventData(fetchedEvent);
  }, [match.params.eventId]);

  if (!eventData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={eventData.imageUrl} alt={eventData.name} />
      <h2>{eventData.name}</h2>
      <p>{eventData.date}</p>
      <p>More details about the event...</p>
    </div>
  );
}

export default Event;