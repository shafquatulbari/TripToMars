import { useState } from 'react';
import { eventsList } from '../pages/Events/EventsData';

export const useEvents = (initialEvent, eventsData) => {
  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');

  const prevEvent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setSelectedEvent(eventsData[currentIndex - 1]);
    }
  };

  const nextEvent = () => {
    if (currentIndex < eventsData.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setSelectedEvent(eventsData[currentIndex + 1]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
    }
  };

  const nextImage = () => {
    if (selectedEvent && currentImageIndex < selectedEvent.images.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    }
  };

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
  const handleReservation = async () => {
    try {
        const response = await fetch('http://https://triptomarsisrealbackend.onrender.com/reserve', {
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

  return {
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
  };
};
