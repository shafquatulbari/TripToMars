import React, {useState} from 'react';
import { eventsList } from '../Events/EventsData';
import './Home.css';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';  // make sure to update the path to where useEvents.js is

function Home() {
  
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
    // Display only the 3 most recent events
    return eventsList.slice(0, 3).map(event => (
      <div key={event.id} className="home-event-item" onClick={() => handleEventClick(event)}>
        <img src={event.images[0]} alt={event.name} />
        <h4>{event.name}</h4>
        <p>{event.date}</p>
      </div>
    ));
  };

  return (
    <div className="home-container">
      <div className="video-container">
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/MR3gglmUDiM?autoplay=1&loop=1&mute=1&modestbranding=1&controls=0&playlist=MR3gglmUDiM" 
                title="YouTube video player" 
                frameborder="0" 
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                }}
                allowfullscreen>
            </iframe>
        </div>

      </div>
      <h2>Upcoming Events</h2>
      <div className="home-events-list">
        {renderEventItems()}
      </div>

      <Link to="/events" className="view-all-events">View All Events</Link>

      {showModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>Close</span>
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
            <p>Submit to get an email confirmation with form</p>
            <button onClick={handleReservation}>Submit</button>
          </div>
        </div>
      )}
      

      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
      <p>Instagram: <a href="https://instagram.com/triptomarsisreal" target="_blank" rel="noopener noreferrer">triptomars</a></p>
      <p>Phone: +1234567890</p>
    </div>
  );
}

export default Home;
