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
          const { user, token, refreshToken, role } = response.data.data;

          // Store tokens in cookies with secure settings
          const cookieOptions = {
            expires: 7,
            secure: window.location.protocol === 'https:',
            sameSite: 'Lax'
          };
          
          const refreshOptions = {
            expires: 30,
            secure: window.location.protocol === 'https:',
            sameSite: 'Lax'
          };

          Cookies.set(AUTH_CONFIG.TOKEN_KEY, token, cookieOptions);
          Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, refreshOptions);

          // Store user in localStorage for persistence
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          toast.success(`Welcome back, ${user.name}!`);
          return { success: true, data: { user, token, role } };
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

      // Note: Registration disabled - users are created by admin only

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
          
          // Clear localStorage
          localStorage.removeItem(STORAGE_KEYS.USER);

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

      // Get user's dashboard route based on role
      getDashboardRoute: () => {
        const { user } = get();
        if (!user) return ROUTES.LOGIN;
        
        return user.role === 'admin' 
          ? '/admin/dashboard' 
          : '/employee/dashboard';
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
