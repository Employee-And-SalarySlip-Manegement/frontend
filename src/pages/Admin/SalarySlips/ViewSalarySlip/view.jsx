import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSalarySlip } from "@/hooks/useSalarySlip";
import { generateSalarySlipPdf } from "@/utils/generateSalarySlipPdf";
import SalarySlipTemplate from "@/Template/SalarySlipTemplate";
import { toast } from "react-hot-toast";
import { Download, Eye, ArrowLeft } from "lucide-react"; // modern icons
import "./ViewSalarySlip.css";

const ViewSalarySlip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
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
        const blobUrl = await generateSalarySlipPdf(salarySlipData);
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
      <div className="vss-container">
        {/* Header */}
        <div className="vss-header">
          <button
            className="vss-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <div className="vss-header-info">
            <h1 className="vss-title">Salary Slip</h1>
            <p className="vss-subtitle">Employee ID: {id}</p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="vss-controls">
          <label htmlFor="month-select" className="vss-label">
            Select Month:
          </label>
          <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="vss-month-input"
          />

          <div className="vss-actions">
            <button
              className="vss-btn vss-btn-preview"
              disabled={!pdfBlobUrl}
              onClick={() => window.open(pdfBlobUrl, "_blank")}
            >
              <Eye size={18} /> Preview
            </button>
            <button
              className="vss-btn vss-btn-download"
              disabled={!pdfBlobUrl}
              onClick={() => {
                const link = document.createElement("a");
                link.href = pdfBlobUrl;
                link.download = `SalarySlip_${id}_${selectedMonth}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={18} /> Download
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="vss-content">
          {loading && <p className="vss-loading">Fetching salary slip...</p>}
          {pdfBlobUrl && (
            <div className="vss-pdf-viewer">
              <iframe
                src={pdfBlobUrl}
                title="Salary Slip PDF"
                frameBorder="0"
              ></iframe>
            </div>
          )}
          {salarySlipData && (
            <div style={{ position: "absolute", left: "-9999px" }}>
              <SalarySlipTemplate salarySlipData={salarySlipData} />
            </div>
          )}
          {!loading && !pdfBlobUrl && !error && (
            <div className="vss-empty-state">
              <h2>No Salary Slip Found</h2>
              <p>Please select a month to view salary slip details.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewSalarySlip;
