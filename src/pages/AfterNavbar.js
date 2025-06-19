import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <nav className="after-navbar">
      <div className="logo">📁 DocuShare</div>
      <div className="nav-items">
        {/* <span className="welcome-text">Welcome, {user.username || user.email}!</span> */}
        <Link className="nav-link" to="/upload">Upload</Link>
        <Link className="nav-link" to="/viewfiles">View Files</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <span className="nav-link logout" onClick={handleLogout}>Logout</span>
      </div>
    </nav>
  );
};

export default AfterNavbar;
