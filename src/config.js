// API Configuration
// This file centralizes API URL configuration for easier deployment

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Video endpoints
  upload: `${API_URL}/upload`,
  streamVideo: (filename) => `${API_URL}/${filename}`,
  
  // Camera endpoints
  startCamera: `${API_URL}/start-camera`,
  stopCamera: `${API_URL}/stop-camera`,
  realtimeFeed: `${API_URL}/realtime-feed`,
  videoFeed: `${API_URL}/video-feed`,
  
  // Heatmap endpoints
  heatmap: `${API_URL}/heatmap`,
  
  // Authentication endpoints
  register: `${API_URL}/register`,
  login: `${API_URL}/login`,
  checkUser: `${API_URL}/check-user`,
  
  // Health check
  health: `${API_URL}/health`,
};

// Export default
export default {
  API_URL,
  API_ENDPOINTS
};
