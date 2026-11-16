import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiArrowLeft,
  FiCheck,
} from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, currency, loading, addToCart } = useContext(shopDataContext);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Find the selected product using MongoDB _id
  const product = products.find(
    (item) => String(item._id) === String(productId)
  );

  const images = product
    ? [
        product.image1,
        product.image2,
        product.image3,
        product.image4,
      ].filter(Boolean)
    : [];

  useEffect(() => {
    setSelectedImage("");
    setSelectedSize("");
    setAddedSuccess(false);
  }, [productId]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [product?._id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="mt-2 text-gray-500">
          This product may have been removed or is unavailable.
        </p>
        <button
          onClick={() => navigate("/collections")}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
        >
          Back to Collections
        </button>
      </div>
    );
  }

  const availableSizes = Array.isArray(product.sizes) ? product.sizes : [];

  const formatPrice = (price) => {
    const amount = Number(price);
    return Number.isFinite(amount) ? amount.toLocaleString("en-IN") : price;
  };

  const handleAddToCart = () => {
    if (availableSizes.length > 0 && !selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addToCart(product._id, selectedSize || "Standard");
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-orange-500"
      >
        <FiArrowLeft />
        Go Back
      </button>

      {/* Product Section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Product Images */}
        <div>
          <div className="overflow-hidden rounded-2xl bg-white">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="h-[400px] w-full object-contain p-3 sm:h-[550px]"
              />
            ) : (
              <div className="flex h-[400px] items-center justify-center text-gray-400 sm:h-[550px]">
                No image available
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-xl border-2 bg-white ${
                    selectedImage === image
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            {product.category || "ApnaCart Collection"}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {product.subCategory || "Fashion"}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-orange-600">
              {currency || "₹"}
              {formatPrice(product.price)}
            </span>

            {product.bestSeller && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Best Seller
              </span>
            )}
          </div>

          <div className="my-7 border-t border-gray-200" />

          {/* Sizes */}
          {availableSizes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800">Select Size</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {availableSizes.map((size, index) => (
                  <button
                    key={`${size}-${index}`}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-14 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`mt-8 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-bold text-white transition ${
              addedSuccess
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {addedSuccess ? (
              <>
                <FiCheck className="text-xl" />
                Added to Cart!
              </>
            ) : (
              <>
                <FiShoppingBag className="text-xl" />
                Add to Cart
              </>
            )}
          </button>

          <p className="mt-4 text-sm leading-6 text-gray-500">
            Enjoy a convenient shopping experience with ApnaCart. Review your
            selected size and product before adding it to your cart.
          </p>

          {/* Value Props */}
          <div className="mt-8 space-y-5 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <FiTruck className="shrink-0 text-xl text-orange-500" />
              <div>
                <h4 className="font-semibold text-gray-800">Delivery</h4>
                <p className="text-sm text-gray-500">
                  Delivery charges are calculated at checkout.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiRefreshCw className="shrink-0 text-xl text-orange-500" />
              <div>
                <h4 className="font-semibold text-gray-800">Returns</h4>
                <p className="text-sm text-gray-500">
                  Please review the store's return policy.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiShield className="shrink-0 text-xl text-orange-500" />
              <div>
                <h4 className="font-semibold text-gray-800">Secure Shopping</h4>
                <p className="text-sm text-gray-500">
                  Shop through your ApnaCart account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;