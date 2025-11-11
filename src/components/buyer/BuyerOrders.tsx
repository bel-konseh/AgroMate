import React, { useState } from 'react';
import { Eye, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, getInitials } from '../../utils/helpers';
import type { OrderStatus } from '../../types';

interface Order {
  id: string;
  orderId: string;
  date: string;
  farmerName: string;
  farmerLocation: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  deliveryLocation: string;
  status: OrderStatus;
  deliveryPersonName?: string;
}

const BuyerOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      orderId: 'ORD-001',
      date: '16/01/2025',
      farmerName: "John's Farm",
      farmerLocation: 'Cani Junction, Bamenda',
      products: [
        { name: 'Huckleberry', quantity: 2, price: 1000 },
        { name: 'Tomatoes', quantity: 1, price: 1500 }
      ],
      totalPrice: 2500,
      deliveryLocation: 'Ntarikon, Bamenda',
      status: 'delivering',
      deliveryPersonName: 'Tancho Derick'
    },
    {
      id: '2',
      orderId: 'ORD-002',
      date: '15/01/2025',
      farmerName: 'Green Valley Farm',
      farmerLocation: 'Nkwen Market, Bamenda',
      products: [
        { name: 'Carrots', quantity: 1, price: 800 },
        { name: 'Spinach', quantity: 1, price: 1000 }
      ],
      totalPrice: 1800,
      deliveryLocation: 'Commercial Avenue, Bamenda',
      status: 'delivered'
    },
    {
      id: '3',
      orderId: 'ORD-003',
      date: '14/01/2025',
      farmerName: 'Sunrise Farm',
      farmerLocation: 'Mile 4, Bamenda',
      products: [
        { name: 'Bell Peppers', quantity: 2, price: 3200 }
      ],
      totalPrice: 3200,
      deliveryLocation: 'Up Station, Bamenda',
      status: 'pending'
    },
    {
      id: '4',
      orderId: 'ORD-004',
      date: '13/01/2025',
      farmerName: "John's Farm",
      farmerLocation: 'Cani Junction, Bamenda',
      products: [
        { name: 'Fresh Spinach', quantity: 1, price: 1500 }
      ],
      totalPrice: 1500,
      deliveryLocation: 'Ntarikon, Bamenda',
      status: 'delivered'
    },
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
    <DashboardLayout userType="buyer">
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

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-gray-900">{order.orderId}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Farmer Info */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-600">
                        {getInitials(order.farmerName)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.farmerName}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {order.farmerLocation}
                      </p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-2 mb-4">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">
                          {product.name} <span className="text-gray-500">x{product.quantity}</span>
                        </span>
                        <span className="font-medium text-gray-900">{formatCurrency(product.price)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Delivery Location</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[--color-primary]" />
                      {order.deliveryLocation}
                    </p>
                  </div>

                  {/* Delivery Person (if assigned) */}
                  {order.deliveryPersonName && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-500 mb-1">Delivery Person</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-1 text-blue-600" />
                        {order.deliveryPersonName}
                      </p>
                    </div>
                  )}

                  {/* Total and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/dashboard/buyer/orders/${order.id}`)}
                      className="flex items-center space-x-2 px-4 py-2 text-[--color-primary] hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg mb-4">No orders found</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="text-[--color-primary] hover:text-[--color-primary-dark] font-medium"
                >
                  Start shopping →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerOrdersPage;