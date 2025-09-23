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
      console.log('response', response.data);

      const rawData = response.data.data;
      
      if (!rawData) {
        setSalarySlipData(null);
        return;
      }

      // Transform data to match frontend expectations
      const transformedData = {
        month: month, // Use the month from the hook's parameter
        empId: rawData.salarySlip.empId,
        nameOfEmployee: rawData.salarySlip.nameOfEmployee,
        designation: rawData.salarySlip.designation,
        noOfPayableDays: rawData.salarySlip.noOfPayableDays,
        totalWorkingDays: rawData.salarySlip.totalWorkingDays,
        grossSalary: rawData.salarySlip.earnedWagesTotal,
        totalDeductions: rawData.salarySlip.employeeContributionsTotal,
        netSalary: rawData.salarySlip.netSalary,
        createdAt: rawData.salarySlip.createdAt,
        user: rawData.user, // Add user data here
        earnings: [
          { name: 'Basic DA', amount: rawData.salarySlip.basicDA },
          { name: 'HRA', amount: rawData.salarySlip.hra },
          { name: 'Other Allowances', amount: rawData.salarySlip.otherAllowances },
        ].filter(item => item.amount !== undefined && item.amount !== null),

        deductions: [
          { name: 'ESI', amount: rawData.salarySlip.esi },
          { name: 'PF EE', amount: rawData.salarySlip.pfEe },
          { name: 'PT', amount: rawData.salarySlip.pt },
          { name: 'TDS', amount: rawData.salarySlip.tds },
        ].filter(item => item.amount !== undefined && item.amount !== null),
      };

      // console.log('Transformed Data:', transformedData);
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