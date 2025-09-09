import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import './Settings.css';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="admin-settings-page">
        <div className="admin-settings-page-header">
          <h1 className="admin-settings-page-title">Settings</h1>
          <p className="admin-settings-page-subtitle">Configure system settings and preferences</p>
        </div>

        <div className="admin-settings-page-content">
          <div className="admin-settings-coming-soon">
            <div className="admin-settings-coming-soon-icon">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2>System Settings</h2>
            <p>This feature is coming soon. You'll be able to configure various system settings and preferences.</p>
            <div className="admin-settings-feature-list">
              <div className="admin-settings-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Company information</span>
              </div>
              <div className="admin-settings-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Payroll configurations</span>
              </div>
              <div className="admin-settings-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Email templates</span>
              </div>
              <div className="admin-settings-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Security settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
