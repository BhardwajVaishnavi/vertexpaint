import React, { useState } from 'react';

const PAINTER_TYPES = [
  {
    id: 'interior',
    name: 'Interior Painter',
    description: 'Expert in interior wall painting and textures',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800',
    rate: '₹500/day'
  },
  {
    id: 'exterior',
    name: 'Exterior Painter',
    description: 'Specialized in exterior and weatherproof coatings',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    rate: '₹600/day'
  },
  {
    id: 'texture',
    name: 'Texture Specialist',
    description: 'Master of decorative finishes and textures',
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800',
    rate: '₹800/day'
  }
];

const BookPainterPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    startDate: '',
    area: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ type: selectedType, ...formData });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Book a Painter</h1>
          <p className="text-lg opacity-90">Professional painters at your service</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {PAINTER_TYPES.map(type => (
            <div 
              key={type.id}
              className={`bg-white rounded-lg p-6 cursor-pointer transition-all ${
                selectedType === type.id 
                  ? 'ring-2 ring-primary-600 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <img 
                src={type.image} 
                alt={type.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <div className="text-primary-600 font-medium">{type.rate}</div>
            </div>
          ))}
        </div>

        {selectedType && (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Book Your Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              {/* Add more form fields */}
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Book Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookPainterPage; 