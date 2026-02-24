import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './WebOSVideoPlayer.css';

const WebOSVideoPlayer = ({ src, poster, title, onBack }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: 'auto',
        fluid: false,
        fill: true,
        responsive: true,
        aspectRatio: '16:9',
        playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
        html5: {
          vhs: {
            overrideNative: true,
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },
      });

      // Set source
      player.src({
        src: src,
        type: 'application/x-mpegURL', // HLS
      });

      // Event listeners
      player.on('play', () => {
        setIsPlaying(true);
        hideControlsAfterDelay();
      });

      player.on('pause', () => {
        setIsPlaying(false);
        setShowControls(true);
      });

      player.on('ended', () => {
        setIsPlaying(false);
        setShowControls(true);
      });

      // webOS specific media handling
      if (window.webOS) {
        player.on('loadedmetadata', () => {
          console.log('Video metadata loaded');
        });
      }

      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [src]);

  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleKeyDown = (e) => {
    const player = playerRef.current;
    if (!player) return;

    setShowControls(true);
    hideControlsAfterDelay();

    switch (e.keyCode) {
      case 461: // Back button
      case 27: // Escape
        e.preventDefault();
        player.pause();
        if (onBack) onBack();
        break;
      case 415: // Play button
      case 179: // Play/Pause
        e.preventDefault();
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
        break;
      case 19: // Pause button
        e.preventDefault();
        player.pause();
        break;
      case 412: // Rewind
      case 37: // Left arrow
        e.preventDefault();
        player.currentTime(Math.max(0, player.currentTime() - 10));
        break;
      case 417: // Fast forward
      case 39: // Right arrow
        e.preventDefault();
        player.currentTime(Math.min(player.duration(), player.currentTime() + 10));
        break;
      case 38: // Up arrow - Volume up
        e.preventDefault();
        player.volume(Math.min(1, player.volume() + 0.1));
        break;
      case 40: // Down arrow - Volume down
        e.preventDefault();
        player.volume(Math.max(0, player.volume() - 0.1));
        break;
      case 13: // OK/Enter - Play/Pause
        e.preventDefault();
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);

  return (
    <div className="webos-video-player">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-16-9"
          playsInline
          poster={poster}
        />
      </div>
      
      {showControls && (
        <div className="video-overlay">
          <div className="video-title">{title}</div>
          <div className="video-hint">
            Press BACK to exit • OK to Play/Pause • ← → to seek
          </div>
        </div>
      )}
    </div>
  );
};

export default WebOSVideoPlayer;
