// src/pages/LoginPage.js
// Login page component - simplified without React Router
import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState('');
  
  // Get auth context for login functionality
  const { login, isLoading, error: contextError } = useAuth();
  
  // Combine local and context errors
  const error = localError || contextError;
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    // Basic validation
    if (!username.trim()) {
      setLocalError('Username is required');
      return;
    }
    
    if (!password) {
      setLocalError('Password is required');
      return;
    }
    
    try {
      // Call the login function from the auth context
      await login(username, password, rememberMe);
      // No need to redirect - App.js will show the HomePage based on auth state
    } catch (err) {
      console.error('Login error:', err);
      // Error is already set in the context
    }
  };
  
  // Handler for "forgot password" link
  const handleForgotPassword = () => {
    alert('Forgot password functionality would open here');
  };
  
  // Handler for "create account" link
  const handleCreateAccount = () => {
    alert('Registration page would open here');
  };
  
  // Handler for company login
  const handleCompanyLogin = () => {
    alert('Company SSO login would trigger here');
  };
  
  return (
    <div className="login-page">
      {/* Left sidebar with Medusa branding */}
      <div className="branding-sidebar">
        <div className="logo">
          medusa
          <span className="trademark">™</span>
        </div>
      </div>
      
      {/* Right side with login form */}
      <div className="form-container">
        <div className="login-form-wrapper">
          <h1 className="form-title">Medusa Cloud</h1>
          
          {/* Error message display */}
          {error && <div className="error-message">{error}</div>}
          
          {/* Login form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Username field */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="username">Username</label>
                <button 
                  type="button" 
                  className="forgot-link"
                  onClick={handleForgotPassword}
                >
                  Forgot your username?
                </button>
              </div>
              <input
                type="text"
                id="username"
                placeholder="[Medusa.com, My Medusa, or Medusa Cloud]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            {/* Password field */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <button 
                  type="button" 
                  className="forgot-link"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Remember me checkbox */}
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            
            {/* Login button */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            
            {/* Company login button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCompanyLogin}
            >
              Sign in with my company credentials
            </button>
            
            {/* Registration link */}
            <div className="register-link">
              <button 
                type="button" 
                onClick={handleCreateAccount}
              >
                Don't have an account?
              </button>
            </div>
          </form>
          
          {/* Footer section */}
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

export default LoginPage;