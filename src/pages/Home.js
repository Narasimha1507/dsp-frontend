import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Weelcome to DocuShare';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="type-text">{typedText}</h1>
          <p className="fade-in">Your secure and simple platform to upload, manage, and share documents effortlessly.</p>
          <Link to="/auth">
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
