import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedBanner.css';

const FeaturedBanner = ({ movie }) => {
  const navigate = useNavigate();
  const playButtonRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter
      e.preventDefault();
      navigate(`/watch/${movie.slug}`);
    }
  };

  return (
    <div className="featured-banner" style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}>
      <div className="banner-overlay">
        <div className="banner-content safe-area">
          <h1 className="banner-title">{movie.title}</h1>
          <p className="banner-description">{movie.description?.substring(0, 200)}...</p>
          <div className="banner-actions">
            <button
              ref={playButtonRef}
              className="btn btn-primary focusable"
              onClick={() => navigate(`/watch/${movie.slug}`)}
              onKeyDown={handleKeyDown}
            >
              ▶ Play
            </button>
            <button className="btn btn-secondary focusable">
              ℹ More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
