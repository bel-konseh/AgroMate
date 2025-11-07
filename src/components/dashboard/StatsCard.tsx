import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import Button from '../common/Button';

interface StatsCardProps {
  count: number;
  countLabel: string;
  isOnline?: boolean;
  balance?: number;
  balanceLabel?: string;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  filterTabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  count,
  countLabel,
  isOnline,
  balance,
  balanceLabel = 'Account Balance',
  actionButton,
  filterTabs = ['Today', 'Done', 'Await'],
  activeTab = 'Today',
  onTabChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section - Count and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Count Display */}
          <div>
            <p className="text-sm text-gray-600 mb-2">{countLabel}</p>
            <div className="text-5xl font-bold text-gray-900">{count}</div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'text-gray-700 bg-gray-100'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Status, Balance, Action */}
        <div className="flex flex-col items-start lg:items-end space-y-4">
          {/* Online Status */}
          {isOnline !== undefined && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-700">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          )}

          {/* Balance */}
          {balance !== undefined && (
            <div className="text-left lg:text-right">
              <p className="text-sm text-gray-600 mb-1">{balanceLabel}</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(balance)}</p>
            </div>
          )}

          {/* Action Button */}
          {actionButton && (
            <Button 
              variant="primary" 
              leftIcon={actionButton.icon}
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;