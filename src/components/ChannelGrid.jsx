import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChannelGrid.css';

const ChannelGrid = ({ channels }) => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const channelRefs = useRef([]);

  useEffect(() => {
    if (channelRefs.current[focusedIndex]) {
      channelRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e, index) => {
    const cols = 4;
    const rows = Math.ceil(channels.length / cols);
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
        if (currentCol < cols - 1 && index < channels.length - 1) {
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
          setFocusedIndex(Math.min(channels.length - 1, index + cols));
        }
        break;
      case 13: // Enter
        e.preventDefault();
        navigate(`/watch/${channels[index].slug}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="channel-grid">
      {channels.map((channel, index) => (
        <div
          key={channel.id}
          ref={(el) => (channelRefs.current[index] = el)}
          className="channel-card focusable"
          onClick={() => navigate(`/watch/${channel.slug}`)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={focusedIndex === index ? 0 : -1}
        >
          <img
            src={channel.logo || channel.thumbnail}
            alt={channel.name}
            className="channel-logo"
          />
          <div className="channel-info">
            <h3 className="channel-name">{channel.name}</h3>
            {channel.current_program && (
              <p className="channel-program">{channel.current_program}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelGrid;
