import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { formatCurrency } from '../utils/helpers';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { userData } = useAuth();
  
  const [deliveryLocation, setDeliveryLocation] = useState(userData?.location || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = getCartTotal();
  const deliveryFee = 70000; // XAF
  const discount = 0;
  const grandTotal = subtotal + deliveryFee - discount;
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!userData || userData.userType !== 'buyer') {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!deliveryLocation.trim()) {
      alert('Please enter your delivery location');
      return;
    }

    setIsProcessing(true);

    try {
      // Group items by farmer
      const ordersByFarmer = cartItems.reduce((acc, item) => {
        if (!acc[item.farmerId]) {
          acc[item.farmerId] = {
            farmerId: item.farmerId,
            farmerName: item.farmerName,
            items: []
          };
        }
        acc[item.farmerId].items.push({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        });
        return acc;
      }, {} as Record<string, any>);

      // Create separate orders for each farmer
      const orderPromises = Object.values(ordersByFarmer).map(async (farmerOrder: any) => {
        const orderItems = farmerOrder.items;
        const orderTotal = orderItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

        const orderData = {
          // Buyer info
          buyerId: userData.uid,
          buyerName: `${userData.firstName} ${userData.lastName}`,
          buyerEmail: userData.email,
          
          // Farmer info
          farmerId: farmerOrder.farmerId,
          farmerName: farmerOrder.farmerName,
          
          // Order details
          items: orderItems,
          itemsCount: orderItems.reduce((sum: number, item: any) => sum + item.quantity, 0),
          
          // Pricing
          subtotal: orderTotal,
          deliveryFee: deliveryFee,
          discount: discount,
          totalAmount: orderTotal + deliveryFee - discount,
          
          // Delivery
          deliveryLocation: deliveryLocation,
          pickupLocation: userData.location || 'Bamenda, Cameroon',
          
          // Status
          status: 'pending',
          
          // Timestamps
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          orderDate: new Date().toISOString()
        };

        return addDoc(collection(db, 'orders'), orderData);
      });

      await Promise.all(orderPromises);

      console.log('✅ Orders created successfully');
      
      // Clear cart
      clearCart();
      
      // Show success message
      setShowSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/dashboard/buyer/orders');
      }, 3000);

    } catch (error: any) {
      console.error('❌ Error creating order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your order has been confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for shopping with Agromate! Here is a copy of your billing receipt kindly go through and modify delivery address.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Items in cart</span>
                <span className="font-medium">{itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Grand Total</span>
                <span className="font-bold text-[--color-primary]">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600 text-3xl mt-10">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Delivery Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Location */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Location</h2>
                
                <div className="mb-4 p-4 bg-[--color-primary]/10 rounded-lg flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[--color-primary] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">Current Location</p>
                    <p className="text-sm text-gray-600">{userData.location || 'Not set'}</p>
                  </div>
                </div>

                <Input
                  label="Delivery Address"
                  name="deliveryLocation"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Enter your delivery address"
                  leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can change your delivery location above
                </p>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items ({itemsCount})</h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center space-x-4 pb-3 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500">by {item.farmerName}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items in cart</span>
                    <span className="font-medium text-gray-900">{itemsCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium text-gray-900">{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">{formatCurrency(discount)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Grand Total</span>
                    <span className="text-2xl font-bold text-[--color-primary]">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-amber-400 hover:bg-amber-500 focus:ring-amber-300"
                  onClick={handlePlaceOrder}
                  loading={isProcessing}
                  disabled={isProcessing || !deliveryLocation.trim()}
                >
                  {isProcessing ? 'Processing...' : 'Make Payment'}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Delivery fees, taxes, and discounts will be calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;