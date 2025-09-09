import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import './Employees.css';

const Employees = () => {
  return (
    <AdminLayout>
      <div className="admin-employees-page">
        <div className="admin-employees-page-header">
          <h1 className="admin-employees-page-title">Manage Employee</h1>
          <p className="admin-employees-page-subtitle">Manage employee accounts and information</p>
        </div>

        <div className="admin-employees-page-content">
          <div className="admin-employees-coming-soon">
            <div className="admin-employees-coming-soon-icon">
              <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2>Employee Management</h2>
            <p>This feature is coming soon. You'll be able to add, edit, and manage employee accounts from here.</p>
            <div className="admin-employees-feature-list">
              <div className="admin-employees-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Add new employees</span>
              </div>
              <div className="admin-employees-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Edit employee information</span>
              </div>
              <div className="admin-employees-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>Manage employee roles</span>
              </div>
              <div className="admin-employees-feature-item">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M5 13l4 4L19 7" />
                </svg>
                <span>View employee details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employees;
