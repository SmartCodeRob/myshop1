// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface ProductState {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
}

export interface RootState {
  cart: CartState;
  products: ProductState;
}