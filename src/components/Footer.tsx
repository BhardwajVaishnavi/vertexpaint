import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">
              Vertex Paints is India's leading paint company with a rich heritage of technology and innovation.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200"
              alt="Asian Paints"
              className="h-12"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/products/interior" className="hover:text-white">Interior Paints</Link></li>
              <li><Link to="/products/exterior" className="hover:text-white">Exterior Paints</Link></li>
              <li><Link to="/products/waterproofing" className="hover:text-white">Waterproofing</Link></li>
              <li><Link to="/products/wood-finishes" className="hover:text-white">Wood Finishes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services/safe-painting" className="hover:text-white">Safe Painting Service</Link></li>
              <li><Link to="/services/colour-consultancy" className="hover:text-white">Colour Consultancy</Link></li>
              <li><Link to="/services/dealer-locator" className="hover:text-white">Dealer Locator</Link></li>
              <li><Link to="/services/paint-calculator" className="hover:text-white">Paint Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Toll Free: 1800-209-5678</li>
              <li>Email: support@vertexpaint.com</li>
              <li className="pt-4">
                <div className="flex space-x-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400 text-sm">
          <div className="flex flex-wrap justify-between">
            <div className="space-x-4">
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-use" className="hover:text-white">Terms of Use</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
            <div>
              © {new Date().getFullYear()} Vertex Paints Ltd. All rights reserved by Wipster Technologies Private Limited
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 