import apiService from './api';

export const salarySlipService = {
  getSalarySlip: (employeeId, month) => {
    return apiService.get(`/common/salary-slips/${employeeId}?month=${month}`);
  },
};