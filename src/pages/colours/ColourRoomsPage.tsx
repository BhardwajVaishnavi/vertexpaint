import React from 'react';
import { Link } from 'react-router-dom';

const ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    description: 'Create the perfect ambiance for your living space'
  },
  // Add more rooms
];

const ColourRoomsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Room Colours</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ROOMS.map(room => (
          <Link 
            key={room.id}
            to={`/colours/${room.id}`}
            className="group relative overflow-hidden rounded-lg aspect-video"
          >
            <img 
              src={room.image} 
              alt={room.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 p-6">
                <h2 className="text-white text-xl font-semibold">{room.name}</h2>
                <p className="text-white/80 text-sm">{room.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColourRoomsPage; 