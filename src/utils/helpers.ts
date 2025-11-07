import { CURRENCY } from './constants';
import type  { OrderStatus } from '../types';

// Format currency
export const formatCurrency = (amount: number): string => {
  // Added options for better formatting consistency (e.g., "1,000.00 XAF")
  return `${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0, // Ensure at least 0 decimal places
    maximumFractionDigits: 2 // Max 2 decimal places
  })} ${CURRENCY}`;
};

// Format date
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time
export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date and time
export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Calculate time ago (IMPROVED: Added singular/plural logic)
export const timeAgo = (date: Date | string): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ];

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.seconds);
    if (value >= 1) {
      const label = value === 1 ? interval.label : `${interval.label}s`;
      return `${value} ${label} ago`;
    }
  }
  
  const value = Math.floor(seconds);
  const label = value === 1 ? 'second' : 'seconds';
  return `${value} ${label} ago`;
};

// Truncate text
export const truncateText = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Generate unique ID (NOTE: Keep in mind limitations of Math.random for security/collisions)
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Calculate cart total
interface CartItem {
  price: number;
  quantity: number;
}

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Get status badge color
export const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: 'badge-pending',
    confirmed: 'badge-info',
    preparing: 'badge-info',
    delivering: 'badge-info',
    delivered: 'badge-success',
    cancelled: 'badge-cancelled'
  };
  return colors[status] || 'badge-info';
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone
export const isValidPhone = (phone: string): boolean => {
  const re = /^\+?[\d\s-()]+$/;
  return re.test(phone);
};

// Format phone number (NOTE: This is US/10-digit specific)
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Check if object is empty
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};