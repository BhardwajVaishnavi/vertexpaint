export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
  price: number;
  category: string;
  features: string[];
  specifications: {
    coverage: string;
    dryingTime: string;
    recoating: string;
    [key: string]: string;
  };
}

export const products: Product[] = [
  {
    id: 'royale-matt',
    name: 'Royale Matt',
    description: 'Luxury Interior Emulsion with Silken Finish',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
    badge: 'Bestseller',
    price: 2500,
    category: 'interior',
    features: [
      'Superior Washability',
      'Anti-Bacterial',
      'Low VOC'
    ],
    specifications: {
      coverage: '110-130 sq.ft/ltr/2 coats',
      dryingTime: '4-6 hours',
      recoating: '4-6 hours'
    }
  },
  {
    id: 'royale-health-shield',
    name: 'Royale Health Shield',
    description: 'Anti-Bacterial Paint for Interior Walls',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500',
    badge: 'New',
    price: 3000,
    category: 'interior',
    features: [
      'Anti-Bacterial',
      'Low VOC'
    ],
    specifications: {
      coverage: '110-130 sq.ft/ltr/2 coats',
      dryingTime: '4-6 hours',
      recoating: '4-6 hours'
    }
  },
  {
    id: 'ultima-protek',
    name: 'Ultima Protek',
    description: 'Lamination Guard for Exterior Walls',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500',
    badge: 'Premium',
    price: 2800,
    category: 'exterior',
    features: [
      'Lamination Guard',
      'Anti-Bacterial',
      'Low VOC'
    ],
    specifications: {
      coverage: '110-130 sq.ft/ltr/2 coats',
      dryingTime: '4-6 hours',
      recoating: '4-6 hours'
    }
  }
];

export const featuredProducts = products.slice(0, 3); 