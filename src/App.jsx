import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LiveTVPage from './pages/LiveTVPage';
import MoviesPage from './pages/MoviesPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import LoginPage from './pages/LoginPage';
import ProfilesPage from './pages/ProfilesPage';
import { AuthProvider } from './context/AuthContext';
import { WebOSProvider } from './context/WebOSContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isWebOS, setIsWebOS] = useState(false);

  useEffect(() => {
    // Detect webOS environment
    if (window.webOS) {
      setIsWebOS(true);
      console.log('Running on webOS');
      
      // Initialize webOS
      window.webOS.fetchAppInfo((info) => {
        console.log('App Info:', info);
      });

      // Handle app lifecycle events
      document.addEventListener('webOSRelaunch', () => {
        console.log('App relaunched');
      });

      document.addEventListener('webOSLaunch', () => {
        console.log('App launched');
      });
    } else {
      console.log('Running in browser (development mode)');
    }

    // Handle back button globally
    const handleKeyDown = (e) => {
      if (e.keyCode === 461) { // webOS back button
        e.preventDefault();
        window.history.back();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <WebOSProvider isWebOS={isWebOS}>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profiles" element={<ProfilesPage />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Navigation />
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="/live-tv" element={
                <ProtectedRoute>
                  <Navigation />
                  <LiveTVPage />
                </ProtectedRoute>
              } />
              
              <Route path="/movies" element={
                <ProtectedRoute>
                  <Navigation />
                  <MoviesPage />
                </ProtectedRoute>
              } />
              
              <Route path="/watch/:id" element={
                <ProtectedRoute>
                  <VideoPlayerPage />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </WebOSProvider>
  );
}

export default App;
