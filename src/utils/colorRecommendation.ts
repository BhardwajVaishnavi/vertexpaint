interface RoomFactors {
  type: 'living' | 'bedroom' | 'kitchen' | 'bathroom';
  size: 'small' | 'medium' | 'large';
  naturalLight: 'low' | 'medium' | 'high';
  direction: 'north' | 'south' | 'east' | 'west';
}

interface ColorRecommendation {
  name: string;
  hex: string;
  score: number;
  reason: string;
}

export const getColorRecommendations = (factors: RoomFactors): ColorRecommendation[] => {
  // Base recommendations based on room type
  const roomTypeColors = {
    living: [
      { name: "Warm Beige", hex: "#E5D3B3", score: 80 },
      { name: "Soft Gray", hex: "#E5E7EB", score: 75 },
      { name: "Sage Green", hex: "#84A98C", score: 70 }
    ],
    bedroom: [
      { name: "Lavender Mist", hex: "#E6E6FA", score: 85 },
      { name: "Pale Blue", hex: "#B8D8E3", score: 80 },
      { name: "Dusty Rose", hex: "#D8A7B1", score: 75 }
    ],
    kitchen: [
      { name: "Butter Cream", hex: "#FFFDD0", score: 85 },
      { name: "Mint Green", hex: "#98FF98", score: 75 },
      { name: "Soft White", hex: "#F5F5F5", score: 70 }
    ],
    bathroom: [
      { name: "Sky Blue", hex: "#87CEEB", score: 80 },
      { name: "Pearl White", hex: "#F8F8FF", score: 75 },
      { name: "Sea Foam", hex: "#98FF98", score: 70 }
    ]
  };

  // Get base recommendations for room type
  let baseColors = roomTypeColors[factors.type].map(color => ({
    ...color,
    reason: ''  // Initialize with empty reason
  }));

  // Apply adjustments and update reasons
  baseColors = baseColors.map(color => {
    const sizeScore = adjustScoreForSize(color.score, factors.size);
    const lightScore = adjustScoreForLight(sizeScore, factors.naturalLight);
    const finalScore = adjustScoreForDirection(lightScore, factors.direction);

    return {
      ...color,
      score: finalScore,
      reason: combineReasons([
        getRoomSizeReason(factors.size),
        getLightingReason(factors.naturalLight),
        getDirectionReason(factors.direction)
      ])
    };
  });

  return baseColors.sort((a, b) => b.score - a.score);
};

const adjustScoreForSize = (score: number, size: RoomFactors['size']): number => {
  const adjustments = {
    small: (color: string) => isLightColor(color) ? 10 : -10,
    large: (color: string) => isDarkColor(color) ? 5 : 0,
    medium: () => 0
  };
  return score + adjustments[size]('');
};

const adjustScoreForLight = (score: number, light: RoomFactors['naturalLight']): number => {
  const adjustments = {
    low: (color: string) => isLightColor(color) ? 15 : -5,
    high: (color: string) => isDarkColor(color) ? 10 : 0,
    medium: () => 0
  };
  return score + adjustments[light]('');
};

const adjustScoreForDirection = (score: number, direction: RoomFactors['direction']): number => {
  const adjustments = {
    north: 5, // Warmer colors
    south: -5, // Cooler colors
    east: 0,
    west: 0
  };
  return score + adjustments[direction];
};

// Helper functions for color analysis
const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  return (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186;
};

const isDarkColor = (hex: string): boolean => !isLightColor(hex);

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// Reason generators
const getRoomSizeReason = (size: RoomFactors['size']): string => ({
  small: "Light colors to make the space feel larger",
  medium: "Balanced colors for optimal space perception",
  large: "Rich colors to create intimacy"
})[size];

const getLightingReason = (light: RoomFactors['naturalLight']): string => ({
  low: "Bright colors to compensate for limited natural light",
  medium: "Balanced colors to complement natural lighting",
  high: "Any color works well with good natural light"
})[light];

const getDirectionReason = (direction: RoomFactors['direction']): string => ({
  north: "Warm colors to balance cool northern light",
  south: "Cool colors to balance warm southern light",
  east: "Neutral colors for balanced morning light",
  west: "Adaptable colors for changing afternoon light"
})[direction];

const combineReasons = (reasons: string[]): string => {
  return reasons.join('. ');
}; 