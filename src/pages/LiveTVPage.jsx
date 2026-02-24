import React, { useEffect, useState } from 'react';
import { getLiveChannels } from '../services/api';
import ChannelGrid from '../components/ChannelGrid';
import './LiveTVPage.css';

const LiveTVPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      const response = await getLiveChannels();
      if (response?.data) {
        setChannels(response.data);
      }
    } catch (error) {
      console.error('Failed to load channels:', error);
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
    <div className="livetv-page content-area">
      <div className="safe-area">
        <h1>Live TV</h1>
        <ChannelGrid channels={channels} />
      </div>
    </div>
  );
};

export default LiveTVPage;
