import React, { useState } from 'react';
import { eventsList } from '../Events/EventsData';
import './Home.css';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
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
        if (!response.ok) {
            console.error("Server responded with status:", response.status);
            throw new Error("Server response was not OK");
        }

        const data = await response.json();

        if (response.status === 200) {
            alert('Reserved successfully!');
        } else {
            alert(`Error reserving. ${data.message || 'Please try again.'}`);
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
        <img src={event.imageUrl} alt={event.name} />
        <h4>{event.name}</h4>
        <p>{event.date}</p>
      </div>
    ));
  };

  return (
    <div className="home-container">
      <h2>Upcoming Events</h2>
      <div className="home-events-list">
        {renderEventItems()}
      </div>

      {showModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>×</span>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.name} />
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

export default Home;
