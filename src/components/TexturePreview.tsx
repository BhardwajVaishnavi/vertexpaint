import React, { useState } from 'react';
import { Texture } from '../data/textures';

interface TexturePreviewProps {
  color: string;
  texture: Texture;
  onTextureStrengthChange?: (strength: number) => void;
}

const TexturePreview = ({ color, texture, onTextureStrengthChange }: TexturePreviewProps) => {
  const [strength, setStrength] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleStrengthChange = (newStrength: number) => {
    setStrength(newStrength);
    onTextureStrengthChange?.(newStrength);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        {/* Base Color */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: color }}
        />
        
        {/* Texture Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${texture.image})`,
            opacity: strength / 100,
            mixBlendMode: 'multiply'
          }}
          onError={(e) => {
            const target = e.target as HTMLDivElement;
            target.style.backgroundImage = 'url(https://www.asianpaints.com/content/dam/asian_paints/products/wallcoverings/royale-play-special-effects.jpg)';
          }}
        />

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Preload Image */}
        <img 
          src={texture.image}
          alt=""
          className="hidden"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Texture Controls */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Texture Strength</span>
          <span>{strength}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={strength}
          onChange={(e) => handleStrengthChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Texture Info */}
      <div className="p-4 border rounded-lg space-y-2">
        <div className="font-medium">{texture.name}</div>
        <p className="text-sm text-gray-600">{texture.description}</p>
        
        {/* Properties */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div>
            <div className="text-xs text-gray-500 mb-1">Durability</div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary-600 h-1 rounded-full"
                style={{ width: `${texture.properties.durability}%` }}
              />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Washability</div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary-600 h-1 rounded-full"
                style={{ width: `${texture.properties.washability}%` }}
              />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Coverage</div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-primary-600 h-1 rounded-full"
                style={{ width: `${texture.properties.coverage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TexturePreview; 