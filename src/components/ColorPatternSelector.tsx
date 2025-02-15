import React from 'react';
import { colorPatterns } from '../data/colorPatterns';

interface ColorPatternSelectorProps {
  onSelectColor: (color: { name: string; hex: string }) => void;
  selectedPattern?: string;
}

const ColorPatternSelector = ({ onSelectColor, selectedPattern }: ColorPatternSelectorProps) => {
  return (
    <div className="space-y-8">
      {/* Monochromatic Schemes */}
      <section>
        <h3 className="text-lg font-medium mb-4">Monochromatic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colorPatterns.monochromatic.map(scheme => (
            <div key={scheme.base.name} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: scheme.base.hex }}
                />
                <span className="font-medium">{scheme.base.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {scheme.variations.map(color => (
                  <button
                    key={color.name}
                    onClick={() => onSelectColor(color)}
                    className="group relative"
                  >
                    <div 
                      className="w-full aspect-square rounded-md transition-transform group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Color Patterns */}
      <section>
        <h3 className="text-lg font-medium mb-4">Room Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colorPatterns.patterns.map(pattern => (
            <div key={pattern.name} className="p-4 border rounded-lg">
              <h4 className="font-medium mb-3">{pattern.name}</h4>
              <div className="flex gap-2 mb-3">
                {pattern.colors.map(color => (
                  <button
                    key={color.hex}
                    onClick={() => onSelectColor(color)}
                    className="group"
                    style={{ width: `${color.proportion * 100}%` }}
                  >
                    <div 
                      className="w-full h-12 rounded-md transition-transform group-hover:scale-y-110"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Recommended for: {pattern.recommended.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ColorPatternSelector; 