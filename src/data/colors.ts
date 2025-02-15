export interface RoomScene {
  id: string;
  name: string;
  type: string;
  image: string;
}

export const colorPalettes = {
  trending: [
    {
      name: "Salmon Pink",
      hex: "#FF91A4",
      image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L157.png",
      roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/living-room-1.jpg"
    },
    {
      name: "Aqua Fresh",
      hex: "#9FE7F5",
      image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L146.png",
      roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/bedroom-1.jpg"
    },
    {
      name: "Olive Green",
      hex: "#84A98C",
      image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L178.png",
      roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/dining-room-1.jpg"
    }
  ],
  themes: {
    modern: [
      {
        name: "Urban Grey",
        hex: "#7D8491",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L189.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/modern/living-room-grey.jpg"
      },
      {
        name: "Minimal White",
        hex: "#F5F5F5",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L001.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/modern/bedroom-white.jpg"
      }
    ],
    traditional: [
      {
        name: "Royal Maroon",
        hex: "#800020",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L167.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/traditional/living-room-maroon.jpg"
      }
    ],
    scandinavian: [
      {
        name: "Nordic White",
        hex: "#F9F9F9",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L001.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/scandinavian/living-room-white.jpg"
      },
      {
        name: "Fjord Blue",
        hex: "#4B7B9B",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L134.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/scandinavian/bedroom-blue.jpg"
      }
    ],
    industrial: [
      {
        name: "Concrete Grey",
        hex: "#8C8C8C",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L189.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/industrial/living-room-grey.jpg"
      },
      {
        name: "Rustic Brown",
        hex: "#8B4513",
        image: "https://www.asianpaints.com/content/dam/asian_paints/colours/swatches/L167.png",
        roomImage: "https://www.asianpaints.com/content/dam/asian_paints/visualization/industrial/bedroom-brown.jpg"
      }
    ]
  },
  roomScenes: [
    {
      id: "living-modern",
      name: "Modern Living Room",
      type: "living",
      image: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/living-room-1.jpg"
    },
    {
      id: "bedroom-contemporary",
      name: "Contemporary Bedroom",
      type: "bedroom",
      image: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/bedroom-1.jpg"
    },
    {
      id: "kitchen-modern",
      name: "Modern Kitchen",
      type: "kitchen",
      image: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/kitchen-1.jpg"
    },
    {
      id: "dining-classic",
      name: "Classic Dining Room",
      type: "dining",
      image: "https://www.asianpaints.com/content/dam/asian_paints/visualization/room-scenes/dining-room-1.jpg"
    }
  ],
  combinations: {
    monochromatic: [
      {
        base: "Slate Blue",
        hex: "#4B6B8C",
        variations: [
          { name: "Light Slate", hex: "#7B9BB8" },
          { name: "Dark Slate", hex: "#2B4B6C" }
        ]
      }
    ],
    complementary: [
      {
        base: "Coral Pink",
        hex: "#FF6B6B",
        complement: { name: "Teal Blue", hex: "#4ECDC4" }
      }
    ]
  }
}; 