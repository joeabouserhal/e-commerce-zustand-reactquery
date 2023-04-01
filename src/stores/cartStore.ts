import { create } from "zustand";
import { Product } from "../Types/product";
import axios from "axios";
type Store = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  setCart: () => void;
};
export const useCartStore = create<Store>((set, get) => ({
  cartItems: [] as Product[],
  addToCart: (product: Product) => {
    set((state) => ({
      ...state,
      cartItems: [...state.cartItems, product],
    }));
  },
  removeFromCart: (product: Product) => {
    set((state) => ({
      ...state,
      cartItems: state.cartItems.filter((prod) => prod.id != product.id),
    }));
  },
  setCart: async () => {
    const response = await axios.get("http://localhost:5000/cart");
    set((state) => ({
      ...state,
      cartItems: response.data,
    }));
  },
}));
