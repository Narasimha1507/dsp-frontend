import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p className="dashboard-error">Please log in to view the dashboard.</p>;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: 'spring' }
    }),
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <p>Welcome back, <strong>{user.username || user.email}</strong>!</p>
      </div>

      <div className="dashboard-stats">
        {['Documents', 'Uploaded', 'Shared'].map((title, i) => (
          <motion.div
            key={title}
            className="stat-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={i}
          >
            <h3>{title === 'Documents' ? '📁' : title === 'Uploaded' ? '📥' : '📤'} {title}</h3>
            <p>0</p>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-user-info">
        <h4>🔐 Your Info</h4>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>
    </div>
  );
};

export default Dashboard;
