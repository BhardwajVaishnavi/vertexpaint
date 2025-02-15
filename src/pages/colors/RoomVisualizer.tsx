import { useState, useRef } from 'react';
import { Color } from '../../types';

const RoomVisualizer = () => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('living-room');
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rooms = [
    { id: 'living-room', name: 'Living Room', image: '/rooms/living-room.jpg' },
    { id: 'bedroom', name: 'Bedroom', image: '/rooms/bedroom.jpg' },
    { id: 'kitchen', name: 'Kitchen', image: '/rooms/kitchen.jpg' },
    { id: 'bathroom', name: 'Bathroom', image: '/rooms/bathroom.jpg' },
  ];

  const applyColorToWalls = async () => {
    if (!selectedColor || !canvasRef.current) return;
    
    setLoading(true);
    try {
      // In a real implementation, this would use a computer vision API
      // to detect walls and apply the color
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = rooms.find(r => r.id === selectedRoom)?.image || '';
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Apply color overlay with some opacity
        ctx.fillStyle = selectedColor.hex + '80'; // 50% opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setLoading(false);
      };
    } catch (error) {
      console.error('Error applying color:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Room Preview */}
        <div className="md:col-span-2">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
            />
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white">Processing...</div>
              </div>
            )}
          </div>

          {/* Room Selection */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`flex-shrink-0 ${
                  selectedRoom === room.id ? 'ring-2 ring-primary-600' : ''
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <p className="text-sm mt-1 text-center">{room.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Choose a Color</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Color picker would go here */}
            {/* For now, just a button to apply the color */}
            <button
              className="w-full bg-primary-600 text-white py-3 rounded-lg"
              onClick={applyColorToWalls}
              disabled={!selectedColor || loading}
            >
              Apply Color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer; 