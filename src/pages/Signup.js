import React, { useState } from 'react';
import './signup.css';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setUsername('');
    setMobile('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !mobile || !email || !password || !confirm) {
      setError('All fields are required');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, mobile, email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert('Signed up successfully!');
        onSignup && onSignup(email);
        clearForm(); // Only clear form after successful DB storage
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        /><br />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
