import React, { useState } from 'react';
import { textures, Texture, TextureType } from '../data/textures';

interface TextureSelectorProps {
  onSelectTexture: (texture: Texture) => void;
  selectedColor: string;
}

const TextureSelector = ({ onSelectTexture, selectedColor }: TextureSelectorProps) => {
  const [selectedType, setSelectedType] = useState<Texture['type'] | 'all'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const filteredTextures = selectedType === 'all' 
    ? textures 
    : textures.filter(t => t.type === selectedType);

  const textureTypes: { value: TextureType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'smooth', label: 'Smooth' },
    { value: 'matte', label: 'Matte' },
    { value: 'glossy', label: 'Glossy' },
    { value: 'textured', label: 'Textured' }
  ];

  return (
    <div className="space-y-6">
      {/* Texture Type Filter */}
      <div className="flex gap-2">
        {textureTypes.map(type => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value as Texture['type'] | 'all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedType === type.value 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Texture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTextures.map(texture => (
          <div 
            key={texture.id}
            className="border rounded-lg overflow-hidden hover:border-primary-600 transition-all"
          >
            <div className="relative aspect-video">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{ 
                  backgroundImage: `url(${texture.image})`,
                  backgroundColor: selectedColor,
                  backgroundBlendMode: 'multiply'
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{texture.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{texture.description}</p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => onSelectTexture(texture)}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowDetails(showDetails === texture.id ? null : texture.id)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Details
                </button>
              </div>

              {/* Expanded Details */}
              {showDetails === texture.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Durability</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${texture.properties.durability}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Washability</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${texture.properties.washability}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Coverage</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${texture.properties.coverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Recommended for:</div>
                    <div className="flex flex-wrap gap-2">
                      {texture.recommendedRooms?.map((room: string) => (
                        <span
                          key={room}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureSelector; 