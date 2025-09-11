import React, { useEffect, useState } from 'react';

const SalarySlipEmployeesTable = ({ users, loading, error, onView, selectedId: controlledSelectedId }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleRowClick = (userId) => {
    setSelectedId(userId === selectedId ? null : userId);
  };

  useEffect(() => {
    if (controlledSelectedId) {
      setSelectedId(controlledSelectedId);
    }
  }, [controlledSelectedId]);

  return (
    <div className="admin-employees-table-wrapper">
      {loading ? (
        <div className="admin-employees-state">Loading employees…</div>
      ) : error ? (
        <div className="admin-employees-state error">{error}</div>
      ) : users.length === 0 ? (
        <div className="admin-employees-state empty">No employees found</div>
      ) : (
        <div className="admin-employees-table-scroll">
          <table className="admin-employees-table" role="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr 
                  key={u._id}
                  className={selectedId === u._id ? 'row-selected' : ''}
                  onClick={() => handleRowClick(u._id)}
                >
                  <td>
                    <div className="admin-employees-emp-id">
                      <span className="badge badge-primary">{u.empId || '—'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="admin-employees-user">
                      <div className="admin-employees-avatar" aria-hidden="true">{(u.name || u.email || '?').charAt(0).toUpperCase()}</div>
                      <div className="admin-employees-user-info">
                        <div className="admin-employees-user-name">{u.name}</div>
                        <div className="admin-employees-user-id">{u._id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-success' : 'badge-muted'}`}>{u.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td>
                    <div className="admin-employees-actions">
                      <button type="button" className="btn btn-icon" onClick={() => onView?.(u)} aria-label="View salary slips">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalarySlipEmployeesTable;


