import React, { useState } from 'react';

interface RoomDimensions {
  length: string;
  width: string;
  height: string;
  windows: string;
  doors: string;
}

const PaintCalculator = () => {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    length: '',
    width: '',
    height: '',
    windows: '0',
    doors: '0'
  });

  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const { length, width, height, windows, doors } = dimensions;
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const windowArea = parseFloat(windows) * 15; // Average window size
    const doorArea = parseFloat(doors) * 21; // Average door size

    if (l && w && h) {
      // Calculate wall area
      const wallArea = 2 * (l + w) * h;
      // Subtract windows and doors
      const paintableArea = wallArea - windowArea - doorArea;
      // 1 liter covers approximately 100 sq ft
      const litersNeeded = Math.ceil(paintableArea / 100);
      setResult(litersNeeded);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 bg-primary-600">
              <h2 className="text-3xl font-bold text-white mb-4">Paint Calculator</h2>
              <p className="text-white/80 mb-8">
                Calculate how much paint you need for your room. Enter the dimensions below.
              </p>
              <img 
                src="https://www.asianpaints.com/content/dam/asian_paints/services/paint-calculator.png"
                alt="Paint Calculator"
                className="w-full max-w-sm mx-auto"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Length (feet)
                  </label>
                  <input
                    type="number"
                    value={dimensions.length}
                    onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter length"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Width (feet)
                  </label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter width"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Height (feet)
                  </label>
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter height"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Windows
                    </label>
                    <input
                      type="number"
                      value={dimensions.windows}
                      onChange={(e) => setDimensions(prev => ({ ...prev, windows: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Doors
                    </label>
                    <input
                      type="number"
                      value={dimensions.doors}
                      onChange={(e) => setDimensions(prev => ({ ...prev, doors: e.target.value }))}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Calculate
                </button>

                {result !== null && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">You will need approximately:</h3>
                    <p className="text-3xl font-bold text-primary-600">
                      {result} {result === 1 ? 'Liter' : 'Liters'} of Paint
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      * This is an estimate. Actual paint needed may vary based on surface condition and application method.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaintCalculator; 