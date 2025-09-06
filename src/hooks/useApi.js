import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook for API calls
 * @param {Function} apiFunction - The API function to call
 * @param {object} options - Configuration options
 * @returns {object} - { data, loading, error, refetch }
 */
export const useApi = (apiFunction, options = {}) => {
  const {
    immediate = true,
    onSuccess,
    onError,
    showErrorToast = false,
    showSuccessToast = false,
    dependencies = [],
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunction(...args);
        const result = response.data;
        
        setData(result);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        if (showSuccessToast) {
          toast.success('Operation completed successfully');
        }
        
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
        
        if (onError) {
          onError(err);
        }
        
        if (showErrorToast) {
          toast.error(errorMessage);
        }
        
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, showErrorToast, showSuccessToast]
  );

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
};

/**
 * Custom hook for API mutations (POST, PUT, DELETE)
 * @param {Function} apiFunction - The API function to call
 * @param {object} options - Configuration options
 * @returns {object} - { mutate, loading, error, data }
 */
export const useMutation = (apiFunction, options = {}) => {
  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (variables) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFunction(variables);
        const result = response.data;
        
        setData(result);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        if (showSuccessToast) {
          toast.success('Operation completed successfully');
        }
        
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
        
        if (onError) {
          onError(err);
        }
        
        if (showErrorToast) {
          toast.error(errorMessage);
        }
        
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, showErrorToast, showSuccessToast]
  );

  return {
    mutate,
    data,
    loading,
    error,
  };
};

/**
 * Hook for fetching data with automatic loading states
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies to trigger refetch
 * @returns {object} - { data, loading, error, refetch }
 */
export const useFetch = (apiFunction, dependencies = []) => {
  return useApi(apiFunction, { 
    immediate: true, 
    dependencies,
    showErrorToast: false 
  });
};

/**
 * Hook for lazy loading data (manual trigger)
 * @param {Function} apiFunction - The API function to call
 * @returns {object} - { data, loading, error, fetch }
 */
export const useLazyFetch = (apiFunction) => {
  const { data, loading, error, execute } = useApi(apiFunction, { 
    immediate: false,
    showErrorToast: false 
  });

  return {
    data,
    loading,
    error,
    fetch: execute,
  };
};

export default {
  useApi,
  useMutation,
  useFetch,
  useLazyFetch,
};
