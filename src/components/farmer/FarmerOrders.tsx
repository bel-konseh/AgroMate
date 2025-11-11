import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, getInitials } from '../../utils/helpers';
import type { OrderStatus } from '../../types';

interface Order {
  id: string;
  orderId: string;
  date: string;
  customer: string;
  customerAvatar?: string;
  products: string[];
  price: number;
  status: OrderStatus;
}

const FarmerOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock orders data
  const orders: Order[] = [
    { id: '1', orderId: 'ORD-001', date: '16/01/2025', customer: 'John Kamsi', products: ['Huckleberry'], price: 2500, status: 'delivered' },
    { id: '2', orderId: 'ORD-002', date: '16/01/2025', customer: 'John Kamsi', products: ['Tomatoes', 'Carrots'], price: 2500, status: 'delivering' },
    { id: '3', orderId: 'ORD-003', date: '16/01/2025', customer: 'Chup Nkemnkwi', products: ['Spinach'], price: 1800, status: 'pending' },
    { id: '4', orderId: 'ORD-004', date: '16/01/2025', customer: 'Chup Nkemnkwi', products: ['Bell Peppers'], price: 3200, status: 'confirmed' },
    { id: '5', orderId: 'ORD-005', date: '15/01/2025', customer: 'Mary Jane', products: ['Cucumbers'], price: 1500, status: 'cancelled' },
    { id: '6', orderId: 'ORD-006', date: '15/01/2025', customer: 'Chup Nkemnkwi', products: ['Huckleberry'], price: 2800, status: 'delivered' },
    { id: '7', orderId: 'ORD-007', date: '14/01/2025', customer: 'Sarah Williams', products: ['Mixed Vegetables'], price: 3500, status: 'delivered' },
    { id: '8', orderId: 'ORD-008', date: '14/01/2025', customer: 'James Brown', products: ['Huckleberry'], price: 2200, status: 'preparing' },
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const statusOptions = [
    { label: 'All', value: 'all', count: orders.length },
    { label: 'Pending', value: 'pending', count: orders.filter(o => o.status === 'pending').length },
    { label: 'Confirmed', value: 'confirmed', count: orders.filter(o => o.status === 'confirmed').length },
    { label: 'Preparing', value: 'preparing', count: orders.filter(o => o.status === 'preparing').length },
    { label: 'Delivering', value: 'delivering', count: orders.filter(o => o.status === 'delivering').length },
    { label: 'Delivered', value: 'delivered', count: orders.filter(o => o.status === 'delivered').length },
    { label: 'Cancelled', value: 'cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  return (
    <DashboardLayout userType="farmer">
      <div className="p-6">
        <div className="space-y-6">
          {/* Header with Filters */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">My Orders</h1>
            
            {/* Status Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedStatus(option.value)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedStatus === option.value
                      ? 'bg-[--color-primary] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedStatus === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Products
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{order.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{order.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            {order.customerAvatar ? (
                              <img src={order.customerAvatar} alt={order.customer} className="h-8 w-8 rounded-full" />
                            ) : (
                              <span className="text-xs font-medium text-gray-600">
                                {getInitials(order.customer)}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-900">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{order.products.join(', ')}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(order.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <StatusBadge status={order.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                            className="inline-flex items-center space-x-1 text-[--color-primary] hover:text-[--color-primary-dark] text-sm font-medium transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders found for this filter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerOrdersPage;