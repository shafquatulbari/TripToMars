import { eventsList } from '../../pages/Events/EventsData'
import './EventsModal.css'

function EventModal({ selectedEvent,
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
    handleCloseModal }) {
  return (
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
  );
}
export default EventModal;