// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Assuming you will have a separate CSS file for styles

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        TRIP TO MARS
      </Link>
      <nav className="header-nav">
        {/* Add links to other parts of your site here if needed */}
        <Link to="/events">Events</Link>
        <Link to="/about">About Us</Link>
      </nav>
    </header>
  );
}

export default Header;
