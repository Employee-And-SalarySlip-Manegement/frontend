import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import './GenerateSalarySlip.css';

const GenerateSalarySlip = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="admin-generate-salary-slip-page">
        <div className="admin-generate-salary-slip-page-header">
          <h1 className="admin-generate-salary-slip-page-title">Generate Salary Slip</h1>
        </div>
        <div className="admin-generate-salary-slip-page-content">
          <div className="admin-salary-slips-coming-soon">
            <h2>Generate</h2>
            <p>Placeholder page for generating a salary slip.</p>
            <button className="btn" onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GenerateSalarySlip;


