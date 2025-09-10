import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './EmployeeSidebar.css';

const EmployeeSidebar = ({ isCollapsed, onToggle, className = '' }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      ),
      path: '/employee/dashboard'
    },
    {
      id: 'employees',
      label: 'My Profile',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      path: '/employee/profile'
    },
    {
      id: 'salary-slips',
      label: 'View Salary Slip',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/employee/salary-slips'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/employee/settings'
    }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`employee-sidebar-component ${isCollapsed ? 'collapsed' : ''} ${className}`}>
      {/* Sidebar Header */}
      <div className="employee-sidebar-header">
        <div className="employee-sidebar-logo">
          <div className="employee-sidebar-logo-icon">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="employee-sidebar-logo-text">
              <h2>Employee Panel</h2>
              <p>Salary Management</p>
            </div>
          )}
        </div>
        <button 
          className="employee-sidebar-toggle"
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d={isCollapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
          </svg>
        </button>
      </div>

      {/* User Profile */}
      <div className="employee-sidebar-user">
        <div className="employee-sidebar-user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <div className="employee-sidebar-avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="employee-sidebar-user-info">
            <h4 className="employee-sidebar-user-name">{user?.name || 'Employee User'}</h4>
            <p className="employee-sidebar-user-role">Employee</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="employee-sidebar-nav">
        <ul className="employee-sidebar-nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="employee-sidebar-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `employee-sidebar-nav-link ${isActive ? 'active' : ''}`
                }
                title={isCollapsed ? item.label : ''}
              >
                <span className="employee-sidebar-nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="employee-sidebar-nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="employee-sidebar-footer">
        <button 
          className="employee-sidebar-logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
