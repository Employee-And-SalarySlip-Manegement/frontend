import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { APP_CONFIG } from '@/constants';
import '@/App.css'

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="container">
      <header className="app-header">
        <h1>🚀 {APP_CONFIG.NAME}</h1>
        <p>Professional MERN Frontend Structure</p>
        <p className="version">Version: {APP_CONFIG.VERSION}</p>
      </header>
      
      <main className="app-main">
        <section className="features">
          <h2>✨ Features Included</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🏗️ Professional Structure</h3>
              <p>Industry-standard folder organization</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Authentication Ready</h3>
              <p>Zustand-based auth with JWT support</p>
            </div>
            <div className="feature-card">
              <h3>🌐 API Integration</h3>
              <p>Axios with interceptors and custom hooks</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Modern CSS</h3>
              <p>CSS Custom Properties with dark mode</p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive Design</h3>
              <p>Mobile-first responsive utilities</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Performance Optimized</h3>
              <p>Code splitting and bundle optimization</p>
            </div>
          </div>
        </section>
        
        <section className="status">
          <h2>🔗 Connection Status</h2>
          <div className="status-info">
            <p><strong>Environment:</strong> {APP_CONFIG.ENVIRONMENT}</p>
            <p><strong>Authentication:</strong> {isAuthenticated ? '✅ Ready' : '⏸️ Not configured'}</p>
            <p><strong>User:</strong> {user?.name || 'Not logged in'}</p>
          </div>
        </section>
      </main>
      
      <footer className="app-footer">
        <p>Ready to build your amazing MERN application! 🎉</p>
      </footer>
    </div>
  );
}

export default App;
