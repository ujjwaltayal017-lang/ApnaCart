
import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiShield, FiTrash2 } from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";

const formatPrice = (amount) => Number(amount).toLocaleString("en-IN");

export const getProductImage = (product) =>
  product.image1 || product.image2 || product.image3 || product.image4;

/**
 * Context cart shape: { [productId]: { [size]: quantity } }
 * Returns flat rows + totals. PlaceOrder uses this too, so the cart shown
 * and the order sent to the backend always match.
 */
export function getCartSummary({ cartItems, products, delivery_fee }) {
  const rows = [];

  for (const productId in cartItems) {
    const product = products.find((p) => String(p._id) === String(productId));
    if (!product) continue;

    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) rows.push({ product, size, quantity });
    }
  }

  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.quantity, 0);
  const deliveryFee = subtotal > 0 ? delivery_fee : 0;

  return { rows, subtotal, deliveryFee, total: subtotal + deliveryFee };
}

/**
 * Embeddable cart (items + price details) for the checkout page.
 * It has no page wrapper / min-height / padding of its own, so it
 * adds no extra gap around it.
 */
export default function Cart2() {
  const {
    products = [],
    cartItems = {},
    currency = "₹",
    delivery_fee = 0,
    updateQuantity,
  } = useContext(shopDataContext);

  const { rows, subtotal, deliveryFee, total } = useMemo(
    () => getCartSummary({ cartItems, products, delivery_fee }),
    [cartItems, products, delivery_fee]
  );

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {rows.map(({ product, size, quantity }) => (
          <div
            key={`${product._id}-${size}`}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Image & details */}
            <div className="flex items-center gap-4">
              <Link
                to={`/productdetail/${product._id}`}
                className="shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-gray-50"
              >
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-20 w-20 object-contain p-1 sm:h-24 sm:w-24"
                />
              </Link>

              <div className="flex min-w-0 flex-col">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                  {product.category || "ApnaCart"}
                </p>
                <Link
                  to={`/productdetail/${product._id}`}
                  className="mt-1 line-clamp-1 text-base font-bold text-slate-800 transition hover:text-orange-500"
                >
                  {product.name}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-700">
                    Size: {size}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {currency}
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity, row total, remove */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(product._id, size, quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:text-orange-500"
                >
                  <FiMinus className="text-xs" />
                </button>
                <span className="w-9 text-center text-sm font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(product._id, size, quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:text-orange-500"
                >
                  <FiPlus className="text-xs" />
                </button>
              </div>

              <p className="text-sm font-bold text-slate-900 sm:text-base">
                {currency}
                {formatPrice(product.price * quantity)}
              </p>

              <button
                type="button"
                aria-label="Remove item"
                onClick={() => updateQuantity(product._id, size, 0)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800">Price Details</h3>

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
              {deliveryFee === 0 ? "Free" : `${currency}${formatPrice(deliveryFee)}`}
            </span>
          </div>

          <div className="my-3 border-t border-slate-100" />

          <div className="flex justify-between text-base font-bold text-slate-900">
            <span>Total Amount</span>
            <span className="text-xl text-orange-600">
              {currency}
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
          <FiShield className="text-base text-emerald-500" />
          <span>Safe and secure payments guaranteed.</span>
        </div>
      </div>
    </div>
  );
}
