import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfiles } from '../services/api';
import './ProfilesPage.css';

const ProfilesPage = () => {
  const navigate = useNavigate();
  const { user, selectProfile } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const profileRefs = useRef([]);

  useEffect(() => {
    loadProfiles();
  }, []);

  useEffect(() => {
    if (profileRefs.current[focusedIndex]) {
      profileRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const loadProfiles = async () => {
    try {
      const response = await getProfiles();
      if (response?.data) {
        setProfiles(response.data);
      }
    } catch (error) {
      console.error('Failed to load profiles:', error);
    }
  };

  const handleProfileSelect = (profile) => {
    selectProfile(profile);
    navigate('/');
  };

  const handleKeyDown = (e, index) => {
    const cols = 4;
    const rows = Math.ceil(profiles.length / cols);
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
        if (currentCol < cols - 1 && index < profiles.length - 1) {
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
          setFocusedIndex(Math.min(profiles.length - 1, index + cols));
        }
        break;
      case 13: // Enter
        e.preventDefault();
        handleProfileSelect(profiles[index]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="profiles-page">
      <div className="profiles-container">
        <h1>Who's watching?</h1>
        <div className="profiles-grid">
          {profiles.map((profile, index) => (
            <button
              key={profile.id}
              ref={(el) => (profileRefs.current[index] = el)}
              className="profile-card focusable"
              onClick={() => handleProfileSelect(profile)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={index === focusedIndex ? 0 : -1}
            >
              <div className="profile-avatar">
                {profile.picture ? (
                  <img src={profile.picture} alt={profile.name} />
                ) : (
                  <span className="profile-icon">👤</span>
                )}
              </div>
              <span className="profile-name">{profile.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
