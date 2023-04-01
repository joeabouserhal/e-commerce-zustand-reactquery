import React from "react";
import { Product } from "../../Types/product";

const ProductCard = (props: Product) => {
  return (
    <div className="bg-stone-700 rounded-md p-2 border border-stone-600 shadow-md flex flex-col justify-between">
      <img
        src={props.photo}
        alt="photo"
        className="w-[100%] object-cover rounded-md transition-transform hover:scale-105 aspect-square hover:cursor-pointer hover:aspect-auto hover:h-full hover:object-scale-down"
      />
      <div className="">
        <p className="text-lg mt-2">{props.title}</p>
        <p className="text-sm">{props.description}</p>
        <p className="bg-stone-600 w-min p-1 rounded-md">{props.price}$</p>
      </div>
    </div>
  );
};

export default ProductCard;
