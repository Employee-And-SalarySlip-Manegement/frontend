import apiService from './api';

export const salarySlipService = {
  getSalarySlip: (employeeId, month) => {
    return apiService.get(`/admin/salary-slips/${employeeId}?month=${month}`);
  },
};