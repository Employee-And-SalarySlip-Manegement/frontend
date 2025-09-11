import { useState, useCallback } from 'react';
import { adminAPI } from '@/services/api';
import toast from 'react-hot-toast';

export const useSalarySlipUpload = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setLoading(true);
    setProgress(0);
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await adminAPI.uploadSalarySlip(formData, (percentCompleted) => {
        setProgress(percentCompleted);
      });
      setData(response.data);
      toast.success('Salary slips uploaded successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to upload salary slips.';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadFile,
    loading,
    progress,
    error,
    data,
  };
};