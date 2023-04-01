import axios from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../../Types/product";
import ProductCard from "../../components/Product/ProductCard";
import { productStore } from "../../stores/productsStore";

const ProductsPage = () => {
  const store = productStore();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const products = await axios.get("http://localhost:5000/products");
      store.setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mx-10">
      <h1 className="text-2xl my-5">Products</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center mx-auto gap-10">
        {store.products.map((product: Product) => (
          <ProductCard
            description={product.description}
            title={product.title}
            price={product.price}
            photo={product.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
