import React from 'react';
import type { OrderStatus } from '../../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

/**
 * Renders a colored badge based on the order status.
 * @param {OrderStatus} status - The current status of the order.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClasses = '';
  let label = '';

  switch (status) {
    case 'pending':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      label = 'Pending';
      break;
    case 'confirmed':
      colorClasses = 'bg-blue-100 text-blue-800';
      label = 'Confirmed';
      break;
    case 'delivering':
      colorClasses = 'bg-purple-100 text-purple-800';
      label = 'Delivering';
      break;
    case 'delivered':
      colorClasses = 'bg-green-100 text-green-800';
      label = 'Delivered';
      break;
    case 'cancelled':
      colorClasses = 'bg-red-100 text-red-800';
      label = 'Cancelled';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-800';
      label = 'Unknown';
  }

  return (
    <span 
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full capitalize ${colorClasses} shadow-sm`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;