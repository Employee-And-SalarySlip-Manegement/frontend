import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { APP_CONFIG, ROUTES } from '@/constants';
import Layout from '@/components/layout/Layout';
import './Home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Welcome to <span className="hero-highlight">{APP_CONFIG.NAME}</span>
                </h1>
                <p className="hero-description">
                  Streamline your payroll management with our comprehensive employee and 
                  salary slip management system. Built for modern businesses that value 
                  efficiency and accuracy.
                </p>
                <div className="hero-actions">
                  {isAuthenticated ? (
                    <div className="authenticated-actions">
                      <p className="welcome-message">
                        Welcome back, <strong>{user?.name || 'User'}</strong>!
                      </p>
                      <div className="action-buttons">
                        <Link to={ROUTES.DASHBOARD} className="btn btn-primary btn-large">
                          Go to Dashboard
                        </Link>
                        <Link to={ROUTES.PROFILE} className="btn btn-secondary btn-large">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="guest-actions">
                      <div className="action-buttons">
                        <Link to={ROUTES.LOGIN} className="btn btn-primary btn-large">
                          Login
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-graphic">
                  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" rx="12" fill="var(--color-bg-secondary)"/>
                    <rect x="30" y="30" width="340" height="240" rx="8" fill="var(--color-bg-primary)" stroke="var(--color-border)" strokeWidth="2"/>
                    
                    {/* Header */}
                    <rect x="50" y="50" width="300" height="40" rx="4" fill="var(--color-primary)" fillOpacity="0.1"/>
                    <circle cx="70" cy="70" r="8" fill="var(--color-primary)"/>
                    <rect x="90" y="65" width="80" height="4" rx="2" fill="var(--color-primary)"/>
                    <rect x="90" y="75" width="60" height="3" rx="1.5" fill="var(--color-text-secondary)"/>
                    
                    {/* Document rows */}
                    <rect x="50" y="110" width="300" height="30" rx="4" fill="var(--color-bg-tertiary)"/>
                    <rect x="60" y="120" width="100" height="3" rx="1.5" fill="var(--color-text-primary)"/>
                    <rect x="60" y="127" width="80" height="3" rx="1.5" fill="var(--color-text-secondary)"/>
                    <rect x="280" y="118" width="60" height="14" rx="7" fill="var(--color-success)" fillOpacity="0.2"/>
                    <rect x="290" y="122" width="40" height="6" rx="3" fill="var(--color-success)"/>
                    
                    <rect x="50" y="150" width="300" height="30" rx="4" fill="var(--color-bg-primary)"/>
                    <rect x="60" y="160" width="120" height="3" rx="1.5" fill="var(--color-text-primary)"/>
                    <rect x="60" y="167" width="90" height="3" rx="1.5" fill="var(--color-text-secondary)"/>
                    <rect x="280" y="158" width="60" height="14" rx="7" fill="var(--color-warning)" fillOpacity="0.2"/>
                    <rect x="290" y="162" width="40" height="6" rx="3" fill="var(--color-warning)"/>
                    
                    <rect x="50" y="190" width="300" height="30" rx="4" fill="var(--color-bg-tertiary)"/>
                    <rect x="60" y="200" width="110" height="3" rx="1.5" fill="var(--color-text-primary)"/>
                    <rect x="60" y="207" width="70" height="3" rx="1.5" fill="var(--color-text-secondary)"/>
                    <rect x="280" y="198" width="60" height="14" rx="7" fill="var(--color-success)" fillOpacity="0.2"/>
                    <rect x="290" y="202" width="40" height="6" rx="3" fill="var(--color-success)"/>
                    
                    {/* Footer */}
                    <rect x="50" y="230" width="300" height="20" rx="4" fill="var(--color-primary)" fillOpacity="0.05"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Powerful Features</h2>
              <p className="section-description">
                Everything you need to manage your payroll efficiently
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Employee Management</h3>
                <p className="feature-description">
                  Comprehensive employee database with role management, personal information, and employment history.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Salary Slip Generation</h3>
                <p className="feature-description">
                  Automated salary slip creation with customizable templates, tax calculations, and instant PDF generation.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Analytics & Reports</h3>
                <p className="feature-description">
                  Detailed payroll analytics, expense tracking, and comprehensive reporting for better decision making.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Secure & Compliant</h3>
                <p className="feature-description">
                  Bank-level security with role-based access control and compliance with industry standards.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Home;
