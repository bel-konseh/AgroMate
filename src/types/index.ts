// User Types
export type UserType = 'farmer' | 'buyer' | 'seller' | 'delivery';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: UserType;
  avatar?: string;
  location: Location;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  address: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Product Types
export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderId: string;
  buyerId: string;
  farmerId: string;
  deliveryPersonId?: string;
  products: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  status: OrderStatus;
  deliveryLocation: Location;
  pickupLocation: Location;
  orderDate: Date;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Transaction Types
export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  relatedOrderId?: string;
  balance: number;
  status: TransactionStatus;
  createdAt: Date;
}

// Message Types
export type MessageType = 'text' | 'image' | 'product';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  metadata?: {
    productId?: string;
    imageUrl?: string;
  };
  isRead: boolean;
  createdAt: Date;
}

// Notification Types
export type NotificationType = 'order' | 'product' | 'delivery' | 'payment';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedEntityId: string;
  isRead: boolean;
  createdAt: Date;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}
//Category Interface
export interface Category {
  id: number;
  name: string;
  tag: string;
  region: string;
  supplier: string;
  description: string;
  image: string;
}


//Service interface
export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}