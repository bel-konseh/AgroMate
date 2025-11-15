import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db} from '../config/firebase';
import type{ Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: File[]) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>, newImages?: File[]) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByFarmer: (farmerId: string) => Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload images to Firebase Storage
  const uploadImages = async (images: File[], productId: string): Promise<string[]> => {
    const imageUrls: string[] = [];
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageRef = ref(storage, `products/${productId}/${Date.now()}_${image.name}`);
      
      try {
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    
    return imageUrls;
  };

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
          ...data,
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

  // Add product to Firestore
  const addProduct = async (
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
    images: File[]
  ) => {
    try {
      // First, add product to Firestore to get an ID
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        images: [], // Temporary empty array
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Upload images with the product ID
      const imageUrls = await uploadImages(images, docRef.id);

      // Update product with image URLs
      await updateDoc(doc(db, 'products', docRef.id), {
        images: imageUrls
      });

      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  // Update product in Firestore
  const updateProduct = async (
    id: string, 
    productData: Partial<Product>,
    newImages?: File[]
  ) => {
    try {
      let imageUrls: string[] = [];
      
      // Upload new images if provided
      if (newImages && newImages.length > 0) {
        imageUrls = await uploadImages(newImages, id);
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

      // Refresh products list
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  // Delete product from Firestore
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      
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