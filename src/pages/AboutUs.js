import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className='home-wrapper'>
    <div className="about-container">
      <h1>About DocuShare</h1>
      <p>
        <strong>DocuShare</strong> is a modern platform that helps individuals and teams securely upload,
        store, and share documents in the cloud. We simplify collaboration, improve accessibility,
        and ensure privacy in every file you upload.
      </p>
      <p>
        Whether you're a student, a business, or just someone who wants to share files with friends,
        DocuShare provides a seamless and reliable document management experience.
      </p>
      <p>
        Our mission is to make digital document handling stress-free, secure, and accessible to everyone.
        With an intuitive interface and fast file processing, DocuShare ensures your workflow remains
        uninterrupted.
      </p>
      <p>
        We believe in data privacy, and that’s why every document is encrypted during upload and download.
        With version history, real-time collaboration features, and role-based access, teams can work
        smarter together.
      </p>

      <ul className="about-list">
        <li>✔️ Easy drag-and-drop uploads</li>
        <li>✔️ Real-time collaboration tools</li>
        <li>✔️ Secure cloud storage with encryption</li>
        <li>✔️ Shareable links with permission control</li>
        <li>✔️ Accessible across devices — anytime, anywhere</li>
      </ul>

      <p>
        Join thousands of users who trust DocuShare for their document needs — where simplicity meets security.
      </p>

      <div className="team-section">
        <h2>Meet the Team</h2>
        <ul className="about-list">
          <li>👨‍💻 2200032563 - S Narasimha Raju</li>
          <li>👨‍💻 2200032537 - Ch Chanukya Kumar</li>
          <li>👨‍💻 2200032436 - Md Thasmuddin</li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
