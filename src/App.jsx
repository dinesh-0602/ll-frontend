import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import NetworkStatus from './components/NetworkStatus';
import Loading from './components/Loading';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import analytics from './utils/analytics';
import './App.css';
import './theme.css';
import logoImg from './assets/logo.png';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const Upload = lazy(() => import('./pages/Upload'));
const Realtime = lazy(() => import('./pages/Realtime'));
const Heatmap = lazy(() => import('./pages/Heatmap'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleTheme } = useTheme();
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Track page views on route change
  useEffect(() => {
    analytics.pageView(location.pathname, document.title);
  }, [location]);

  // Keyboard shortcuts configuration
  useKeyboardShortcuts([
    { key: 'h', ctrl: true, action: () => navigate('/') },
    { key: 'u', ctrl: true, action: () => navigate('/upload') },
    { key: 'r', ctrl: true, action: () => navigate('/realtime') },
    { key: 'm', ctrl: true, action: () => navigate('/heatmap') },
    { key: 'k', ctrl: true, action: () => toggleTheme() },
    { key: '?', action: () => setShowShortcuts(true) },
  ]);

  return (
    <>
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#main">Skip to content</a>
      <NetworkStatus />
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="Logo" className="app-logo-img" />
          <span className="brand">Stalwart</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} aria-label="Home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/upload" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Upload Video">Upload Video</NavLink>
          </li>
          <li>
            <NavLink to="/realtime" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Real-time Detection">Real-time Detection</NavLink>
          </li>
          <li>
            <NavLink to="/heatmap" className={({ isActive }) => isActive ? 'active' : ''} aria-label="View Heatmap">View Heatmap</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} aria-label="Login">Login</NavLink>
          </li>
        </ul>
        <div className="nav-actions">
          <button 
            className="shortcuts-btn" 
            onClick={() => setShowShortcuts(true)}
            aria-label="Show keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <main id="main" tabIndex={-1}>
        <Suspense fallback={<Loading message="Loading page..." fullScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/realtime" element={<Realtime />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize analytics
    analytics.init({
      gaId: null, // Add your Google Analytics ID here (e.g., 'G-XXXXXXXXXX')
      enableGA: false, // Set to true when you have a GA ID
      enableCustom: true, // Track events locally in localStorage
      debug: process.env.NODE_ENV === 'development'
    });
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
