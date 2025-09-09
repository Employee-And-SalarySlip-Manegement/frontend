import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import './Reports.css';

const Reports = () => {
  return (
    <AdminLayout>
      <div className="admin-reports-page">
        <div className="admin-reports-page-header">
          <h1 className="admin-reports-page-title">View Reports</h1>
          <p className="admin-reports-page-subtitle">Analyze payroll and employee data with comprehensive reports</p>
        </div>

        <div className="admin-reports-page-content">
          <div className="admin-reports-coming-soon">
            <div className="admin-reports-coming-soon-icon">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2>Reports & Analytics</h2>
            <p>This feature is coming soon. You'll have access to comprehensive reports and analytics for better decision making.</p>
            <div className="admin-reports-feature-list">
              <div className="admin-reports-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Payroll summary reports</span>
              </div>
              <div className="admin-reports-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Employee attendance tracking</span>
              </div>
              <div className="admin-reports-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Tax and deduction reports</span>
              </div>
              <div className="admin-reports-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Export data to Excel/PDF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
