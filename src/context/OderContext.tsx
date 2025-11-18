import React, { createContext, useContext, useState, useEffect, } from 'react';
import type { ReactNode } from 'react';
import { 
  collection, 
  query, 
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import type { OrderStatus } from '../types';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  farmerId: string;
  farmerName: string;
  items: OrderItem[];
  itemsCount: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  deliveryLocation: string;
  pickupLocation: string;
  status: OrderStatus;
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  createdAt: Date;
  updatedAt: Date;
  orderDate: string;
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userData } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      setOrders([]);
      setLoading(false);
      return;
    }

    console.log('🔄 [OrderContext] Setting up real-time orders listener for:', userData.uid);

    // Build query based on user type
    let ordersQuery;
    
    if (userData.userType === 'buyer') {
      ordersQuery = query(
        collection(db, 'orders'),
        where('buyerId', '==', userData.uid),
        orderBy('createdAt', 'desc')
      );
    } else if (userData.userType === 'farmer') {
      ordersQuery = query(
        collection(db, 'orders'),
        where('farmerId', '==', userData.uid),
        orderBy('createdAt', 'desc')
      );
    } else if (userData.userType === 'delivery') {
      ordersQuery = query(
        collection(db, 'orders'),
        where('deliveryPersonId', '==', userData.uid),
        orderBy('createdAt', 'desc')
      );
    } else {
      setLoading(false);
      return;
    }

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const ordersData: Order[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            buyerId: data.buyerId,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            farmerId: data.farmerId,
            farmerName: data.farmerName,
            items: data.items,
            itemsCount: data.itemsCount,
            subtotal: data.subtotal,
            deliveryFee: data.deliveryFee,
            discount: data.discount,
            totalAmount: data.totalAmount,
            deliveryLocation: data.deliveryLocation,
            pickupLocation: data.pickupLocation,
            status: data.status,
            deliveryPersonId: data.deliveryPersonId,
            deliveryPersonName: data.deliveryPersonName,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            orderDate: data.orderDate
          } as Order;
        });

        console.log(`✅ [OrderContext] Loaded ${ordersData.length} orders`);
        setOrders(ordersData);
        setLoading(false);
      },
      (error) => {
        console.error('❌ [OrderContext] Error fetching orders:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userData]);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: new Date()
      });
      console.log('✅ Order status updated:', orderId, status);
    } catch (error) {
      console.error('❌ Error updating order status:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, loading, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};