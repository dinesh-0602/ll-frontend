import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { handleApiError } from '../utils/errorHandler';
import './Login.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username.trim()) {
      toast.error('Please enter a username.');
      return;
    }

    if (!password) {
      toast.error('Please enter a password.');
      return;
    }

    // Only validate password strength during registration
    if (!isLogin) {
      const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
      if (!passwordValid) {
        toast.error('Password must be at least 8 characters long and include an uppercase letter, a number, and a symbol.');
        return;
      }
    }

    setLoading(true);

    const trimmedUsername = username.trim();

    // Registration: check if user exists
    if (!isLogin) {
      try {
        const checkResponse = await fetch(`http://localhost:8000/check-user?username=${encodeURIComponent(trimmedUsername)}`);
        const checkData = await checkResponse.json();
        console.log('Registration check:', checkData);
        if (checkData.exists) {
          toast.warning('Username already registered. Please login or use a different username.');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error checking user:', err);
        handleApiError(err, toast);
        setLoading(false);
        return;
      }
    }

    // Login: check if user exists before attempting login
    if (isLogin) {
      try {
        const checkResponse = await fetch(`http://localhost:8000/check-user?username=${encodeURIComponent(trimmedUsername)}`);
        const checkData = await checkResponse.json();
        console.log('Login check:', checkData);
        
      } catch (err) {
        console.error('Error checking user:', err);
        handleApiError(err, toast);
        setLoading(false);
        return;
      }
    }

    const endpoint = isLogin ? 'login' : 'register';
    try {
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || (isLogin ? 'Login successful!' : 'Registration successful!'));
        if (isLogin) {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setIsLogin(true);
          setPassword('');
        }
      } else {
        toast.error(data.detail || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      handleApiError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">{isLogin ? 'Sign in to your account' : 'Join us today'}</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="auth-submit">
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>
        <div className="auth-footer">
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? ' Sign Up' : ' Sign In'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
