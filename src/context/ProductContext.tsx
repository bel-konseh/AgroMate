import React, { createContext, useContext, useState, useEffect} from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import type { ReactNode } from 'react';
import { db } from '../config/firebase';
import { uploadMultipleImagesToCloudinary } from '../services/cloudinaryServices';
import type { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: File[]) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>, newImages?: File[], existingImages?: string[]) => Promise<void>;
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
    console.log('🔄 [ProductContext] Fetching products from Firestore...');
    try {
      setLoading(true);
      const productsQuery = query(
        collection(db, 'products'), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(productsQuery);
      
      console.log(`📦 [ProductContext] Found ${querySnapshot.docs.length} products in Firestore`);
      
      const productsData: Product[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('📄 [ProductContext] Product data:', { id: doc.id, name: data.name, farmerId: data.farmerId });
        return {
          id: doc.id,
          farmerId: data.farmerId,
          farmerName: data.farmerName,
          name: data.name,
          description: data.description,
          price: data.price,
          originalPrice: data.originalPrice,
          currency: data.currency || 'XAF',
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
      console.log('✅ [ProductContext] Products loaded successfully:', productsData.length);
    } catch (error) {
      console.error('❌ [ProductContext] Error fetching products:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount
  useEffect(() => {
    console.log('🚀 [ProductContext] Initializing ProductContext...');
    fetchProducts();
  }, []);

  // Add product to Firestore with Cloudinary images
  const addProduct = async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    images: File[]
  ) => {
    console.log('➕ [ProductContext] Starting addProduct...');
    console.log('📝 [ProductContext] Product data:', productData);
    console.log('🖼️ [ProductContext] Images to upload:', images.length);
    
    setUploading(true);
    try {
      // Upload images to Cloudinary first
      console.log('☁️ [ProductContext] Uploading images to Cloudinary...');
      const imageUrls = await uploadMultipleImagesToCloudinary(images);
      console.log('✅ [ProductContext] Images uploaded successfully:', imageUrls);

      // Build product data - only include defined fields
      const productToAdd: Record<string, any> = {
        farmerId: productData.farmerId,
        farmerName: productData.farmerName,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        currency: productData.currency || 'XAF',
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

      // Only add optional fields if they exist
      if (productData.originalPrice !== undefined && productData.originalPrice !== null) {
        productToAdd.originalPrice = productData.originalPrice;
      }

      console.log('💾 [ProductContext] Saving to Firestore:', productToAdd);
      const docRef = await addDoc(collection(db, 'products'), productToAdd);
      console.log('✅ [ProductContext] Product saved with ID:', docRef.id);

      // Refresh products list
      console.log('🔄 [ProductContext] Refreshing products list...');
      await fetchProducts();
      console.log('✅ [ProductContext] Product added successfully!');
    } catch (error) {
      console.error('❌ [ProductContext] Error adding product:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Update product in Firestore
  const updateProduct = async (
    id: string, 
    productData: Partial<Product>,
    newImages?: File[],
    existingImages?: string[]
  ) => {
    console.log('✏️ [ProductContext] Updating product:', id);
    setUploading(true);
    try {
      let finalImages: string[] = existingImages || [];
      
      // Upload new images to Cloudinary if provided
      if (newImages && newImages.length > 0) {
        console.log('☁️ [ProductContext] Uploading new images to Cloudinary...');
        const newImageUrls = await uploadMultipleImagesToCloudinary(newImages);
        console.log('✅ [ProductContext] New images uploaded:', newImageUrls);
        finalImages = [...finalImages, ...newImageUrls];
      }

      // Prepare update data
      const updateData: Record<string, any> = {
        ...productData,
        images: finalImages,
        updatedAt: Timestamp.now()
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      console.log('💾 [ProductContext] Updating Firestore document:', updateData);
      await updateDoc(doc(db, 'products', id), updateData);
      console.log('✅ [ProductContext] Product updated successfully');

      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error('❌ [ProductContext] Error updating product:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Delete product from Firestore
  const deleteProduct = async (id: string) => {
    console.log('🗑️ [ProductContext] Deleting product:', id);
    try {
      await deleteDoc(doc(db, 'products', id));
      console.log('✅ [ProductContext] Product deleted from Firestore');
      
      // Remove from local state immediately
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error('❌ [ProductContext] Error deleting product:', error);
      throw error;
    }
  };

  const getProductById = (id: string) => {
    console.log('🔍 [ProductContext] Getting product by ID:', id);
    const product = products.find(product => product.id === id);
    console.log('Result:', product ? `Found: ${product.name}` : 'Not found');
    return product;
  };

  const getProductsByFarmer = (farmerId: string) => {
    console.log('🔍 [ProductContext] Getting products for farmer:', farmerId);
    const farmerProducts = products.filter(product => product.farmerId === farmerId);
    console.log(`Found ${farmerProducts.length} products for this farmer`);
    return farmerProducts;
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