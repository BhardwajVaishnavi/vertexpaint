import React, { useState } from 'react';
import { Color } from '../types/color';

interface ColorPaletteExportProps {
  mainColor: Color;
  accentColors: Color[];
  textures?: Array<{ name: string; id: string }>;
}

interface ExportFormat {
  id: string;
  name: string;
  extension: string;
  mimeType: string;
}

const exportFormats: ExportFormat[] = [
  { id: 'png', name: 'PNG Image', extension: '.png', mimeType: 'image/png' },
  { id: 'pdf', name: 'PDF Document', extension: '.pdf', mimeType: 'application/pdf' },
  { id: 'json', name: 'JSON Data', extension: '.json', mimeType: 'application/json' }
];

const ColorPaletteExport = ({ mainColor, accentColors, textures }: ColorPaletteExportProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('png');
  const [isExporting, setIsExporting] = useState(false);

  const generatePaletteSwatch = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw main color
    ctx.fillStyle = mainColor.hex;
    ctx.fillRect(50, 50, 200, 200);
    
    // Draw color name and hex
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.fillText(mainColor.name, 50, 280);
    ctx.fillText(mainColor.hex, 50, 300);

    // Draw accent colors
    accentColors.forEach((color, index) => {
      const x = 300 + (index * 150);
      ctx.fillStyle = color.hex;
      ctx.fillRect(x, 50, 100, 100);
      
      ctx.fillStyle = '#000000';
      ctx.fillText(color.name, x, 180);
      ctx.fillText(color.hex, x, 200);
    });

    return canvas;
  };

  const exportPalette = async () => {
    setIsExporting(true);
    try {
      const format = exportFormats.find(f => f.id === selectedFormat);
      if (!format) throw new Error('Invalid format');

      const paletteData = {
        mainColor,
        accentColors,
        textures,
        exportDate: new Date().toISOString()
      };

      let exportData: Blob;
      let filename = `color-palette-${Date.now()}${format.extension}`;

      switch (format.id) {
        case 'png': {
          const canvas = await generatePaletteSwatch();
          if (!canvas) throw new Error('Failed to generate palette image');
          const blob = await new Promise<Blob>(resolve => {
            canvas.toBlob(blob => resolve(blob!), format.mimeType);
          });
          exportData = blob;
          break;
        }

        case 'pdf':
          // Implement PDF generation here
          throw new Error('PDF export not implemented yet');

        case 'json':
          exportData = new Blob(
            [JSON.stringify(paletteData, null, 2)],
            { type: format.mimeType }
          );
          break;

        default:
          throw new Error('Unsupported format');
      }

      // Create download link
      const url = URL.createObjectURL(exportData);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Export failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Export Palette</h3>
      
      {/* Format Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Export Format</label>
        <div className="flex gap-4">
          {exportFormats.map(format => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedFormat === format.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              {format.name}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-lg"
              style={{ backgroundColor: mainColor.hex }}
            />
            {accentColors.map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          {textures && textures.length > 0 && (
            <div className="text-sm text-gray-600">
              Including {textures.length} texture{textures.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={exportPalette}
        disabled={isExporting}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? 'Exporting...' : 'Export Palette'}
      </button>
    </div>
  );
};

export default ColorPaletteExport; 