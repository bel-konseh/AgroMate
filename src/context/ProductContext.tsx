import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { uploadMultipleImagesToCloudinary } from '../services/cloudinaryServices';
import type { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: File[]) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>, newImages?: File[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByFarmer: (farmerId: string) => Product[];
  loading: boolean;
  uploading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch all products from Firestore
  const fetchProducts = async () => {
    try {
      const productsQuery = query(
        collection(db, 'products'), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(productsQuery);
      
      const productsData: Product[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          farmerId: data.farmerId,
          farmerName: data.farmerName,
          name: data.name,
          description: data.description,
          price: data.price,
          currency: data.currency,
          category: data.category,
          subcategory: data.subcategory,
          images: data.images || [],
          rating: data.rating || 0,
          reviewCount: data.reviewCount || 0,
          stock: data.stock,
          isAvailable: data.isAvailable,
          location: data.location,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as Product;
      });
      
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to Firestore with Cloudinary images
  const addProduct = async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    images: File[]
  ) => {
    setUploading(true);
    try {
      // Upload images to Cloudinary first
      console.log('Uploading images to Cloudinary...');
      const imageUrls = await uploadMultipleImagesToCloudinary(images);
      console.log('Images uploaded:', imageUrls);

      // Add product to Firestore with Cloudinary URLs
      const productToAdd = {
        farmerId: productData.farmerId,
        farmerName: productData.farmerName,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        currency: productData.currency,
        category: productData.category,
        subcategory: productData.subcategory,
        images: imageUrls,
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
        stock: productData.stock,
        isAvailable: productData.isAvailable,
        location: productData.location,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'products'), productToAdd);
      console.log('Product added to Firestore with ID:', docRef.id);

      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Update product in Firestore
  const updateProduct = async (
    id: string, 
    productData: Partial<Product>,
    newImages?: File[]
  ) => {
    setUploading(true);
    try {
      let imageUrls: string[] = [];
      
      // Upload new images to Cloudinary if provided
      if (newImages && newImages.length > 0) {
        console.log('Uploading new images to Cloudinary...');
        imageUrls = await uploadMultipleImagesToCloudinary(newImages);
        console.log('New images uploaded:', imageUrls);
      }

      // Prepare update data
      const updateData: any = {
        ...productData,
        updatedAt: Timestamp.now()
      };

      // If there are new images, append them to existing ones
      if (imageUrls.length > 0) {
        const existingImages = productData.images || [];
        updateData.images = [...existingImages, ...imageUrls];
      }

      await updateDoc(doc(db, 'products', id), updateData);
      console.log('Product updated in Firestore');

      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Delete product from Firestore
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      console.log('Product deleted from Firestore');
      
      // Remove from local state immediately
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
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
        loading,
        uploading
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