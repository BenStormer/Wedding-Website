import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logos/logo.svg';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navigation">
      {/* Logo always visible */}
      <Link to="/" className="logo">
        <img src={logo} alt="Wedding Logo" className="logo" />
      </Link>

      {/* Desktop nav - hidden on mobile */}
      <div className="desktop-nav">
        <Link to="/our-story">Our Story</Link>
        <Link to="/rsvp">RSVP</Link>
        {/* other links */}
      </div>

      {/* Mobile hamburger - hidden on desktop */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/our-story">Our Story</Link>
          <Link to="/rsvp">RSVP</Link>
          {/* Links:
            1. Our Story?
            2. RSVP
            3. Event Details
            4. Travel & Accommodation
            5. Registry
            6. Gallery?
            7. Contact ?
          
          */}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
