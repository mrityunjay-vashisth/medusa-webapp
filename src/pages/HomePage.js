// src/pages/HomePage.js
// Home page component - simplified without React Router
import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/HomePage.css';
import { MedusaLogo, MEDUSA_LOGO_CONFIG, LogoPresets } from '../components';

function HomePage() {
  // Get auth context to access the logged-in user information
  const { user, logout } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    // The App.js component will switch back to the login page
    // when isAuthenticated becomes false
  };

  return (
    <div className="home-page">
      {/* Left sidebar with Medusa branding */}
      <div className="branding-sidebar">
              <MedusaLogo {...LogoPresets.sidebar} />
            </div>
      
      {/* Right side with user information */}
      <div className="content-container">
        <div className="dashboard-wrapper">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome to Medusa Cloud</h1>
            <button onClick={handleLogout} className="btn btn-secondary logout-button">
              Logout
            </button>
          </div>
          
          {/* User information card */}
          <div className="user-card">
            <h2>Account Information</h2>
            <div className="user-info">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{user?.username || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{user?.name || 'N/A'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">User ID:</span>
                <span className="info-value">{user?.id || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          {/* Response data card - displays the full login response */}
          <div className="response-card">
            <h2>Login Response</h2>
            <pre className="response-data">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          {/* Footer consistent with login page */}
          <div className="footer">
            <button className="language-selector">
              <span>🌐</span> English (US)
            </button>
            <button className="support-link">Contact Medusa Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;