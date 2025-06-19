import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './afterNavbar.css';

const AfterNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/auth');
    window.location.reload();
  };

  if (!user) return null;

  return (
    <header className="after-navbar">
      <div className="after-navbar-logo">
        <NavLink to="/dashboard" className="brand">📁 DocuShare</NavLink>
      </div>
      <nav>
        <ul className="after-navbar-links">
          <li><NavLink to="/upload" className={({ isActive }) => isActive ? 'active' : ''}>Upload</NavLink></li>
          <li><NavLink to="/viewfiles" className={({ isActive }) => isActive ? 'active' : ''}>View Files</NavLink></li>
          <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink></li>
          <li><span className="logout" onClick={handleLogout}>Logout</span></li>
        </ul>
      </nav>
    </header>
  );
};

export default AfterNavbar;
