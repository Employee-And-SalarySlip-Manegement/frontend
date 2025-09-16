import React from 'react';
import './SalarySlipTemplate.css'; // optional for styles

const SalarySlipTemplate = ({ salarySlipData }) => {
  if (!salarySlipData) return null;

  // Extract earnings and deductions from the arrays
  const basicDA = salarySlipData.earnings.find(item => item.name === 'Basic DA')?.amount || 0;
  const hra = salarySlipData.earnings.find(item => item.name === 'HRA')?.amount || 0;
  const otherAllowances = salarySlipData.earnings.find(item => item.name === 'Other Allowances')?.amount || 0;

  const esi = salarySlipData.deductions.find(item => item.name === 'ESI')?.amount || 0;
  const pfEe = salarySlipData.deductions.find(item => item.name === 'PF EE')?.amount || 0;
  const pt = salarySlipData.deductions.find(item => item.name === 'PT')?.amount || 0;
  const tds = salarySlipData.deductions.find(item => item.name === 'TDS')?.amount || 0;

  return (
    <div id="salary-slip" className="salary-slip">
      {/* Header */}
      <div className="salary-slip-header">
        <h2>Salary Slip</h2>
        <p>Your Company Name</p>
        <p>123 Company Street, City, Country</p>
        <p>Email: info@company.com</p>
      </div>

      {/* Employee Info */}
      <table className="salary-slip-table">
        <tbody>
          <tr>
            <td><strong>Employee ID:</strong> {salarySlipData.empId}</td>
            <td><strong>Name:</strong> {salarySlipData.nameOfEmployee}</td>
          </tr>
          <tr>
            <td><strong>Designation:</strong> {salarySlipData.designation}</td>
            <td><strong>Month:</strong> {salarySlipData.month || "September 2025"}</td>
          </tr>
          <tr>
            <td><strong>Payable Days:</strong> {salarySlipData.noOfPayableDays}</td>
            <td><strong>Total Days:</strong> {salarySlipData.totalWorkingDays}</td>
          </tr>
        </tbody>
      </table>

      {/* Earnings */}
      <h3>Earnings</h3>
      <table className="salary-slip-table">
        <tbody>
          <tr><td>Basic + DA</td><td>₹{basicDA}</td></tr>
          <tr><td>HRA</td><td>₹{hra}</td></tr>
          <tr><td>Other Allowances</td><td>₹{otherAllowances}</td></tr>
          <tr className="highlight"><td>Gross Salary</td><td>₹{salarySlipData.grossSalary}</td></tr>
        </tbody>
      </table>

      {/* Deductions */}
      <h3>Deductions</h3>
      <table className="salary-slip-table">
        <tbody>
          <tr><td>ESI</td><td>₹{esi}</td></tr>
          <tr><td>PF</td><td>₹{pfEe}</td></tr>
          <tr><td>PT</td><td>₹{pt}</td></tr>
          <tr><td>TDS</td><td>₹{tds}</td></tr>
          <tr className="highlight"><td>Total Deductions</td><td>₹{salarySlipData.totalDeductions}</td></tr>
        </tbody>
      </table>

      {/* Net Salary */}
      <div className="net-salary">
        <h2>Net Salary: ₹{salarySlipData.netSalary}</h2>
      </div>

      {/* Footer */}
      <div className="salary-slip-footer">
        This is a computer-generated salary slip and does not require a signature.
      </div>
    </div>
  );
};

export default SalarySlipTemplate;
