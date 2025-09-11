import React, { useMemo } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { adminAPI } from '@/services/api';
import SalarySlipEmployeesTable from '@/components/admin/SalarySlips/EmployeesTable';
import { PAGINATION } from '@/constants';
import './Employee.css';

const Employee = () => {
  const navigate = useNavigate();
  const params = useMemo(() => ({ page: 1, limit: PAGINATION.DEFAULT_LIMIT, role: 'employee' }), []);
  const { data, loading, error } = useApi(() => adminAPI.getAllEmployees(params), { immediate: true, dependencies: [params] });
  const users = data?.data?.users || [];

  const handleView = (user) => navigate(`/admin/salary-slips/view/${user._id}`);
  const handleGenerateAll = () => navigate(`/admin/salary-slips/generate`);

  return (
    <AdminLayout>
      <div className="admin-salary-slips-page">
        <div className="admin-salary-slips-page-header">
          <h1 className="admin-salary-slips-page-title">Manage Salary Slip</h1>
          <p className="admin-salary-slips-page-subtitle">Create and manage employee salary slips</p>
          <div className="admin-salary-slips-actions">
            <button className="btn btn-primary" onClick={handleGenerateAll}>Generate Salary Slips</button>
          </div>
        </div>

        <div className="admin-salary-slips-page-content">
          <SalarySlipEmployeesTable
            users={users}
            loading={loading}
            error={error}
            onView={handleView}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employee;
