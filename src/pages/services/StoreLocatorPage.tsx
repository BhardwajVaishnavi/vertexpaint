import React, { useState } from 'react';

const DEMO_STORES = [
  {
    id: 1,
    name: 'Asian Paints Colour Store',
    address: '123 Main Street, Mumbai',
    phone: '+91 98765 43210',
    timing: '9:00 AM - 8:00 PM',
    type: 'Colour Store',
    distance: '1.2 km'
  },
  {
    id: 2,
    name: 'AP Beautiful Homes',
    address: '456 Park Avenue, Mumbai',
    phone: '+91 98765 43211',
    timing: '10:00 AM - 7:00 PM',
    type: 'Beautiful Homes',
    distance: '2.5 km'
  }
];

const StoreLocatorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stores] = useState(DEMO_STORES);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find a Store</h1>
          <div className="max-w-xl">
            <input
              type="text"
              placeholder="Enter your location or pincode"
              className="w-full px-4 py-3 rounded-lg text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map(store => (
            <div key={store.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
                  <p className="text-gray-600 mb-4">{store.address}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Phone:</span> {store.phone}</p>
                    <p><span className="text-gray-500">Timing:</span> {store.timing}</p>
                    <p><span className="text-gray-500">Type:</span> {store.type}</p>
                  </div>
                </div>
                <span className="text-primary-600 font-medium">{store.distance}</span>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Get Directions
                </button>
                <button className="flex-1 border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50">
                  Call Store
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLocatorPage; 