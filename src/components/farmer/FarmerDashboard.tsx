import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import { formatCurrency } from '../../utils/helpers';

interface Product {
  id: string;
  name: string;
  price: number;
}

const FarmerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Today');

  // Mock data - Replace with actual data from API/Context
  const productCount = 45;
  const balance = 0;
  const isOnline = true;
  
  const products: Product[] = [
    { id: '1', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '2', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '3', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '4', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '5', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '6', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '7', name: 'Huckleberry || Njama Njama', price: 500 },
    { id: '8', name: 'Huckleberry || Njama Njama', price: 500 },
  ];

  const handleAddProduct = () => {
    navigate('/dashboard/add-product');
  };

  return (
    <DashboardLayout userType="farmer" userName="Fomeny John Che">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Card */}
          <StatsCard
            count={productCount}
            countLabel="Total Products"
            isOnline={isOnline}
            balance={balance}
            balanceLabel="Account Balance"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            actionButton={{
              label: 'Add Product',
              icon: <Plus className="h-5 w-5" />,
              onClick: handleAddProduct
            }}
          />

          {/* All Products Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr 
                      key={product.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/dashboard/products/${product.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products yet</p>
                <button
                  onClick={handleAddProduct}
                  className="text-[--color-primary] hover:text-[--color-primary-dark] font-medium"
                >
                  Add your first product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboardPage;