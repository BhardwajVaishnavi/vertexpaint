import React from 'react';
import { useParams } from 'react-router-dom';
import { textures } from '../../data/textures';

const TextureDetail = () => {
  const { id } = useParams<{ id: string }>();
  const texture = textures.find(t => t.id === id);

  if (!texture) {
    return <div>Texture not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img 
            src={texture.image} 
            alt={texture.name} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{texture.name}</h1>
          <p className="text-gray-600 mb-8">{texture.description}</p>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Properties</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(texture.properties).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-500 capitalize mb-1">{key}</div>
                    <div className="font-medium">{value}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Recommended Rooms</h2>
              <div className="flex flex-wrap gap-2">
                {texture.recommendedRooms.map(room => (
                  <span 
                    key={room}
                    className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                  >
                    {room}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextureDetail; 