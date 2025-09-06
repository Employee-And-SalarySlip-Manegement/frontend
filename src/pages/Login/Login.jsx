import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, VALIDATION_MESSAGES } from '@/constants';
import Layout from '@/components/layout/Layout/Layout';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, isAuthenticated, user, error, clearError } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname;
      const defaultRoute = user.role === 'admin' 
        ? '/admin/dashboard' 
        : '/employee/dashboard';
      navigate(from || defaultRoute, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Form validation
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = VALIDATION_MESSAGES.REQUIRED;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = VALIDATION_MESSAGES.EMAIL;
        }
        break;
      case 'password':
        if (!value) {
          error = VALIDATION_MESSAGES.REQUIRED;
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear global error
    if (error) {
      clearError();
    }
  };

  // Handle input blur for validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setTouched({
        email: true,
        password: true,
      });
      return;
    }

    const result = await login(formData);
    
    if (result.success) {
      const from = location.state?.from?.pathname;
      const defaultRoute = result.data.role === 'admin' 
        ? '/admin/dashboard' 
        : '/employee/dashboard';
      navigate(from || defaultRoute, { replace: true });
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <div className="login-container">
          <div className="login-content">
            {/* Login Form */}
            <div className="login-form-section">
              <div className="login-header">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">
                  Sign in to your account to access your salary slips and dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="login-form" noValidate>
                {/* Global Error */}
                {error && (
                  <div className="error-message global-error">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      autoComplete="email"
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  {errors.email && touched.email && (
                    <div id="email-error" className="field-error">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      autoComplete="current-password"
                      aria-invalid={errors.password && touched.password ? 'true' : 'false'}
                      aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414l-2.123 2.122m0 0l5.656 5.656M21 21l-5.657-5.657m0 0a10.05 10.05 0 01-5.367-2.343" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div id="password-error" className="field-error">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg login-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle className="loading-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </>
                  )}
                </button>

                {/* Back to Home */}
                <div className="login-footer">
                  <Link to={ROUTES.HOME} className="back-link">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </form>
            </div>

            {/* Visual Section */}
            <div className="login-visual-section">
              <div className="login-visual">
                <div className="visual-content">
                  <h2 className="visual-title">Secure Access</h2>
                  <p className="visual-description">
                    Your data is protected with industry-standard security measures. 
                    Log in safely to access your salary information and manage your profile.
                  </p>
                  
                  {/* Security Features */}
                  <div className="security-features">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span>SSL Encrypted</span>
                    </div>
                    
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <span>Secure Authentication</span>
                    </div>
                    
                    <div className="feature-item">
                      <div className="feature-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span>Fast & Reliable</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Graphic */}
                <div className="login-graphic">
                  <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="200" rx="12" fill="var(--color-bg-secondary)"/>
                    <rect x="20" y="20" width="260" height="160" rx="8" fill="var(--color-bg-primary)" stroke="var(--color-border)" strokeWidth="2"/>
                    
                    {/* Login Form Illustration */}
                    <rect x="40" y="50" width="220" height="30" rx="4" fill="var(--color-primary)" fillOpacity="0.1"/>
                    <circle cx="60" cy="65" r="6" fill="var(--color-primary)"/>
                    <rect x="75" y="62" width="60" height="3" rx="1.5" fill="var(--color-primary)"/>
                    <rect x="75" y="68" width="40" height="2" rx="1" fill="var(--color-text-secondary)"/>
                    
                    {/* Form Fields */}
                    <rect x="40" y="90" width="220" height="20" rx="4" fill="var(--color-bg-tertiary)"/>
                    <rect x="50" y="95" width="80" height="2" rx="1" fill="var(--color-text-tertiary)"/>
                    
                    <rect x="40" y="120" width="220" height="20" rx="4" fill="var(--color-bg-tertiary)"/>
                    <rect x="50" y="125" width="60" height="2" rx="1" fill="var(--color-text-tertiary)"/>
                    
                    {/* Submit Button */}
                    <rect x="40" y="150" width="220" height="25" rx="6" fill="var(--color-primary)" fillOpacity="0.8"/>
                    <rect x="130" y="159" width="40" height="3" rx="1.5" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
