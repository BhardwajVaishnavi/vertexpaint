import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductComparison from '../../components/ProductComparison';
import ColorVisualizer from '../../components/ColorVisualizer';
import { colorPalettes } from '../../data/colors';

const ROOM_IMAGES = {
  livingRoom: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
  kitchen: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800"
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [showComparison, setShowComparison] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full max-w-md mx-auto"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <span className="text-2xl font-bold">₹{product.price}</span>
          </div>
          <button
            onClick={() => setShowComparison(prev => !prev)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {showComparison ? 'Hide Comparison' : 'Compare Products'}
          </button>
        </div>
      </div>

      {/* Product Comparison */}
      {showComparison && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Compare Products</h2>
          <ProductComparison />
        </div>
      )}

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.features?.map(feature => (
            <li 
              key={feature}
              className="bg-gray-50 p-4 rounded-lg"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Specifications */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <dt className="font-medium text-gray-600">{key}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Color Visualizer */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Visualize Colors</h2>
        <ColorVisualizer colors={colorPalettes.trending} />
      </div>
    </div>
  );
};

export default ProductDetail; 