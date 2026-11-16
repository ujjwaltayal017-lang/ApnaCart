
import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function LatestCollections() {
  const { products, loading } = useContext(shopDataContext);

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />

        <p className="mt-3 px-3 text-sm text-gray-500 md:text-base">
          Step Into Style - New Collection Dropping This Season!
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {products.slice(0, 8).map((item) => (
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

export default LatestCollections;
