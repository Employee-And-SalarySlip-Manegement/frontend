import React, { useState, useEffect } from 'react';
import AdminSidebar from '../AdminSidebar';
import AdminHeader from '../AdminHeader';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="admin-layout-component">
      {/* Sidebar */}
      <AdminSidebar 
        isCollapsed={isMobile ? false : sidebarCollapsed}
        onToggle={toggleSidebar}
        className={isMobile && mobileSidebarOpen ? 'mobile-open' : ''}
      />
      
      {/* Mobile Overlay */}
      {isMobile && mobileSidebarOpen && (
        <div 
          className="admin-layout-mobile-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div className={`admin-layout-main ${isMobile ? 'mobile' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <AdminHeader onToggle={toggleSidebar} />

        {/* Page Content */}
        <main className="admin-layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
