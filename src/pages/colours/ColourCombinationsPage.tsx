import React, { useState, useMemo } from 'react';

const COLOUR_COMBINATIONS = [
  {
    id: 'modern-classic',
    name: 'Modern Classic',
    description: 'Contemporary elegance with timeless appeal',
    colors: [
      { name: 'Ivory White', hex: '#F5F5DC', code: 'AP-101' },
      { name: 'Sage Green', hex: '#9CAF88', code: 'AP-234' },
      { name: 'Warm Grey', hex: '#808080', code: 'AP-567' }
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    tags: ['modern', 'neutral', 'living room']
  },
  {
    id: 'coastal-breeze',
    name: 'Coastal Breeze',
    description: 'Fresh and airy palette inspired by the seaside',
    colors: [
      { name: 'Ocean Blue', hex: '#4F84C4', code: 'AP-789' },
      { name: 'Sandy Beige', hex: '#D8C3A5', code: 'AP-345' },
      { name: 'White Cap', hex: '#E8EBE4', code: 'AP-901' }
    ],
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800',
    tags: ['coastal', 'fresh', 'bedroom']
  }
];

const FILTERS = {
  style: ['modern', 'coastal', 'traditional', 'contemporary'],
  room: ['living room', 'bedroom', 'kitchen', 'bathroom']
};

const ColourCombinationsPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Filter combinations based on active filters
  const filteredCombinations = useMemo(() => {
    if (activeFilters.length === 0) return COLOUR_COMBINATIONS;
    
    return COLOUR_COMBINATIONS.filter(combo => 
      activeFilters.some(filter => combo.tags.includes(filter))
    );
  }, [activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Colour Combinations</h1>
          <p className="text-lg opacity-90">
            {activeFilters.length > 0 
              ? `Showing ${filteredCombinations.length} combinations`
              : 'Discover perfectly matched colour schemes for your home'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter By:</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(FILTERS).map(([category, options]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {options.map(option => (
                    <button
                      key={option}
                      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                        activeFilters.includes(option)
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleFilter(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCombinations.length > 0 ? (
            filteredCombinations.map(combo => (
              <div key={combo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={combo.image} 
                  alt={combo.name}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{combo.name}</h2>
                  <p className="text-gray-600 mb-4">{combo.description}</p>
                  
                  <div className="flex gap-4 mb-4">
                    {combo.colors.map(color => (
                      <div key={color.code} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-lg shadow-sm mb-2"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-sm font-medium">{color.name}</div>
                        <div className="text-xs text-gray-500">{color.code}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {combo.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No combinations found with the selected filters.
              </p>
              <button
                className="mt-4 text-primary-600 hover:text-primary-700"
                onClick={() => setActiveFilters([])}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColourCombinationsPage; 