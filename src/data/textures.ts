export type TextureType = 'smooth' | 'textured' | 'glossy' | 'matte' | 'all';

export interface Texture {
  id: string;
  name: string;
  description: string;
  image: string;
  type: TextureType;
  properties: {
    durability: number;
    washability: number;
    coverage: number;
  };
  recommendedRooms: string[]; // Changed from recommendedFor
}

export const textures: Texture[] = [
  {
    id: 'royale-play-special-effects',
    name: 'Royale Play Special Effects',
    description: 'Create stunning designer walls with unique patterns and textures',
    image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800",
    type: 'textured',
    properties: {
      durability: 90,
      washability: 85,
      coverage: 95
    },
    recommendedRooms: []
  },
  {
    id: 'royale-play-metallics',
    name: 'Royale Play Metallics',
    description: 'Add a touch of luxury with metallic finishes',
    image: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=800",
    type: 'glossy',
    properties: {
      durability: 85,
      washability: 80,
      coverage: 90
    },
    recommendedRooms: []
  },
  {
    id: 'royale-play-safari',
    name: 'Royale Play Safari',
    description: 'Nature-inspired textures for a unique wall finish',
    image: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800",
    type: 'textured',
    properties: {
      durability: 88,
      washability: 82,
      coverage: 92
    },
    recommendedRooms: []
  },
  {
    id: 'royale-play-textile',
    name: 'Royale Play Textile',
    description: 'Fabric-inspired wall textures for a soft, elegant look',
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800",
    type: 'matte',
    properties: {
      durability: 86,
      washability: 84,
      coverage: 94
    },
    recommendedRooms: []
  }
]; 