import React, { useState, useEffect } from 'react';
import EmployeeSidebar from '../EmployeeSidebar';
import EmployeeHeader from '../EmployeeHeader';
import './EmployeeLayout.css';

const EmployeeLayout = ({ children }) => {
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
    <div className="employee-layout-component">
      {/* Sidebar */}
      <EmployeeSidebar 
        isCollapsed={isMobile ? false : sidebarCollapsed}
        onToggle={toggleSidebar}
        className={isMobile && mobileSidebarOpen ? 'mobile-open' : ''}
      />
      
      {/* Mobile Overlay */}
      {isMobile && mobileSidebarOpen && (
        <div 
          className="employee-layout-mobile-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div className={`employee-layout-main ${isMobile ? 'mobile' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Bar */}
        <EmployeeHeader onToggle={toggleSidebar} />

        {/* Page Content */}
        <main className="employee-layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
