import React, { useState, useEffect } from 'react';
import './EditProfileForm.css';

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    bankAccountNo: '',
    pfNo: '',
    pan: '',
    aadhar: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        bankAccountNo: user.bankAccountNo || '',
        pfNo: user.pfNo || '',
        pan: user.pan || '',
        aadhar: user.aadhar || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="edit-profile-form-container">
      <h2 className="edit-profile-form-title">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="bankAccountNo">Bank Account No.</label>
            <input
              type="text"
              id="bankAccountNo"
              name="bankAccountNo"
              value={formData.bankAccountNo || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pfNo">PF No.</label>
            <input
              type="text"
              id="pfNo"
              name="pfNo"
              value={formData.pfNo || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pan">PAN</label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhar">Aadhar</label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={formData.aadhar || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;