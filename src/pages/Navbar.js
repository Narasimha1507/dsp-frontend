import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/api/files/protected-access');
  const [menuOpen, setMenuOpen] = useState(false);

  if (hideNavbar) return null;

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          DocuShare
        </NavLink>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
      </div>

      <nav>
        <ul className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li><NavLink to="/auth" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>Login/Signup</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
