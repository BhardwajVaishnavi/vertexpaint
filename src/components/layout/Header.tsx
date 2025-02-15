import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      title: 'Paints & Colours',
      subItems: [
        { title: 'Explore Colours', path: '/explore-colours' },
        { title: 'Paint Products', path: '/paint-products' },
        { title: 'Resources', path: '/resources' },
      ]
    },
    {
      title: 'Services',
      subItems: [
        { title: 'Painting Services', path: '/painting-services' },
        { title: 'Interior Design', path: '/interior-design' },
      ]
    },
    // Add other menu items
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <button className="py-2 hover:text-primary-600">
                  {item.title}
                </button>
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            {/* Add hamburger icon */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          {menuItems.map((item) => (
            <div key={item.title} className="px-4 py-2">
              <div className="font-medium">{item.title}</div>
              <div className="ml-4">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="block py-2"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header; 