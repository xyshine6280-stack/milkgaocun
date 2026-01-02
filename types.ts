
export interface Product {
  id: string;
  name: string;
  brand: string;
  stage: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'infant' | 'toddler' | 'special';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppState {
  cart: CartItem[];
  currentProduct: Product | null;
  isEditingImage: boolean;
}
