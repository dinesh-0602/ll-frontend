// Analytics utility for tracking user interactions
// Supports Google Analytics 4 (GA4) and custom analytics

import { API_URL } from '../config';

class Analytics {
  constructor() {
    this.isEnabled = false;
    this.debug = process.env.NODE_ENV === 'development';
    this.queue = [];
  }

  // Initialize analytics (call this in App.jsx)
  init(config = {}) {
    const {
      gaId = null, // Google Analytics ID (G-XXXXXXXXXX)
      enableGA = false,
      enableCustom = true,
      debug = false
    } = config;

    this.debug = debug || process.env.NODE_ENV === 'development';
    this.isEnabled = enableGA || enableCustom;

    // Initialize Google Analytics 4
    if (enableGA && gaId) {
      this.initGA4(gaId);
    }

    // Process queued events
    this.processQueue();

    if (this.debug) {
      console.log('[Analytics] Initialized', { enableGA, enableCustom, gaId });
    }
  }

  // Initialize Google Analytics 4
  initGA4(gaId) {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, {
      send_page_view: false // We'll manually track page views
    });

    this.gaId = gaId;
    this.gaEnabled = true;
  }

  // Track page view
  pageView(path, title = document.title) {
    if (!this.isEnabled) {
      this.queue.push({ type: 'pageView', path, title });
      return;
    }

    // Google Analytics
    if (this.gaEnabled && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title
      });
    }

    // Custom tracking (could send to your backend)
    this.trackCustom('page_view', {
      path,
      title,
      timestamp: new Date().toISOString()
    });

    if (this.debug) {
      console.log('[Analytics] Page View:', { path, title });
    }
  }

  // Track custom event
  track(eventName, properties = {}) {
    if (!this.isEnabled) {
      this.queue.push({ type: 'event', eventName, properties });
      return;
    }

    // Google Analytics
    if (this.gaEnabled && window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Custom tracking
    this.trackCustom(eventName, properties);

    if (this.debug) {
      console.log('[Analytics] Event:', eventName, properties);
    }
  }

  // Track button click
  trackClick(buttonName, properties = {}) {
    this.track('button_click', {
      button_name: buttonName,
      ...properties
    });
  }

  // Track video upload
  trackUpload(videoInfo) {
    this.track('video_upload', {
      file_size: videoInfo.size,
      file_type: videoInfo.type,
      file_name: videoInfo.name
    });
  }

  // Track video upload completion
  trackUploadComplete(videoInfo, duration) {
    this.track('video_upload_complete', {
      file_name: videoInfo.name,
      duration_seconds: duration,
      status: 'success'
    });
  }

  // Track video upload error
  trackUploadError(error, videoInfo) {
    this.track('video_upload_error', {
      error_message: error.message,
      file_name: videoInfo?.name,
      error_type: error.type || 'unknown'
    });
  }

  // Track real-time detection start
  trackDetectionStart(source = 'camera') {
    this.track('detection_start', {
      source,
      timestamp: new Date().toISOString()
    });
  }

  // Track real-time detection stop
  trackDetectionStop(duration, detectionCount) {
    this.track('detection_stop', {
      duration_seconds: duration,
      total_detections: detectionCount
    });
  }

  // Track heatmap view
  trackHeatmapView(dateRange = null) {
    this.track('heatmap_view', {
      date_range: dateRange,
      timestamp: new Date().toISOString()
    });
  }

  // Track CSV download
  trackDownload(fileType, fileName) {
    this.track('file_download', {
      file_type: fileType,
      file_name: fileName
    });
  }

  // Track error occurrence
  trackError(error, context = {}) {
    this.track('error', {
      error_message: error.message,
      error_stack: error.stack?.substring(0, 500), // Limit stack trace
      error_context: JSON.stringify(context),
      page_path: window.location.pathname
    });
  }

  // Track search
  trackSearch(query, resultsCount) {
    this.track('search', {
      search_query: query,
      results_count: resultsCount
    });
  }

  // Track user timing (performance)
  trackTiming(category, variable, value) {
    this.track('timing_complete', {
      name: variable,
      value: value,
      event_category: category
    });
  }

  // Custom tracking (send to your backend or local storage)
  trackCustom(eventName, properties) {
    const event = {
      event: eventName,
      properties: {
        ...properties,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: new Date().toISOString(),
        page_url: window.location.href
      }
    };

    // Store in localStorage (you can also send to backend)
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push(event);
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.shift();
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (e) {
      console.error('[Analytics] Failed to store event:', e);
    }

    // Optional: Send to your backend API
    // this.sendToBackend(event);
  }

  // Send analytics to backend (optional)
  async sendToBackend(event) {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      if (this.debug) {
        console.error('[Analytics] Failed to send to backend:', error);
      }
    }
  }

  // Process queued events
  processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      
      if (event.type === 'pageView') {
        this.pageView(event.path, event.title);
      } else if (event.type === 'event') {
        this.track(event.eventName, event.properties);
      }
    }
  }

  // Get stored events (for debugging or export)
  getStoredEvents() {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored events
  clearStoredEvents() {
    localStorage.removeItem('analytics_events');
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;

// Helper hook for React components
export const useAnalytics = () => {
  return analytics;
};
