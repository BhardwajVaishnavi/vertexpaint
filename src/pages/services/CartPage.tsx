import React from 'react';
import { Link } from 'react-router-dom';

const DEMO_CART = {
  items: [
    {
      id: 1,
      name: 'Royale Matt - Ivory White',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
      price: 2500,
      quantity: 2,
      coverage: '250-300 sq.ft/L'
    },
    {
      id: 2,
      name: 'Apex Ultima - Ocean Blue',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
      price: 3200,
      quantity: 1,
      coverage: '130-150 sq.ft/L'
    }
  ],
  summary: {
    subtotal: 8200,
    tax: 1476,
    shipping: 200,
    total: 9876
  }
};

const CartPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {DEMO_CART.items.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex gap-6">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <button className="text-gray-400 hover:text-red-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Coverage: {item.coverage}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">-</button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                        <div className="font-medium">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{DEMO_CART.summary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span>₹{DEMO_CART.summary.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{DEMO_CART.summary.shipping}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{DEMO_CART.summary.total}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg mt-6 hover:bg-primary-700">
                Proceed to Checkout
              </button>
              <Link 
                to="/products"
                className="block text-center text-primary-600 mt-4 text-sm hover:text-primary-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 