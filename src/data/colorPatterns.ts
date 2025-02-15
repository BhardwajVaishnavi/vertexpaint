export const colorPatterns = {
  monochromatic: [
    {
      base: {
        name: "Deep Blue",
        hex: "#1E3A8A",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/N096.png"
      },
      variations: [
        { name: "Light Blue", hex: "#60A5FA" },
        { name: "Mid Blue", hex: "#3B82F6" },
        { name: "Navy Blue", hex: "#1E40AF" }
      ]
    },
    {
      base: {
        name: "Forest Green",
        hex: "#166534",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/G067.png"
      },
      variations: [
        { name: "Sage", hex: "#4ADE80" },
        { name: "Emerald", hex: "#10B981" },
        { name: "Pine", hex: "#15803D" }
      ]
    }
  ],
  complementary: [
    {
      primary: {
        name: "Royal Purple",
        hex: "#7E22CE",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/P067.png"
      },
      complement: {
        name: "Golden Yellow",
        hex: "#CA8A04",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/Y078.png"
      }
    }
  ],
  triadic: [
    {
      colors: [
        {
          name: "Crimson Red",
          hex: "#DC2626",
          image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/R067.png"
        },
        {
          name: "Royal Blue",
          hex: "#2563EB",
          image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/B089.png"
        },
        {
          name: "Golden Yellow",
          hex: "#D97706",
          image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/Y067.png"
        }
      ]
    }
  ],
  patterns: [
    {
      name: "Modern Minimalist",
      colors: [
        { name: "Off White", hex: "#F5F5F4", proportion: 0.6 },
        { name: "Warm Grey", hex: "#78716C", proportion: 0.3 },
        { name: "Charcoal", hex: "#292524", proportion: 0.1 }
      ],
      recommended: ["living", "bedroom"]
    },
    {
      name: "Coastal Breeze",
      colors: [
        { name: "Sand", hex: "#F5DEB3", proportion: 0.4 },
        { name: "Ocean Blue", hex: "#0EA5E9", proportion: 0.4 },
        { name: "Seafoam", hex: "#A7F3D0", proportion: 0.2 }
      ],
      recommended: ["bathroom", "bedroom"]
    }
  ],
  splitComplementary: [
    {
      base: {
        name: "Deep Teal",
        hex: "#064E40",
        image: "/swatches/teal.png"
      },
      complements: [
        { name: "Coral", hex: "#FF6B6B" },
        { name: "Peach", hex: "#FFB4A2" }
      ]
    }
  ],
  tetradic: [
    {
      colors: [
        { name: "Royal Blue", hex: "#1E40AF" },
        { name: "Amber", hex: "#D97706" },
        { name: "Forest Green", hex: "#166534" },
        { name: "Ruby", hex: "#BE123C" }
      ]
    }
  ],
  roomThemes: [
    {
      name: "Scandinavian Minimalist",
      colors: [
        { name: "Cloud White", hex: "#F9FAFB", proportion: 0.6 },
        { name: "Warm Gray", hex: "#9CA3AF", proportion: 0.25 },
        { name: "Natural Wood", hex: "#92400E", proportion: 0.15 }
      ],
      textures: ['smooth-matte', 'natural-wood'],
      recommended: ['living', 'bedroom']
    },
    {
      name: "Industrial Modern",
      colors: [
        { name: "Concrete Gray", hex: "#4B5563", proportion: 0.5 },
        { name: "Rustic Brown", hex: "#78350F", proportion: 0.3 },
        { name: "Steel Blue", hex: "#1E40AF", proportion: 0.2 }
      ],
      textures: ['concrete', 'metal'],
      recommended: ['living', 'kitchen']
    },
    {
      name: "Coastal Living",
      colors: [
        { name: "Ocean Blue", hex: "#0369A1", proportion: 0.4 },
        { name: "Sandy Beige", hex: "#FDE68A", proportion: 0.4 },
        { name: "Seafoam", hex: "#A7F3D0", proportion: 0.2 }
      ],
      textures: ['smooth-matte', 'textured'],
      recommended: ['bedroom', 'bathroom']
    }
  ],
  seasonalPalettes: {
    spring: [
      { name: "Cherry Blossom", hex: "#FBB6CE" },
      { name: "Fresh Grass", hex: "#4ADE80" },
      { name: "Sky Blue", hex: "#7DD3FC" }
    ],
    summer: [
      { name: "Sunflower", hex: "#FCD34D" },
      { name: "Ocean", hex: "#0EA5E9" },
      { name: "Coral", hex: "#FF6B6B" }
    ],
    autumn: [
      { name: "Maple", hex: "#B91C1C" },
      { name: "Pumpkin", hex: "#D97706" },
      { name: "Forest", hex: "#166534" }
    ],
    winter: [
      { name: "Ice Blue", hex: "#BAE6FD" },
      { name: "Deep Navy", hex: "#1E3A8A" },
      { name: "Silver", hex: "#E5E7EB" }
    ]
  }
}; 