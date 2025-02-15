import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Guide } from '../../types';

const GuideList = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    'Painting Basics',
    'Wall Preparation',
    'Color Selection',
    'Paint Application',
    'Maintenance'
  ];

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch(`/api/guides${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Painting Guides</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All Guides
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-primary-600 text-white' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            to={`/guides/${guide.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{guide.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{guide.category}</span>
                {guide.steps && (
                  <span className="text-sm text-primary-600">
                    {guide.steps.length} steps
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GuideList; 