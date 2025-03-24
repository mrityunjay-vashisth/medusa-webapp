// src/config.js
// Application configuration settings

/**
 * API base URL for the Medusa core service
 * Override with environment variable in production
 */
export const API_URL = process.env.REACT_APP_API_URL || 'http://172.26.57.112:8080/apis/core/v1';

/**
 * Authentication settings
 */
export const AUTH_CONFIG = {
  // Token storage key names
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  
  // Token expiration time in minutes (for session tokens)
  TOKEN_EXPIRATION: 30,
  
  // Routes
  LOGIN_ROUTE: '/auth/login',
  REGISTER_ROUTE: '/auth/register',
  USER_PROFILE_ROUTE: '/user/profile',
  
  // Redirect paths
  LOGIN_REDIRECT: '/dashboard',
  LOGOUT_REDIRECT: '/login'
};

/**
 * Feature flags
 */
export const FEATURES = {
  ENABLE_REGISTRATION: true,
  ENABLE_PASSWORD_RESET: true,
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_COMPANY_SSO: true
};