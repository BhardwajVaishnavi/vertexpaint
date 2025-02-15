import { useState, useEffect } from 'react';
import { Color } from '../../types';

const ColorExplorer = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const colorFamilies = [
    'Reds',
    'Blues',
    'Greens',
    'Yellows',
    'Neutrals',
    'Whites',
    'Greys'
  ];

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch('/api/colors');
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  const filteredColors = colors.filter((color) => {
    const matchesFamily = selectedFamily === 'all' || color.family === selectedFamily;
    const matchesSearch = color.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search colors..."
          className="w-full md:w-96 px-4 py-2 border rounded-lg mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-full ${
              selectedFamily === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedFamily('all')}
          >
            All Colors
          </button>
          {colorFamilies.map((family) => (
            <button
              key={family}
              className={`px-4 py-2 rounded-full ${
                selectedFamily === family ? 'bg-primary-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedFamily(family)}
            >
              {family}
            </button>
          ))}
        </div>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredColors.map((color) => (
          <div
            key={color.id}
            className="group cursor-pointer"
            onClick={() => window.location.href = `/colors/${color.id}`}
          >
            <div className="aspect-square rounded-lg shadow-md overflow-hidden">
              <div
                className="w-full h-3/4"
                style={{ backgroundColor: color.hex }}
              />
              <div className="p-2">
                <h3 className="font-medium text-sm">{color.name}</h3>
                <p className="text-xs text-gray-500">{color.hex}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorExplorer; 