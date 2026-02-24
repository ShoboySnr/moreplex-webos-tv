import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieGrid.css';

const MovieGrid = ({ movies }) => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const movieRefs = useRef([]);

  useEffect(() => {
    if (movieRefs.current[focusedIndex]) {
      movieRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e, index) => {
    const cols = 5;
    const rows = Math.ceil(movies.length / cols);
    const currentRow = Math.floor(index / cols);
    const currentCol = index % cols;

    switch (e.keyCode) {
      case 37: // Left
        e.preventDefault();
        if (currentCol > 0) {
          setFocusedIndex(index - 1);
        }
        break;
      case 39: // Right
        e.preventDefault();
        if (currentCol < cols - 1 && index < movies.length - 1) {
          setFocusedIndex(index + 1);
        }
        break;
      case 38: // Up
        e.preventDefault();
        if (currentRow > 0) {
          setFocusedIndex(Math.max(0, index - cols));
        }
        break;
      case 40: // Down
        e.preventDefault();
        if (currentRow < rows - 1) {
          setFocusedIndex(Math.min(movies.length - 1, index + cols));
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

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          ref={(el) => (movieRefs.current[index] = el)}
          className="movie-grid-item focusable"
          onClick={() => navigate(`/watch/${movie.slug}`)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={focusedIndex === index ? 0 : -1}
        >
          <img
            src={movie.poster || movie.thumbnail}
            alt={movie.title}
            className="grid-poster"
          />
          <div className="grid-info">
            <h3 className="grid-title">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
