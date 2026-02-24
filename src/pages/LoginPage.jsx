import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState('email');
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const togglePasswordRef = useRef(null);
  const rememberMeRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profiles');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Auto-focus email field
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e, field) => {
    switch (e.keyCode) {
      case 40: // Down arrow
        e.preventDefault();
        if (field === 'email' && passwordRef.current) {
          passwordRef.current.focus();
          setFocusedField('password');
        } else if (field === 'password' && rememberMeRef.current) {
          rememberMeRef.current.focus();
          setFocusedField('remember');
        } else if (field === 'remember' && submitRef.current) {
          submitRef.current.focus();
          setFocusedField('submit');
        }
        break;
      case 38: // Up arrow
        e.preventDefault();
        if (field === 'password' && emailRef.current) {
          emailRef.current.focus();
          setFocusedField('email');
        } else if (field === 'remember' && passwordRef.current) {
          passwordRef.current.focus();
          setFocusedField('password');
        } else if (field === 'submit' && rememberMeRef.current) {
          rememberMeRef.current.focus();
          setFocusedField('remember');
        }
        break;
      case 39: // Right arrow (on password field)
        if (field === 'password' && togglePasswordRef.current) {
          e.preventDefault();
          togglePasswordRef.current.focus();
          setFocusedField('togglePassword');
        }
        break;
      case 37: // Left arrow (on toggle button)
        if (field === 'togglePassword' && passwordRef.current) {
          e.preventDefault();
          passwordRef.current.focus();
          setFocusedField('password');
        }
        break;
      case 13: // Enter
        if (field === 'submit') {
          handleSubmit(e);
        } else if (field === 'togglePassword') {
          e.preventDefault();
          setShowPassword(!showPassword);
        } else if (field === 'remember') {
          e.preventDefault();
          setRememberMe(!rememberMe);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/profiles');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background with overlay */}
      <div className="login-background">
        <div className="login-background-overlay"></div>
      </div>

      {/* Content */}
      <div className="login-content">
        <div className="login-logo">
          <img src="assets/app_logo.png" alt="Moreplex" />
        </div>
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                className="form-input focusable"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                required
              />
            </div>
            
            <div className="form-group">
              <div className="password-input-wrapper">
                <input
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  className="form-input focusable"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  required
                />
                <button
                  ref={togglePasswordRef}
                  type="button"
                  className="password-toggle focusable"
                  onClick={() => setShowPassword(!showPassword)}
                  onKeyDown={(e) => handleKeyDown(e, 'togglePassword')}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="form-group-checkbox">
              <label className="checkbox-label focusable" ref={rememberMeRef} onKeyDown={(e) => handleKeyDown(e, 'remember')} tabIndex={0}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-text">Remember Me</span>
              </label>
            </div>
            
            <button
              ref={submitRef}
              type="submit"
              className="btn btn-primary focusable"
              onKeyDown={(e) => handleKeyDown(e, 'submit')}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
