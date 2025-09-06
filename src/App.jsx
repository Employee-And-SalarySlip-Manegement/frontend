import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants';
import '@/styles/index.css';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

// Placeholder components for future routes
const Dashboard = () => <div>Dashboard - Coming Soon</div>;
const Profile = () => <div>Profile - Coming Soon</div>;

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      {/* Catch-all route - redirect to home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
