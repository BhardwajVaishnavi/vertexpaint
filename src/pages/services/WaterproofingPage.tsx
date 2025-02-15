import React from 'react';

const WATERPROOFING_SOLUTIONS = [
  {
    id: 'smartcare-damp-proof',
    name: 'SmartCare Damp Proof',
    description: 'Advanced waterproofing solution for interior & exterior walls',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
    features: [
      'Long-lasting protection',
      'Prevents dampness',
      'Anti-algal properties',
      'Easy application'
    ],
    price: 2200
  },
  {
    id: 'ultima-waterproof',
    name: 'Ultima Waterproof & Cool',
    description: 'Heat-reflective waterproofing coating for roofs',
    image: 'https://images.unsplash.com/photo-1632755561715-699c126f5d0d?w=800',
    features: [
      'Reduces indoor temperature',
      'Crack-bridging properties',
      '7 years warranty',
      'UV resistant'
    ],
    price: 3500
  }
];

const WaterproofingPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Waterproofing Solutions</h1>
          <p className="text-lg opacity-90">Protect your home from water damage</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WATERPROOFING_SOLUTIONS.map(solution => (
            <div key={solution.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-video">
                <img 
                  src={solution.image} 
                  alt={solution.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{solution.name}</h2>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Key Features:</h3>
                  <ul className="space-y-2">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{solution.price}
                  </span>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterproofingPage; 