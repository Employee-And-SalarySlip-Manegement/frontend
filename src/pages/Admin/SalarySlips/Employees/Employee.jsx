import React, { useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useApi } from '@/hooks/useApi';
import { adminAPI } from '@/services/api';
import SalarySlipEmployeesTable from '@/components/admin/SalarySlips/EmployeesTable';
import { PAGINATION } from '@/constants';
import SalarySlipEmployeesToolbar from '@/components/admin/SalarySlips/SalarySlipEmployeesToolbar';
import EmployeesTable from '@/components/admin/Employees/EmployeesTable';
import SalarySlipEmployeesPagination from '@/components/admin/SalarySlips/SalarySlipEmployeesPagination';
import { useNavigate, useLocation } from 'react-router-dom';
import './Employee.css';

const Employee = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION.DEFAULT_LIMIT);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const deepLinkedSelectedId = searchParams.get('selectedId');

  const params = useMemo(() => ({
    page,
    limit,
    search: search.trim() || undefined,
    role: 'employee',
    isActive: status === '' ? undefined : status === 'active' ? 'true' : 'false',
  }), [page, limit, search, status]);

  const { data, loading, error, refetch } = useApi(
    () => adminAPI.getAllEmployees(params),
    { immediate: true, dependencies: [params] }
  );

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination || { current: 1, pages: 1, total: 0, limit };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const onLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10) || PAGINATION.DEFAULT_LIMIT;
    setLimit(newLimit);
    setPage(1);
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > (pagination.pages || 1)) return;
    setPage(newPage);
  };

  const handleGenerateAll = () => navigate(`/admin/salary-slips/generate`);
  const handleView = (user) => navigate(`/admin/salary-slips/view/${user._id}`);

  return (
    <AdminLayout>
      <div className="admin-employees-page">
        <div className="admin-employees-page-header">
          <h1 className="admin-employees-page-title">Manage Salary Slip</h1>
          <p className="admin-employees-page-subtitle">Create and manage employee salary slips</p>
        </div>

        <div className="admin-employees-page-content">
          <SalarySlipEmployeesToolbar
            search={search}
            status={status}
            limit={limit}
            onAdd={handleGenerateAll}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
            onLimitChange={onLimitChange}
          />

          <SalarySlipEmployeesTable users={users} loading={loading} error={error} onView={handleView} selectedId={deepLinkedSelectedId} />

          <SalarySlipEmployeesPagination
            pagination={pagination}
            onFirst={() => goToPage(1)}
            onPrev={() => goToPage(pagination.current - 1)}
            onNext={() => goToPage(pagination.current + 1)}
            onLast={() => goToPage(pagination.pages)}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employee;