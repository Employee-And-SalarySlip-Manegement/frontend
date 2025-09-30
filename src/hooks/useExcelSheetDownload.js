import { useState } from 'react';
import { salarySlipService } from '@/services/salarySlipService';

export const useExcelSheetDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadExcel = async (month, year) => {
    setIsDownloading(true);
    setDownloadError(null);
    try {
      const response = await salarySlipService.downloadExcelSheet(month, year);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Salary_Sheet_${month}_${year}.xlsx`); // or any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading Excel sheet:', error);
      setDownloadError(error.response?.data?.message || error.message || 'Failed to download Excel sheet.');
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadExcel, isDownloading, downloadError };
};