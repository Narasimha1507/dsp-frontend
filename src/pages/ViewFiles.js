import React, { useEffect, useState } from 'react';
import './viewfiles.css';
import config from '../config';

const ViewFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sharedLinks, setSharedLinks] = useState({});

  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user?.username;

  useEffect(() => {
    if (!username) return;

    fetch(`${config.url}/api/files/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching files.');
        setLoading(false);
      });
  }, [username]);

  const handleDelete = async (filename) => {
    try {
      const res = await fetch(`${config.url}/api/files/${filename}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.message) {
        setFiles((prev) => prev.filter((file) => file.filename !== filename));
        setSharedLinks((prev) => {
          const updated = { ...prev };
          delete updated[filename];
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (filename) => {
    const shareUrl = `${config.url}/api/files/protected-access/${filename}`;
    setSharedLinks((prev) => ({ ...prev, [filename]: shareUrl }));
  };

  if (!username) return <p className="console-msg"> Please log in to view your documents.</p>;
  if (loading) return <p className="console-msg"> Loading files...</p>;
  if (error) return <p className="console-msg"> {error}</p>;

  return (
    <div className="viewfiles-container">
      <h2>📂 Uploaded File Explorer</h2>
      {files.length === 0 ? (
        <p className="console-msg"> No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file._id}>
              <span>{file.originalname}</span>
              <div className="btn-group">
                <a
                  href={`${config.url}/api/files/protected-access/${file.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-link"
                >
                  View
                </a>
                <button className="delete-btn" onClick={() => handleDelete(file.filename)}>Delete</button>
                <button className="share-btn" onClick={() => handleShare(file.filename)}>Share</button>
              </div>
              {sharedLinks[file.filename] && (
                <p className="shared-link">
                  🔗 <a href={sharedLinks[file.filename]} target="_blank" rel="noopener noreferrer">
                    {sharedLinks[file.filename]}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFiles;
