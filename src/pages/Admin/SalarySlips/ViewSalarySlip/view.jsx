import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSalarySlip } from '@/hooks/useSalarySlip';
import { generateSalarySlipPdf } from '@/utils/generateSalarySlipPdf';
import SalarySlipTemplate from '@/Template/SalarySlipTemplate'; // Import SalarySlipTemplate
import { toast } from 'react-hot-toast'; // Import toast
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
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
    const generatePdf = async () => {
      if (salarySlipData) {
        const blobUrl = await generateSalarySlipPdf(salarySlipData, id);
        setPdfBlobUrl(blobUrl);
      }
    };
    generatePdf();
  }, [salarySlipData, id, error]);

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
          {/* {error && <p className="error-message">Error: {error}</p>} */}
          {pdfBlobUrl && (
            <div className="pdf-viewer-container">
              <iframe src={pdfBlobUrl} width="100%" height="600px" title="Salary Slip PDF"></iframe>
            </div>
          )}
          {salarySlipData && (
            <div style={{ position: 'absolute', left: '-9999px' }}>
              <SalarySlipTemplate salarySlipData={salarySlipData} />
            </div>
          )}
          {!loading && !pdfBlobUrl && !error && (
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


