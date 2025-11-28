import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { useToast } from '../components/Toast';
import { handleApiError, validateFile } from '../utils/errorHandler';
import { VideoSkeleton } from '../components/Skeleton';
import analytics from '../utils/analytics';
import { API_ENDPOINTS } from '../config';
import './Upload.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [processedUrl, setProcessedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const toast = useToast();

  const handleUpload = async () => {
    if (!file) {
      toast.warning('Please select a video file first.');
      return;
    }

    if (!validateFile(file, toast)) {
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    const uploadStartTime = Date.now();
    analytics.trackUpload({
      name: file.name,
      size: file.size,
      type: file.type
    });

    try {
      setUploading(true);
      setStatus("Uploading and processing video...");
      setUploadProgress(0);

      const response = await axios.post(API_ENDPOINTS.upload, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.processed_video_url) {
        setVideoLoading(true);
        setProcessedUrl(response.data.processed_video_url);
        setStatus("Video processed successfully!");
        toast.success('Video processed and ready to stream!');
        
        const duration = Math.round((Date.now() - uploadStartTime) / 1000);
        analytics.trackUploadComplete({
          name: file.name
        }, duration);
      } else {
        setStatus("Video uploaded, but no stream URL returned.");
        toast.warning('Video uploaded, but no stream URL returned.');
      }
    } catch (error) {
      console.error(error);
      const errorMsg = handleApiError(error, toast);
      setStatus(`Error: ${errorMsg}`);
      
      analytics.trackUploadError(error, { name: file.name });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="upload-container">
      <div className="page-header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="upload-title">Video Upload</h1>
          <p className="upload-subtitle">Process pre-recorded videos with AI detection</p>
        </div>
      </div>

      <div className="upload-card">
        <div className="upload-area">
          <svg viewBox="0 0 24 24" fill="none" width="48" height="48" className="upload-icon">
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 14l3-3m0 0l3 3m-3-3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="upload-text">{file ? file.name : 'Choose a video file'}</p>
          <input
            type="file"
            accept="video/*"
            className="file-input"
            onChange={(e) => setFile(e.target.files[0])}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-label">
            Browse Files
          </label>
        </div>
        <button className="upload-btn" onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? (
            <span className="loading-spinner-small"></span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {uploading ? 'Processing...' : 'Upload & Process'}
        </button>
        {uploading && uploadProgress > 0 && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <span className="progress-text">{uploadProgress}%</span>
          </div>
        )}
        {status && !uploading && (
          <div className="status-message">{status}</div>
        )}
      </div>

      {processedUrl && (
        <div className="video-section">
          <h3 className="video-section-title">Processed Video</h3>
          <div className="video-player-wrapper">
            {videoLoading && <VideoSkeleton />}
            <ReactPlayer
              muted={true}
              url={processedUrl}
              controls
              playing
              width="100%"
              height="100%"
              className="video-player"
              onReady={() => setVideoLoading(false)}
              style={{ display: videoLoading ? 'none' : 'block' }}
            />
          </div>
        </div>
      )}

      <div className="features-section">
        <h2 className="section-title">Processing Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Supported Formats</h3>
            <p>MP4, AVI, MOV, MKV, WebM - all common video formats with H.264/H.265 codecs supported.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Fast Processing</h3>
            <p>GPU-accelerated inference processes 1 hour of video in under 5 minutes with optimized batching.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Bounding Boxes</h3>
            <p>Every detected person is highlighted with colored boxes showing real-time confidence scores.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Data Export</h3>
            <p>Download detection logs in CSV format with frame-by-frame timestamps and coordinates.</p>
          </div>
        </div>
      </div>

      <div className="specs-section">
        <h2 className="section-title">Upload Specifications</h2>
        <div className="specs-list">
          <div className="spec-row">
            <span className="spec-label">Maximum File Size</span>
            <span className="spec-value">500 MB</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Supported Resolutions</span>
            <span className="spec-value">480p to 4K (3840x2160)</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Processing Time</span>
            <span className="spec-value">~5 min per hour of footage</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Output Format</span>
            <span className="spec-value">MP4 (H.264)</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Storage Duration</span>
            <span className="spec-value">30 days (auto-delete)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
