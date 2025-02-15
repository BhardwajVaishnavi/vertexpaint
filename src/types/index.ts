export interface FooterSection {
  title: string;
  links: {
    text: string;
    path: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  images: string[];
  features?: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
  steps: {
    title: string;
    description: string;
    image?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  category: string;
  family: string;
  isPopular?: boolean;
  roomImages?: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: Color[];
  description?: string;
  roomType?: string;
} 