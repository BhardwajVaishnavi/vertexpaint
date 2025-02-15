import React, { useState } from 'react';
import { SavedDesign } from '../types/design';
import { designStorage } from '../services/designStorage';

interface DesignSaveDialogProps {
  currentDesign: Omit<SavedDesign, 'id' | 'name' | 'createdAt'>;
  onSave: (design: SavedDesign) => void;
  onClose: () => void;
}

const DesignSaveDialog = ({ currentDesign, onSave, onClose }: DesignSaveDialogProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a name for your design');
      return;
    }

    const design: SavedDesign = {
      ...currentDesign,
      id: `design_${Date.now()}`,
      name: name.trim(),
      createdAt: new Date().toISOString()
    };

    designStorage.saveDesign(design);
    onSave(design);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Save Your Design</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Design Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter a name for your design"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Save Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignSaveDialog; 