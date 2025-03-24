// src/services/api.js
// Base API service for making HTTP requests to the core service
import { getToken } from '../utils/storage';

/**
 * API base URL - should match your core service URL
 * Override with environment variable in production
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/apis/core/v1';

/**
 * Makes a GET request to the specified endpoint
 * @param {string} endpoint - API endpoint to call (without base URL)
 * @param {boolean} requiresAuth - Whether to include the auth token
 * @returns {Promise} - Response data
 */
export const get = async (endpoint, requiresAuth = true) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers
    });

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Makes a POST request to the specified endpoint
 * @param {string} endpoint - API endpoint to call (without base URL)
 * @param {object} data - Data to send in the request body
 * @param {boolean} requiresAuth - Whether to include the auth token
 * @returns {Promise} - Response data
 */
export const post = async (endpoint, data, requiresAuth = true) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = getToken();
      if (!token && endpoint !== '/auth/login') { // Skip auth check for login endpoint
        throw new Error('Authentication required');
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Makes a PUT request to the specified endpoint
 * @param {string} endpoint - API endpoint to call (without base URL)
 * @param {object} data - Data to send in the request body
 * @param {boolean} requiresAuth - Whether to include the auth token
 * @returns {Promise} - Response data
 */
export const put = async (endpoint, data, requiresAuth = true) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Makes a DELETE request to the specified endpoint
 * @param {string} endpoint - API endpoint to call (without base URL)
 * @param {boolean} requiresAuth - Whether to include the auth token
 * @returns {Promise} - Response data
 */
export const del = async (endpoint, requiresAuth = true) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token if required
    if (requiresAuth) {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });

    // Handle error responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};