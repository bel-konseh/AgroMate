import React, { createContext, useContext, useState, useEffect, } from 'react';
import type { ReactNode } from 'react';
import type{ Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByFarmer: (farmerId: string) => Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Initial mock products
const initialProducts: Product[] = [
  {
    id: '1',
    farmerId: 'farmer1',
    farmerName: "John's Farm",
    name: 'Huckleberry || Njama Njama',
    description: 'Fresh huckleberry leaves, locally sourced and organic. Perfect for traditional Cameroonian dishes.',
    price: 500,
    originalPrice: 800,
    currency: 'XAF',
    category: 'vegetables',
    subcategory: 'Leafy Greens',
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
    ],
    rating: 4.5,
    reviewCount: 23,
    stock: 50,
    isAvailable: true,
    location: 'Bamenda, Cameroon',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    farmerId: 'farmer2',
    farmerName: 'Green Valley Farm',
    name: 'Fresh Tomatoes',
    description: 'Organic tomatoes, grown without pesticides. Perfect for salads and cooking.',
    price: 300,
    originalPrice: 450,
    currency: 'XAF',
    category: 'vegetables',
    subcategory: 'Tomatoes',
    images: [
      'https://images.unsplash.com/photo-1546470427-e26264d4e8ec?w=400',
    ],
    rating: 4.8,
    reviewCount: 45,
    stock: 100,
    isAvailable: true,
    location: 'Buea, Cameroon',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    farmerId: 'farmer1',
    farmerName: "John's Farm",
    name: 'Organic Carrots',
    description: 'Fresh carrots, perfect for salads and cooking.',
    price: 250,
    originalPrice: 400,
    currency: 'XAF',
    category: 'vegetables',
    subcategory: 'Root Vegetables',
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
    ],
    rating: 4.6,
    reviewCount: 32,
    stock: 75,
    isAvailable: true,
    location: 'Bamenda, Cameroon',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('agromate_products');
    if (storedProducts) {
      try {
        const parsed = JSON.parse(storedProducts);
        // Convert date strings back to Date objects
        const productsWithDates = parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        }));
        setProducts(productsWithDates);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts(initialProducts);
      }
    } else {
      setProducts(initialProducts);
    }
    setLoading(false);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('agromate_products', JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, ...productData, updatedAt: new Date() }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByFarmer = (farmerId: string) => {
    return products.filter(product => product.farmerId === farmerId);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByFarmer,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};