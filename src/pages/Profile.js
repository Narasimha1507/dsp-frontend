import React, { useEffect, useState } from 'react';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', mobile: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');
    if (!sessionUser) {
      setError('Please log in to view your profile.');
      return;
    }

    const { email } = JSON.parse(sessionUser);
    fetch(`http://localhost:5000/api/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setFormData({ username: data.user.username, mobile: data.user.mobile });
        } else {
          setError('Failed to load user details.');
        }
      })
      .catch(() => {
        setError('Error connecting to the server.');
      });
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setSuccess('');
    setError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setUser((prev) => ({ ...prev, ...formData }));
        sessionStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
        setSuccess('Profile updated successfully!');
        setEditMode(false);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch {
      setError('Error updating profile.');
    }
  };

  if (error) return <p className="error-msg">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User Avatar"
        />
      </div>
      <h2>My Profile</h2>
      {success && <p className="success-msg">{success}</p>}
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p>
          <strong>Username:</strong>{' '}
          {editMode ? (
            <input name="username" value={formData.username} onChange={handleChange} />
          ) : (
            user.username
          )}
        </p>
        <p>
          <strong>Mobile:</strong>{' '}
          {editMode ? (
            <input name="mobile" value={formData.mobile} onChange={handleChange} />
          ) : (
            user.mobile
          )}
        </p>
        <div className="profile-actions">
          {editMode ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditToggle}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
