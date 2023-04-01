import React from "react";
import { Product } from "../../Types/product";

const ProductCard = (props: Product) => {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <p>{props.price}</p>
      <p></p>
    </div>
  );
};

export default ProductCard;
