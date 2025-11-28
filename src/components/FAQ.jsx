import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Stalwart Human Detection?",
          answer: "Stalwart is an enterprise-grade computer vision platform that uses YOLOv8 deep learning models to detect, track, and analyze human presence in real-time video streams and recorded footage. It provides live detection, video processing, and density heatmap visualization."
        },
        {
          question: "How accurate is the detection?",
          answer: "Our YOLOv8-based detection achieves 95%+ accuracy in standard conditions. Accuracy depends on factors like video quality, lighting, camera angle, and distance. The system provides confidence scores for each detection, typically ranging from 0.5 to 0.99."
        },
        {
          question: "What video formats are supported?",
          answer: "We support MP4, AVI, MOV, MKV, and WebM formats. For optimal results, use videos with at least 720p resolution and 24fps frame rate. Maximum file size is 500MB per upload."
        }
      ]
    },
    {
      category: "Real-time Detection",
      questions: [
        {
          question: "What are the system requirements for live detection?",
          answer: "For smooth real-time detection, we recommend: Modern browser (Chrome, Firefox, Edge), webcam with 720p+ resolution, stable internet connection (5+ Mbps), and a device with 4GB+ RAM. The system processes at 30fps on most modern hardware."
        },
        {
          question: "Can I use an external camera?",
          answer: "Yes! Any camera accessible through your browser (USB webcams, built-in laptop cameras, or IP cameras with browser support) will work. Make sure to grant camera permissions when prompted."
        },
        {
          question: "How is the detection data stored?",
          answer: "Real-time detection data is automatically saved as CSV files with timestamps, containing detection counts, confidence scores, and frame information. You can download these files anytime from the static/livecsv folder."
        }
      ]
    },
    {
      category: "Video Processing",
      questions: [
        {
          question: "How long does video processing take?",
          answer: "Processing time depends on video length and resolution. As a rough estimate: 1 minute of 1080p video takes ~2-3 minutes to process. You'll see a progress bar during processing, and the annotated video will be available for download once complete."
        },
        {
          question: "What happens to uploaded videos?",
          answer: "Uploaded videos are stored temporarily on our servers for processing. After processing, the original video and annotated output are available for 7 days before automatic deletion. You can download results anytime during this period."
        },
        {
          question: "Can I process multiple videos simultaneously?",
          answer: "Currently, the system processes one video at a time per user to ensure optimal performance. You can queue multiple uploads, and they'll be processed sequentially."
        }
      ]
    },
    {
      category: "Heatmaps & Analytics",
      questions: [
        {
          question: "How are density heatmaps generated?",
          answer: "Heatmaps aggregate detection data over time, showing where humans were detected most frequently. The system uses color gradients (blue=low, red=high) to visualize crowd density. Data can be filtered by date range and time of day."
        },
        {
          question: "Can I export heatmap data?",
          answer: "Yes! Heatmaps can be exported as interactive HTML files (with Folium maps) or raw CSV data containing coordinates, timestamps, and detection counts. Perfect for further analysis in Excel, Python, or BI tools."
        },
        {
          question: "Does the heatmap require GPS data?",
          answer: "No. The basic heatmap shows detection distribution within the camera frame. For geographic heatmaps (actual map overlays), you can optionally provide GPS coordinates for your camera location."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "Is my data secure?",
          answer: "Yes. All video streams are processed on secure servers with encryption in transit (HTTPS). We don't store facial recognition data or personally identifiable information—only detection bounding boxes and statistics."
        },
        {
          question: "Do you use facial recognition?",
          answer: "No. Our system only detects the presence and location of humans without identifying individuals. We focus on counting, tracking, and spatial analysis—not identity."
        },
        {
          question: "Can I delete my data?",
          answer: "Absolutely. You can delete any uploaded video, processed results, or CSV exports at any time. Real-time detection data is stored locally in your browser session until you close it."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "What technology powers the detection?",
          answer: "We use YOLOv8 (You Only Look Once, version 8), the latest state-of-the-art object detection model. Backend is built with Python FastAPI, frontend with React, and data storage with SQLite/MongoDB."
        },
        {
          question: "Can I integrate this with my own system?",
          answer: "Yes! We provide a RESTful API for all detection features. Contact us for API documentation, webhooks, and enterprise integration support."
        },
        {
          question: "Do you offer an on-premise solution?",
          answer: "Yes, enterprise customers can deploy Stalwart on their own infrastructure. We provide Docker containers, Kubernetes configs, and support for private cloud deployments. Contact our sales team for details."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about Stalwart. Can't find what you're looking for? 
            <a href="mailto:support@stalwart.ai"> Contact our support team</a>.
          </p>
        </div>

        <div className="faq-content">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="faq-category-title">{category.category}</h3>
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                  return (
                    <div 
                      key={questionIndex} 
                      className={`faq-item ${isOpen ? 'open' : ''}`}
                    >
                      <button 
                        className="faq-question"
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <svg 
                          className="faq-icon"
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none"
                        >
                          <path 
                            d="M19 9l-7 7-7-7" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className="faq-answer-wrapper">
                        <div className="faq-answer">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <div className="faq-cta-content">
            <h3>Still have questions?</h3>
            <p>Our team is here to help you get the most out of Stalwart.</p>
            <div className="faq-cta-buttons">
              <a href="mailto:support@stalwart.ai" className="btn-primary">
                Contact Support
              </a>
              <a href="/docs" className="btn-secondary">
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
