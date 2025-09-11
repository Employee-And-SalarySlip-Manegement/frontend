import React, { useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminAPI } from '@/services/api';
import { PAGINATION } from '@/constants';
import { useApi } from '@/hooks/useApi';
import EmployeesToolbar from '@/components/admin/Employees/EmployeesToolbar';
import EmployeesTable from '@/components/admin/Employees/EmployeesTable';
import EmployeesPagination from '@/components/admin/Employees/EmployeesPagination';
import { useNavigate } from 'react-router-dom';
import './Employees.css';

const Employees = () => {
  const [search, setSearch] = useState('');
  // Role filter is fixed to 'employee' for this page
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION.DEFAULT_LIMIT);

  const navigate = useNavigate();

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

  const onRoleChange = (e) => {
    setRole(e.target.value);
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

  const handleAdd = () => {
    // Placeholder: navigate to add employee form route (to be implemented)
    navigate('/admin/employees/new');
  };

  const handleEdit = (user) => {
    // Placeholder: navigate to edit employee page with id
    navigate(`/admin/employees/${user._id}/edit`);
  };

  const handleDelete = async (user) => {
    if (!user?._id) return;
    const confirmed = window.confirm(`Deactivate employee "${user.name || user.email}"?`);
    if (!confirmed) return;
    try {
      await adminAPI.deleteEmployee(user._id);
      await refetch();
    } catch (err) {
      // error toasts handled globally
    }
  };

  return (
    <AdminLayout>
      <div className="admin-employees-page">
        <div className="admin-employees-page-header">
          <h1 className="admin-employees-page-title">Manage Employees</h1>
          <p className="admin-employees-page-subtitle">View and manage employee accounts</p>
        </div>

        <div className="admin-employees-page-content">
          <EmployeesToolbar
            search={search}
            status={status}
            limit={limit}
            onAdd={handleAdd}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
            onLimitChange={onLimitChange}
          />

          <EmployeesTable users={users} loading={loading} error={error} onEdit={handleEdit} onDelete={handleDelete} />

          <EmployeesPagination
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

export default Employees;
