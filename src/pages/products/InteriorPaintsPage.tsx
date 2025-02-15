import React from 'react';
import { products } from '../../data/products';

const InteriorPaintsPage = () => {
  const interiorPaints = products.filter(p => p.category === 'interior');

  return (
    <div className="bg-gray-50">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Interior Paints</h1>
          <p className="text-lg opacity-90">Transform your indoor spaces with our premium interior paints</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {interiorPaints.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-6">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="text-primary-600 font-medium">₹{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteriorPaintsPage; 