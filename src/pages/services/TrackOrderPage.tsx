import React, { useState } from 'react';

const DEMO_ORDER = {
  orderId: 'AP123456789',
  status: 'In Progress',
  estimatedDelivery: '15th March 2024',
  items: [
    {
      name: 'Royale Matt - Ivory White',
      quantity: 2,
      status: 'Shipped',
      lastUpdate: '12th March 2024'
    },
    {
      name: 'Apex Ultima - Ocean Blue',
      quantity: 1,
      status: 'Processing',
      lastUpdate: '11th March 2024'
    }
  ],
  timeline: [
    {
      date: '11th March 2024',
      status: 'Order Placed',
      description: 'Your order has been confirmed'
    },
    {
      date: '12th March 2024',
      status: 'Processing',
      description: 'Order is being processed at our warehouse'
    }
  ]
};

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<typeof DEMO_ORDER | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder(DEMO_ORDER);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <div className="max-w-xl">
            <form onSubmit={handleTrack} className="flex gap-4">
              <input
                type="text"
                placeholder="Enter your order number"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
              >
                Track
              </button>
            </form>
          </div>
        </div>
      </div>

      {order && (
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Order #{order.orderId}</h2>
                <p className="text-gray-600">Estimated Delivery: {order.estimatedDelivery}</p>
              </div>
              <span className="px-4 py-2 bg-primary-50 text-primary-600 rounded-full">
                {order.status}
              </span>
            </div>

            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-t pt-4">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary-600">{item.status}</div>
                    <div className="text-sm text-gray-600">{item.lastUpdate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Order Timeline</h3>
            <div className="space-y-6">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-32 text-sm text-gray-600">{event.date}</div>
                  <div>
                    <div className="font-medium">{event.status}</div>
                    <div className="text-sm text-gray-600">{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage; 