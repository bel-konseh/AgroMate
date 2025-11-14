import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import Input from '../components/common/Input';
import { useProducts } from '../context/ProductContext';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import LoadingSpinner from '../components/common/LoadingSpinner';

const Shop: React.FC = () => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Get unique categories from products
  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...Array.from(new Set(products.map(p => p.category))).map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: products.filter(p => p.category === cat).length
    }))
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = product.isAvailable;
    return matchesCategory && matchesSearch && matchesAvailability;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop Fresh Products</h1>
          <p className="text-lg text-green-100">
            Browse our selection of fresh agricultural products from local farmers
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading ? (
        <div className="py-16">
          {/* <LoadingSpinner size="lg" className="mx-auto" /> */}
          <p className="text-center text-gray-600 mt-4">Loading products...</p>
        </div>
      ) : (
        /* Shop Content */
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Filters */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Filters</h2>
                    <SlidersHorizontal className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-[--color-primary] text-white'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{category.name}</span>
                            <span className={`text-sm ${
                              selectedCategory === category.id ? 'text-green-100' : 'text-gray-400'
                            }`}>
                              {category.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-6">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                {/* Results Info */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold">{sortedProducts.length}</span> products
                  </p>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Shop;