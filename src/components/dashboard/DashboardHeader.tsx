import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { getInitials } from '../../utils/helpers';

interface DashboardHeaderProps {
  userName?: string;
  userAvatar?: string;
  onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName = 'Mukem Maxcel',
  userAvatar,
  onMenuClick
}) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Empty space for alignment on desktop */}
      <div className="hidden lg:block flex-1" />

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Link 
          to="/dashboard/notifications"
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Link>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
          </div>
          
          {/* User Avatar */}
          {userAvatar ? (
            <img 
              src={userAvatar} 
              alt={userName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">
                {getInitials(userName)}
              </span>
            </div>
          )}

          {/* Dropdown Arrow */}
          <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;