
import React from "react";
import LatestCollections from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";

function Product() {
  return (
    <main className="min-h-screen w-full bg-gray-50 py-10">

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16">

        <LatestCollections />

        <BestSeller />

      </div>

    </main>
  );
}

export default Product;
