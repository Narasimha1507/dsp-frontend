import React, { useEffect, useState } from 'react';
import "./ProtectedAccess.css";

const ProtectedFilePage = () => {
  const [password, setPassword] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(null);
  const [showTyping, setShowTyping] = useState(true);

  const filename = window.location.pathname.split('/').pop();

  useEffect(() => {
    fetch(`http://localhost:5000/api/files/info/${filename}`)
      .then(res => res.json())
      .then(data => {
        if (!data.requiresPassword) {
          fetch(`http://localhost:5000/api/files/protected-access/${filename}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: '' }),
          })
            .then(res => {
              if (!res.ok) throw new Error('Error loading file');
              return res.blob();
            })
            .then(blob => {
              setFileUrl(URL.createObjectURL(blob));
              setRequiresPassword(false);
              setShowTyping(false);
            })
            .catch(() => {
              setError('Error displaying file');
              setShowTyping(false);
            });
        } else {
          setRequiresPassword(true);
          setTimeout(() => setShowTyping(false), 2200); // simulate typing duration
        }
      })
      .catch(() => {
        setError('File not found or inaccessible');
        setShowTyping(false);
      });
  }, [filename]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFileUrl('');

    try {
      const res = await fetch(`http://localhost:5000/api/files/protected-access/${filename}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Access denied');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
    } catch (err) {
      setError(err.message || 'Error accessing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="protected-container">
      <h2>🔐 Protected File Access</h2>

      {showTyping && (
        <div className="typing-line">
           Accessing file: "{filename}"
        </div>
      )}

      {requiresPassword === null && !showTyping && <p>Loading...</p>}

      {requiresPassword && !showTyping && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      )}

      {error && <p className="error">{error}</p>}

      {fileUrl && (
        <div className="file-viewer">
          {filename.match(/\.(jpg|jpeg|png|ppt|gif)$/i) ? (
            <img src={fileUrl} alt="Protected" />
          ) : (
            <iframe src={fileUrl} title="Protected File" />
          )}
        </div>
      )}
    </div>
  );
};

export default ProtectedFilePage;
