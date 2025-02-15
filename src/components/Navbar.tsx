import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MENU_DATA = {
  PAINTS: {
    title: 'PAINTS & TEXTURES',
    sections: [
      {
        title: 'INTERIOR PAINTS',
        items: [
          { name: 'Royale', link: '/products/interior/royale' },
          { name: 'Apcolite Premium', link: '/products/interior/apcolite-premium' },
          { name: 'Tractor Emulsion', link: '/products/interior/tractor-emulsion' },
          { name: 'View All', link: '/products/interior' }
        ]
      },
      {
        title: 'EXTERIOR PAINTS',
        items: [
          { name: 'Ultima Protek', link: '/products/exterior/ultima-protek' },
          { name: 'Apex Weatherproof', link: '/products/exterior/apex-weatherproof' },
          { name: 'ACE Exterior', link: '/products/exterior/ace-exterior' },
          { name: 'View All', link: '/products/exterior' }
        ]
      },
      {
        title: 'TEXTURES',
        items: [
          { name: 'Royale Play', link: '/textures/royale-play' },
          { name: 'Wall Designs', link: '/textures/wall-designs' },
          { name: 'View All', link: '/textures' }
        ]
      }
    ]
  },
  COLOURS: {
    title: 'COLOURS',
    sections: [
      {
        title: 'BY ROOM',
        items: [
          { name: 'Living Room', link: '/colours/living-room' },
          { name: 'Bedroom', link: '/colours/bedroom' },
          { name: 'Kitchen', link: '/colours/kitchen' },
          { name: 'View All Rooms', link: '/colours/rooms' }
        ]
      },
      {
        title: 'COLOUR COMBINATIONS',
        items: [
          { name: 'Interior Combinations', link: '/colours/interior-combinations' },
          { name: 'Exterior Combinations', link: '/colours/exterior-combinations' },
          { name: 'View All', link: '/colours/combinations' }
        ]
      }
    ]
  },
  SERVICES: {
    title: 'SERVICES',
    sections: [
      {
        title: 'PAINTING SERVICES',
        items: [
          { name: 'Safe Painting Service', link: '/services/safe-painting' },
          { name: 'Waterproofing Solutions', link: '/services/waterproofing' },
          { name: 'Book a Painter', link: '/services/book-painter' }
        ]
      },
      {
        title: 'CONSULTANCY',
        items: [
          { name: 'Colour Consultancy', link: '/services/colour-consultancy' },
          { name: 'Home Painting', link: '/services/home-painting' },
          { name: 'Find a Contractor', link: '/services/find-contractor' }
        ]
      }
    ]
  },
  COMPANY: {
    title: 'COMPANY',
    sections: [
      {
        title: 'ABOUT US',
        items: [
          { name: 'Our Story', link: '/about' },
          { name: 'Blog', link: '/blog' },
          { name: 'Contact Us', link: '/contact' }
        ]
      }
    ]
  }
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm relative z-50 font-times">
      {/* Top Bar */}
      <div className="bg-blue-400">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            <div className="text-sm-bold text-blue-900 font-times">Welcome to Vertex Paints</div>
            <div className="flex items-center space-x-4 text-sm">
              {/* <Link to="/track-order" className="text-gray-600 hover:text-primary-600">Track Order</Link>
              <Link to="/login" className="text-gray-600 hover:text-primary-600">Login</Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Updated with animations */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="https://vertexpaint.in/img/logo.png"
                alt="Vertex Paints"
                className="h-12"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            {/* Desktop Menu - Updated with animations and width */}
            <nav className="hidden lg:flex items-center space-x-8">
              {Object.entries(MENU_DATA).map(([key, data]) => (
                <div 
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="py-8 font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 font-times">
                    {data.title}
                    <div className="absolute bottom-6 left-0 w-full h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </button>
                  
                  {activeMenu === key && (
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg border-t min-w-[600px] animate-fadeIn"
                      style={{
                        maxWidth: 'calc(100vw - 2rem)',
                        animation: 'fadeIn 0.2s ease-out'
                      }}
                    >
                      <div className="p-8">
                        <div className="grid grid-cols-3 gap-8">
                          {data.sections.map((section, idx) => (
                            <div key={idx} className="min-w-[200px]">
                              <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wider font-times">
                                {section.title}
                              </h3>
                              <ul className="space-y-2">
                                {section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link 
                                      to={item.link}
                                      className="text-gray-600 hover:text-primary-600 transition-colors duration-200 block py-1 font-times"
                                      onClick={() => setActiveMenu(null)}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg font-times">
                <div className="container mx-auto px-4 py-4">
                  {Object.entries(MENU_DATA).map(([key, data]) => (
                    <div key={key} className="mb-6">
                      <h2 className="font-bold text-gray-900 mb-4">{data.title}</h2>
                      {data.sections.map((section, idx) => (
                        <div key={idx} className="mb-4">
                          <h3 className="text-sm font-medium text-gray-600 mb-2">{section.title}</h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link 
                                  to={item.link}
                                  className="text-gray-600 hover:text-primary-600 block py-1 font-times"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link to="/cart" className="p-2 text-gray-600 hover:text-primary-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Add these styles to your global CSS or tailwind.config.js
const styles = {
  '.animate-fadeIn': {
    '@keyframes fadeIn': {
      '0%': {
        opacity: '0',
        transform: 'translateY(-10px) translateX(-50%)'
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0) translateX(-50%)'
      }
    }
  }
};

export default Navbar; 