import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../../Types/product";
import ProductCard from "../../components/Product/ProductCard";
import { useProductStore } from "../../stores/productsStore";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { BsPlus, BsPlusCircle } from "react-icons/bs";
import { useCartStore } from "../../stores/cartStore";

const ProductsPage = () => {
  const productStore = useProductStore();
  const cartStore = useCartStore();

  const getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:5000/products");
      productStore.setProducts(products.data);
    } catch (error) {
      return error as AxiosError;
    }
  };

  useEffect(() => {
    getProducts();
    cartStore.setCart();
  }, []);

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const data = await axios.get("http://localhost:5000/products");
        return data.data;
      } catch (error) {
        console.log(error);
        throw error as AxiosError;
      }
    },
    retry() {
      return false;
    },
    onSuccess: (data) => {
      productStore.setProducts(data as Product[]);
    },
  });

  if (isLoading) return <Loading text="Fetching Products" />;

  if (isError)
    return (
      <h1 className="h-[50vh] w-full text-4xl text-center mt-20">
        {(error as AxiosError).message}
      </h1>
    );

  if (isSuccess)
    return (
      <div className="mx-10">
        <div className="flex gap-2 my-5 items-center">
          <h1 className="text-2xl">Products</h1>
          <BsPlusCircle className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center mx-auto gap-10">
          {data.map((product: Product) => (
            <ProductCard
              description={product.description}
              title={product.title}
              price={product.price}
              photo={product.photo}
              id={product.id}
            />
          ))}
        </div>
      </div>
    );
};

export default ProductsPage;
