// API Configuration
// Automatically detects production vs development environment

const getApiBaseUrl = () => {
  // Check for explicit environment variable (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Detect environment based on current hostname
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Production environment
  if (hostname === 'darkpulse.bot' || hostname === 'www.darkpulse.bot') {
    return `${protocol}//${hostname}/api`;
  }

  // Development environment (localhost)
  return 'http://localhost:5500/api';
};

const getAuthBaseUrl = () => {
  // Check for explicit environment variable (highest priority)
  if (import.meta.env.VITE_AUTH_URL) {
    return import.meta.env.VITE_AUTH_URL;
  }

  // Detect environment based on current hostname
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Production environment
  if (hostname === 'darkpulse.bot' || hostname === 'www.darkpulse.bot') {
    return `${protocol}//${hostname}`;
  }

  // Development environment (localhost)
  return 'http://localhost:5500';
};

export const API_BASE_URL = getApiBaseUrl();
export const AUTH_BASE_URL = getAuthBaseUrl();

// Export full API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNUP: `${AUTH_BASE_URL}/auth/signup`,
  LOGIN: `${AUTH_BASE_URL}/auth/login`,
  GOOGLE_AUTH: `${AUTH_BASE_URL}/auth/google`,
  
  // API endpoints
  BOT_GET: `${API_BASE_URL}/bot-get`,
  BOT_START: `${API_BASE_URL}/bot-start`,
  BOT_STOP: `${API_BASE_URL}/bot-stop`,
  BOT_CONFIG: `${API_BASE_URL}/bot-config`,
  GET_STRATEGY: `${API_BASE_URL}/get-strategy`,
};

export default {
  API_BASE_URL,
  AUTH_BASE_URL,
  API_ENDPOINTS,
};

