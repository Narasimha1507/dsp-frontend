import React, { useState } from 'react';
import './upload.css';
import config from '../config';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [uploadedFilename, setUploadedFilename] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user?.username;
  const email = user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLink('');
    setShareMessage('');
    setShowPasswordField(false);

    if (!file || !username || !email) {
      return setMessage('Please select a file and ensure you are logged in.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);

    try {
      const res = await fetch(`${config.url}/api/files/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || 'Upload successful');
      setLink(data.url || '');
      setUploadedFilename(data.filename); // capture for password protection
      setShowPasswordField(true);
      setFile(null);
      document.getElementById('fileInput').value = '';
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file.');
    }
  };

  const handleSetPassword = async () => {
    if (!password || !uploadedFilename) return;

    try {
      const res = await fetch(`${config.url}/api/files/share/${uploadedFilename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setShareMessage(data.message || 'Password protected link created.');
    } catch (err) {
      console.error(err);
      setShareMessage('Failed to set password.');
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload Document</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <p><strong>User:</strong> {username} ({email})</p>
        <input
          id="fileInput"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      {message && <p className="upload-message">{message}</p>}
      {link && (
        <p className="upload-link">
          📎 Shareable Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </p>
      )}

      {showPasswordField && (
        <div className="password-section">
          <p>🔒 Set a password to protect this file:</p>
          <input
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id='pass' onClick={handleSetPassword}>Set Password</button>
          {shareMessage && <p className="upload-message">{shareMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Upload;
