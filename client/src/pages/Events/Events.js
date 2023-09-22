import React from 'react';
import { eventsList } from '../Events/EventsData';
import './Events.css';
import { useEvents } from '../../hooks/useEvents'; // Correct path to your useEvents hook
import EventModal from '../../components/EventsModal/EventModal';

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
                <EventModal 
                    selectedEvent={selectedEvent}
                    currentIndex={currentIndex}
                    currentImageIndex={currentImageIndex}
                    showModal={showModal}
                    email={email}
                    gender={gender}
                    setEmail={setEmail}
                    setGender={setGender}
                    handleEventClick={handleEventClick}
                    prevEvent={prevEvent}
                    nextEvent={nextEvent}
                    prevImage={prevImage}
                    nextImage={nextImage}
                    handleReservation={handleReservation}
                    handleCloseModal={handleCloseModal}
                />
      )}

    </div>
  );
}

export default Events;
