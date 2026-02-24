import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const menuRefs = useRef([]);

  const menuItems = [
    { title: 'Home', path: '/', icon: '🏠' },
    { title: 'Live TV', path: '/live-tv', icon: '📺' },
    { title: 'Movies', path: '/movies', icon: '🎬' },
    { title: 'Series', path: '/series', icon: '📺' },
    { title: 'My List', path: '/my-list', icon: '📋' },
  ];

  useEffect(() => {
    // Set initial focus
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setFocusedIndex(currentIndex);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Focus the current menu item
    if (menuRefs.current[focusedIndex]) {
      menuRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e, index) => {
    switch (e.keyCode) {
      case 37: // Left arrow
        e.preventDefault();
        setFocusedIndex(Math.max(0, index - 1));
        break;
      case 39: // Right arrow
        e.preventDefault();
        setFocusedIndex(Math.min(menuItems.length - 1, index + 1));
        break;
      case 13: // Enter/OK
        e.preventDefault();
        navigate(menuItems[index].path);
        break;
      case 40: // Down arrow - move to content
        e.preventDefault();
        const firstFocusable = document.querySelector('.content-area .focusable');
        if (firstFocusable) {
          firstFocusable.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container safe-area">
        <div className="nav-logo">
          <h1>MOREPLEX</h1>
        </div>
        <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li key={item.path}>
              <button
                ref={(el) => (menuRefs.current[index] = el)}
                className={`nav-item focusable ${location.pathname === item.path ? 'active' : ''}`}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => navigate(item.path)}
                tabIndex={index === focusedIndex ? 0 : -1}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-title">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-user">
          <button className="user-profile focusable">
            <span className="user-avatar">👤</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
