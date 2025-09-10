import React from 'react';

const EmployeesToolbar = ({
  search,
  status,
  limit,
  onAdd,
  onSearchChange,
  onStatusChange,
  onLimitChange,
}) => {
  return (
    <div className="admin-employees-toolbar">
      <div className="admin-employees-toolbar-left">
        <div className="admin-employees-search">
          <span className="admin-employees-search-icon" aria-hidden="true">🔎</span>
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name or email..."
            className="admin-employees-search-input"
            aria-label="Search employees"
          />
        </div>
      </div>
      <div className="admin-employees-toolbar-right">
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          + Add Employee
        </button>
        <select value={status} onChange={onStatusChange} className="admin-employees-select" aria-label="Filter by status">
          <option value="">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select value={limit} onChange={onLimitChange} className="admin-employees-select" aria-label="Rows per page">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeesToolbar;


