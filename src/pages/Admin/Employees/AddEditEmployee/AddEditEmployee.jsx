import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminAPI } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import './AddEditEmployee.css';

const AddEditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = useMemo(() => Boolean(id), [id]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    isActive: true,
  });

  const { data: employeeData, loading: loadingEmployee } = useApi(
    () => (isEdit ? adminAPI.getEmployee(id) : Promise.resolve({ data: null })),
    { immediate: true, dependencies: [id] }
  );

  useEffect(() => {
    if (isEdit && employeeData?.data?.user) {
      const u = employeeData.data.user;
      setForm((prev) => ({
        ...prev,
        name: u.name || '',
        email: u.email || '',
        role: u.role || 'employee',
        isActive: typeof u.isActive === 'boolean' ? u.isActive : true,
        password: '',
      }));
    }
  }, [isEdit, employeeData]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (isEdit) {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          role: form.role,
          isActive: form.isActive,
        };
        await adminAPI.updateEmployee(id, payload);
      } else {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          role: form.role,
        };
        await adminAPI.createEmployee(payload);
      }
      navigate('/admin/employees');
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to save employee';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="addedit-employee-page">
        <div className="addedit-employee-header">
          <h1 className="addedit-employee-title">{isEdit ? 'Edit Employee' : 'Add Employee'}</h1>
          <p className="addedit-employee-subtitle">{isEdit ? 'Update user details' : 'Create a new employee account'}</p>
        </div>

        <div className="addedit-employee-card">
          {loadingEmployee ? (
            <div className="form-state">Loading…</div>
          ) : (
            <form onSubmit={handleSubmit} className="employee-form">
              {error && <div className="form-error" role="alert">{error}</div>}

              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isEdit && (
                <div className="form-row">
                  <label htmlFor="password">Temporary Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                </div>
              )}

              <div className="form-row">
                <label htmlFor="role">Role</label>
                <select id="role" name="role" value={form.role} onChange={handleChange}>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {isEdit && (
                <div className="form-row checkbox">
                  <label htmlFor="isActive">Active</label>
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn" onClick={() => navigate('/admin/employees')} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Employee'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditEmployee;


