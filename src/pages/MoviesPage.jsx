import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import './MoviesPage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await getMovies();
      if (response?.data) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="movies-page content-area">
      <div className="safe-area">
        <h1>Movies</h1>
        <MovieGrid movies={movies} />
      </div>
    </div>
  );
};

export default MoviesPage;
