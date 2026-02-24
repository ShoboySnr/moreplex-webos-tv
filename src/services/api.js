import axios from 'axios';
import Cookies from 'js-cookie';

// API Configuration
const API_BASE_URL = process.env.API_URL || 'https://localhost:8000/api/moreplex/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout to prevent hanging
  headers: {
    'Content-Type': 'application/json',
    'X-Device-Type': 'tv',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response;
};

export const getUser = async (token) => {
  const response = await api.get('/user', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response;
};

// Profile APIs
export const getProfiles = async () => {
  const response = await api.get('/profiles');
  return response;
};

export const createProfile = async (name, language) => {
  const response = await api.post('/profiles', { name, language });
  return response;
};

// Movie APIs
export const getMovies = async (params = {}) => {
  const response = await api.get('/movies', { params });
  return response;
};

export const getMovie = async (slug) => {
  const response = await api.get(`/movies/${slug}`);
  return response;
};

export const getFeaturedMovies = async () => {
  const response = await api.get('/movies/featured');
  return response;
};

export const getCategories = async () => {
  const response = await api.get('/category');
  return response;
};

// Live TV APIs
export const getLiveChannels = async () => {
  const response = await api.get('/readEpg');
  return response;
};

export const getLiveChannel = async (slug) => {
  const response = await api.get(`/live-tv/${slug}`);
  return response;
};

// Subscription APIs
export const getPackages = async () => {
  const response = await api.get('/packages');
  return response;
};

export const createPayment = async (packageData) => {
  const response = await api.post('/create-payment', packageData);
  return response;
};

export default api;
