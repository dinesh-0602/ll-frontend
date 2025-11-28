import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container" role="main" aria-labelledby="notfound-title">
      <div className="notfound-content">
        <div className="notfound-animation">
          <div className="notfound-number" aria-hidden="true">404</div>
          <div className="notfound-glitch" aria-hidden="true">404</div>
        </div>
        
        <h1 id="notfound-title" className="notfound-title">Page Not Found</h1>
        <p className="notfound-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="notfound-suggestions">
          <h3>Here are some helpful links:</h3>
          <div className="suggestions-grid">
            <button onClick={() => navigate('/')} className="suggestion-card" aria-label="Go to Home">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Home</span>
            </button>
            
            <button onClick={() => navigate('/realtime')} className="suggestion-card" aria-label="Open Real-time Detection">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Real-time Detection</span>
            </button>
            
            <button onClick={() => navigate('/upload')} className="suggestion-card" aria-label="Go to Upload Video">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Upload Video</span>
            </button>
            
            <button onClick={() => navigate('/heatmap')} className="suggestion-card" aria-label="View Heatmap Analytics">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>View Heatmap</span>
            </button>
          </div>
        </div>
        
        <button onClick={() => navigate(-1)} className="btn-back" aria-label="Go back to previous page">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M11 17l-5-5m0 0l5-5m-5 5h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
