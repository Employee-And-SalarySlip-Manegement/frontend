import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import '@/styles/index.css';

// Public pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';

// Dashboard pages
import AdminDashboard from '@/pages/Admin/Dashboard/Dashboard';
import EmployeeDashboard from '@/pages/Employee/Dashboard/Dashboard';

// Placeholder components for future routes
const Profile = () => <div>Profile - Coming Soon</div>;

// Dashboard redirect component
const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  const dashboardRoute = user?.role === 'admin' 
    ? '/admin/dashboard' 
    : '/employee/dashboard';
    
  return <Navigate to={dashboardRoute} replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      {/* Dashboard Redirect */}
      <Route path={ROUTES.DASHBOARD} element={<DashboardRedirect />} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Employee Routes */}
      <Route 
        path="/employee/dashboard" 
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Profile Route - accessible to all authenticated users */}
      <Route 
        path={ROUTES.PROFILE} 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
