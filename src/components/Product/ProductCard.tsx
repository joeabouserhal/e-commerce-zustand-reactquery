import React, { useEffect, useState } from "react";
import { Product } from "../../Types/product";
import { useCartStore } from "../../stores/cartStore";
import axios from "axios";

const ProductCard = (props: Product) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const cStore = useCartStore();

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5000/cart", {
        ...props,
      });
      cStore.addToCart({ ...props });
      setIsInCart(true);
    } catch (error) {}
  };

  const handleIsInCart = async () => {
    try {
      await axios.get(`http://localhost:5000/cart/${props.id}`);
      setIsInCart(true);
    } catch (error) {}
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart/${props.id}`);
      cStore.removeFromCart({ ...props });
      setIsInCart(false);
    } catch (error) {}
  };
  useEffect(() => {
    handleIsInCart();
  }, []);
  return (
    <div className="bg-stone-700 rounded-md p-2 border border-stone-600 shadow-md flex flex-col justify-between">
      <img
        src={props.photo}
        alt="photo"
        className="w-[100%] object-cover rounded-md transition-transform hover:scale-105 aspect-square hover:cursor-pointer hover:aspect-auto hover:h-full hover:object-scale-down"
      />
      <div>
        <p className="text-lg mt-2">{props.title}</p>
        <p className="text-sm">{props.description}</p>
        <p className="bg-stone-600 w-min p-1 rounded-md">{props.price}$</p>
        {!isInCart ? (
          <button className="btn-blue mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        ) : (
          <button className="btn-red mt-2" onClick={handleRemoveFromCart}>
            Remove Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
