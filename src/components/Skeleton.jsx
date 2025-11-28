import React from 'react';
import './Skeleton.css';

export const VideoSkeleton = () => (
  <div className="skeleton-container">
    <div className="skeleton-video">
      <div className="skeleton-shimmer"></div>
    </div>
    <div className="skeleton-text-group">
      <div className="skeleton-text skeleton-text-title"></div>
      <div className="skeleton-text skeleton-text-subtitle"></div>
    </div>
  </div>
);

export const HeatmapSkeleton = () => (
  <div className="skeleton-container">
    <div className="skeleton-heatmap">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-heatmap-overlay">
        <div className="skeleton-circle"></div>
        <div className="skeleton-text skeleton-text-center"></div>
      </div>
    </div>
  </div>
);

export const UploadSkeleton = () => (
  <div className="skeleton-upload-container">
    <div className="skeleton-upload-box">
      <div className="skeleton-shimmer"></div>
      <div className="skeleton-upload-icon"></div>
      <div className="skeleton-text skeleton-text-center"></div>
      <div className="skeleton-text skeleton-text-small"></div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-shimmer"></div>
    <div className="skeleton-card-header">
      <div className="skeleton-circle-small"></div>
      <div className="skeleton-text skeleton-text-short"></div>
    </div>
    <div className="skeleton-text skeleton-text-wide"></div>
    <div className="skeleton-text skeleton-text-medium"></div>
  </div>
);

export const StatsSkeleton = () => (
  <div className="skeleton-stats">
    {[1, 2, 3].map(i => (
      <div key={i} className="skeleton-stat-card">
        <div className="skeleton-shimmer"></div>
        <div className="skeleton-text skeleton-text-short"></div>
        <div className="skeleton-number"></div>
      </div>
    ))}
  </div>
);
