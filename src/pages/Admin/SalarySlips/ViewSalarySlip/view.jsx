import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSalarySlip } from '@/hooks/useSalarySlip';
import './ViewSalarySlip.css';

const ViewSalarySlip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const { salarySlipData, loading, error } = useSalarySlip(id, selectedMonth);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <AdminLayout>
      <div className="admin-view-salary-slip-page">
        <div className="admin-view-salary-slip-page-header">
          <h1 className="admin-view-salary-slip-page-title">Salary Slip</h1>
          <p className="admin-view-salary-slip-page-subtitle">Employee ID: {id}</p>
          <div className="admin-view-salary-slip-month-selector">
            <label htmlFor="month-select">Select Month:</label>
            <input
              type="month"
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="admin-view-salary-slip-month-input"
            />
          </div>
        </div>
        <div className="admin-view-salary-slip-page-content">
          {loading && <p>Loading salary slip...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          {salarySlipData && (
            <div className="salary-slip-details">
              <h2>Salary Slip for {salarySlipData.month}</h2>
              <div className="salary-details-grid">
                <div className="salary-details-card">
                  <h3>Earnings</h3>
                  {salarySlipData.earnings?.map((item, index) => (
                    <p key={index}>{item.name}: ₹{item.amount}</p>
                  ))}
                  <p><strong>Gross Salary: ₹{salarySlipData.grossSalary}</strong></p>
                </div>
                <div className="salary-details-card">
                  <h3>Deductions</h3>
                  {salarySlipData.deductions?.map((item, index) => (
                    <p key={index}>{item.name}: ₹{item.amount}</p>
                  ))}
                  <p><strong>Total Deductions: ₹{salarySlipData.totalDeductions}</strong></p>
                </div>
              </div>
              <div className="net-salary-section">
                <h3>Net Salary: ₹{salarySlipData.netSalary}</h3>
              </div>
            </div>
          )}
          {!loading && !salarySlipData && !error && (
            <div className="admin-salary-slips-coming-soon">
              <h2>View Salary Slip</h2>
              <p>Select a month to view salary slip details.</p>
            </div>
          )}
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewSalarySlip;


