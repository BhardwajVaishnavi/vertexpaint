import React, { useState } from 'react';
import { getColorRecommendations } from '../utils/colorRecommendation';

interface ColorRecommenderProps {
  onSelectColor: (color: { name: string; hex: string }) => void;
}

type RoomType = 'living' | 'bedroom' | 'kitchen' | 'bathroom';
type RoomSize = 'small' | 'medium' | 'large';
type LightLevel = 'low' | 'medium' | 'high';
type Direction = 'north' | 'south' | 'east' | 'west';

const ColorRecommender = ({ onSelectColor }: ColorRecommenderProps) => {
  const [roomFactors, setRoomFactors] = useState({
    type: 'living' as RoomType,
    size: 'medium' as RoomSize,
    naturalLight: 'medium' as LightLevel,
    direction: 'north' as Direction
  });

  const recommendations = getColorRecommendations(roomFactors);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Room Factors Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Room Type</label>
            <select
              value={roomFactors.type}
              onChange={(e) => setRoomFactors(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="living">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room Size</label>
            <select
              value={roomFactors.size}
              onChange={(e) => setRoomFactors(prev => ({ ...prev, size: e.target.value as any }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Natural Light</label>
            <select
              value={roomFactors.naturalLight}
              onChange={(e) => setRoomFactors(prev => ({ ...prev, naturalLight: e.target.value as any }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room Direction</label>
            <select
              value={roomFactors.direction}
              onChange={(e) => setRoomFactors(prev => ({ ...prev, direction: e.target.value as any }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-medium mb-4">Recommended Colors</h3>
          <div className="space-y-4">
            {recommendations.map(color => (
              <button
                key={color.hex}
                onClick={() => onSelectColor(color)}
                className="w-full p-4 border rounded-lg hover:border-primary-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-lg"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-left">
                    <div className="font-medium">{color.name}</div>
                    <div className="text-sm text-gray-600">{color.reason}</div>
                    <div className="text-sm text-gray-500">Match Score: {color.score}%</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorRecommender; 