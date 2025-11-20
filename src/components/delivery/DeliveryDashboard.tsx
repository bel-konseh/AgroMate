import React, { useState } from 'react';
import { Truck} from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/helpers';

interface Delivery {
  id: string;
  pickupLocation: string;
  productName: string;
  price: number;
}

const DeliveryDashboardPage: React.FC = () => {
  // Tabs adjusted for Delivery context
  const [activeTab, setActiveTab] = useState('Today');
  const [isOnline, setIsOnline] = useState(true);

  // Mock data matching your design
  const deliveryCount = 45;
  const balance = 0;
  
  const deliveries: Delivery[] = [
    { id: '1', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '2', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '3', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '4', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '5', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
    { id: '6', pickupLocation: 'Caps Junction', productName: 'Huckleberry || Njama Njama', price: 500 },
  ];

  // Tabs for the delivery statistics section
  const statsTabs = ['Today', 'Week', 'Month'];
  // Tabs for the table filtering section (assuming 'Today', 'Done', 'Await' are for table)
  const tableTabs = ['Today', 'Done', 'Await']; 

  return (
    <DashboardLayout userType="delivery" userName="Tancho Derick">
      <div className="p-6 space-y-6">
        
        {/*
          Top Section - Layout matching the final Farmer/Delivery design
        */}
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
            
            {/* === 1. Left Card: Goods Delivered and Tabs (lg:w-1/3) === */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:w-1/3 flex flex-col items-center border border-gray-100">
                {/* CORRECTED LABEL */}
                <p className="text-sm text-gray-500 mb-4">Goods Delivered</p> 
                
                <div className="text-8xl font-bold text-gray-900 leading-none mb-6">
                    {deliveryCount}
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 border border-gray-200 p-1 rounded-lg">
                    {statsTabs.map((tab) => ( // Using statsTabs for consistency with design
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                            activeTab === tab
                            ? 'bg-green-50 text-green-700' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* === 2. Right Section: Online Toggle, Balance, and Button (lg:w-2/3) */}
            <div className="flex flex-col lg:w-2/3 space-y-4"> 
                
                {/* Top Row: Online Status & Account Balance (Horizontal on LG screens) */}
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                    
                    {/* 2A: Online Toggle Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex-1">
                        
                        <div className="flex items-start space-x-3 mb-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isOnline} 
                                    onChange={() => setIsOnline(!isOnline)} 
                                    className="sr-only peer" 
                                />
                                <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                            <span className="text-xl font-bold text-gray-900">
                                Online
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 pl-1">
                            Always make sure you are online here. Makes you available for pick ups and delivery
                        </p>
                    </div>

                    {/* 2B: Account Balance Card */}
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex-1 flex flex-col justify-center">
                        <div className="flex flex-col items-end">
                            <p className="text-xs text-gray-500 mb-1">Account Balance</p>
                            <p className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                                {/* Using the same formatting helper */}
                                {formatCurrency(balance).replace('XAF', '').trim()}
                            </p>
                            <p className="text-xs text-gray-500 text-right">XAF</p>
                        </div>
                    </div>
                </div>

                {/* 2C: Deliver Product Button */}
                <Button 
                    variant="primary"
                    leftIcon={<Truck className="h-6 w-6" />} // Using Truck icon for Deliver
                    className="w-full bg-gradient-to-r from-green-700 to-lime-500 text-white py-3 text-lg font-semibold h-14" 
                >
                    Deliver Product
                </Button>
            </div>

        </div>

        {/* All Deliveries Table Header */}
        <div className="pt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">All Deliveries</h3>
             {/* Optional: Table Tabs for filtering deliveries - Not in your initial code, but useful */}
             <div className="flex space-x-2">
                  {tableTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
        </div>

        {/* All Deliveries Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Product & Location {/* Combined header */}
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="text-sm text-gray-900">{delivery.productName}</div>
                        <div className="text-xs text-gray-500">{delivery.pickupLocation}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(delivery.price)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryDashboardPage;