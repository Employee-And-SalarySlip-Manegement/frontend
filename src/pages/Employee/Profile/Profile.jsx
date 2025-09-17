import React from 'react';
import EmployeeLayout from '../../../components/employee/EmployeeLayout';
import ProfileHeader from '../../../components/employee/ProfileHeader';
import ProfileInfoCard from '../../../components/employee/ProfileInfoCard';
import './Profile.css';
import { useFetch } from '../../../hooks/useApi';
import { userAPI } from '../../../services/api';

const Profile = () => {
  const { data: userProfileData, loading, error } = useFetch(userAPI.getProfile);

  const handleEditProfile = () => {
    alert('Edit Profile button clicked!');
    // In a real application, this would navigate to an edit page or open a modal
  };

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="employee-profile-page loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <div className="employee-profile-page">
        <div className="profile-content-wrapper">
          <ProfileHeader name={userProfileData?.data?.user?.name} empId={userProfileData?.data?.user?.empId} onEditProfileClick={handleEditProfile} />

          {error && (
            <div className="error-message">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            <ProfileInfoCard user={userProfileData?.data?.user} />
          </div>
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default Profile;