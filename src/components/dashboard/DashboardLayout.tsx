import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import type { UserType } from '../../types';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar userType={userType} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar userType={userType} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader 
          userName={userName}
          userAvatar={userAvatar}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;