import React from 'react';
import { Link } from 'react-router-dom';
import { FooterSection } from '../../types';

const Footer = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' },
        { text: 'Store Locator', path: '/stores' }
      ]
    },
    {
      title: 'Products',
      links: [
        { text: 'Interior Paints', path: '/products/interior' },
        { text: 'Exterior Paints', path: '/products/exterior' },
        { text: 'Wood Finishes', path: '/products/wood' },
        { text: 'Waterproofing', path: '/products/waterproofing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Painting Guides', path: '/guides' },
        { text: 'Color Ideas', path: '/colors' },
        { text: 'Blog', path: '/blog' },
        { text: 'FAQs', path: '/faqs' }
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Customer Service', path: '/support' },
        { text: 'Track Order', path: '/track-order' },
        { text: 'Return Policy', path: '/returns' },
        { text: 'Privacy Policy', path: '/privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white font-times">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white font-semibold mb-4">
              Subscribe to our newsletter
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <span className="sr-only">YouTube</span>
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 Asian Paints. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 