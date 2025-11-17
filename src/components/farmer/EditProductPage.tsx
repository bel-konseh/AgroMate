import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import DashboardLayout from '../dashboard/DashboardLayout';
import Input from '../common/Input';
import Button from '../common/Button';
import { useProducts } from '../../context/ProductContext';

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  category: string;
  subcategory: string;
  stock: string;
  isAvailable: boolean;
  existingImages: string[];
  newImages: File[];
}

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct, uploading } = useProducts();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    category: '',
    subcategory: '',
    stock: '',
    isAvailable: true,
    existingImages: [],
    newImages: []
  });
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Load product data from context
  useEffect(() => {
    if (id) {
      const product = getProductById(id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description,
          category: product.category,
          subcategory: product.subcategory,
          stock: product.stock.toString(),
          isAvailable: product.isAvailable,
          existingImages: product.images || [],
          newImages: []
        });
      }
      setIsLoading(false);
    }
  }, [id, getProductById]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      setFormData(prev => ({
        ...prev,
        newImages: [...prev.newImages, ...files]
      }));
    }
  };

  const removeExistingImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  };

  const removeNewImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index)
    }));
  };

  const validate = (): boolean => {
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

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    if (formData.existingImages.length === 0 && formData.newImages.length === 0) {
      alert('Please keep at least one image or add new images');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !id) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProduct(
        id, 
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          subcategory: formData.subcategory,
          stock: Number(formData.stock),
          isAvailable: formData.isAvailable,
        },
        formData.newImages,
        formData.existingImages
      );

      alert('Product updated successfully!');
      navigate(`/dashboard/farmer/products/${id}`);
    } catch (error: any) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/dashboard/farmer/products/${id}`);
  };

  if (isLoading) {
    return (
      <DashboardLayout userType="farmer">
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--color-primary] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!getProductById(id!)) {
    return (
      <DashboardLayout userType="farmer">
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
            <Button onClick={() => navigate('/dashboard/farmer/products')}>
              Back to Products
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="farmer">
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
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
                  placeholder="e.g., 50"
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

              {/* Category and Subcategory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary] ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.category && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Subcategory
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                    >
                      <option value="">Select a Subcategory</option>
                      {subcategories[formData.category]?.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="h-4 w-4 text-[--color-primary] focus:ring-[--color-primary] border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                  Product is available for purchase
                </label>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Images
                </label>

                {/* Existing Images */}
                {formData.existingImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Current Images</p>
                    <div className="grid grid-cols-3 gap-4">
                      {formData.existingImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            disabled={uploading || isSubmitting}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Images */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading || isSubmitting}
                  />
                  <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[--color-primary] transition-colors ${
                    uploading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}>
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Add more images</p>
                  </div>
                </label>

                {/* New Images Preview */}
                {formData.newImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">New Images to Upload</p>
                    <div className="grid grid-cols-3 gap-4">
                      {formData.newImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            disabled={uploading || isSubmitting}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
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
                  onClick={handleBack}
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
                  {uploading ? 'Uploading Images...' : isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProductPage;