import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, empId, onEditProfileClick }) => {
  return (
    <div className="profile-header-container">
      <div className="header-content">
        <div className="header-text">
          <h1 className="profile-header-name">
            Welcome, <span className="user-name-highlight">{name}</span>
          </h1>
          <p className="profile-header-empId">Employee ID: {empId}</p>
        </div>
        <div className="header-actions">
          <button onClick={onEditProfileClick} className="btn btn-secondary">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;