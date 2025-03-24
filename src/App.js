// src/App.js
// Simplified main application component without React Router
import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { AuthProvider, useAuth } from './context/AuthContext';

// App content with conditional rendering based on auth state
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If still loading auth state, show a simple loading indicator
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  // Show LoginPage or HomePage based on authentication state
  return isAuthenticated ? <HomePage /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;