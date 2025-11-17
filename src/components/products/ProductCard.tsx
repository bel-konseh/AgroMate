import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/product/${product.id}`); // or `/shop/product/${product.id}`
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {product.isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[--color-primary] transition-colors">
          {product.name}
        </h3>

        {/* Farmer Name & Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="truncate">{product.farmerName}</span>
          <span className="mx-2">•</span>
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[--color-primary]">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
          </div>
          
          {/* Stock indicator */}
          <div className="text-right">
            <p className={`text-xs font-medium ${
              product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;