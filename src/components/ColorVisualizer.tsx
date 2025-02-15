import React, { useState, useEffect } from 'react';
import { colorPalettes } from '../data/colors';
import ColorSearch from './ColorSearch';
import RoomSceneCustomizer from './RoomSceneCustomizer';
import ColorAnalysisVisualizer from './ColorAnalysisVisualizer';
import TexturePreview from './TexturePreview';
import { textures } from '../data/textures';
import { getDesignRecommendations } from '../utils/designRecommendation';
import ColorPaletteExport from './ColorPaletteExport';

interface Color {
  name: string;
  hex: string;
  image: string;
  roomImage?: string;
}

interface ColorVisualizerProps {
  colors: Color[];
}

const ColorVisualizer = ({ colors }: ColorVisualizerProps) => {
  const defaultColors = [
    { name: "Cloud White", hex: "#F9FAFB", image: "" },
    { name: "Warm Gray", hex: "#9CA3AF", image: "" },
    { name: "Deep Blue", hex: "#1E40AF", image: "" },
    { name: "Forest Green", hex: "#166534", image: "" }
  ];

  const [selectedColor, setSelectedColor] = useState<Color>(colors[0] || defaultColors[0]);
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [roomImage, setRoomImage] = useState(colorPalettes.roomScenes[0].image);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');
  const [roomContext, setRoomContext] = useState({
    type: 'living',
    size: 'medium' as const,
    naturalLight: 'medium' as const,
    style: 'modern' as const,
    purpose: 'living' as const
  });

  const designRecommendations = getDesignRecommendations(roomContext);

  const filteredRoomScenes = colorPalettes.roomScenes.filter(
    scene => !selectedRoomType || scene.type === selectedRoomType
  );

  // Preload room images
  useEffect(() => {
    colorPalettes.roomScenes.forEach(scene => {
      const img = new Image();
      img.src = scene.image;
    });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/living-room-1.jpg';
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setViewMode('simple')}
          className={`px-4 py-2 rounded-lg ${
            viewMode === 'simple' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          Simple View
        </button>
        <button
          onClick={() => setViewMode('advanced')}
          className={`px-4 py-2 rounded-lg ${
            viewMode === 'advanced' ? 'bg-primary-600 text-white' : 'bg-gray-100'
          }`}
        >
          Advanced Customization
        </button>
      </div>

      {viewMode === 'advanced' ? (
        <RoomSceneCustomizer 
          initialColor={selectedColor}
          onUpdate={(settings) => {
            // Handle room scene updates
            console.log('Room scene updated:', settings);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative aspect-video">
            <div className={`transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src={roomImage} 
                alt="Room" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
                onLoad={() => setIsImageLoaded(true)}
                onError={handleImageError}
              />
              <div 
                className="absolute inset-0 mix-blend-multiply rounded-lg"
                style={{ backgroundColor: selectedColor.hex }}
              />
            </div>
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Choose Your Color</h3>
            <ColorSearch onColorSelect={setSelectedColor} />

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Room Type</h4>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setSelectedRoomType(null)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    !selectedRoomType ? 'bg-primary-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  All
                </button>
                {Array.from(new Set(colorPalettes.roomScenes.map(scene => scene.type))).map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedRoomType(type)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedRoomType === type ? 'bg-primary-600 text-white' : 'bg-gray-100'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredRoomScenes.map(room => (
                  <button
                    key={room.id}
                    onClick={() => setRoomImage(room.image)}
                    className={`p-2 rounded-lg transition-all ${
                      roomImage === room.image ? 'ring-2 ring-primary-600' : ''
                    }`}
                  >
                    <div className="aspect-video mb-2 relative overflow-hidden rounded-md">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-sm font-medium">{room.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Texture Preview */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Texture Preview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TexturePreview 
            color={selectedColor.hex}
            texture={selectedTexture}
          />
          <div className="grid grid-cols-2 gap-4">
            {textures.map(texture => (
              <button
                key={texture.id}
                onClick={() => setSelectedTexture(texture)}
                className={`p-2 border rounded-lg transition-all ${
                  selectedTexture.id === texture.id ? 'border-primary-600' : ''
                }`}
              >
                <div className="aspect-video mb-2">
                  <img 
                    src={texture.image}
                    alt={texture.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="text-sm font-medium">{texture.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Analysis */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Color Analysis</h3>
        <ColorAnalysisVisualizer color={selectedColor.hex} />
      </div>

      {/* Design Recommendations */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Design Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Recommended Colors</h4>
            <div className="flex gap-4">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-lg mb-2"
                  style={{ backgroundColor: designRecommendations.mainColor.hex }}
                />
                <div className="text-sm font-medium">Main Color</div>
                <div className="text-xs text-gray-600">{designRecommendations.mainColor.reason}</div>
              </div>
              {designRecommendations.accentColors.map((color, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-lg mb-2"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="text-sm font-medium">Accent {index + 1}</div>
                  <div className="text-xs text-gray-600">{color.reason}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Design Tips</h4>
            <ul className="space-y-2">
              {designRecommendations.tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Export & Share</h3>
        <ColorPaletteExport
          mainColor={selectedColor}
          accentColors={designRecommendations.accentColors.map(color => ({
            name: color.name,
            hex: color.hex,
            image: ''
          }))}
          textures={selectedTexture ? [selectedTexture] : undefined}
        />
      </div>
    </div>
  );
};

export default ColorVisualizer; 