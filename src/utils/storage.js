// src/utils/storage.js
// Utility functions for token storage and retrieval
/**
 * Saves the authentication token to storage
 * @param {string} token - The JWT token to save
 * @param {boolean} rememberMe - Whether to persist the token in localStorage
 */
export const setToken = (token, rememberMe = false) => {
    if (rememberMe) {
      // Use localStorage for persistent storage
      localStorage.setItem('auth_token', token);
    } else {
      // Use sessionStorage for session-only storage
      sessionStorage.setItem('auth_token', token);
    }
  };
  
  /**
   * Retrieves the authentication token from storage
   * @returns {string|null} - The JWT token or null if not found
   */
  export const getToken = () => {
    // Check both storage types, localStorage has priority
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  };
  
  /**
   * Removes the authentication token from all storage types
   */
  export const removeToken = () => {
    // Clear from both storage types
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  };
  
  /**
   * Checks if the user is authenticated based on token presence
   * @returns {boolean} - True if authenticated
   */
  export const isAuthenticated = () => {
    return !!getToken();
  };