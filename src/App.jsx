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

// Admin pages
import Employees from '@/pages/Admin/Employees/Employees';
import AddEditEmployee from '@/pages/Admin/Employees/AddEditEmployee';
import AdminSalarySlips from '@/pages/Admin/SalarySlips/Employees';
import ViewSalarySlip from '@/pages/Admin/SalarySlips/ViewSalarySlip';
import GenerateSalarySlip from '@/pages/Admin/SalarySlips/GenerateSalarySlip';
import AdminReports from '@/pages/Admin/Reports';
import AdminSettings from '@/pages/Admin/Settings';

// Employee pages
import EmployeeProfile from '@/pages/Employee/Profile'
import EmployeeSalarySlips from '@/pages/Employee/SalarySlips'
import EmployeeSettings from '@/pages/Employee/Settings'

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
      
      <Route 
        path="/admin/employees" 
        element={
          <ProtectedRoute requiredRole="admin">
            <Employees />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/employees/new" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AddEditEmployee />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/employees/:id/edit" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AddEditEmployee />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/salary-slips" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminSalarySlips />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/salary-slips/view/:id" 
        element={
          <ProtectedRoute requiredRole="admin">
            <ViewSalarySlip />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/salary-slips/generate" 
        element={
          <ProtectedRoute requiredRole="admin">
            <GenerateSalarySlip />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/reports" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminReports />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminSettings />
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

      <Route 
        path="/employee/profile" 
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeProfile />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/employee/salary-slips" 
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeSalarySlips />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/employee/settings" 
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeSettings/>
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
