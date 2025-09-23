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
    isActive: true,
    doj: '',
    address: '',
    bankAccountNo: '',
    UAN: '',
    pan: '',
    aadhar: '',
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
        isActive: typeof u.isActive === 'boolean' ? u.isActive : true,
        password: '',
        doj: u.doj ? new Date(u.doj).toISOString().slice(0, 10) : '',
        address: u.address || '',
        bankAccountNo: u.bankAccountNo || '',
        UAN: u.UAN || '',
        pan: u.pan || '',
        aadhar: u.aadhar || '',
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
          isActive: form.isActive,
          doj: form.doj || null,
          address: form.address.trim(),
          bankAccountNo: form.bankAccountNo.trim(),
          UAN: form.UAN.trim(),
          pan: form.pan.trim(),
          aadhar: form.aadhar.trim(),
        };
        await adminAPI.updateEmployee(id, payload);
      } else {
        const payload = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          doj: form.doj || null,
          address: form.address.trim(),
          bankAccountNo: form.bankAccountNo.trim(),
          UAN: form.UAN.trim(),
          pan: form.pan.trim(),
          aadhar: form.aadhar.trim(),
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
      <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
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

              <div className="form-grid-2">
                <div className="form-row">
                  <label htmlFor="name" className="required">Name</label>
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
                  <label htmlFor="email" className="required">Email</label>
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
                    <label htmlFor="password" className="required">Temporary Password</label>
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
              </div>

              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="doj">Date of Joining</label>
                  <input
                    id="doj"
                    name="doj"
                    type="date"
                    value={form.doj}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="bankAccountNo">Bank A/C No</label>
                  <input
                    id="bankAccountNo"
                    name="bankAccountNo"
                    type="text"
                    value={form.bankAccountNo}
                    onChange={handleChange}
                    inputMode="numeric"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="UAN">UAN</label>
                  <input
                    id="UAN"
                    name="UAN"
                    type="text"
                    value={form.UAN}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="pan">PAN</label>
                  <input
                    id="pan"
                    name="pan"
                    type="text"
                    value={form.pan}
                    onChange={(e) => handleChange({ target: { ...e.target, value: e.target.value.toUpperCase() } })}
                    placeholder="ABCDE1234F"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="aadhar">Aadhar</label>
                  <input
                    id="aadhar"
                    name="aadhar"
                    type="text"
                    value={form.aadhar}
                    onChange={handleChange}
                    inputMode="numeric"
                    pattern="\\d{12}"
                    placeholder="12 digit number"
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
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


