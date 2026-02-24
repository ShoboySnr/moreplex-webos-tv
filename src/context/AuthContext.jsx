import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { login as apiLogin, getUser as apiGetUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token
    const savedToken = Cookies.get('token');
    const savedProfile = localStorage.getItem('selectedProfile');
    
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setLoading(false);
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const fetchUser = async (authToken) => {
    try {
      const userData = await apiGetUser(authToken);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Don't logout on network errors, just stop loading
      setLoading(false);
      // Only logout on auth errors (401)
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      const { token: newToken, user: userData } = response;
      
      setToken(newToken);
      setUser(userData);
      Cookies.set('token', newToken, { expires: 30 });
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setToken(null);
    Cookies.remove('token');
    localStorage.removeItem('selectedProfile');
  };

  const selectProfile = (selectedProfile) => {
    setProfile(selectedProfile);
    localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
  };

  const value = {
    user,
    profile,
    token,
    loading,
    login,
    logout,
    selectProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
