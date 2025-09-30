import apiService from './api';

export const salarySlipService = {
  getSalarySlip: (employeeId, month) => {
    return apiService.get(`/common/salary-slips/${employeeId}?month=${month}`);
  },
  downloadExcelSheet: (month, year) => {
    return apiService.get(`/admin/salary-slips/download?month=${month}&year=${year}`, {
      responseType: 'blob',
    });
  },
};