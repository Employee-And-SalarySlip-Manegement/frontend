import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/services/api';
import AdminLayout from '@/components/admin/AdminLayout';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    adminUsers: 0,
    recentEmployees: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard stats (guard against React 18 StrictMode double-invoke in dev)
  let hasFetchedStats = false;
  useEffect(() => {
    if (hasFetchedStats) return;
    hasFetchedStats = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getDashboardStats();
        setStats(response.data.data.stats);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-dashboard-page loading">
          <div className="admin-dashboard-loading-spinner">
            <div className="admin-dashboard-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard-page">
        {/* Dashboard Header */}
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-header-content">
            <div className="admin-dashboard-header-text">
              <h1 className="admin-dashboard-title">
                Welcome back, <span className="admin-dashboard-user-name">{user?.name}</span>
              </h1>
              <p className="admin-dashboard-subtitle">
                Manage your employees and monitor system activity from your admin dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-dashboard-stats-grid">
          <div className="admin-dashboard-stat-card primary">
            <div className="admin-dashboard-stat-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="admin-dashboard-stat-info">
              <h3 className="admin-dashboard-stat-value">{stats.totalEmployees}</h3>
              <p className="admin-dashboard-stat-label">Total Employees</p>
            </div>
          </div>

          <div className="admin-dashboard-stat-card success">
            <div className="admin-dashboard-stat-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="admin-dashboard-stat-info">
              <h3 className="admin-dashboard-stat-value">{stats.activeEmployees}</h3>
              <p className="admin-dashboard-stat-label">Active Employees</p>
            </div>
          </div>

          <div className="admin-dashboard-stat-card warning">
            <div className="admin-dashboard-stat-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="admin-dashboard-stat-info">
              <h3 className="admin-dashboard-stat-value">{stats.inactiveEmployees}</h3>
              <p className="admin-dashboard-stat-label">Inactive Employees</p>
            </div>
          </div>

          <div className="admin-dashboard-stat-card info">
            <div className="admin-dashboard-stat-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="admin-dashboard-stat-info">
              <h3 className="admin-dashboard-stat-value">{stats.adminUsers}</h3>
              <p className="admin-dashboard-stat-label">Admin Users</p>
            </div>
          </div>
        </div>

        {/* Recent Employees */}
        <div className="admin-dashboard-section">
          <div className="admin-dashboard-section-header">
            <h2 className="admin-dashboard-section-title">Recent Employees</h2>
            <Link to="/admin/employees" className="btn btn-ghost btn-sm">
              View All
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {error && (
            <div className="admin-dashboard-error-message">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          {stats.recentEmployees.length > 0 ? (
            <div className="admin-dashboard-employees-list">
              {stats.recentEmployees.map((employee) => (
                <div key={employee._id} className="admin-dashboard-employee-card">
                  <div className="admin-dashboard-employee-avatar">
                    {employee.avatar ? (
                      <img src={employee.avatar} alt={employee.name} />
                    ) : (
                      <div className="admin-dashboard-avatar-placeholder">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="admin-dashboard-employee-info">
                    <h4 className="admin-dashboard-employee-name">{employee.name}</h4>
                    <p className="admin-dashboard-employee-email">{employee.email}</p>
                    <span className={`admin-dashboard-employee-status ${employee.isActive ? 'active' : 'inactive'}`}>
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="admin-dashboard-employee-actions">
                    <Link 
                      to={`/admin/employees?selectedId=${employee._id}`} 
                      className="btn btn-ghost btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-dashboard-empty-state">
              <div className="admin-dashboard-empty-icon">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3>No employees yet</h3>
              <p>Start by creating your first employee account</p>
              <Link to="/admin/employees/new" className="btn btn-primary">
                Create Employee
              </Link>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
