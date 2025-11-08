import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, MessageSquare, Wallet, Bell, Settings, Menu } from 'lucide-react'; 

// Define a minimal UserType here for file completion, adjust import path as needed
export type UserType = 'farmer' | 'buyer' | 'delivery' | 'seller'; 

interface SidebarProps {
  userType: UserType;
  onToggle: () => void; // Added for the new hamburger button
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, onToggle }) => {
  const location = useLocation();

  const getNavItems = (type: UserType): NavItem[] => {
    
    // Dynamically determine the user's main dashboard path
    let homePath = '/dashboard';
    if (type === 'farmer') {
        homePath = '/dashboard/farmer';
    } else if (type === 'buyer') {
        homePath = '/dashboard/buyer';
    } else if (type === 'delivery') {
        homePath = '/dashboard/delivery';
    } 

    const baseItems: NavItem[] = [
      { name: 'Home', path: homePath, icon: Home },
      { name: 'Orders', path: '/dashboard/orders', icon: ShoppingBag },
      { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    ];

    if (type === 'farmer' || type === 'delivery') {
      baseItems.push({ name: 'Wallet', path: '/dashboard/wallet', icon: Wallet });
    }

    baseItems.push(
      { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
      { name: 'Settings', path: '/dashboard/settings', icon: Settings }
    );

    return baseItems;
  };

  const navItems = getNavItems(userType);

  const isActive = (path: string): boolean => {
    // Check if the current path exactly matches the item path
    return location.pathname === path;
  };

  return (
    <aside className="bg-white border-r border-gray-200 h-full w-64 fixed left-0 top-0 flex flex-col z-30">
      {/* Logo/Toggle Button - Replaced Agromate text with Hamburger icon */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <button 
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;