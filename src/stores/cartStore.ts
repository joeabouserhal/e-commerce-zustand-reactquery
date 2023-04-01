import { create } from "zustand";
import { Product } from "../Types/product";
type Store = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  setCart: (products: Product[]) => void;
};
export const cartStore = create<Store>((set) => ({
  cartItems: [] as Product[],
  addToCart: (product: Product) => {
    set((state) => ({
      ...state,
      cartItems: [...state.cartItems, product],
    }));
  },
  setCart: (products: Product[]) => {
    set((state) => ({
      ...state,
      cartItems: products,
    }));
  },
}));
