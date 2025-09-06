// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

// Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: import.meta.env.VITE_COOKIE_NAME || 'salary-slip-token',
  REFRESH_TOKEN_KEY: 'salary-slip-refresh-token',
  TOKEN_EXPIRY_KEY: 'salary-slip-token-expiry',
};

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Salary Slip Manager',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  DEBUG: import.meta.env.VITE_DEBUG_MODE === 'true',
};

// File Upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
  ALLOWED_TYPES: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(','),
  MAX_FILES: 5,
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  // Add more routes as needed
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
};

// API Endpoints (if needed for custom hooks)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    PROFILE: '/users/profile',
    LIST: '/users',
    BY_ID: (id) => `/users/${id}`,
  },
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters long',
  PASSWORD_MATCH: 'Passwords do not match',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'EEEE, MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
};

// Breakpoints (in pixels)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Z-index values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
};

export default {
  API_CONFIG,
  AUTH_CONFIG,
  APP_CONFIG,
  UPLOAD_CONFIG,
  ROUTES,
  HTTP_STATUS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  VALIDATION_MESSAGES,
  TOAST_TYPES,
  THEMES,
  PAGINATION,
  DATE_FORMATS,
  ANIMATION_DURATION,
  BREAKPOINTS,
  Z_INDEX,
};
