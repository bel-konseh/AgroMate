import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  subcategory: string;
  stock: string;
  images: File[];
}

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct, uploading } = useProducts();
  const { userData } = useAuth();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    category: '',
    subcategory: '',
    stock: '100',
    images: []
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: '', label: 'Select a Category' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains' },
    { value: 'herbs', label: 'Herbs' },
    { value: 'dairy', label: 'Dairy' },
  ];

  const subcategories: Record<string, string[]> = {
    vegetables: ['Leafy Greens', 'Root Vegetables', 'Tomatoes', 'Peppers', 'Cucumbers'],
    fruits: ['Citrus', 'Berries', 'Tropical', 'Stone Fruits'],
    grains: ['Rice', 'Wheat', 'Corn', 'Oats'],
    herbs: ['Basil', 'Mint', 'Parsley', 'Cilantro'],
    dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter'],
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof ProductFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log('📸 [AddProduct] Images selected:', files.length, files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validate = (): boolean => {
    console.log('🔍 [AddProduct] Validating form...');
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.subcategory) {
      newErrors.subcategory = 'Please select a subcategory';
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    if (formData.images.length === 0) {
      console.log('❌ [AddProduct] No images uploaded');
      alert('Please upload at least one product image');
      return false;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(isValid ? '✅ [AddProduct] Validation passed' : '❌ [AddProduct] Validation failed:', newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 [AddProduct] Form submitted');
    console.log('📝 [AddProduct] Current form data:', formData);

    if (!validate()) {
      console.log('❌ [AddProduct] Validation failed - stopping submission');
      return;
    }

    if (!userData) {
      console.log('❌ [AddProduct] No user data available');
      alert('You must be logged in to add products');
      return;
    }

    console.log('👤 [AddProduct] User data:', {
      uid: userData.uid,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      userType: userData.userType
    });

    setIsSubmitting(true);
    console.log('⏳ [AddProduct] Setting isSubmitting to true');

    try {
      const productData = {
        farmerId: userData.uid,
        farmerName: `${userData.firstName} ${userData.lastName}`,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        currency: 'XAF',
        category: formData.category,
        subcategory: formData.subcategory,
        images: [], // Will be set by the context after upload
        rating: 0,
        reviewCount: 0,
        stock: Number(formData.stock),
        isAvailable: true,
        location: userData.location || 'Bamenda, Cameroon'
      };

      console.log('📦 [AddProduct] Product data prepared:', productData);
      console.log('🖼️ [AddProduct] Images to upload:', formData.images.length, 'files');
      console.log('🖼️ [AddProduct] Image details:', formData.images.map(f => ({ name: f.name, size: f.size, type: f.type })));

      console.log('📞 [AddProduct] Calling addProduct function...');
      await addProduct(productData, formData.images);

      console.log('✅ [AddProduct] Product added successfully!');
      alert('Product added successfully!');
      
      // Reset form
      console.log('🔄 [AddProduct] Resetting form...');
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        subcategory: '',
        stock: '100',
        images: []
      });
      
      // Navigate to products page
      console.log('🔄 [AddProduct] Navigating to products page...');
      navigate('/dashboard/farmer/products');
    } catch (error: any) {
      console.error('❌ [AddProduct] Error adding product:', error);
      console.error('❌ [AddProduct] Error type:', typeof error);
      console.error('❌ [AddProduct] Error message:', error?.message);
      console.error('❌ [AddProduct] Error stack:', error?.stack);
      
      if (error?.response) {
        console.error('❌ [AddProduct] Error response:', error.response);
      }
      
      alert(`Failed to add product: ${error?.message || 'Unknown error'}`);
    } finally {
      console.log('🏁 [AddProduct] Finally block - setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  // Log when component mounts
  React.useEffect(() => {
    console.log('🎬 [AddProduct] Component mounted');
    console.log('👤 [AddProduct] User data on mount:', userData);
    console.log('🔧 [AddProduct] addProduct function:', typeof addProduct);
    console.log('🔧 [AddProduct] uploading state:', uploading);
  }, []);

  return (
    <DashboardLayout userType="farmer">
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Product</h1>
            <p className="text-gray-600">Fill in the details to add a new product to your inventory</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Fresh Huckleberry Leaves"
                error={errors.name}
                required
              />

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Product Price (XAF)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 500"
                  error={errors.price}
                  required
                />

                <Input
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  error={errors.stock}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product..."
                  rows={4}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              {/* Subcategory */}
              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition-all ${
                      errors.subcategory ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a Subcategory</option>
                    {subcategories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  {errors.subcategory && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.subcategory}</p>
                  )}
                </div>
              )}

              {/* Upload Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Upload Photos <span className="text-red-500">*</span>
                </label>
                
                {/* Upload Button */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading || isSubmitting}
                  />
                  <div className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[--color-primary] transition-colors ${
                    uploading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </label>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          disabled={uploading || isSubmitting}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-blue-700">Uploading images to cloud storage...</span>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/farmer')}
                  disabled={isSubmitting || uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting || uploading}
                  disabled={isSubmitting || uploading}
                >
                  {uploading ? 'Uploading Images...' : isSubmitting ? 'Adding Product...' : 'Add Product'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProductPage;