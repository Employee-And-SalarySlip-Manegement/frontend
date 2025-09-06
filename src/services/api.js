import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { API_CONFIG, AUTH_CONFIG, HTTP_STATUS } from '@/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(AUTH_CONFIG.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;

    // Handle token expiration
    if (response?.status === HTTP_STATUS.UNAUTHORIZED && !config._retry) {
      config._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = Cookies.get(AUTH_CONFIG.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const refreshResponse = await axios.post(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            { refreshToken }
          );
          
          const { token } = refreshResponse.data.data;
          Cookies.set(AUTH_CONFIG.TOKEN_KEY, token);
          
          // Retry the original request
          config.headers.Authorization = `Bearer ${token}`;
          return api(config);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove(AUTH_CONFIG.TOKEN_KEY);
        Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle different error types
    const errorMessage = getErrorMessage(error);
    
    // Don't show toast for certain errors
    const silentErrors = [HTTP_STATUS.UNAUTHORIZED, HTTP_STATUS.FORBIDDEN];
    if (!silentErrors.includes(response?.status)) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

/**
 * Extract error message from error object
 * @param {Error} error - Error object
 * @returns {string} Error message
 */
const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return data?.message || 'Bad request';
      case HTTP_STATUS.UNAUTHORIZED:
        return 'Please login to continue';
      case HTTP_STATUS.FORBIDDEN:
        return 'You do not have permission to perform this action';
      case HTTP_STATUS.NOT_FOUND:
        return 'Resource not found';
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return data?.message || 'Validation error';
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return 'Internal server error. Please try again later.';
      default:
        return data?.message || `HTTP Error ${status}`;
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'Something went wrong';
  }
};

/**
 * API service methods
 */
const apiService = {
  /**
   * GET request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise} Response promise
   */
  get: (url, config = {}) => api.get(url, config),

  /**
   * POST request
   * @param {string} url - Endpoint URL
   * @param {any} data - Request data
   * @param {object} config - Axios config
   * @returns {Promise} Response promise
   */
  post: (url, data = {}, config = {}) => api.post(url, data, config),

  /**
   * PUT request
   * @param {string} url - Endpoint URL
   * @param {any} data - Request data
   * @param {object} config - Axios config
   * @returns {Promise} Response promise
   */
  put: (url, data = {}, config = {}) => api.put(url, data, config),

  /**
   * PATCH request
   * @param {string} url - Endpoint URL
   * @param {any} data - Request data
   * @param {object} config - Axios config
   * @returns {Promise} Response promise
   */
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),

  /**
   * DELETE request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios config
   * @returns {Promise} Response promise
   */
  delete: (url, config = {}) => api.delete(url, config),

  /**
   * Upload file with progress
   * @param {string} url - Upload endpoint
   * @param {FormData} formData - Form data with file
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} Upload promise
   */
  upload: (url, formData, onProgress) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },

  /**
   * Download file
   * @param {string} url - Download endpoint
   * @param {string} filename - File name
   * @returns {Promise} Download promise
   */
  download: async (url, filename) => {
    const response = await api.get(url, {
      responseType: 'blob',
    });

    // Create blob link to download
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    return response;
  },

  /**
   * Cancel request
   * @returns {CancelTokenSource} Cancel token source
   */
  createCancelToken: () => axios.CancelToken.source(),
};

// Auth API methods
export const authAPI = {
  login: (credentials) => apiService.post('/auth/login', credentials),
  register: (userData) => apiService.post('/auth/register', userData),
  logout: () => apiService.post('/auth/logout'),
  refreshToken: (refreshToken) => apiService.post('/auth/refresh', { refreshToken }),
  forgotPassword: (email) => apiService.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiService.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => apiService.post('/auth/verify-email', { token }),
  changePassword: (currentPassword, newPassword) => 
    apiService.post('/auth/change-password', { currentPassword, newPassword }),
};

// User API methods
export const userAPI = {
  getProfile: () => apiService.get('/users/profile'),
  updateProfile: (data) => apiService.put('/users/profile', data),
  uploadAvatar: (formData, onProgress) => apiService.upload('/users/avatar', formData, onProgress),
  getUsers: (params) => apiService.get('/users', { params }),
  getUserById: (id) => apiService.get(`/users/${id}`),
  createUser: (data) => apiService.post('/users', data),
  updateUser: (id, data) => apiService.put(`/users/${id}`, data),
  deleteUser: (id) => apiService.delete(`/users/${id}`),
};

export { apiService as default, api };

// Export commonly used methods
export const { get, post, put, patch, delete: del, upload, download } = apiService;
