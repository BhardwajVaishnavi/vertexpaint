import { Texture } from '../data/textures';

export interface WallDesign {
  id: string;
  color: {
    name: string;
    hex: string;
  };
  texture?: Texture;
}

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: string;
  roomType: string;
  walls: {
    main: WallDesign;
    accent?: WallDesign;
    trim?: WallDesign;
  };
  lighting: {
    brightness: number;
    ambientLight: 'natural' | 'warm' | 'cool';
  };
  preview: string; // Base64 image data
} 