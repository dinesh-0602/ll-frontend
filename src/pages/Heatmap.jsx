import React, { useState, useEffect } from 'react';
import { HeatmapSkeleton } from '../components/Skeleton';
import analytics from '../utils/analytics';
import { API_ENDPOINTS } from '../config';
import './Heatmap.css'; // Import custom styles

export default function Heatmap() {
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    // Track heatmap view on mount
    analytics.trackHeatmapView();
  }, []);

  return (
    <div className="heatmap-container">
      <div className="page-header">
        <div className="header-icon">
          <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h1 className="heatmap-title">Density Heatmap</h1>
          <p className="heatmap-subtitle">Geographic visualization of human density patterns</p>
        </div>
      </div>
      <div className="heatmap-card">
        <div className="iframe-wrapper">
          {iframeLoading && <HeatmapSkeleton />}
          <iframe
            src={API_ENDPOINTS.heatmap}
            title="Heatmap"
            width="100%"
            height="100%"
            className="heatmap-iframe"
            onLoad={() => setIframeLoading(false)}
            style={{ display: iframeLoading ? 'none' : 'block' }}
          ></iframe>
        </div>
      </div>

      <div className="analytics-section">
        <h2 className="section-title">Heatmap Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Geographic Mapping</h3>
            <p>Visualize human traffic on an interactive geographic map with color-coded density zones.</p>
          </div>

          <div className="analytics-card">
            <div className="analytics-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Heat Intensity</h3>
            <p>Color gradients from blue (low) to red (high) indicate areas with highest human concentration.</p>
          </div>

          <div className="analytics-card">
            <div className="analytics-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3>Time-Based Analysis</h3>
            <p>Track changes in density patterns across different time periods and identify peak hours.</p>
          </div>

          <div className="analytics-card">
            <div className="analytics-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Export Options</h3>
            <p>Download heatmap data in PNG/SVG formats or export raw CSV data for custom analysis.</p>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h2 className="section-title">Data Insights</h2>
        <div className="insights-container">
          <div className="insight-item">
            <div className="insight-metric">
              <span className="metric-value">15+</span>
              <span className="metric-label">Data Points Per Second</span>
            </div>
            <p className="insight-description">Continuous logging captures position data for every detected person at high frequency.</p>
          </div>

          <div className="insight-item">
            <div className="insight-metric">
              <span className="metric-value">100%</span>
              <span className="metric-label">Coordinate Accuracy</span>
            </div>
            <p className="insight-description">Precise X/Y coordinates mapped to real-world geographic locations using calibration.</p>
          </div>

          <div className="insight-item">
            <div className="insight-metric">
              <span className="metric-value">∞</span>
              <span className="metric-label">Historical Tracking</span>
            </div>
            <p className="insight-description">All detection sessions are stored and can be replayed for long-term trend analysis.</p>
          </div>
        </div>
      </div>

      <div className="usage-section">
        <h2 className="section-title">How to Use</h2>
        <div className="usage-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Start Detection</h3>
            <p>Begin a real-time camera session or upload a video to process human detection.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Wait for Processing</h3>
            <p>The system logs all detected positions and generates coordinate data automatically.</p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>View Heatmap</h3>
            <p>Navigate to this page to see the updated geographic density visualization.</p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Analyze Patterns</h3>
            <p>Identify high-traffic zones, bottlenecks, and optimize space utilization accordingly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
