import React, { useState } from 'react';
import { eventsList } from '../Events/EventsData';
import './Events.css';

function Events() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleEventClick = (event) => {
  setSelectedEvent(event);
  setCurrentIndex(eventsList.indexOf(event));
  setCurrentImageIndex(0);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedEvent(null);
  setCurrentImageIndex(0);
};

  const prevEvent = () => {
  if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedEvent(eventsList[currentIndex - 1]);
    }
  };

  const nextEvent = () => {
    if (currentIndex < eventsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedEvent(eventsList[currentIndex + 1]);
    }
  };
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const nextImage = () => {
    if (selectedEvent && currentImageIndex < selectedEvent.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleReservation = async () => {
    try {
        const response = await fetch('http://localhost:3002/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                gender: gender,
                eventName: selectedEvent.name,
                eventDate: selectedEvent.date
            })
        });

        // Ensure the response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();

            if (response.status === 200) {
                alert('Reserved successfully!');
            } else {
                alert(`Error reserving. ${data.message || 'Please try again.'}`);
            }
        } else if (!response.ok) {
            console.error("Server responded with status:", response.status);
            throw new Error("Server response was not OK");
        }

    } catch (error) {
        console.error("Error:", error);
        alert('An error occurred. Please try again.');
    } finally {
        handleCloseModal();
    }
  };

  const renderEventItems = () => {
    return eventsList.map(event => (
      <div key={event.id} className="home-event-item" onClick={() => handleEventClick(event)}>
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
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>×</span>
            <button onClick={prevEvent} disabled={currentIndex === 0}>Previous Event</button>
            <div className="image-slider">
              
                <button 
                    className="image-slider-button prev" 
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
                    className="image-slider-button next" 
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
            <button onClick={handleReservation}>Reserve</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Events;
