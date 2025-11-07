import type { UserType, OrderStatus, TransactionType, MessageType, NotificationType } from '../types';

// User Types
export const USER_TYPES: Record<string, UserType> = {
  FARMER: 'farmer',
  BUYER: 'buyer',
  SELLER: 'seller',
  DELIVERY: 'delivery'
};

// Order Status
export const ORDER_STATUS: Record<string, OrderStatus> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  DELIVERING: 'delivering',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Product Categories
export const PRODUCT_CATEGORIES = {
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  GRAINS: 'grains',
  HERBS: 'herbs',
  DAIRY: 'dairy',
  OTHERS: 'others'
} as const;

// Transaction Types
export const TRANSACTION_TYPES: Record<string, TransactionType> = {
  CREDIT: 'credit',
  DEBIT: 'debit'
};

// Message Types
export const MESSAGE_TYPES: Record<string, MessageType> = {
  TEXT: 'text',
  IMAGE: 'image',
  PRODUCT: 'product'
};

// Notification Types
export const NOTIFICATION_TYPES: Record<string, NotificationType> = {
  ORDER: 'order',
  PRODUCT: 'product',
  DELIVERY: 'delivery',
  PAYMENT: 'payment'
};

// Currency
export const CURRENCY = 'XAF';

// Navigation Links
interface NavLink {
  name: string;
  path: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact Us', path: '/contact' }
];

// Dashboard Navigation
interface DashboardNavItem {
  name: string;
  path: string;
  icon: string;
}

export const FARMER_NAV: DashboardNavItem[] = [
  { name: 'Home', path: '/dashboard', icon: 'Home' },
  { name: 'Orders', path: '/dashboard/orders', icon: 'ShoppingBag' },
  { name: 'Messages', path: '/dashboard/messages', icon: 'MessageSquare' },
  { name: 'Wallet', path: '/dashboard/wallet', icon: 'Wallet' },
  { name: 'Notifications', path: '/dashboard/notifications', icon: 'Bell' },
  { name: 'Settings', path: '/dashboard/settings', icon: 'Settings' }
];

export const BUYER_NAV: DashboardNavItem[] = [
  { name: 'Home', path: '/dashboard', icon: 'Home' },
  { name: 'Orders', path: '/dashboard/orders', icon: 'ShoppingBag' },
  { name: 'Messages', path: '/dashboard/messages', icon: 'MessageSquare' },
  { name: 'Notifications', path: '/dashboard/notifications', icon: 'Bell' }
];

export const DELIVERY_NAV: DashboardNavItem[] = [
  { name: 'Home', path: '/dashboard', icon: 'Home' },
  { name: 'Orders', path: '/dashboard/orders', icon: 'ShoppingBag' },
  { name: 'Messages', path: '/dashboard/messages', icon: 'MessageSquare' },
  { name: 'Wallet', path: '/dashboard/wallet', icon: 'Wallet' },
  { name: 'Notifications', path: '/dashboard/notifications', icon: 'Bell' }
];