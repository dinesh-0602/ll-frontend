import React, { useEffect } from 'react';
import './KeyboardShortcutsModal.css';

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { category: 'Navigation', items: [
      { keys: ['Ctrl', 'H'], description: 'Go to Home' },
      { keys: ['Ctrl', 'U'], description: 'Go to Upload' },
      { keys: ['Ctrl', 'R'], description: 'Go to Real-time Detection' },
      { keys: ['Ctrl', 'M'], description: 'Go to Heatmap' },
    ]},
    { category: 'Real-time Controls', items: [
      { keys: ['Ctrl', 'S'], description: 'Start Camera' },
      { keys: ['Ctrl', 'Q'], description: 'Stop Camera' },
    ]},
    { category: 'General', items: [
      { keys: ['Ctrl', 'K'], description: 'Toggle Theme (Dark/Light)' },
      { keys: ['?'], description: 'Show Keyboard Shortcuts' },
      { keys: ['Esc'], description: 'Close Modal' },
    ]},
  ];

  return (
    <div className="shortcuts-overlay" onClick={onClose}>
      <div className="shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <h2>Keyboard Shortcuts</h2>
          <button className="shortcuts-close" onClick={onClose} aria-label="Close shortcuts modal">
            <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="shortcuts-content">
          {shortcuts.map((section, idx) => (
            <div key={idx} className="shortcuts-section">
              <h3 className="shortcuts-category">{section.category}</h3>
              <div className="shortcuts-list">
                {section.items.map((shortcut, i) => (
                  <div key={i} className="shortcut-item">
                    <div className="shortcut-keys">
                      {shortcut.keys.map((key, j) => (
                        <React.Fragment key={j}>
                          <kbd className="shortcut-key">{key}</kbd>
                          {j < shortcut.keys.length - 1 && <span className="key-separator">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="shortcut-description">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="shortcuts-footer">
          <p>Press <kbd className="shortcut-key">?</kbd> to toggle this menu anytime</p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
