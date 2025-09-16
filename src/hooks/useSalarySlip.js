import { useState, useEffect, useCallback } from 'react';
import { salarySlipService } from '@/services/salarySlipService';

export const useSalarySlip = (employeeId, month) => {
  const [salarySlipData, setSalarySlipData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSalarySlip = useCallback(async () => {
    if (!employeeId || !month) return;

    setLoading(true);
    setError(null);
    setSalarySlipData(null);
    try {
      const response = await salarySlipService.getSalarySlip(employeeId, month);
      // console.log('response', response.data);

      const rawData = response.data.data;

      if (!rawData) {
        setSalarySlipData(null);
        return;
      }

      // Transform data to match frontend expectations
      const transformedData = {
        month: month, // Use the month from the hook's parameter
        empId: rawData.empId,
        nameOfEmployee: rawData.nameOfEmployee,
        designation: rawData.designation,
        noOfPayableDays: rawData.noOfPayableDays,
        totalWorkingDays: rawData.totalWorkingDays,
        grossSalary: rawData.earnedWagesTotal,
        totalDeductions: rawData.employeeContributionsTotal,
        netSalary: rawData.netSalary,
        createdAt: rawData.createdAt,
        earnings: [
          { name: 'Basic DA', amount: rawData.basicDA },
          { name: 'HRA', amount: rawData.hra },
          { name: 'Other Allowances', amount: rawData.otherAllowances },
        ].filter(item => item.amount !== undefined && item.amount !== null),

        deductions: [
          { name: 'ESI', amount: rawData.esi },
          { name: 'PF EE', amount: rawData.pfEe },
          { name: 'PT', amount: rawData.pt },
          { name: 'TDS', amount: rawData.tds },
        ].filter(item => item.amount !== undefined && item.amount !== null),
      };

      console.log('Transformed Data:', transformedData);
      setSalarySlipData(transformedData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch salary slip data.');
      console.error('Error fetching salary slip:', err);
    } finally {
      setLoading(false);
    }
  }, [employeeId, month]);

  useEffect(() => {
    fetchSalarySlip();
  }, [fetchSalarySlip]);

  return { salarySlipData, loading, error, fetchSalarySlip };
};