import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../components/Toast';
import { handleApiError } from '../utils/errorHandler';
import { VideoSkeleton } from '../components/Skeleton';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import analytics from '../utils/analytics';
import { API_ENDPOINTS } from '../config';
import './Realtime.css';

export default function Realtime() {
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const toast = useToast();

  const startCamera = async () => {
    try {
      setLoading(true);
      setIsError(false);
      setStatus("Starting camera...");
      await axios.get(API_ENDPOINTS.startCamera);
      setRunning(true);
      setStartTime(Date.now());
      setDetectionCount(0);
      setStatus("Camera started");
      toast.success('Camera started successfully!');
      
      analytics.trackDetectionStart('camera');
    } catch (error) {
      console.error("Error starting camera:", error);
      const errorMsg = handleApiError(error, toast);
      setStatus(`Error: ${errorMsg}`);
      setIsError(true);
      
      analytics.trackError(error, { action: 'start_camera' });
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = async () => {
    try {
      setLoading(true);
      setIsError(false);
      setStatus("Stopping camera...");
      await axios.get(API_ENDPOINTS.stopCamera);
      setRunning(false);
      setStatus("Camera stopped");
      toast.success('Camera stopped successfully!');
      
      if (startTime) {
        const duration = Math.round((Date.now() - startTime) / 1000);
        analytics.trackDetectionStop(duration, detectionCount);
      }
    } catch (error) {
      console.error("Error stopping camera:", error);
      const errorMsg = handleApiError(error, toast);
      setStatus(`Error: ${errorMsg}`);
      setIsError(true);
      
      analytics.trackError(error, { action: 'stop_camera' });
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcuts for camera controls
  useKeyboardShortcuts([
    { 
      key: 's', 
      ctrl: true, 
      action: () => {
        if (!running && !loading) startCamera();
      }
    },
    { 
      key: 'q', 
      ctrl: true, 
      action: () => {
        if (running && !loading) stopCamera();
      }
    },
  ]);

  return (
    <div className="realtime-container">
      <div className="page-header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="realtime-title">Real-time Detection</h1>
          <p className="realtime-subtitle">Live camera feed with human detection</p>
        </div>
      </div>

      <div className="control-panel">
        <div className="button-group">
          <button className="btn-start" onClick={startCamera} disabled={running || loading}>
            {loading && !running ? (
              <span className="loading-spinner-small"></span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="currentColor"/>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
            {loading && !running ? 'Starting...' : 'Start Camera'}
          </button>
          <button className="btn-stop" onClick={stopCamera} disabled={!running || loading}>
            {loading && running ? (
              <span className="loading-spinner-small"></span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
              </svg>
            )}
            {loading && running ? 'Stopping...' : 'Stop Camera'}
          </button>
        </div>
        {status && (
          <div className={`status-badge ${
            isError ? 'status-error' : 
            running ? 'status-active' : 'status-inactive'
          }`}>
            {status}
          </div>
        )}
      </div>

      {!running && status === "Camera stopped" && (
        <div className="action-card">
          <p>Camera session ended. View the density heatmap for analysis.</p>
          <a href="/heatmap">
            <button className="btn-heatmap">
              View Heatmap
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </a>
        </div>
      )}

      {running && (
        <div className="video-display">
          <div className="video-wrapper">
            {imageLoading && <VideoSkeleton />}
            <img
              src={API_ENDPOINTS.realtimeFeed}
              alt="Live Camera Feed"
              className="live-feed"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
            {!imageLoading && (
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE
              </div>
            )}
          </div>
        </div>
      )}

      <div className="info-section">
        <h2 className="section-title">Detection Capabilities</h2>
        <div className="capabilities-grid">
          <div className="capability-card">
            <div className="capability-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Multi-Person Tracking</h3>
            <p>Simultaneously detect and track multiple individuals in real-time with bounding boxes and confidence scores.</p>
          </div>

          <div className="capability-card">
            <div className="capability-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Real-Time Processing</h3>
            <p>Process video streams at 25-30 FPS with sub-100ms latency using optimized YOLOv8 neural networks.</p>
          </div>

          <div className="capability-card">
            <div className="capability-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Automatic Data Logging</h3>
            <p>Export detection data to CSV format with timestamps, coordinates, and person counts for further analysis.</p>
          </div>

          <div className="capability-card">
            <div className="capability-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Heatmap Generation</h3>
            <p>Automatically generate geographic density heatmaps showing high-traffic zones and movement patterns.</p>
          </div>
        </div>
      </div>

      <div className="tech-specs-section">
        <h2 className="section-title">Technical Specifications</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <div className="spec-label">Detection Model</div>
            <div className="spec-value">YOLOv8 Nano</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Frame Rate</div>
            <div className="spec-value">25-30 FPS</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Processing Latency</div>
            <div className="spec-value">&lt; 100ms</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Detection Accuracy</div>
            <div className="spec-value">90%+ mAP</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Supported Resolution</div>
            <div className="spec-value">Up to 1920x1080</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Concurrent Streams</div>
            <div className="spec-value">1 Active Camera</div>
          </div>
        </div>
      </div>
    </div>
  );
}
