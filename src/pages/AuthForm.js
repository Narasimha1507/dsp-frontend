import React, { useState } from 'react';
import './authform.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const clearForm = () => {
    setEmail('');
    setUsername('');
    setMobile('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && (!username || !mobile || !confirmPassword))) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          alert('Login successful!');
          onLogin?.(data.user);
          clearForm();
          navigate('/dashboard');
          window.location.reload();
        } else {
          setError(data.message || 'Login failed. Try again.');
        }
      } else {
        const res = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, mobile, email, password }),
        });

        const data = await res.json();
        if (res.status === 201) {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          alert('Signup successful!');
          onSignup?.(data.user);
          clearForm();
        } else {
          setError(data.message || 'Signup failed. Try again.');
        }
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="auth-container">
      <div className="tab-switcher">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Signup</button>
      </div>

      <div className={`form-flip-card ${isLogin ? '' : 'flipped'}`}>
        <div className="form-inner">
          {/* Login Form (Front) */}
          <form className="form-front" onSubmit={handleSubmit}>
            <h2>Login to your account</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="options-row">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span className="forgot-password">Forgot password?</span>
            </div>

            {isLogin && error && <p className="error">{error}</p>}

            <button type="submit">Login</button>
          </form>

          {/* Signup Form (Back) */}
          <form className="form-back" onSubmit={handleSubmit}>
            <h2>Create an account</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {!isLogin && error && <p className="error">{error}</p>}

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
