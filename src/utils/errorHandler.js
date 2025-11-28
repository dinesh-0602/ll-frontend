/**
 * Centralized error handling utilities
 */

export const handleApiError = (error, toast) => {
  console.error('API Error:', error);

  if (!navigator.onLine) {
    toast?.error('No internet connection. Please check your network.');
    return 'No internet connection';
  }

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.detail || error.response.data?.message;

    switch (status) {
      case 400:
        toast?.error(message || 'Invalid request. Please check your input.');
        return message || 'Invalid request';
      case 401:
        toast?.error('Unauthorized. Please login again.');
        return 'Unauthorized';
      case 403:
        toast?.error('Access forbidden. You don\'t have permission.');
        return 'Access forbidden';
      case 404:
        toast?.error('Resource not found. Please try again.');
        return 'Resource not found';
      case 413:
        toast?.error('File too large. Maximum size is 500MB.');
        return 'File too large';
      case 429:
        toast?.error('Too many requests. Please wait a moment.');
        return 'Rate limit exceeded';
      case 500:
        toast?.error('Server error. Our team has been notified.');
        return 'Server error';
      case 503:
        toast?.error('Service temporarily unavailable. Please try again later.');
        return 'Service unavailable';
      default:
        toast?.error(message || 'An unexpected error occurred.');
        return message || 'Unexpected error';
    }
  } else if (error.request) {
    // Request made but no response
    toast?.error('Cannot reach server. Please check if the backend is running.');
    return 'Cannot reach server';
  } else {
    // Something else happened
    toast?.error(error.message || 'An unexpected error occurred.');
    return error.message || 'Unexpected error';
  }
};

export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

export const validateFile = (file, toast) => {
  if (!file) {
    toast?.error('Please select a file.');
    return false;
  }

  // Check file size (500MB)
  const maxSize = 500 * 1024 * 1024;
  if (file.size > maxSize) {
    toast?.error('File size exceeds 500MB limit.');
    return false;
  }

  // Check file type
  const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv', 'video/webm'];
  if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|avi|mov|mkv|webm)$/i)) {
    toast?.error('Invalid file type. Please upload MP4, AVI, MOV, MKV, or WebM files.');
    return false;
  }

  return true;
};

export const formatErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.detail) return error.detail;
  return 'An unexpected error occurred';
};

export const isNetworkError = (error) => {
  return !navigator.onLine || 
         error.message === 'Network Error' || 
         error.code === 'ECONNABORTED' ||
         error.message.includes('network');
};
