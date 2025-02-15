import React from 'react';
import { Color } from '../types';

interface ColorCombination {
  name: string;
  colors: Color[];
  roomImages?: string | string[];  // Made roomImages optional
}

interface ColorCombinationsProps {
  selectedColor: Color;
  onColorSelect: (color: Color) => void;
}

const ColorCombinations = ({ selectedColor, onColorSelect }: ColorCombinationsProps) => {
  const getComplementaryColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `#${(255 - r).toString(16).padStart(2, '0')}${
      (255 - g).toString(16).padStart(2, '0')}${
      (255 - b).toString(16).padStart(2, '0')}`;
  };

  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Convert hex to RGB
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;

    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    if (delta === 0) {
      h = 0;
    } else if (cmax === r) {
      h = ((g - b) / delta) % 6;
    } else if (cmax === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Convert to percentages
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  };

  const hslToHex = ({ h, s, l }: { h: number; s: number; l: number }): string => {
    // Convert saturation and lightness to decimals
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    // Convert to hex
    const toHex = (n: number): string => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const getAnalogousColors = (hex: string): string[] => {
    const hsl = hexToHSL(hex);
    return [
      hslToHex({ ...hsl, h: (hsl.h + 30) % 360 }),
      hslToHex({ ...hsl, h: (hsl.h - 30 + 360) % 360 })
    ];
  };

  const combinations: ColorCombination[] = [
    {
      name: 'Complementary',
      colors: [
        selectedColor,
        { ...selectedColor, hex: getComplementaryColor(selectedColor.hex) }
      ],
      roomImages: selectedColor.roomImages || undefined
    },
    {
      name: 'Analogous',
      colors: [
        selectedColor,
        ...getAnalogousColors(selectedColor.hex).map(hex => ({
          ...selectedColor,
          hex,
          name: `Analogous ${hex}`
        }))
      ],
      roomImages: selectedColor.roomImages || undefined
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Color Combinations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combinations.map(combo => (
          <div key={combo.name} className="border rounded-lg p-4">
            <h4 className="text-lg font-medium mb-4">{combo.name}</h4>
            <div className="flex gap-4 mb-4">
              {combo.colors.map(color => (
                <button
                  key={color.hex}
                  onClick={() => onColorSelect(color)}
                  className="group relative"
                >
                  <div 
                    className="w-16 h-16 rounded-full transition-transform group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
            {combo.roomImages && (
              <div className="mt-4">
                <img 
                  src={Array.isArray(combo.roomImages) ? combo.roomImages[0] : combo.roomImages}
                  alt={`Room with ${combo.name} colors`}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorCombinations;