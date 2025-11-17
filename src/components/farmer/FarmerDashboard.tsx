import React, { useState,  } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../dashboard/DashboardLayout';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

const FarmerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { getProductsByFarmer, loading } = useProducts();
  const [activeTab, setActiveTab] = useState('Today');
  const [isOnline, setIsOnline] = useState(true);

  // Get farmer's products
  const farmerProducts = userData ? getProductsByFarmer(userData.uid) : [];
  const tabs = ['Today', 'Week', 'Month'];
  const productCount = farmerProducts.length;
  const balance = 0; // TODO: Get from transactions/wallet

  const handleAddProduct = () => {
    navigate('/dashboard/addproduct');
  };

  const handleViewAllProducts = () => {
    navigate('/dashboard/farmer/products');
  };

  if (loading) {
    return (
      <DashboardLayout userType="farmer" userName={userData ? `${userData.firstName} ${userData.lastName}` : ''}>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--color-primary] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
    
  return (
    <DashboardLayout userType="farmer" userName={userData ? `${userData.firstName} ${userData.lastName}` : ''}>
      <div className="p-6 space-y-6">
        
        {/* Top Section - Responsive Layout */}
        <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 space-y-reverse">
            
            {/* === 1. Left Card: Goods Sold and Tabs (lg:w-1/3) === */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:w-1/3 flex flex-col items-center border border-gray-100">
                <p className="text-sm text-gray-500 mb-4">Products Listed</p>
                
                {/* Big Number */}
                <div className="text-8xl font-bold text-gray-900 leading-none mb-6">
                    {productCount}
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 border border-gray-200 p-1 rounded-lg">
                    {tabs.map((tab) => (
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
                
                {/* Top Row: Online Status & Account Balance */}
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
                                {formatCurrency(balance).replace('XAF', '').trim()}
                            </p>
                            <p className="text-xs text-gray-500 text-right">XAF</p>
                        </div>
                    </div>
                </div>

                {/* 2C: Add Product Button */}
                <Button 
                    variant="primary"
                    leftIcon={<Plus className="h-6 w-6" />}
                    onClick={handleAddProduct}
                    className="w-full bg-gradient-to-r from-green-700 to-lime-500 text-white py-3 text-lg font-semibold h-14" 
                >
                    Add Product
                </Button>
            </div>

        </div>

        {/* All Products Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">My Products</h3>
            <button
              onClick={handleViewAllProducts}
              className="text-sm text-[--color-primary] hover:text-[--color-primary-dark] font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {farmerProducts.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {farmerProducts.slice(0, 5).map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/dashboard/farmer/products/${product.id}`)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {product.images && product.images.length > 0 && (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          )}
                          <span className="text-sm text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)} / Pack
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-medium ${
                          product.stock > 20 ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products yet</p>
                <Button variant="primary" onClick={handleAddProduct}>
                  Add Your First Product
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboardPage;