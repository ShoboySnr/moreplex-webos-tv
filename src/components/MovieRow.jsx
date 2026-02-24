import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../services/api';
import './MovieRow.css';

const MovieRow = ({ title, categoryId }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const movieRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadMovies();
  }, [categoryId]);

  const loadMovies = async () => {
    try {
      const response = await getMovies({ category_id: categoryId });
      if (response?.data) {
        setMovies(response.data.slice(0, 20)); // Limit to 20 movies per row
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
    }
  };

  const handleKeyDown = (e, index) => {
    switch (e.keyCode) {
      case 37: // Left
        e.preventDefault();
        if (index > 0) {
          setFocusedIndex(index - 1);
          scrollToMovie(index - 1);
        }
        break;
      case 39: // Right
        e.preventDefault();
        if (index < movies.length - 1) {
          setFocusedIndex(index + 1);
          scrollToMovie(index + 1);
        }
        break;
      case 13: // Enter
        e.preventDefault();
        navigate(`/watch/${movies[index].slug}`);
        break;
      default:
        break;
    }
  };

  const scrollToMovie = (index) => {
    if (movieRefs.current[index] && scrollContainerRef.current) {
      const movie = movieRefs.current[index];
      const container = scrollContainerRef.current;
      const movieLeft = movie.offsetLeft;
      const containerWidth = container.offsetWidth;
      const scrollLeft = movieLeft - (containerWidth / 2) + (movie.offsetWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container" ref={scrollContainerRef}>
        <div className="row-content">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              ref={(el) => (movieRefs.current[index] = el)}
              className={`movie-card focusable ${focusedIndex === index ? 'focused' : ''}`}
              onClick={() => navigate(`/watch/${movie.slug}`)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              <img
                src={movie.poster || movie.thumbnail}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
