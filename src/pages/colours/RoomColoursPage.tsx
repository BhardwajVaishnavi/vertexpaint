import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';

const ROOM_COLOURS = {
  'living-room': {
    title: 'Living Room Colours',
    description: 'Create a welcoming space with these curated colour combinations',
    combinations: [
      {
        id: 'lr-1',
        name: 'Modern Elegance',
        primary: '#E8D5C4',
        secondary: '#7C6A5D',
        accent: '#3F2E25',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
      },
      // Add more combinations
    ]
  },
  'bedroom': {
    title: 'Bedroom Colours',
    description: 'Relaxing colour schemes for your personal sanctuary',
    combinations: [
      {
        id: 'br-1',
        name: 'Serene Haven',
        primary: '#D8E2DC',
        secondary: '#9DB4C0',
        accent: '#5C6B73',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'
      }
    ]
  }
};

const RoomColoursPage = () => {
  const { room } = useParams<{ room: string }>();
  const roomData = room && ROOM_COLOURS[room as keyof typeof ROOM_COLOURS];

  if (!roomData) return <div>Room not found</div>;

  return (
    <PageWrapper>
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{roomData.title}</h1>
          <p className="text-lg opacity-90">{roomData.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomData.combinations.map(combo => (
            <div key={combo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={combo.image} 
                alt={combo.name}
                className="w-full aspect-video object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{combo.name}</h2>
                <div className="flex space-x-4">
                  {[combo.primary, combo.secondary, combo.accent].map((color, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-lg shadow-sm mb-2"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-600">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default RoomColoursPage; 