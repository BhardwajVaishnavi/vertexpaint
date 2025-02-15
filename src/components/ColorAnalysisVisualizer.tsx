import React from 'react';
import { analyzeColor } from '../utils/colorAnalysis';

interface ColorAnalysisVisualizerProps {
  color: string;
}

const ColorAnalysisVisualizer = ({ color }: ColorAnalysisVisualizerProps) => {
  const analysis = analyzeColor(color);

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex items-center gap-4">
        <div 
          className="w-20 h-20 rounded-lg shadow-lg"
          style={{ backgroundColor: color }}
        />
        <div>
          <div className="font-medium">Selected Color</div>
          <div className="text-sm text-gray-600">{color.toUpperCase()}</div>
        </div>
      </div>

      {/* Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">Brightness</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full"
              style={{ width: `${(analysis.brightness / 255) * 100}%` }}
            />
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">Saturation</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full"
              style={{ width: `${analysis.saturation}%` }}
            />
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <div className="text-sm font-medium mb-2">Temperature</div>
          <div className="w-full bg-gradient-to-r from-blue-500 via-gray-300 to-red-500 rounded-full h-2">
            <div 
              className="w-2 h-4 bg-black rounded-full -mt-1 transform -translate-y-1/4"
              style={{ marginLeft: `${(analysis.temperature + 100) / 2}%` }}
            />
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="p-4 border rounded-lg">
        <div className="font-medium mb-2">Accessibility</div>
        <div className="flex items-center gap-2 mb-2">
          <div 
            className={`w-3 h-3 rounded-full ${
              analysis.accessibility.isAccessible ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span>WCAG Score: {analysis.accessibility.wcagScore}</span>
        </div>
        {analysis.accessibility.recommendations.map((rec, index) => (
          <div key={index} className="text-sm text-gray-600 ml-5">• {rec}</div>
        ))}
      </div>

      {/* Mood */}
      <div className="p-4 border rounded-lg">
        <div className="font-medium mb-2">Color Mood</div>
        <div className="flex flex-wrap gap-2">
          {analysis.mood.map(mood => (
            <span 
              key={mood}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm"
            >
              {mood}
            </span>
          ))}
        </div>
      </div>

      {/* Color Combinations */}
      <div className="space-y-4">
        <div className="font-medium">Color Combinations</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="text-sm">Complementary</div>
            <div 
              className="w-full aspect-square rounded-lg"
              style={{ backgroundColor: analysis.combinations.complementary }}
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm">Analogous</div>
            <div className="flex gap-2">
              {analysis.combinations.analogous.map((hex, index) => (
                <div 
                  key={index}
                  className="flex-1 aspect-square rounded-lg"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">Triadic</div>
            <div className="flex gap-2">
              {analysis.combinations.triadic.map((hex, index) => (
                <div 
                  key={index}
                  className="flex-1 aspect-square rounded-lg"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">Monochromatic</div>
            <div className="flex gap-2">
              {analysis.combinations.monochromatic.map((hex, index) => (
                <div 
                  key={index}
                  className="flex-1 aspect-square rounded-lg"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorAnalysisVisualizer; 