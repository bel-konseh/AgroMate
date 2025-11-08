import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
// import type { UserType } from '../../types'; 

// Define a minimal UserType here for file completion
export type UserType = 'farmer' | 'buyer' | 'delivery' | 'seller'; 


interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: UserType;
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType,
  userName,
  userAvatar
}) => {
  // i am using isSidebarOpen to control both mobile visibility and desktop state
  // Setting to true by default for desktop view (lg screen size)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Determining classes for the main content wrapper's margin
  const contentMarginClass = isSidebarOpen 
    ? 'lg:ml-64' 
    : 'lg:ml-0'; // No margin when sidebar is closed on desktop

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop/Mobile State Management */}
      <div 
        className={`
          hidden lg:block fixed inset-y-0 left-0 transition-all duration-300 ease-in-out z-30 
          ${isSidebarOpen ? 'w-64' : 'w-0'} 
          bg-white border-r border-gray-200
        `}
      >
        {/* Passing onToggle prop to Sidebar for the new in-sidebar button */}
        {isSidebarOpen && <Sidebar userType={userType} onToggle={toggleSidebar} />}
      </div>

      {/* Mobile Sidebar Overlay (Only active for smaller screens) */}
      {!isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar} // Close on overlay click
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg lg:hidden">
            {/* Passing onToggle prop here too */}
            <Sidebar userType={userType} onToggle={toggleSidebar} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div 
        // Dynamic margin based on isSidebarOpen state
        className={`
          flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${contentMarginClass}
        `}
      >
        {/* Header */}
        <DashboardHeader 
          userName={userName}
          userAvatar={userAvatar}
          // Use the toggleSidebar function for the menu button click in the header
          onMenuClick={toggleSidebar} 
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout