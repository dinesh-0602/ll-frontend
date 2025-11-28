import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FAQ from '../components/FAQ';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const droneRef = useRef(null);

  useEffect(() => {
    // 3D Drone Animation
    const drone = droneRef.current;
    if (!drone) return;

    let mouseX = 0;
    let mouseY = 0;
    let droneX = 0;
    let droneY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      droneX += (mouseX - droneX) * 0.05;
      droneY += (mouseY - droneY) * 0.05;
      
      if (drone) {
        drone.style.transform = `translate(-50%, -50%) translate(${droneX}px, ${droneY}px) rotateX(${-droneY * 0.5}deg) rotateY(${droneX * 0.5}deg)`;
      }
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-page">
      <div className="grid-background"></div>
      
      {/* Hero Section */}
      <header className="home-header">
        <div className="hero-content">
          <div className="badge">Powered by YOLOv8</div>
          <h1 className="hero-title">
            Human Detection<br />
            <span className="gradient-text">Made Simple</span>
          </h1>
          <p className="hero-subtitle">
            Enterprise-grade computer vision platform for real-time human detection, 
            tracking, and density analysis with advanced heatmap visualization.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/realtime')}>
              <span>Start Detection</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => navigate('/upload')}>
              Upload Video
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">30fps</div>
              <div className="stat-label">Real-time</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">∞</div>
              <div className="stat-label">Scalable</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="drone-container" ref={droneRef}>
            <div className="drone-body">
              <div className="drone-center"></div>
              <div className="drone-arm drone-arm-1">
                <div className="propeller">
                  <div className="blade"></div>
                  <div className="blade"></div>
                </div>
              </div>
              <div className="drone-arm drone-arm-2">
                <div className="propeller">
                  <div className="blade"></div>
                  <div className="blade"></div>
                </div>
              </div>
              <div className="drone-arm drone-arm-3">
                <div className="propeller">
                  <div className="blade"></div>
                  <div className="blade"></div>
                </div>
              </div>
              <div className="drone-arm drone-arm-4">
                <div className="propeller">
                  <div className="blade"></div>
                  <div className="blade"></div>
                </div>
              </div>
              <div className="camera-gimbal">
                <div className="camera"></div>
              </div>
            </div>
          </div>
          <div className="scanning-effect"></div>
          <div className="detection-boxes">
            <div className="detection-box box-1"></div>
            <div className="detection-box box-2"></div>
            <div className="detection-box box-3"></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Core Capabilities</h2>
          <p className="section-description">
            Built for professionals who demand accuracy, speed, and insights
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate('/realtime')}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Live Camera Detection</h3>
            <p>Real-time human detection with sub-100ms latency. Perfect for monitoring and security applications.</p>
            <ul className="feature-list">
              <li>Multi-person tracking</li>
              <li>Live bounding boxes</li>
              <li>Confidence scoring</li>
              <li>Auto CSV export</li>
            </ul>
            <div className="feature-link">
              Explore →
            </div>
          </div>

          <div className="feature-card" onClick={() => navigate('/upload')}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Video Processing</h3>
            <p>Upload and analyze recorded footage with frame-by-frame precision and automated reporting.</p>
            <ul className="feature-list">
              <li>Batch video processing</li>
              <li>MP4/AVI/MOV support</li>
              <li>Annotated output</li>
              <li>Download results</li>
            </ul>
            <div className="feature-link">
              Explore →
            </div>
          </div>

          <div className="feature-card" onClick={() => navigate('/heatmap')}>
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Density Heatmaps</h3>
            <p>Visualize traffic patterns and crowd density with geographic heatmap overlays and analytics.</p>
            <ul className="feature-list">
              <li>Interactive maps</li>
              <li>Time-series data</li>
              <li>GPS integration</li>
              <li>Export to HTML</li>
            </ul>
            <div className="feature-link">
              Explore →
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="tech-section">
        <div className="tech-content">
          <h2>Powered by YOLOv8</h2>
          <p>State-of-the-art object detection with unmatched speed and accuracy. Built on the latest deep learning architecture for production-grade performance.</p>
          <div className="tech-features">
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Lightning Fast</span>
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Highly Accurate</span>
            </div>
            <div className="tech-item">
              <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Scalable Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases-section">
        <h2 className="section-title">Real-World Applications</h2>
        <div className="use-cases-grid">
          <div className="use-case-card">
            <div className="use-case-number">01</div>
            <h3>Retail Analytics</h3>
            <p>Track customer flow, dwell time, and hot zones. Optimize store layouts and staffing based on real foot traffic data.</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-number">02</div>
            <h3>Security & Surveillance</h3>
            <p>Monitor restricted areas, detect intrusions, and generate alerts. Perfect for airports, warehouses, and corporate facilities.</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-number">03</div>
            <h3>Smart Cities</h3>
            <p>Analyze pedestrian traffic, optimize public transport, and improve urban planning with crowd density insights.</p>
          </div>
          <div className="use-case-card">
            <div className="use-case-number">04</div>
            <h3>Event Management</h3>
            <p>Monitor crowd density at concerts, festivals, and sports events to ensure safety and optimize venue operations.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Deploy?</h2>
          <p>Start detecting in under 60 seconds. No credit card required.</p>
          <button className="btn-cta" onClick={() => navigate('/realtime')}>
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}
