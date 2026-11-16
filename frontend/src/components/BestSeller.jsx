
import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function BestSeller() {
  const { products, loading } = useContext(shopDataContext);

  const bestProducts = products
    .filter((item) => item.bestSeller === true)
    .slice(0, 4);

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <Title text1="BEST" text2="SELLERS" />

        <p className="mt-3 px-3 text-sm text-gray-500 md:text-base">
          Explore Our Most Popular Products.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading products...
        </p>
      ) : bestProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No best-selling products found.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {bestProducts.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image1 || item.image}
              price={item.price}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BestSeller;
