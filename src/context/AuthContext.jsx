import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { authAPI } from '@/services/api';
import { AUTH_CONFIG, STORAGE_KEYS } from '@/constants';

/**
 * Authentication store using Zustand
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.login(credentials);
          const { user, token, refreshToken } = response.data.data;

          // Store tokens in cookies
          Cookies.set(AUTH_CONFIG.TOKEN_KEY, token, { 
            expires: 7,
            secure: true,
            sameSite: 'Lax'
          });
          Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, { 
            expires: 30,
            secure: true,
            sameSite: 'Lax'
          });

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success(`Welcome back, ${user.name}!`);
          return { success: true, data: { user, token } };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authAPI.register(userData);
          const { user, token, refreshToken } = response.data.data;

          // Store tokens in cookies
          Cookies.set(AUTH_CONFIG.TOKEN_KEY, token, { 
            expires: 7,
            secure: true,
            sameSite: 'Lax'
          });
          Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, { 
            expires: 30,
            secure: true,
            sameSite: 'Lax'
          });

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success('Account created successfully!');
          return { success: true, data: { user, token } };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          return { success: false, error: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        
        try {
          await authAPI.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear tokens from cookies
          Cookies.remove(AUTH_CONFIG.TOKEN_KEY);
          Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY);

          // Clear state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          toast.success('Logged out successfully');
        }
      },

      updateUser: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Initialize auth state from stored token
      initializeAuth: () => {
        const token = Cookies.get(AUTH_CONFIG.TOKEN_KEY);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (token && storedUser) {
          try {
            const user = JSON.parse(storedUser);
            set({
              user,
              token,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error('Error parsing stored user:', error);
            get().logout();
          }
        }
      },

      // Check if user has specific role
      hasRole: (role) => {
        const { user } = get();
        return user?.role === role || user?.roles?.includes(role);
      },

      // Check if user has specific permission
      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions?.includes(permission);
      },

      // Forgot password
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        
        try {
          await authAPI.forgotPassword(email);
          set({ isLoading: false });
          toast.success('Password reset email sent!');
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to send reset email';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Reset password
      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        
        try {
          await authAPI.resetPassword(token, password);
          set({ isLoading: false });
          toast.success('Password reset successfully!');
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to reset password';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      // Change password
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null });
        
        try {
          await authAPI.changePassword(currentPassword, newPassword);
          set({ isLoading: false });
          toast.success('Password changed successfully!');
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to change password';
          set({ isLoading: false, error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Export individual actions for easier usage
export const useAuth = () => {
  const store = useAuthStore();
  return store;
};
