import React from 'react';
import { Link } from 'react-router-dom';
import { colorInspirations } from '../../data/content';

const ColorInspiration = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Color Inspiration</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover trending color combinations and get inspired for your next home makeover
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colorInspirations.map(inspiration => (
            <div 
              key={inspiration.id}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/5]">
                <img 
                  src={inspiration.image}
                  alt={inspiration.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{inspiration.title}</h3>
                  <p className="text-white/80 mb-4">{inspiration.description}</p>
                  <Link 
                    to={`/inspiration/${inspiration.id}`}
                    className="inline-block bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Explore Colors
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/inspiration"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            View All Inspirations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ColorInspiration; 