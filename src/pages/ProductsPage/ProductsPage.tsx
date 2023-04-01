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
    <div>
      <h1>Products</h1>
      <div>
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
