import { Product } from "./../Types/product";
import { create } from "zustand";

type Store = {
  products: Product[];
  newProduct: {};
  addProduct: () => void;
  setProducts: (products: Product[]) => void;
};

export const productStore = create<Store>((set) => ({
  products: [],
  newProduct: { title: "", description: "", price: 0, photo: "" },
  addProduct: () => {
    set((state) => ({
      products: [...state.products, state.newProduct] as Product[],
    }));
  },
  setProducts: (products: Product[]) => {
    set((state) => ({
      ...state,
      products: products,
    }));
  },
}));
