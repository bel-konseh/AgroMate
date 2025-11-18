import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, LogOut, Settings, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const { userData, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = userData ? `${userData.firstName} ${userData.lastName}` : 'User';
  const userAvatar = userData?.avatar;
  const cartCount = getCartCount();
  const isBuyer = userData?.userType === 'buyer';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    const userType = userData?.userType || 'buyer';
    navigate(`/dashboard/${userType}/settings`);
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Menu Button */}
      <button 
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle main menu"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Shopping Cart - Only for buyers */}
        {isBuyer && cartCount > 0 && (
          <Link 
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-[--color-primary] text-white rounded-full text-xs flex items-center justify-center font-medium">
              {cartCount}
            </span>
          </Link>
        )}

        {/* Notifications */}
        <Link 
          to={`/dashboard/${userData?.userType}/notifications`}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </Link>

        {/* User Info with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 capitalize">{userData?.userType}</p>
            </div>
            
            {userAvatar ? (
              <img 
                src={userAvatar} 
                alt={userName}
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-2 border-gray-200">
                <span className="text-sm font-semibold text-white">
                  {getInitials(userName)}
                </span>
              </div>
            )}

            <ChevronDown className={`h-4 w-4 text-gray-400 hidden sm:block transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-3 border-b border-gray-200 sm:hidden">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>

              <button
                onClick={handleSettingsClick}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>View Profile</span>
              </button>

              <button
                onClick={handleSettingsClick}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>

              <hr className="my-1 border-gray-200" />

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;