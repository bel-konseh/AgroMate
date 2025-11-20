import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, MessageSquare, Wallet, Bell, Settings, Menu } from 'lucide-react';
import type { UserType } from '../../types';

interface SidebarProps {
  userType: UserType;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, onToggle }) => {
  const location = useLocation();

  const getNavItems = (): NavItem[] => {
    // Base path depends on user type
    const basePath = `/dashboard/${userType}`;
    
    const baseItems: NavItem[] = [
      { name: 'Home', path: basePath, icon: Home },
      { name: 'Orders', path: `${basePath}/orders`, icon: ShoppingBag },
      { name: 'Messages', path: `${basePath}/messages`, icon: MessageSquare },
    ];

    // Add Wallet for farmer and delivery
    if (userType === 'farmer' || userType === 'delivery') {
      baseItems.push({ name: 'Wallet', path: `${basePath}/wallet`, icon: Wallet });
    }

    // Add common items
    baseItems.push(
      { name: 'Notifications', path: `${basePath}/notifications`, icon: Bell },
      { name: 'Settings', path: `${basePath}/settings`, icon: Settings }
    );

    return baseItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <aside className="bg-white border-r border-gray-200 h-full w-64 fixed left-0 top-0 flex flex-col z-30">
      {/* Logo */}
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
                      ? 'bg-green-200  font-medium'
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