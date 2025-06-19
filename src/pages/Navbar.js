import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/api/files/protected-access');
  if (hideNavbar) return null;
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" className="brand">DocuShare</NavLink>
      </div>
      <nav>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/auth" className={({ isActive }) => isActive ? 'active' : ''}>Login/Signup</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
