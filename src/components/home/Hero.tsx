import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative">
      {/* Main Hero Slider */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1560448075-bb485b067938?w=1600"
          alt="Beautiful Homes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-5xl font-bold mb-4">
                Transform Your Home
              </h1>
              <p className="text-xl mb-8">
                Discover endless possibilities with Asian Paints' range of interior and exterior paints
              </p>
              <Link 
                to="/visualizer"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Try Color Visualizer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-8">
            <QuickLink 
              icon="https://www.asianpaints.com/content/dam/asian_paints/homepage/icons/paint-finder.svg"
              title="Paint Finder"
              description="Find the perfect paint for your space"
            />
            <QuickLink 
              icon="https://www.asianpaints.com/content/dam/asian_paints/homepage/icons/contractor.svg"
              title="Find a Contractor"
              description="Connect with painting professionals"
            />
            <QuickLink 
              icon="https://www.asianpaints.com/content/dam/asian_paints/homepage/icons/colour-catalogue.svg"
              title="Colour Catalogue"
              description="Explore our colour collections"
            />
            <QuickLink 
              icon="https://www.asianpaints.com/content/dam/asian_paints/homepage/icons/store-locator.svg"
              title="Store Locator"
              description="Find a store near you"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickLink = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
    <img src={icon} alt={title} className="w-12 h-12" />
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Hero; 