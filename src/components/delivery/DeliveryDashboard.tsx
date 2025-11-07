import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import { formatCurrency } from '../../utils/helpers';

interface Delivery {
  id: string;
  pickupLocation: string;
  productName: string;
  price: number;
}

const DeliveryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Today');

  // Mock data - Replace with actual data from API/Context
  const deliveryCount = 45;
  const balance = 0;
  const isOnline = true;
  
  const deliveries: Delivery[] = [
    { id: '1', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '2', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '3', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '4', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '5', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '6', pickupLocation: 'Cani Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
  ];

  const handleDeliverProduct = () => {
    navigate('/dashboard/available-deliveries');
  };

  return (
    <DashboardLayout userType="delivery" userName="Tancho Derick">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Card */}
          <StatsCard
            count={deliveryCount}
            countLabel="All Deliveries"
            isOnline={isOnline}
            balance={balance}
            balanceLabel="Account Balance"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            actionButton={{
              label: 'Deliver Product',
              icon: <Truck className="h-5 w-5" />,
              onClick: handleDeliverProduct
            }}
          />

          {/* All Deliveries Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Deliveries</h2>
            </div>

            {/* Deliveries Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pickup Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deliveries.map((delivery) => (
                    <tr 
                      key={delivery.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/dashboard/deliveries/${delivery.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{delivery.pickupLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{delivery.productName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(delivery.price)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {deliveries.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No deliveries available</p>
                <button
                  onClick={handleDeliverProduct}
                  className="text-[--color-primary] hover:text-[--color-primary-dark] font-medium"
                >
                  Check available deliveries
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryDashboardPage;