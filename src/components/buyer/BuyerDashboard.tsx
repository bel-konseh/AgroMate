import React from 'react';
import { ShoppingBag, Package, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency, getInitials } from '../../utils/helpers';
import type { OrderStatus } from '../../types';

interface OrderStats {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

interface RecentOrder {
  id: string;
  orderId: string;
  date: string;
  farmerName: string;
  products: string[];
  price: number;
  status: OrderStatus;
}

const BuyerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const orderStats: OrderStats[] = [
    { 
      label: 'Total Orders', 
      count: 24, 
      icon: <ShoppingBag className="h-8 w-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Pending', 
      count: 3, 
      icon: <Package className="h-8 w-8" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      label: 'In Transit', 
      count: 5, 
      icon: <Truck className="h-8 w-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Delivered', 
      count: 16, 
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
  ];

  const recentOrders: RecentOrder[] = [
    { 
      id: '1', 
      orderId: 'ORD-001', 
      date: '16/01/2025', 
      farmerName: "John's Farm",
      products: ['Huckleberry', 'Tomatoes'], 
      price: 2500, 
      status: 'delivering' 
    },
    { 
      id: '2', 
      orderId: 'ORD-002', 
      date: '15/01/2025', 
      farmerName: 'Green Valley Farm',
      products: ['Carrots', 'Spinach'], 
      price: 1800, 
      status: 'delivered' 
    },
    { 
      id: '3', 
      orderId: 'ORD-003', 
      date: '14/01/2025', 
      farmerName: 'Sunrise Farm',
      products: ['Bell Peppers'], 
      price: 3200, 
      status: 'delivered' 
    },
  ];

  return (
    <DashboardLayout userType="buyer" userName="Mary Johnson">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Mary!</h1>
            <p className="text-gray-600">Here's what's happening with your orders today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderStats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/dashboard/buyer/orders')}
              >
                <div className={`${stat.bgColor} ${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button 
                  onClick={() => navigate('/dashboard/buyer/orders')}
                  className="flex items-center space-x-1 text-sm text-[--color-primary] hover:text-[--color-primary-dark] font-medium transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/dashboard/buyer/orders/${order.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      {/* Left - Order Info */}
                      <div className="flex items-center space-x-4">
                        {/* Farmer Avatar */}
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-gray-600">
                            {getInitials(order.farmerName)}
                          </span>
                        </div>

                        {/* Order Details */}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-semibold text-gray-900">{order.orderId}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            From <span className="font-medium text-gray-900">{order.farmerName}</span>
                          </p>
                          <p className="text-sm text-gray-500">{order.products.join(', ')}</p>
                        </div>
                      </div>

                      {/* Right - Price and Status */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 mb-2">
                          {formatCurrency(order.price)}
                        </p>
                        <StatusBadge status={order.status} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">You don't have any recent orders</p>
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div 
              className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag className="h-10 w-10 mb-3 opacity-90" />
              <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
              <p className="text-white/80 text-sm">Discover fresh products from local farmers</p>
            </div>

            <div 
              className="bg-gradient-to-br from-[--color-accent] to-[--color-accent-dark] rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/dashboard/buyer/orders')}
            >
              <Package className="h-10 w-10 mb-3 opacity-90" />
              <h3 className="text-xl font-semibold mb-2">Track Orders</h3>
              <p className="text-white/80 text-sm">View and track all your orders</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboardPage;