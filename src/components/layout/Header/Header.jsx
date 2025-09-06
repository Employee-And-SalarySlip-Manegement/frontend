import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { APP_CONFIG, ROUTES } from '@/constants';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="header-logo">
            <Link to={ROUTES.HOME} className="logo-link">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="var(--color-primary)"/>
                  <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                </svg>
              </div>
              <span className="logo-text">{APP_CONFIG.NAME}</span>
            </Link>
          </div>


          {/* Auth Section */}
          <div className="header-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{user?.name || 'User'}</span>
                </div>
                <div className="user-actions">
                  <button onClick={handleLogout} className="btn btn-ghost">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to={ROUTES.LOGIN} className="btn btn-primary">
                  Login
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
