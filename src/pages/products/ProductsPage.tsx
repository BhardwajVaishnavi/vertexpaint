import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../../data/products';
import PageWrapper from '../../components/layout/PageWrapper';

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'interior', name: 'Interior Paints' },
  { id: 'exterior', name: 'Exterior Paints' },
  { id: 'waterproofing', name: 'Waterproofing' },
  { id: 'wood-finishes', name: 'Wood Finishes' }
];

const ProductsPage = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg opacity-90">Discover our range of high-quality paints and finishes</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 space-x-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Link 
              to={`/products/detail/${product.id}`}
              key={product.id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="aspect-square relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-6 border-t">
                <h2 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-medium">₹{product.price}</span>
                  <span className="text-sm text-gray-500">{product.specifications.coverage}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Guide */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How to Choose the Right Paint</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Identify Your Space</h3>
              <p className="text-gray-600">Interior or exterior? Wall or wood?</p>
            </div>
            {/* Add more steps */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductsPage; 