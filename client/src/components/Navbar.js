import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            RankRaise
          </div>
          <ul className="navbar-nav">
            <li>
              <Link 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/leaderboard" 
                className={location.pathname === '/leaderboard' ? 'active' : ''}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <span style={{ color: '#667eea', fontWeight: 'bold' }}>
                Welcome, {user.name}!
              </span>
            </li>
            <li>
              <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 