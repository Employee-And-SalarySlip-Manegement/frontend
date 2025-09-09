import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import './SalarySlips.css';

const SalarySlips = () => {
  return (
    <AdminLayout>
      <div className="admin-salary-slips-page">
        <div className="admin-salary-slips-page-header">
          <h1 className="admin-salary-slips-page-title">Manage Salary Slip</h1>
          <p className="admin-salary-slips-page-subtitle">Create and manage employee salary slips</p>
        </div>

        <div className="admin-salary-slips-page-content">
          <div className="admin-salary-slips-coming-soon">
            <div className="admin-salary-slips-coming-soon-icon">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2>Salary Slip Management</h2>
            <p>This feature is coming soon. You'll be able to create, manage, and generate salary slips for all employees.</p>
            <div className="admin-salary-slips-feature-list">
              <div className="admin-salary-slips-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Generate salary slips</span>
              </div>
              <div className="admin-salary-slips-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Calculate deductions and bonuses</span>
              </div>
              <div className="admin-salary-slips-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Download PDF salary slips</span>
              </div>
              <div className="admin-salary-slips-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Email salary slips to employees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalarySlips;
