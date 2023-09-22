// AboutUs.js

import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At "Trip to Mars", our mission is to bring the dream of space travel closer to reality for people 
          around the world. We believe that space exploration is the next big step for humanity, and we want 
          to be at the forefront of this adventure.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>✉️: <a href="mailto:triptomarsbbg@gmail.com">triptomarsbbg@gmail.com</a></p>
        <p>Instagram: <a href="https://instagram.com/triptomarsisreal" target="_blank" rel="noopener noreferrer">triptomars</a></p>
        <p>📞: <a href="tel: +8801791477226">+8801791477226</a></p>
      </section>
    </div>
  );
}

export default AboutUs;
