// src/store/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../../types';

const initialState: ProductState = {
  products: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/images/wirelessHeadphones.jpg",
      description: "High-quality wireless headphones with noise cancellation.",
      quantity: 15
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "/images/SmartWatch.webp",
      description: "Feature-rich smartwatch with health tracking.",
      quantity: 8
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 49.99,
      image: "/images/gamingMouse.webp",
      description: "High-precision gaming mouse with RGB lighting.",
      quantity: 20
    }
  ],
  currentPage: 1,
  itemsPerPage: 6
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
});

// Upewnij się, że eksportujesz akcje
export const { setCurrentPage } = productSlice.actions;

// Eksportuj reducer jako default export
export default productSlice.reducer;