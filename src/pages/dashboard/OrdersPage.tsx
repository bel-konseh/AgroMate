import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, formatDate, getInitials } from '../../utils/helpers';
import type { UserType, OrderStatus } from '../../types';

interface OrdersPageProps {
  userType?: UserType;
}

interface Order {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  price: number;
  status: OrderStatus;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ userType = 'farmer' }) => {
//   const navigate = useNavigate();
  const [selectedStatus] = useState<string>('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      orderId: 'ORD-001',
      date: '2024-01-15',
      customer: 'John Kamsi',
      price: 2500,
      status: 'delivered'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      date: '2024-01-15',
      customer: 'John Kamsi',
      price: 2500,
      status: 'delivering'
    },
    {
      id: '3',
      orderId: 'ORD-003',
      date: '2024-01-14',
      customer: 'Chup Nkemnkwi',
      price: 1800,
      status: 'pending'
    },
    {
      id: '4',
      orderId: 'ORD-004',
      date: '2024-01-14',
      customer: 'Chup Nkemnkwi',
      price: 3200,
      status: 'confirmed'
    },
    {
      id: '5',
      orderId: 'ORD-005',
      date: '2024-01-13',
      customer: 'Mary Jane',
      price: 1500,
      status: 'cancelled'
    },
    {
      id: '6',
      orderId: 'ORD-006',
      date: '2024-01-13',
      customer: 'Chup Nkemnkwi',
      price: 2800,
      status: 'delivered'
    },
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);


  return (
    <DashboardLayout userType={userType}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{formatDate(order.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-gray-600">
                              {getInitials(order.customer)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-900">{order.customer}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;