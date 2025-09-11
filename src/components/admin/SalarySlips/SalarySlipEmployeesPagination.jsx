import React from 'react';

const SalarySlipEmployeesPagination = ({ pagination, onFirst, onPrev, onNext, onLast }) => {
  return (
    <div className="admin-employees-pagination">
      <button className="pagination-btn" onClick={onFirst} disabled={pagination.current <= 1}>« First</button>
      <button className="pagination-btn" onClick={onPrev} disabled={pagination.current <= 1}>‹ Prev</button>
      <span className="pagination-info">Page {pagination.current} of {pagination.pages} • {pagination.total} total</span>
      <button className="pagination-btn" onClick={onNext} disabled={pagination.current >= pagination.pages}>Next ›</button>
      <button className="pagination-btn" onClick={onLast} disabled={pagination.current >= pagination.pages}>Last »</button>
    </div>
  );
};

export default SalarySlipEmployeesPagination;