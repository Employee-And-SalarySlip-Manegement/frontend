import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';

/**
 * ProtectedRoute component for protecting routes that require authentication
 * and optional role-based access control
 */
const ProtectedRoute = ({ 
  children, 
  requiredRole = null,
  redirectTo = ROUTES.LOGIN,
  fallback = null 
}) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    // If user has wrong role, redirect based on their actual role
    const userDashboard = user?.role === 'admin' 
      ? '/admin/dashboard' 
      : '/employee/dashboard';
    
    return (
      <Navigate 
        to={userDashboard} 
        replace 
      />
    );
  }

  // Render the protected content
  return children || fallback;
};

/**
 * Hook for role-based conditional rendering
 */
export const useRoleGuard = () => {
  const { user, isAuthenticated } = useAuth();
  
  return {
    isAdmin: isAuthenticated && user?.role === 'admin',
    isEmployee: isAuthenticated && user?.role === 'employee',
    hasRole: (role) => isAuthenticated && user?.role === role,
    user,
    isAuthenticated,
  };
};

/**
 * Higher-order component for role-based access
 */
export const withRoleGuard = (WrappedComponent, requiredRole) => {
  return (props) => {
    const { hasRole } = useRoleGuard();
    
    if (!hasRole(requiredRole)) {
      return (
        <div className="unauthorized-container">
          <div className="unauthorized-content">
            <h2>Access Denied</h2>
            <p>You don't have permission to access this resource.</p>
          </div>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
};

/**
 * Component for conditional role-based rendering
 */
export const RoleGuard = ({ role, children, fallback = null }) => {
  const { hasRole } = useRoleGuard();
  
  if (!hasRole(role)) {
    return fallback;
  }
  
  return children;
};

export default ProtectedRoute;
