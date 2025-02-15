import { colorPatterns } from '../data/colorPatterns';
import { textures } from '../data/textures';
import { analyzeColor } from './colorAnalysis';

interface RoomContext {
  type: string;
  size: 'small' | 'medium' | 'large';
  naturalLight: 'low' | 'medium' | 'high';
  style: 'modern' | 'traditional' | 'scandinavian' | 'industrial';
  purpose: 'living' | 'working' | 'relaxing' | 'entertaining';
}

interface ThemeColor {
  name: string;
  hex: string;
  type?: string;
}

interface Theme {
  name: string;
  colors: ThemeColor[];
}

interface ColorAnalysis {
  brightness: number;
  combinations: {
    analogous: string[];
    complementary: string;
    monochromatic: string[];
  };
}

interface RecommendedColor {
  name: string;
  hex: string;
  reason: string;
}

interface DesignRecommendation {
  mainColor: RecommendedColor;
  accentColors: RecommendedColor[];
  textures: {
    id: string;
    name: string;
    reason: string;
  }[];
  tips: string[];
}

export const getDesignRecommendations = (context: RoomContext): DesignRecommendation => {
  const theme = getThemeForContext(context);
  const mainColor = recommendMainColor(context, theme);
  const analysis = analyzeColor(mainColor.hex);
  const accentColors = recommendAccentColors(analysis, context);
  const recommendedTextures = recommendTextures(context, mainColor.hex);
  const tips = generateDesignTips(context, mainColor, accentColors);

  return {
    mainColor,
    accentColors,
    textures: recommendedTextures,
    tips
  };
};

const getThemeForContext = (context: RoomContext): Theme => {
  const { style, purpose } = context;
  
  if (style === 'modern' && purpose === 'working') {
    return colorPatterns.roomThemes.find(t => t.name === "Modern Minimalist") || colorPatterns.roomThemes[0];
  }
  if (style === 'scandinavian' && purpose === 'living') {
    return colorPatterns.roomThemes.find(t => t.name === "Scandinavian Minimalist") || colorPatterns.roomThemes[0];
  }
  
  return colorPatterns.roomThemes[0];
};

const recommendMainColor = (context: RoomContext, theme: Theme): RecommendedColor => {
  const { size, naturalLight } = context;
  
  const suitableColors = theme.colors.filter((color: ThemeColor) => {
    const analysis = analyzeColor(color.hex);
    
    if (size === 'small' && analysis.brightness < 150) return false;
    if (naturalLight === 'low' && analysis.brightness < 180) return false;
    
    return true;
  });

  const selectedColor = suitableColors[0];
  return {
    name: selectedColor.name,
    hex: selectedColor.hex,
    reason: generateColorReason(context, selectedColor)
  };
};

const recommendAccentColors = (mainColorAnalysis: ColorAnalysis, context: RoomContext): RecommendedColor[] => {
  const { combinations } = mainColorAnalysis;
  
  if (context.purpose === 'relaxing') {
    return combinations.analogous.map(hex => ({
      name: `Accent ${hex}`,
      hex,
      reason: "Creates a harmonious and relaxing atmosphere"
    }));
  }
  
  if (context.purpose === 'entertaining') {
    return [
      {
        name: `Accent ${combinations.complementary}`,
        hex: combinations.complementary,
        reason: "Adds visual interest and energy to the space"
      }
    ];
  }

  return combinations.monochromatic.map((hex: string) => ({
    name: `Accent ${hex}`,
    hex,
    reason: "Provides subtle variation while maintaining cohesion"
  }));
};

const recommendTextures = (context: RoomContext, mainColorHex: string) => {
  const { style, purpose } = context;
  
  return textures
    .filter(texture => {
      if (style === 'modern' && texture.type === 'textured') return false;
      if (purpose === 'working' && texture.type === 'glossy') return false;
      return true;
    })
    .slice(0, 2)
    .map(texture => ({
      id: texture.id,
      name: texture.name,
      reason: `Suitable for ${style} style and ${purpose} purpose`
    }));
};

const generateColorReason = (context: RoomContext, color: ThemeColor): string => {
  const reasons: string[] = [];
  
  if (context.size === 'small') {
    reasons.push("Light color helps make the space feel larger");
  }
  
  if (context.naturalLight === 'low') {
    reasons.push("Bright tone helps compensate for limited natural light");
  }
  
  if (context.purpose === 'working') {
    reasons.push("Neutral tone helps maintain focus");
  }
  
  return reasons.join('. ') || "Matches your room's style and purpose";
};

const generateDesignTips = (
  context: RoomContext,
  mainColor: RecommendedColor,
  accentColors: RecommendedColor[]
): string[] => {
  const tips: string[] = [];
  
  tips.push(`Use ${mainColor.name} as the primary color for walls`);
  if (accentColors.length > 0) {
    tips.push("Apply accent colors through accessories and furniture");
  }
  
  if (context.size === 'small') {
    tips.push("Use mirrors to create the illusion of more space");
  }
  
  if (context.naturalLight === 'low') {
    tips.push("Consider adding layered lighting with task and ambient lights");
  }
  
  return tips;
};