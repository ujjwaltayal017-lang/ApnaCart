import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiTrash2,
  FiArrowLeft,
  FiShoppingBag,
//   FiShieldCheck,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";

export default function Cart() {
  const { products, currency, delivery_fee, cartItems, updateQuantity } =
    useContext(shopDataContext);

  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Flatten nested cartItems object: { [itemId]: { [size]: quantity } } -> flat array
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Compute Subtotal
  const subtotal = cartData.reduce((acc, item) => {
    const product = products.find((p) => String(p._id) === String(item._id));
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const appliedDelivery = subtotal > 0 ? delivery_fee : 0;
  const orderTotal = subtotal + appliedDelivery;

  const formatPrice = (amount) => {
    return Number(amount).toLocaleString("en-IN");
  };

  if (cartData.length === 0) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-inner">
          <FiShoppingBag className="text-4xl" />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          Your Cart is Empty
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Looks like you haven't added anything to your cart yet. Explore our latest
          collection and find something you love!
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
        >
          <FiArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
          >
            <FiArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Shopping Cart{" "}
            <span className="text-base font-normal text-slate-500">
              ({cartData.length} {cartData.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Cart Items List */}
          <div className="space-y-4 lg:col-span-8">
            {cartData.map((item) => {
              const product = products.find(
                (p) => String(p._id) === String(item._id)
              );

              if (!product) return null;

              const displayImage =
                product.image1 ||
                product.image2 ||
                product.image3 ||
                product.image4;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  {/* Left: Image & Details */}
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/productdetail/${product._id}`}
                      className="shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-gray-50"
                    >
                      <img 
                        src={displayImage}
                        alt={product.name}
                        className="h-24 w-24 object-contain p-1 sm:h-28 sm:w-28"
                      />
                    </Link>

                    <div className="flex flex-col">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                        {product.category || "ApnaCart"}
                      </p>
                      <Link
                        to={`/product/${product._id}`}
                        className="mt-1 line-clamp-1 text-base font-bold text-slate-800 transition hover:text-orange-500 sm:text-lg"
                      >
                        {product.name}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
                          Size: {item.size}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {currency}
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Controls & Subtotal & Remove */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:border-0 sm:pt-0 sm:gap-6">
                    {/* Stepper Input */}
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:text-orange-500 disabled:opacity-40"
                      >
                        <FiMinus className="text-xs" />
                      </button>

                      <span className="w-9 text-center text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:text-orange-500"
                      >
                        <FiPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Total for this row */}
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 sm:text-base">
                        {currency}
                        {formatPrice(product.price * item.quantity)}
                      </p>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    {currency}
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery Fee</span>
                  <span className="font-semibold text-slate-800">
                    {appliedDelivery === 0
                      ? "Free"
                      : `${currency}${appliedDelivery}`}
                  </span>
                </div>

                <div className="my-3 border-t border-slate-100" />

                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-xl text-orange-600">
                    {currency}
                    {formatPrice(orderTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate("/placeorder")}
                className="mt-6 w-full rounded-xl bg-orange-500 py-3.5 font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badge */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                {/* <FiShieldCheck className="text-base text-emerald-500" /> */}
                <span>Safe and secure payments guaranteed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}