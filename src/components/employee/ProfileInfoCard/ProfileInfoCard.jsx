import React from 'react';
import './ProfileInfoCard.css';

const ProfileInfoCard = ({ user }) => {
  return (
    <div className="profile-info-card-container">
      <h3 className="profile-info-card-title">Personal Information</h3>
      <div className="profile-info-card-grid">
        <div className="profile-info-card-item">
          <span className="profile-info-card-label">Email:</span>
          <span className="profile-info-card-value">{user.email}</span>
        </div>
        <div className="profile-info-card-item">
          <span className="profile-info-card-label">Role:</span>
          <span className="profile-info-card-value">{user.role}</span>
        </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">Date of Joining:</span>
            <span className="profile-info-card-value">{new Date(user.doj).toLocaleDateString()}</span>
          </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">Address:</span>
            <span className="profile-info-card-value">{user.address}</span>
          </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">Bank Account No:</span>
            <span className="profile-info-card-value">{user.bankAccountNo}</span>
          </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">UAN:</span>
            <span className="profile-info-card-value">{user.UAN}</span>
          </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">PAN:</span>
            <span className="profile-info-card-value">{user.pan}</span>
          </div>
        <div className="profile-info-card-item">
            <span className="profile-info-card-label">Aadhar:</span>
            <span className="profile-info-card-value">{user.aadhar}</span>
          </div>
      </div>
    </div>
  );
};

export default ProfileInfoCard;