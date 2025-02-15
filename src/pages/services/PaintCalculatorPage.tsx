import React from 'react';
import PaintCalculator from '../../components/home/PaintCalculator';

const PaintCalculatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Paint Calculator</h1>
      <PaintCalculator />
    </div>
  );
};

export default PaintCalculatorPage; 