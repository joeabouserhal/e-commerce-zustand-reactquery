import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../../Types/product";
import ProductCard from "../../components/Product/ProductCard";
import { productStore } from "../../stores/productsStore";
import { useQuery } from "@tanstack/react-query";

const ProductsPage = () => {
  const store = productStore();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:5000/products");
      store.setProducts(products.data);
    } catch (error) {
      return error as AxiosError;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const data = await axios.get("http://localhost:5000/products");
        return data.data;
      } catch (error) {
        throw new Error(error as undefined);
      }
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{(error as AxiosError).message}</h1>;

  if (isSuccess)
    return (
      <div className="mx-10">
        <h1 className="text-2xl my-5">Products</h1>
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
