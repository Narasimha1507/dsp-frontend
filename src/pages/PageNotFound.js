import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="glitch-text" data-text="404">404</div>
      <p className="notfound-message">Page Not Found</p>
      <p className="notfound-subtext">The page you’re looking for might be in stealth mode 🕵️‍♂️</p>
      <Link to="/" className="back-home-button">Return to Safety</Link>
    </div>
  );
};

export default PageNotFound;
