import React, { useState } from 'react';
import { colorPalettes } from '../data/colors';

interface ColorSearchProps {
  onColorSelect: (color: any) => void;
}

const ColorSearch = ({ onColorSelect }: ColorSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const allColors = [
    ...colorPalettes.trending,
    ...Object.values(colorPalettes.themes).flat()
  ];

  const filteredColors = allColors.filter(color => {
    const matchesSearch = color.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = !selectedTheme || 
      Object.entries(colorPalettes.themes).some(([theme, colors]) => 
        theme === selectedTheme && colors.includes(color)
      );
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={selectedTheme || ''}
          onChange={(e) => setSelectedTheme(e.target.value || null)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Themes</option>
          {Object.keys(colorPalettes.themes).map(theme => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredColors.map(color => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color)}
            className="p-2 rounded-lg hover:ring-2 hover:ring-primary-600 transition-all"
          >
            <div 
              className="w-full aspect-square rounded-md mb-2"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-sm font-medium">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSearch; 