import React from 'react';

const SalarySlipEmployeesTable = ({ users = [], loading, error, onView }) => {
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <span className="badge badge-primary">{u.empId || '—'}</span>
                  </td>
                  <td>{u.name || u.email || '—'}</td>
                  <td>
                    <div className="admin-employees-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => onView?.(u)}>View Salary Slip</button>
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


