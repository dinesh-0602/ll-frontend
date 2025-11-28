import React from 'react';
import analytics from '../utils/analytics';

/**
 * Example component showing all analytics tracking patterns
 * This is a reference implementation - copy patterns as needed
 */

export default function AnalyticsExample() {
  const [data, setData] = React.useState(null);

  // 1. Track component mount/view
  React.useEffect(() => {
    analytics.track('example_component_viewed', {
      timestamp: new Date().toISOString()
    });
  }, []);

  // 2. Track button clicks
  const handleButtonClick = () => {
    analytics.trackClick('example_button', {
      page: 'Example',
      user_action: 'test_click'
    });
  };

  // 3. Track API calls with timing
  const handleFetchData = async () => {
    const startTime = Date.now();
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      
      const duration = (Date.now() - startTime) / 1000;
      analytics.trackTiming('api_calls', 'fetch_data', duration);
      
      analytics.track('data_fetch_success', {
        duration_seconds: duration,
        data_size: result.length
      });
      
      setData(result);
    } catch (error) {
      analytics.trackError(error, {
        action: 'fetch_data',
        api_endpoint: '/api/data'
      });
    }
  };

  // 4. Track file download
  const handleDownload = () => {
    analytics.trackDownload('csv', 'example_data.csv');
    // Download logic...
  };

  // 5. Track custom events
  const handleCustomAction = () => {
    analytics.track('custom_event', {
      property1: 'value1',
      property2: 123,
      nested_data: {
        key: 'value'
      }
    });
  };

  return (
    <div>
      <h1>Analytics Examples</h1>
      <button onClick={handleButtonClick}>Track Button Click</button>
      <button onClick={handleFetchData}>Track API Call</button>
      <button onClick={handleDownload}>Track Download</button>
      <button onClick={handleCustomAction}>Track Custom Event</button>
    </div>
  );
}

/**
 * TRACKED EVENTS REFERENCE:
 * 
 * Automatic:
 * - page_view (location, title)
 * 
 * Upload Page:
 * - video_upload (file_name, file_size, file_type)
 * - video_upload_complete (file_name, duration_seconds)
 * - video_upload_error (error_message, file_name, error_type)
 * 
 * Realtime Page:
 * - detection_start (source, timestamp)
 * - detection_stop (duration_seconds, total_detections)
 * 
 * Heatmap Page:
 * - heatmap_view (date_range, timestamp)
 * 
 * General:
 * - button_click (button_name, page, ...)
 * - file_download (file_type, file_name)
 * - error (error_message, error_stack, error_context, page_path)
 * - search (search_query, results_count)
 * - timing_complete (name, value, event_category)
 * 
 * All events automatically include:
 * - user_agent
 * - screen_resolution
 * - viewport
 * - timestamp
 * - page_url
 */
