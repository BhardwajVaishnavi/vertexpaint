import React, { useState } from 'react';
import { Color } from '../types/color';
import { Texture } from '../data/textures';

interface Wall {
  id: string;
  name: string;
  color: Color;
  texture?: Texture;
  area: string; // CSS clip-path value
}

type AmbientLightType = 'natural' | 'warm' | 'cool';
type TimeOfDayType = 'morning' | 'afternoon' | 'evening';

interface RoomSceneCustomizerProps {
  initialColor: Color;
  onUpdate?: (settings: RoomSceneSettings) => void;
}

interface RoomSceneSettings {
  walls: Wall[];
  lighting: {
    brightness: number;
    temperature: number;
    ambientLight: AmbientLightType;
  };
  time: TimeOfDayType;
}

const defaultWalls: Wall[] = [
  {
    id: 'main',
    name: 'Main Wall',
    color: { name: 'White', hex: '#FFFFFF', image: '' },
    area: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)'
  },
  {
    id: 'left',
    name: 'Left Wall',
    color: { name: 'White', hex: '#FFFFFF', image: '' },
    area: 'polygon(0% 0%, 20% 20%, 20% 80%, 0% 100%)'
  },
  {
    id: 'right',
    name: 'Right Wall',
    color: { name: 'White', hex: '#FFFFFF', image: '' },
    area: 'polygon(80% 20%, 100% 0%, 100% 100%, 80% 80%)'
  }
];

const RoomSceneCustomizer = ({ initialColor, onUpdate }: RoomSceneCustomizerProps) => {
  const [walls, setWalls] = useState<Wall[]>(defaultWalls.map(wall => ({
    ...wall,
    color: initialColor
  })));
  const [selectedWall, setSelectedWall] = useState<string>('main');
  const [lighting, setLighting] = useState({
    brightness: 100,
    temperature: 50,
    ambientLight: 'natural' as AmbientLightType
  });
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDayType>('morning');

  const handleWallUpdate = (wallId: string, updates: Partial<Wall>) => {
    setWalls(prev => prev.map(wall => 
      wall.id === wallId ? { ...wall, ...updates } : wall
    ));
  };

  const getLightingFilter = () => {
    const { brightness, temperature, ambientLight } = lighting;
    let filter = `brightness(${brightness}%)`;
    
    switch (ambientLight) {
      case 'warm':
        filter += ' sepia(20%)';
        break;
      case 'cool':
        filter += ' hue-rotate(10deg)';
        break;
      case 'natural':
      default:
        break;
    }

    // Add color temperature
    filter += ` saturate(${100 + (temperature - 50) * 0.5}%)`;
    
    return filter;
  };

  const getTimeOfDayOverlay = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'linear-gradient(45deg, rgba(255,236,210,0.2), rgba(252,246,237,0.1))';
      case 'afternoon':
        return 'linear-gradient(45deg, rgba(255,253,250,0.1), rgba(255,253,250,0.1))';
      case 'evening':
        return 'linear-gradient(45deg, rgba(255,198,145,0.2), rgba(255,225,184,0.15))';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Scene Preview */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {/* Base Room Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{ 
            backgroundImage: `url(/room-scenes/empty-room.jpg)`,
            filter: getLightingFilter()
          }}
        />

        {/* Time of Day Overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: getTimeOfDayOverlay() }}
        />

        {/* Walls */}
        {walls.map(wall => (
          <div
            key={wall.id}
            className={`absolute inset-0 transition-all duration-300 cursor-pointer ${
              selectedWall === wall.id ? 'ring-2 ring-primary-600' : ''
            }`}
            style={{
              backgroundColor: wall.color.hex,
              clipPath: wall.area,
              mixBlendMode: 'multiply',
              opacity: 0.85
            }}
            onClick={() => setSelectedWall(wall.id)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Wall Selection */}
        <div>
          <h3 className="text-lg font-medium mb-3">Walls</h3>
          <div className="flex gap-2">
            {walls.map(wall => (
              <button
                key={wall.id}
                onClick={() => setSelectedWall(wall.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedWall === wall.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                {wall.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Controls */}
        <div>
          <h3 className="text-lg font-medium mb-3">Lighting</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brightness</label>
              <input
                type="range"
                min="50"
                max="150"
                value={lighting.brightness}
                onChange={(e) => setLighting(prev => ({ 
                  ...prev, 
                  brightness: Number(e.target.value) 
                }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color Temperature</label>
              <input
                type="range"
                min="0"
                max="100"
                value={lighting.temperature}
                onChange={(e) => setLighting(prev => ({ 
                  ...prev, 
                  temperature: Number(e.target.value) 
                }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ambient Light</label>
              <select
                value={lighting.ambientLight}
                onChange={(e) => setLighting(prev => ({ 
                  ...prev, 
                  ambientLight: e.target.value as AmbientLightType
                }))}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="natural">Natural</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
              </select>
            </div>
          </div>
        </div>

        {/* Time of Day */}
        <div>
          <h3 className="text-lg font-medium mb-3">Time of Day</h3>
          <div className="flex gap-2">
            {(['morning', 'afternoon', 'evening'] as const).map(time => (
              <button
                key={time}
                onClick={() => setTimeOfDay(time)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeOfDay === time 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSceneCustomizer;