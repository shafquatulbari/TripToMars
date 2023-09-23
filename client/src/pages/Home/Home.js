import React, {useState, useEffect} from 'react';
import { eventsList } from '../Events/EventsData';
import './Home.css';
import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';  // make sure to update the path to where useEvents.js is
import EventModal from '../../components/EventsModal/EventModal'

function Home() {
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);
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

  useEffect(() => {
  const handleResize = () => {
    setIsSmallDevice(window.innerWidth < 768);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

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
                src={`https://www.youtube.com/embed/MR3gglmUDiM?autoplay=${isSmallDevice ? "0" : "1"}&loop=1&mute=1&modestbranding=1&controls=0&playlist=MR3gglmUDiM`}
                title="YouTube video player" 
                frameborder="0" 
                allow="autoplay; muted; playsinline; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: isSmallDevice ? 'auto' : 'none',
                }}
                allowfullscreen
                playsInline>
            </iframe>
        </div>
      <p>Form ➡️: <a href="https://docs.google.com/forms/d/e/1FAIpQLScSLjJ1ivR6WsVqRnpOZZEasPoU8p981TVo5nSth73q-7BGzA/viewform">The Mars Project #1</a></p>
      </div>
      <h2>Upcoming Events</h2>
      <div className="home-events-list">
        {renderEventItems()}
      </div>

      <Link to="/events" className="view-all-events">View All Events</Link>

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
      

      <h2>Contact Us</h2>
      <p>✉️: <a href="mailto:triptomarsbbg@gmail.com">triptomarsbbg@gmail.com</a></p>
      <p>Instagram: <a href="https://instagram.com/triptomarsisreal" target="_blank" rel="noopener noreferrer">triptomars</a></p>
      <p>📞: <a href="tel: +8801791477226">+8801791477226</a></p>
    </div>
  );
}

export default Home;
