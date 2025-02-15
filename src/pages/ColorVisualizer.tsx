import React from 'react';
import ColorVisualizer from '../components/ColorVisualizer';
import { colorPalettes } from '../data/colors';

const ColorVisualizerPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Color Visualizer</h1>
      <ColorVisualizer colors={colorPalettes.trending} />
    </div>
  );
};

export default ColorVisualizerPage; 