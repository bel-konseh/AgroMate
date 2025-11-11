import React, { useState } from 'react';
import { MapPin, Package, CheckCircle } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Button from '../../components/common/Button';
import { formatCurrency } from '../../utils/helpers';

interface Delivery {
  id: string;
  orderId: string;
  pickupLocation: string;
  deliveryLocation: string;
  productName: string;
  farmerName: string;
  customerName: string;
  deliveryFee: number;
  distance: string;
  status: 'available' | 'assigned' | 'picked_up' | 'delivered';
}

const DeliveryListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('available');

  // Mock deliveries data
  const deliveries: Delivery[] = [
    { 
      id: '1', 
      orderId: 'ORD-001',
      pickupLocation: 'Cani Junction, Bamenda',
      deliveryLocation: 'Ntarikon, Bamenda',
      productName: 'Huckleberry || Njama Njama',
      farmerName: 'John Farm',
      customerName: 'Mary Smith',
      deliveryFee: 500,
      distance: '3.2 km',
      status: 'available'
    },
    { 
      id: '2', 
      orderId: 'ORD-002',
      pickupLocation: 'Nkwen Market, Bamenda',
      deliveryLocation: 'Commercial Avenue',
      productName: 'Fresh Tomatoes',
      farmerName: 'Green Valley Farm',
      customerName: 'James Brown',
      deliveryFee: 300,
      distance: '1.8 km',
      status: 'available'
    },
    { 
      id: '3', 
      orderId: 'ORD-003',
      pickupLocation: 'Mile 4, Bamenda',
      deliveryLocation: 'Up Station',
      productName: 'Organic Carrots',
      farmerName: 'Sunrise Farm',
      customerName: 'Sarah Williams',
      deliveryFee: 400,
      distance: '2.5 km',
      status: 'assigned'
    },
    { 
      id: '4', 
      orderId: 'ORD-004',
      pickupLocation: 'Foncha Street',
      deliveryLocation: 'City Chemist',
      productName: 'Bell Peppers Mix',
      farmerName: 'John Farm',
      customerName: 'David Chen',
      deliveryFee: 350,
      distance: '1.2 km',
      status: 'picked_up'
    },
    { 
      id: '5', 
      orderId: 'ORD-005',
      pickupLocation: 'Nkwen',
      deliveryLocation: 'Bamendankwe',
      productName: 'Fresh Spinach',
      farmerName: 'Green Valley Farm',
      customerName: 'Alice Johnson',
      deliveryFee: 600,
      distance: '4.5 km',
      status: 'delivered'
    },
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'available') return delivery.status === 'available';
    if (activeTab === 'active') return delivery.status === 'assigned' || delivery.status === 'picked_up';
    if (activeTab === 'completed') return delivery.status === 'delivered';
    return true;
  });

  const tabs = [
    { id: 'available' as const, label: 'Available', count: deliveries.filter(d => d.status === 'available').length },
    { id: 'active' as const, label: 'Active', count: deliveries.filter(d => d.status === 'assigned' || d.status === 'picked_up').length },
    { id: 'completed' as const, label: 'Completed', count: deliveries.filter(d => d.status === 'delivered').length },
  ];

  const handleAcceptDelivery = (deliveryId: string) => {
    console.log('Accepting delivery:', deliveryId);
    // TODO: Implement accept delivery functionality
  };

  const handleMarkPickedUp = (deliveryId: string) => {
    console.log('Marking as picked up:', deliveryId);
    // TODO: Implement mark picked up functionality
  };

  const handleMarkDelivered = (deliveryId: string) => {
    console.log('Marking as delivered:', deliveryId);
    // TODO: Implement mark delivered functionality
  };

  return (
    <DashboardLayout userType="delivery">
      <div className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Deliveries</h1>
            
            {/* Tabs */}
            <div className="flex space-x-2 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[--color-primary] text-[--color-primary]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Deliveries List */}
          <div className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Section - Delivery Info */}
                  <div className="flex-1 space-y-3">
                    {/* Order ID and Product */}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{delivery.orderId}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{delivery.distance}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{delivery.productName}</h3>
                    </div>

                    {/* Pickup Location */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Package className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Pickup from</p>
                        <p className="text-sm font-medium text-gray-900">{delivery.farmerName}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {delivery.pickupLocation}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Location */}
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Deliver to</p>
                        <p className="text-sm font-medium text-gray-900">{delivery.customerName}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {delivery.deliveryLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Fee and Actions */}
                  <div className="flex flex-col items-end space-y-3">
                    {/* Delivery Fee */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Delivery Fee</p>
                      <p className="text-2xl font-bold text-[--color-primary]">
                        {formatCurrency(delivery.deliveryFee)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    {delivery.status === 'available' && (
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleAcceptDelivery(delivery.id)}
                      >
                        Accept Delivery
                      </Button>
                    )}

                    {delivery.status === 'assigned' && (
                      <Button
                        variant="accent"
                        size="md"
                        leftIcon={<Package className="h-4 w-4" />}
                        onClick={() => handleMarkPickedUp(delivery.id)}
                      >
                        Mark as Picked Up
                      </Button>
                    )}

                    {delivery.status === 'picked_up' && (
                      <Button
                        variant="primary"
                        size="md"
                        leftIcon={<CheckCircle className="h-4 w-4" />}
                        onClick={() => handleMarkDelivered(delivery.id)}
                      >
                        Mark as Delivered
                      </Button>
                    )}

                    {delivery.status === 'delivered' && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredDeliveries.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No {activeTab} deliveries</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryListPage;