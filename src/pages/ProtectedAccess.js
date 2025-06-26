import React, { useEffect, useState } from 'react';
import "./ProtectedAccess.css";
import config from '../config';

const ProtectedFilePage = () => {
  const [password, setPassword] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requiresPassword, setRequiresPassword] = useState(null);
  const [showTyping, setShowTyping] = useState(true);

  const filename = window.location.pathname.split('/').pop();

  useEffect(() => {
    // Check if password is required
    fetch(`${config.url}/api/files/info/${filename}`)
      .then(res => res.json())
      .then(data => {
        if (!data.requiresPassword) {
          fetchFile('');
          setRequiresPassword(false);
        } else {
          setRequiresPassword(true);
          setTimeout(() => setShowTyping(false), 1500); // Show typing then prompt
        }
      })
      .catch(() => {
        setError('File not found or inaccessible');
        setShowTyping(false);
      });
      // eslint-disable-next-line
  }, [filename]);

  const fetchFile = async (enteredPassword) => {
    setLoading(true);
    setError('');
    setFileUrl('');

    try {
      const res = await fetch(`${config.url}/api/files/protected-access/${filename}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: enteredPassword }),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFile(password);
  };

  const getFileViewer = () => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      return <img src={fileUrl} alt="Protected" className="image-viewer" />;
    } else if (['pdf'].includes(ext)) {
      return <iframe src={fileUrl} title="PDF Document" className="iframe-viewer" />;
    } else {
      return (
        <div className="download-link">
          <a href={fileUrl} download>
            ⬇️ Download {filename}
          </a>
        </div>
      );
    }
  };

  return (
    <div className="protected-container">
      <h2>🔐 Protected File Access</h2>

      {showTyping && (
        <div className="typing-line">Accessing file: "{filename}"</div>
      )}

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

      {fileUrl && !loading && getFileViewer()}
    </div>
  );
};

export default ProtectedFilePage;
