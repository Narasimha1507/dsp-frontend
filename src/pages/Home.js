import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to DocuShare</h1>
          <p>Your secure and simple platform to upload, manage, and share documents effortlessly.</p>
          <Link to="/signup">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <img src="/images/doc.png" alt="Documents" className="hero-image" />
      </section>

      <section className="features-section">
        <h2>Why Choose DocuShare?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Upload</h3>
            <p>Drag and drop or click to upload documents in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Storage</h3>
            <p>Your files are encrypted and safely stored in the cloud.</p>
          </div>
          <div className="feature-card">
            <h3>Instant Sharing</h3>
            <p>Generate secure links and share your files instantly.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
