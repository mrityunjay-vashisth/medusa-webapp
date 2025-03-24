// src/context/AuthContext.js
// Authentication context - manages auth state and provides login/logout functions
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, getCurrentUser } from '../services/authService';
import { setToken, removeToken, getToken } from '../utils/storage';
import { AUTH_CONFIG } from '../config';

// Create the context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track loading state during auth operations
  const [isLoading, setIsLoading] = useState(true);
  // State to store user data
  const [user, setUser] = useState(null);
  // State to store auth errors
  const [error, setError] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      
      if (token) {
        try {
          // Try to get current user data
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          // Token may be invalid or expired
          console.error('Auth check failed:', err);
          removeToken();
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (username, password, rememberMe) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the login API service
      const response = await loginUser(username, password);
      
      // If login is successful
      if (response && response.token) {
        // Save token to storage
        setToken(response.token, rememberMe);
        // Update auth state
        setIsAuthenticated(true);
        setUser(response.user);
        // console.log(localStorage.getItem('auth_token'));
        // console.log(sessionStorage.getItem('auth_token'));
        // console.log(response.user.username);
        
        // Return user data for redirect or other operations
        return response.user;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from storage
    removeToken();
    // Update auth state
    setIsAuthenticated(false);
    setUser(null);
    
    // In a more complex app, we might also call a logout endpoint
    // and handle redirects here
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user,
        error, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};