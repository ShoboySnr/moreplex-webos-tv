import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('email');
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
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
        } else if (field === 'password' && submitRef.current) {
          submitRef.current.focus();
          setFocusedField('submit');
        }
        break;
      case 38: // Up arrow
        e.preventDefault();
        if (field === 'password' && emailRef.current) {
          emailRef.current.focus();
          setFocusedField('email');
        } else if (field === 'submit' && passwordRef.current) {
          passwordRef.current.focus();
          setFocusedField('password');
        }
        break;
      case 13: // Enter
        if (field === 'submit') {
          handleSubmit(e);
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
      <div className="login-container">
        <div className="login-logo">
          <h1>MOREPLEX</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'email')}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              ref={passwordRef}
              type="password"
              className="form-input focusable"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'password')}
              required
            />
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
  );
};

export default LoginPage;
