import React, { useState } from 'react';
import EmployeeLayout from '../../../components/employee/EmployeeLayout';
import ProfileHeader from '../../../components/employee/ProfileHeader';
import ProfileInfoCard from '../../../components/employee/ProfileInfoCard';
import EditProfileForm from '../../../components/employee/EditProfileForm';
import './Profile.css';
import { useFetch } from '../../../hooks/useApi';
import { userAPI } from '../../../services/api';

const Profile = () => {
  const { data: userProfileData, loading, error, refetch } = useFetch(userAPI.getProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      // In a real application, you would send updatedData to your API
      console.log('Saving profile:', updatedData);
      await userAPI.updateProfile(updatedData);
      setIsEditing(false);
      refetch(); // Refetch profile data to show updated information
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Handle error, e.g., show a toast notification
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

  if (error) {
    return (
      <EmployeeLayout>
        <div className="employee-profile-page">
          <div className="profile-content-wrapper">
            <div className="error-message">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Error: {error.message || 'Failed to load profile'}
            </div>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  if (!userProfileData || !userProfileData.data || !userProfileData.data.user) {
    return (
      <EmployeeLayout>
        <div className="employee-profile-page">
          <div className="profile-content-wrapper">
            <div className="error-message">
              No profile data available.
            </div>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  const userProfile = userProfileData.data.user;

  return (
    <EmployeeLayout>
      <div className="employee-profile-page">
        <div className="profile-content-wrapper">
          <ProfileHeader name={userProfile.name} empId={userProfile.empId} onEditProfileClick={handleEditProfile} />

          {isEditing ? (
            <EditProfileForm user={userProfile} onSave={handleSaveProfile} onCancel={handleCancelEdit} />
          ) : (
            <div className="profile-section">
              <h2 className="section-title">Personal Information</h2>
              <ProfileInfoCard user={userProfile} />
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default Profile;