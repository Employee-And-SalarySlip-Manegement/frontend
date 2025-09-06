import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '@/constants';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Main Footer */}
          <div className="footer-main">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="var(--color-primary)"/>
                    <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                  </svg>
                </div>
                <span className="footer-logo-text">{APP_CONFIG.NAME}</span>
              </div>
              <p className="footer-description">
                Professional salary slip management system designed for modern businesses. 
                Streamline your payroll processes with our comprehensive solution.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.25c7.55 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.53.8-.58 1.49-1.3 2.04-2.13-.74.33-1.53.55-2.36.65.85-.51 1.5-1.31 1.8-2.27-.79.47-1.66.81-2.6 1-.75-.8-1.82-1.3-3-1.3-2.27 0-4.1 1.84-4.1 4.1 0 .32.04.63.1.93-3.4-.17-6.43-1.8-8.46-4.29-.35.6-.56 1.3-.56 2.05 0 1.42.72 2.68 1.82 3.41-.67-.02-1.3-.2-1.85-.5v.05c0 1.99 1.41 3.65 3.28 4.02-.34.09-.7.14-1.07.14-.26 0-.52-.03-.77-.07.52 1.63 2.04 2.82 3.83 2.85-1.4 1.1-3.17 1.76-5.1 1.76-.33 0-.66-.02-.98-.06 1.82 1.17 3.98 1.85 6.3 1.85"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.45 20.45H16.9v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.47v6.28zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07s.93-2.07 2.07-2.07 2.07.93 2.07 2.07-.93 2.07-2.07 2.07zM7.11 20.45H3.57V9h3.54v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="GitHub">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to={ROUTES.HOME}>Home</Link></li>
                <li><Link to={ROUTES.DASHBOARD}>Dashboard</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-links">
                <li><Link to="/payroll">Payroll Management</Link></li>
                <li><Link to="/salary-slips">Salary Slips</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/analytics">Analytics</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h3 className="footer-title">Support</h3>
              <ul className="footer-links">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/support">Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © {currentYear} {APP_CONFIG.NAME}. All rights reserved.
              </p>
              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms</Link>
                <Link to="/cookies">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
