import React from 'react';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface OrderStats {
  label: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const BuyerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const orderStats: OrderStats[] = [
    { 
      label: 'Total Orders', 
      count: 24, 
      icon: <ShoppingBag className="h-8 w-8" />,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      label: 'Pending', 
      count: 3, 
      icon: <Package className="h-8 w-8" />,
      color: 'bg-yellow-50 text-yellow-600'
    },
    { 
      label: 'In Transit', 
      count: 5, 
      icon: <Truck className="h-8 w-8" />,
      color: 'bg-purple-50 text-purple-600'
    },
    { 
      label: 'Delivered', 
      count: 16, 
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'bg-green-50 text-green-600'
    },
  ];

  return (
    <DashboardLayout userType="buyer" userName="Konseh">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600">Here's what's happening with your orders today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderStats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/dashboard/orders')}
              >
                <div className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                <button 
                  onClick={() => navigate('/dashboard/orders')}
                  className="text-sm text-[--color-primary] hover:text-[--color-primary-dark] font-medium"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-center text-gray-500 py-8">
                You don't have any recent orders. 
                <button 
                  onClick={() => navigate('/shop')}
                  className="text-[--color-primary] hover:text-[--color-primary-dark] font-medium ml-1"
                >
                  Start shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboardPage;