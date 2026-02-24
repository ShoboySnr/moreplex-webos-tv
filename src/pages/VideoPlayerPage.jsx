import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie } from '../services/api';
import WebOSVideoPlayer from '../components/WebOSVideoPlayer';
import './VideoPlayerPage.css';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      const response = await getMovie(id);
      if (response?.data) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error('Failed to load movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="page-error">
        <h2>Movie not found</h2>
        <button className="btn btn-primary focusable" onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="video-player-page">
      <WebOSVideoPlayer
        src={movie.video_url}
        poster={movie.poster}
        title={movie.title}
        onBack={handleBack}
      />
    </div>
  );
};

export default VideoPlayerPage;
