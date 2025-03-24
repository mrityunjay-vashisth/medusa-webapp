// src/services/authService.js
// Service functions for authentication API calls
import { post, get } from './api';

/**
 * Attempts to log in a user with the provided credentials
 * @param {string} username - User's username or email
 * @param {string} password - User's password
 * @returns {Promise} - Returns user data and token on success
 */
export const loginUser = async (username, password) => {
  try {
    // Make an actual API call to your core service login endpoint
    // Use the api service post method which handles error handling and tokens
    const data = await post('/auth/login', { username, password }, false);

    // The API service already handles error responses, so we get the successful data directly
    
    // Return token and user data

    return {
        token: data.token,
        user: {
            id: data.id || '1',
            username: username,
            email: data.email || username,
            name: data.name || username
        }
    };
  } catch (error) {
    console.error('Login error:', error)
    throw error;
  }
};

/**
 * Gets the current user's information
 * @returns {Promise} - Returns user data on success
 */
export const getCurrentUser = async () => {
    try {
      // Use the api service to make an authenticated GET request
      return await get('/user/profile');
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  };
  