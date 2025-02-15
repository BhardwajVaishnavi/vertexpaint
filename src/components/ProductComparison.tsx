import React from 'react';
import { products } from '../data/products';

interface ComparisonFeature {
  label: string;
  key: keyof typeof products[0]['specifications'] | keyof typeof products[0];
}

const COMPARISON_FEATURES: ComparisonFeature[] = [
  { label: 'Price', key: 'price' },
  { label: 'Category', key: 'category' },
  { label: 'Coverage', key: 'coverage' },
  { label: 'Drying Time', key: 'dryingTime' },
  { label: 'Recoating Time', key: 'recoating' }
];

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = React.useState<string[]>([]);

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length < 3) {
        return [...prev, productId];
      }
      return prev;
    });
  };

  const comparedProducts = products.filter(p => selectedProducts.includes(p.id));

  const formatValue = (value: any) => {
    if (value === undefined) return '';
    if (typeof value === 'number') {
      return `₹${value}`;
    }
    return value.toString();
  };

  const getFeatureValue = (product: typeof products[0], feature: ComparisonFeature): string => {
    if (feature.key in product.specifications) {
      return product.specifications[feature.key as keyof typeof product.specifications].toString();
    }
    const value = product[feature.key as keyof typeof product];
    return formatValue(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => handleProductToggle(product.id)}
            className={`p-4 border rounded-lg transition-all ${
              selectedProducts.includes(product.id) 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-24 h-24 object-contain mb-2"
            />
            <span className="text-sm font-medium">{product.name}</span>
          </button>
        ))}
      </div>

      {comparedProducts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {COMPARISON_FEATURES.map(feature => (
                <tr key={feature.key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {feature.label}
                  </td>
                  {comparedProducts.map(product => (
                    <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getFeatureValue(product, feature)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Features
                </td>
                {comparedProducts.map(product => (
                  <td key={product.id} className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {product.features?.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductComparison; 