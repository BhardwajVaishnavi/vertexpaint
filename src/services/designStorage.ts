import { SavedDesign } from '../types/design';

const STORAGE_KEY = 'saved_designs';

export const designStorage = {
  saveDesign: (design: SavedDesign): void => {
    const savedDesigns = designStorage.getAllDesigns();
    savedDesigns.push(design);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDesigns));
  },

  getAllDesigns: (): SavedDesign[] => {
    const designs = localStorage.getItem(STORAGE_KEY);
    return designs ? JSON.parse(designs) : [];
  },

  getDesignById: (id: string): SavedDesign | null => {
    const designs = designStorage.getAllDesigns();
    return designs.find(d => d.id === id) || null;
  },

  deleteDesign: (id: string): void => {
    const designs = designStorage.getAllDesigns();
    const filtered = designs.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  updateDesign: (id: string, updates: Partial<SavedDesign>): void => {
    const designs = designStorage.getAllDesigns();
    const index = designs.findIndex(d => d.id === id);
    if (index !== -1) {
      designs[index] = { ...designs[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
    }
  }
}; 