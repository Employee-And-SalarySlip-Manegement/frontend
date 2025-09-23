import React, { useEffect, useState } from 'react';

const EmployeesTable = ({ users, loading, error, onEdit, onDelete, selectedId: controlledSelectedId }) => {
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
                <th>Email</th>
                <th>DOJ</th>
                <th>Address</th>
                <th>Bank A/C</th>
                <th>UAN</th>
                <th>PAN</th>
                <th>Aadhar</th>
                <th>Status</th>
                <th>Created</th>
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
                  <td className="muted">{u.email}</td>
                  <td className="muted">{u.doj ? new Date(u.doj).toLocaleDateString() : '—'}</td>
                  <td className="muted">{u.address || '—'}</td>
                  <td className="muted">{u.bankAccountNo || '—'}</td>
                  <td className="muted">{u.UAN || '—'}</td>
                  <td className="muted">{u.pan || '—'}</td>
                  <td className="muted">{u.aadhar || '—'}</td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-success' : 'badge-muted'}`}>{u.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="muted">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <div className="admin-employees-actions">
                      <button type="button" className="icon-btn" title="Edit" onClick={() => onEdit?.(u)}>
                        ✏️
                      </button>
                      <button type="button" className="icon-btn" title="Delete" onClick={() => onDelete?.(u)}>
                        🗑️
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

export default EmployeesTable;


