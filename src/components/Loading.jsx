import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <div className={`loading-wrapper ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-content">
        <div className="loading-spinner-large"></div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    </div>
  );

  return content;
};

export default Loading;
