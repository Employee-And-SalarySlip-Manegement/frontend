import React from 'react';
import logo from '../../public/logo.jpg'; // Import the logo
import './SalarySlipTemplate.css';

const formatMonthYear = (dateString) => {
  if (!dateString) return "";
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

const SalarySlipTemplate = ({ salarySlipData }) => {
  if (!salarySlipData) return null;

  // Extract earnings and deductions from the arrays (keeping original logic)
  const basicDA = salarySlipData.earnings.find(item => item.name === 'Basic DA')?.amount || 0;
  const hra = salarySlipData.earnings.find(item => item.name === 'HRA')?.amount || 0;
  const otherAllowances = salarySlipData.earnings.find(item => item.name === 'Other Allowances')?.amount || 0;

  const esi = salarySlipData.deductions.find(item => item.name === 'ESI')?.amount || 0;
  const pfEe = salarySlipData.deductions.find(item => item.name === 'PF EE')?.amount || 0;
  const pt = salarySlipData.deductions.find(item => item.name === 'PT')?.amount || 0;
  const tds = salarySlipData.deductions.find(item => item.name === 'TDS')?.amount || 0;

  return (
    <div id="salary-slip" className="salary-slip">
      {/* Company Header */}
      <div className="company-header">
        <div className="company-logo">
          <img src={logo} alt="Company Logo" className="logo-img" />
        </div>
        <div className="company-details">
          <h1 className="company-name">MahaLaxmi Agencies</h1>
          <div className="company-address">
            <p>PLOT NO 1 AND 2 , SY NO 66/9, GURU KRUPA</p>
            <p>BUILDING, GOKAK ROAD, Kanbargi, Belagavi,</p>
            <p>Karnataka, 590016</p>
            {/* <p>Email: info@company.com | Phone: +91-XXXXXXXXXX</p> */}
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="document-title">
        <h2>SALARY SLIP</h2>
        <div className="period">For the month of {formatMonthYear(salarySlipData.month) || "September 2025"}</div>
      </div>

      {/* Employee Information Section */}
      <div className="info-section">
        <h3 className="section-title">Employee Information</h3>
        <div className="info-grid">
          <div className="info-row">
            <div className="info-item">
              <span className="label">Employee ID:</span>
              <span className="value">{salarySlipData.empId}</span>
            </div>
            <div className="info-item">
              <span className="label">Employee Name:</span>
              <span className="value">{salarySlipData.nameOfEmployee}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <span className="label">Designation:</span>
              <span className="value">{salarySlipData.designation}</span>
            </div>
            <div className="info-item">
              <span className="label">Department:</span>
              <span className="value">-</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <span className="label">Payable Days:</span>
              <span className="value">{salarySlipData.noOfPayableDays}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Working Days:</span>
              <span className="value">{salarySlipData.totalWorkingDays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="salary-breakdown">
        <div className="earnings-section">
          <h3 className="section-title earnings-title">Earnings</h3>
          <table className="salary-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic + DA</td>
                <td className="amount">₹{basicDA.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>House Rent Allowance (HRA)</td>
                <td className="amount">₹{hra.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>Other Allowances</td>
                <td className="amount">₹{otherAllowances.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Gross Salary</strong></td>
                <td className="amount"><strong>₹{salarySlipData.grossSalary.toLocaleString('en-IN')}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="deductions-section">
          <h3 className="section-title deductions-title">Deductions</h3>
          <table className="salary-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employee State Insurance (ESI)</td>
                <td className="amount">₹{esi.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>Provident Fund (PF)</td>
                <td className="amount">₹{pfEe.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>Professional Tax (PT)</td>
                <td className="amount">₹{pt.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>Tax Deducted at Source (TDS)</td>
                <td className="amount">₹{tds.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Total Deductions</strong></td>
                <td className="amount"><strong>₹{salarySlipData.totalDeductions.toLocaleString('en-IN')}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Salary */}
      <div className="net-salary-section">
        <div className="net-salary-card">
          <div className="net-salary-label">Net Salary</div>
          <div className="net-salary-amount">₹{salarySlipData.netSalary.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-note">
          <p><strong>Note:</strong> This is a computer-generated salary slip and does not require a physical signature.</p>
        </div>
        <div className="footer-details">
          <p>Created on: {new Date(salarySlipData.createdAt).toLocaleDateString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default SalarySlipTemplate;