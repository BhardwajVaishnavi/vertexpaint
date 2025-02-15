interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface ColorAnalysis {
  brightness: number;
  saturation: number;
  temperature: number;
  contrast: number;
  accessibility: {
    wcagScore: number;
    isAccessible: boolean;
    recommendations: string[];
  };
  mood: string[];
  combinations: {
    complementary: string;
    analogous: string[];
    triadic: string[];
    monochromatic: string[];
  };
}

export const analyzeColor = (hex: string): ColorAnalysis => {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);

  return {
    brightness: calculateBrightness(rgb),
    saturation: hsl.s,
    temperature: calculateColorTemperature(rgb),
    contrast: calculateContrast(hex),
    accessibility: analyzeAccessibility(hex),
    mood: analyzeMood(hsl),
    combinations: generateCombinations(hsl)
  };
};

const hexToRgb = (hex: string): RGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Invalid hex color');
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
};

const rgbToHsl = (rgb: RGB): HSL => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const calculateBrightness = (rgb: RGB): number => {
  return Math.round((rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000);
};

const calculateColorTemperature = (rgb: RGB): number => {
  // Using relative luminance of red vs blue to determine temperature
  const temperature = (rgb.r - rgb.b) / (rgb.r + rgb.b) * 100;
  return Math.round(temperature);
};

const calculateContrast = (hex: string): number => {
  const rgb = hexToRgb(hex);
  const brightness = calculateBrightness(rgb);
  const whiteBrightness = 255;
  const blackBrightness = 0;

  const whiteContrast = (whiteBrightness + 0.05) / (brightness + 0.05);
  const blackContrast = (brightness + 0.05) / (blackBrightness + 0.05);

  return Math.max(whiteContrast, blackContrast);
};

const analyzeAccessibility = (hex: string): ColorAnalysis['accessibility'] => {
  const contrast = calculateContrast(hex);
  const wcagScore = Math.round(contrast * 100) / 100;
  const isAccessible = contrast >= 4.5;

  const recommendations = [];
  if (!isAccessible) {
    if (contrast < 3) {
      recommendations.push('Consider using a darker/lighter shade for better readability');
    }
    if (contrast < 4.5) {
      recommendations.push('Increase contrast for WCAG AA compliance');
    }
  }

  return {
    wcagScore,
    isAccessible,
    recommendations
  };
};

const analyzeMood = (hsl: HSL): string[] => {
  const moods: string[] = [];

  // Analyze hue
  if (hsl.h >= 0 && hsl.h < 30) moods.push('Energetic', 'Passionate');
  else if (hsl.h >= 30 && hsl.h < 60) moods.push('Warm', 'Friendly');
  else if (hsl.h >= 60 && hsl.h < 150) moods.push('Natural', 'Peaceful');
  else if (hsl.h >= 150 && hsl.h < 210) moods.push('Calm', 'Trustworthy');
  else if (hsl.h >= 210 && hsl.h < 270) moods.push('Royal', 'Mysterious');
  else if (hsl.h >= 270 && hsl.h < 330) moods.push('Creative', 'Luxurious');
  else moods.push('Dramatic', 'Romantic');

  // Analyze saturation
  if (hsl.s < 30) moods.push('Subtle', 'Sophisticated');
  else if (hsl.s > 70) moods.push('Vibrant', 'Bold');

  // Analyze lightness
  if (hsl.l < 30) moods.push('Dramatic', 'Mysterious');
  else if (hsl.l > 70) moods.push('Light', 'Airy');

  return Array.from(new Set(moods));
};

const generateCombinations = (hsl: HSL): ColorAnalysis['combinations'] => {
  return {
    complementary: hslToHex({ ...hsl, h: (hsl.h + 180) % 360 }),
    analogous: [
      hslToHex({ ...hsl, h: (hsl.h + 30) % 360 }),
      hslToHex({ ...hsl, h: (hsl.h - 30 + 360) % 360 })
    ],
    triadic: [
      hslToHex({ ...hsl, h: (hsl.h + 120) % 360 }),
      hslToHex({ ...hsl, h: (hsl.h + 240) % 360 })
    ],
    monochromatic: [
      hslToHex({ ...hsl, l: Math.max(0, hsl.l - 30) }),
      hslToHex({ ...hsl, l: Math.min(100, hsl.l + 30) })
    ]
  };
};

const hslToHex = (hsl: HSL): string => {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}; 