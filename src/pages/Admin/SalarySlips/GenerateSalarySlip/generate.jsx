import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSalarySlipUpload } from '@/hooks/useSalarySlipUpload';
import './GenerateSalarySlip.css';

const GenerateSalarySlip = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [logData, setLogData] = React.useState([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const { uploadFile, loading, progress, error, data } = useSalarySlipUpload();

  React.useEffect(() => {
    if (data) {
      const newLogEntry = {
        id: logData.length + 1,
        fileName: selectedFile.name,
        status: 'Uploaded',
        timestamp: new Date().toLocaleString(),
      };
      setLogData((prevLogData) => [...prevLogData, newLogEntry]);
      setSelectedFile(null);
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      const newLogEntry = {
        id: logData.length + 1,
        fileName: selectedFile?.name || 'N/A',
        status: `Failed: ${error}`,
        timestamp: new Date().toLocaleString(),
      };
      setLogData((prevLogData) => [...prevLogData, newLogEntry]);
      setSelectedFile(null);
    }
  }, [error]);

  const handleFileChange = (event) => {
    const file = event.target.files ? event.target.files[0] : event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-generate-salary-slip-page">
        <div className="admin-generate-salary-slip-page-header">
          <h1 className="admin-generate-salary-slip-page-title">Generate Salary Slip</h1>
        </div>
        <div className="admin-generate-salary-slip-page-content">
          <div className="admin-salary-slips-upload-section">
            <h2>Upload Diamond Data</h2>
            <div
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input
                type="file"
                id="fileInput"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                hidden
              />
              {selectedFile ? (
                <p>Selected file: {selectedFile.name}</p>
              ) : (
                <p>Drop files here or click to upload<br />(Upload .xlsx files only)</p>
              )}
              {loading && <p>Uploading: {progress}%</p>}
              {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>
            <button className="btn" onClick={handleUpload} disabled={!selectedFile || loading}>
              {loading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>

          <div className="admin-salary-slips-log-section">
            <h2>Upload Log</h2>
            {logData.length === 0 ? (
              <p>No upload logs yet.</p>
            ) : (
              <table className="admin-salary-slips-log-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>File Name</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {logData.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.fileName}</td>
                      <td>{log.status}</td>
                      <td>{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GenerateSalarySlip;


