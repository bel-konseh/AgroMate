import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package } from 'lucide-react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  stock: number;
  images: string[];
  isAvailable: boolean;
  createdAt: string;
}

const ViewProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock product data - Replace with actual API call
  const product: Product = {
    id: id || '1',
    name: 'Huckleberry || Njama Njama',
    description: 'Fresh huckleberry leaves, locally sourced and organic. Perfect for traditional Cameroonian dishes. Rich in nutrients and vitamins.',
    price: 500,
    category: 'vegetables',
    subcategory: 'Leafy Greens',
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
    ],
    isAvailable: true,
    createdAt: '2024-01-15'
  };

  const handleEdit = () => {
    navigate(`/dashboard/farmer/products/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert('Product deleted successfully! (This will be connected to backend)');
      navigate('/dashboard/farmer/products');
    }
  };

  const handleBack = () => {
    navigate('/dashboard/farmer/products');
  };

  return (
    <DashboardLayout userType="farmer">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </button>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                leftIcon={<Edit className="h-4 w-4" />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Left - Images */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-24 w-24 text-gray-300" />
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category} • {product.subcategory}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-b border-gray-200 py-4">
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-4xl font-bold text-[--color-primary]">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">per Pack</p>
                </div>

                {/* Stock */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Stock Level</p>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          product.stock > 30 ? 'bg-green-500' : product.stock > 10 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold ${
                      product.stock > 30 ? 'text-green-600' : product.stock > 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} units
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Product ID:</span>
                    <span className="font-medium text-gray-900">{product.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Added on:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewProductPage;