import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

export type UserType = 'farmer' | 'buyer' | 'delivery' | 'seller'; 

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: UserType;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const contentMarginClass = isSidebarOpen 
    ? 'lg:ml-64' 
    : 'lg:ml-0';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div 
        className={`
          hidden lg:block fixed inset-y-0 left-0 transition-all duration-300 ease-in-out z-30 
          ${isSidebarOpen ? 'w-64' : 'w-0'} 
          bg-white border-r border-gray-200
        `}
      >
        {isSidebarOpen && <Sidebar userType={userType} onToggle={toggleSidebar} />}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg lg:hidden">
            <Sidebar userType={userType} onToggle={toggleSidebar} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div 
        className={`
          flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${contentMarginClass}
        `}
      >
        {/* Header */}
        <DashboardHeader onMenuClick={toggleSidebar} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;