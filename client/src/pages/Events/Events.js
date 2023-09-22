import React from 'react';
import { eventsList } from '../Events/EventsData';
import './Events.css';
import { useEvents } from '../../hooks/useEvents'; // Correct path to your useEvents hook

function Events() {
  const {
    selectedEvent,
    currentIndex,
    currentImageIndex,
    showModal,
    email,
    gender,
    setEmail,
    setGender,
    handleEventClick,
    prevEvent,
    nextEvent,
    prevImage,
    nextImage,
    handleReservation,
    handleCloseModal
  } = useEvents();

  const renderEventItems = () => {
    return eventsList.map(event => (
      <div key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
        <img src={event.images[0]} alt={event.name} />
        <h4>{event.name}</h4>
        <p>{event.date}</p>
      </div>
    ));
  };

  return (
    <div className="events-container">
      <h2>All Events</h2>
      <div className="events-list">
        {renderEventItems()}
      </div>

      {showModal && selectedEvent && (
        <div className="events-modal">
          <div className="events-modal-content">
            <span className="events-close-button" onClick={handleCloseModal}>Close</span>
            <button onClick={prevEvent} disabled={currentIndex === 0}>Previous Event</button>
            <div className="image-slider">
              
                <button 
                    className="events-image-slider-button prev" 
                    onClick={prevImage} 
                    disabled={currentImageIndex === 0}
                >
                    &lt;
                </button>
                
                <img 
                    src={selectedEvent.images[currentImageIndex]} 
                    alt={`${selectedEvent.name} - Image ${currentImageIndex + 1}`}
                />

                <button 
                    className="events-image-slider-button next" 
                    onClick={nextImage} 
                    disabled={currentImageIndex === selectedEvent.images.length - 1}
                >
                    &gt;
                </button>
            </div>
            <button onClick={nextEvent} disabled={currentIndex === eventsList.length - 1}>Next Event</button>
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.date}</p>
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
            </select>
            <p>Submit to get an email confirmation with form</p>
            <button onClick={handleReservation}>Submit</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Events;
