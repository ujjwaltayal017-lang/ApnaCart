
import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ id, image, name, price, currency = "₹" }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (!id) {
      console.error("Product ID is missing!");
      return;
    }

    navigate(`/productdetail/${id}`);
  };

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer overflow-hidden rounded-xl bg-white"
    >
      <img
        src={image}
        alt={name}
        className="h-64 w-full object-cover transition duration-300 hover:scale-105"
      />

      <div className="p-3">
        <h3 className="font-semibold text-slate-800">{name}</h3>
        <p className="mt-1 font-bold text-orange-600">
          {currency}{price}
        </p>
      </div>
    </div>
  );
}

export default Card;
