import React from 'react';

const EmployeesTable = ({ users, loading, error, onEdit, onViewSlips }) => {
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email Verified</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
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
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-employee'}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-success' : 'badge-muted'}`}>{u.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td>
                    <span className={`dot ${u.emailVerified ? 'dot-success' : 'dot-muted'}`} title={u.emailVerified ? 'Verified' : 'Not verified'} />
                  </td>
                  <td className="muted">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
                  <td className="muted">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <div className="admin-employees-actions">
                      <button type="button" className="icon-btn" title="Edit" onClick={() => onEdit?.(u)}>
                        ✏️
                      </button>
                      <button type="button" className="btn btn-link" onClick={() => onViewSlips?.(u)}>
                        View Slips
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


