import React, { useState } from 'react';
import { SavedDesign } from '../types/design';
import { designStorage } from '../services/designStorage';
import DesignShare from './DesignShare';

interface DesignGalleryProps {
  onSelectDesign: (design: SavedDesign) => void;
}

const DesignGallery = ({ onSelectDesign }: DesignGalleryProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [searchTerm, setSearchTerm] = useState('');

  const designs = designStorage.getAllDesigns();

  const filteredAndSortedDesigns = designs
    .filter(design => {
      if (filter !== 'all' && design.roomType !== filter) return false;
      if (searchTerm && !design.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.name.localeCompare(b.name);
    });

  const roomTypes = Array.from(new Set(designs.map(d => d.roomType)));

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search designs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Rooms</option>
          {roomTypes.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="date">Latest First</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedDesigns.map(design => (
          <div 
            key={design.id}
            className="border rounded-lg overflow-hidden hover:border-primary-600 transition-all"
          >
            <div className="aspect-video relative">
              <img 
                src={design.preview}
                alt={design.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium">{design.name}</h3>
                <p className="text-white/80 text-sm">
                  {new Date(design.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  {design.roomType.charAt(0).toUpperCase() + design.roomType.slice(1)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectDesign(design)}
                    className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    Load
                  </button>
                  <DesignShare design={design} />
                </div>
              </div>
              <div className="flex gap-2">
                {Object.values(design.walls).map((wall, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: wall.color.hex }}
                    title={wall.color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedDesigns.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No designs found. Start creating your first design!
        </div>
      )}
    </div>
  );
};

export default DesignGallery; 