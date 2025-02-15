import React from 'react';
import { textures } from '../../data/textures';

const TexturesPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Wall Textures</h1>
          <p className="text-lg opacity-90">Add depth and character to your walls</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {textures.map(texture => (
            <div key={texture.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-video">
                <img 
                  src={texture.image} 
                  alt={texture.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{texture.name}</h2>
                <p className="text-gray-600 mb-4">{texture.description}</p>
                <div className="flex space-x-4">
                  {Object.entries(texture.properties).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="text-gray-500 capitalize">{key}:</span>
                      <span className="ml-1 font-medium">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TexturesPage; 