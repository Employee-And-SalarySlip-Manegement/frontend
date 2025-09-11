import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import './ViewSalarySlip.css';

const ViewSalarySlip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="admin-view-salary-slip-page">
        <div className="admin-view-salary-slip-page-header">
          <h1 className="admin-view-salary-slip-page-title">Salary Slip</h1>
          <p className="admin-view-salary-slip-page-subtitle">Employee ID: {id}</p>
        </div>
        <div className="admin-view-salary-slip-page-content">
          <div className="admin-salary-slips-coming-soon">
            <h2>View Salary Slip</h2>
            <p>Placeholder page for viewing salary slip details.</p>
            <button className="btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewSalarySlip;


