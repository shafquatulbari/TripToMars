// AboutUs.js

import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Trip to Mars</h1>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At "Trip to Mars", our mission is to bring the dream of space travel closer to reality for people 
          around the world. We believe that space exploration is the next big step for humanity, and we want 
          to be at the forefront of this adventure.
        </p>
      </section>

      <section className="history">
        <h2>Our History</h2>
        <p>
          Founded in 2020, "Trip to Mars" has quickly grown to become one of the leading space tourism 
          companies. We have a dedicated team of engineers, astronauts, and space enthusiasts who are 
          committed to making space travel safe, affordable, and accessible for all.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
        <p>Instagram: <a href="https://instagram.com/triptomars">triptomars</a></p>
        <p>Phone: +1234567890</p>
      </section>
    </div>
  );
}

export default AboutUs;
