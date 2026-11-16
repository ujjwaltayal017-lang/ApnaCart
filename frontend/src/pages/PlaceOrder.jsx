
// import { useContext, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FiArrowLeft, FiLock } from "react-icons/fi";
// import { shopDataContext } from "../context/ShopContext";
// import { AuthContext } from "../context/authContext";
// import Cart2, { getCartSummary, getProductImage } from "../pages/Cart2";

// const FIELDS = [
//   { name: "firstName", label: "First name", half: true },
//   { name: "lastName", label: "Last name", half: true },
//   { name: "email", label: "Email", type: "email" },
//   { name: "street", label: "Street" },
//   { name: "city", label: "City", half: true },
//   { name: "state", label: "State", half: true },
//   { name: "zipcode", label: "Zip code", half: true, inputMode: "numeric", pattern: "[0-9]{5,6}", title: "Enter a valid 5 or 6 digit zip code" },
//   { name: "country", label: "Country", half: true, defaultValue: "India" },
//   { name: "phone", label: "Phone", type: "tel", inputMode: "numeric", pattern: "[0-9]{10}", title: "Enter a 10 digit phone number" },
// ];

// const PAYMENT_METHODS = [
//   { id: "cod", label: "Cash on Delivery", hint: "Pay when your order arrives" },
//   { id: "razorpay", label: "Razorpay", hint: "UPI, cards, netbanking, wallets" },
// ];

// const initialForm = Object.fromEntries(FIELDS.map((f) => [f.name, f.defaultValue ?? ""]));

// const inputClass =
//   "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

// export default function PlaceOrder() {
//   const navigate = useNavigate();
//   const { products = [], cartItems = {}, delivery_fee = 0, setCartItems } =
//     useContext(shopDataContext);
//   const { serverUrl } = useContext(AuthContext);

//   // Same calculation Cart2 uses, so the order always matches what's shown.
//   const { rows, total } = useMemo(
//     () => getCartSummary({ cartItems, products, delivery_fee }),
//     [cartItems, products, delivery_fee]
//   );

//   const [form, setForm] = useState(initialForm);
//   const [method, setMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Order model stores address as a single string.
//     const address = [
//       `${form.firstName} ${form.lastName}`.trim(),
//       form.phone,
//       form.email,
//       form.street,
//       `${form.city}, ${form.state} ${form.zipcode}`,
//       form.country,
//     ].join(", ");

//     // userId and date are set by the backend (req.userId, Date.now()).
//     const order = {
//       items: rows.map(({ product, size, quantity }) => ({
//         _id: product._id,
//         name: product.name,
//         image: getProductImage(product),
//         price: product.price,
//         size,
//         quantity,
//       })),
//       amount: total,
//       address,
//       paymentMethod: method,
//     };

//     try {
//       const { data } = await axios.post(`${serverUrl}/api/order/placeorder`, order, {
//         withCredentials: true,
//       });

//       if (data.success === false) {
//         setError(data.message || "Could not place order.");
//         return;
//       }

//       setCartItems?.({});
//       navigate("/orders");
//     } catch (err) {
//       setError(err.response?.data?.message || "Could not place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (rows.length === 0) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
//         <h2 className="text-2xl font-bold text-slate-800">Nothing to checkout</h2>
//         <p className="mt-2 text-sm text-slate-500">
//           Add something to your cart first, then come back to place your order.
//         </p>
//         <Link
//           to="/collections"
//           className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
//         >
//           <FiArrowLeft /> Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">
//       <button
//         type="button"
//         onClick={() => navigate(-1)}
//         className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
//       >
//         <FiArrowLeft /> Go Back
//       </button>

//       <form
//         onSubmit={handleSubmit}
//         className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
//       >
//         {/* Left: delivery information */}
//         <section>
//           <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Checkout</p>
//           <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
//             Delivery Information
//           </h1>

//           <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <div className="grid grid-cols-2 gap-4">
//               {FIELDS.map(({ label, half, defaultValue, ...input }) => (
//                 <label key={input.name} className={half ? "col-span-1" : "col-span-2"}>
//                   <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
//                   <input
//                     required
//                     {...input}
//                     value={form[input.name]}
//                     onChange={handleChange}
//                     className={inputClass}
//                   />
//                 </label>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Right: cart, payment, place order */}
//         <section className="flex flex-col">
//           <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Your Order</p>
//           <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
//             Order Summary
//           </h2>

//           <div className="mt-8">
//             <Cart2 />
//           </div>

//           <h3 className="mb-4 mt-8 font-semibold text-slate-800">Payment Method</h3>
//           <div className="space-y-3">
//             {PAYMENT_METHODS.map((m) => (
//               <label
//                 key={m.id}
//                 className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-4 transition ${
//                   method === m.id
//                     ? "border-orange-500 ring-2 ring-orange-100"
//                     : "border-slate-200 hover:border-orange-400"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value={m.id}
//                   checked={method === m.id}
//                   onChange={() => setMethod(m.id)}
//                   className="h-4 w-4 accent-orange-500"
//                 />
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800">{m.label}</p>
//                   <p className="text-xs text-slate-500">{m.hint}</p>
//                 </div>
//               </label>
//             ))}
//           </div>

//           {error && (
//             <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <FiLock className="text-xl" />
//             {loading ? "Placing order…" : "Place Order"}
//           </button>
//         </section>
//       </form>
//     </div>
//   );
// }







import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiLock } from "react-icons/fi";

import { shopDataContext } from "../context/ShopContext";
import { AuthContext } from "../context/authContext";
import Cart2, {
    getCartSummary,
    getProductImage
} from "../pages/Cart2";


const FIELDS = [
    { name: "firstName", label: "First name", half: true },
    { name: "lastName", label: "Last name", half: true },
    { name: "email", label: "Email", type: "email" },
    { name: "street", label: "Street" },
    { name: "city", label: "City", half: true },
    { name: "state", label: "State", half: true },
    { name: "zipcode", label: "Zip code", half: true },
    { name: "country", label: "Country", half: true, defaultValue: "India" },
    { name: "phone", label: "Phone", type: "tel" },
];


const PAYMENT_METHODS = [
    {
        id: "cod",
        label: "Cash on Delivery",
        hint: "Pay when your order arrives"
    },
    {
        id: "razorpay",
        label: "Razorpay",
        hint: "UPI, cards, netbanking, wallets"
    },
];


const initialForm = Object.fromEntries(
    FIELDS.map((field) => [
        field.name,
        field.defaultValue || ""
    ])
);


const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100";


export default function PlaceOrder() {

    const navigate = useNavigate();

    const {
        products = [],
        cartItems = {},
        delivery_fee = 0,
        setCartItems
    } = useContext(shopDataContext);

    const { serverUrl } = useContext(AuthContext);


    const { rows, total } = useMemo(
        () => getCartSummary({
            cartItems,
            products,
            delivery_fee
        }),
        [cartItems, products, delivery_fee]
    );


    const [form, setForm] = useState(initialForm);
    const [method, setMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    // Place order
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        // Delivery address
        const address = [
            `${form.firstName} ${form.lastName}`,
            form.phone,
            form.email,
            form.street,
            `${form.city}, ${form.state} ${form.zipcode}`,
            form.country
        ].join(", ");


        // Order details
        const order = {
            items: rows.map(({ product, size, quantity }) => ({
                _id: product._id,
                name: product.name,
                image: getProductImage(product),
                price: product.price,
                size,
                quantity
            })),

            amount: total,
            address
        };


        try {

            // CASE 1: CASH ON DELIVERY

            if (method === "cod") {

                const { data } = await axios.post(
                    `${serverUrl}/api/order/placeorder`,
                    {
                        ...order,
                        paymentMethod: "cod"
                    },
                    {
                        withCredentials: true
                    }
                );

                if (!data.success) {
                    throw new Error(data.message);
                }

                setCartItems({});
                navigate("/orders");

                return;
            }


            // CASE 2: RAZORPAY

            // Step 1: Create Razorpay order

            const { data } = await axios.post(
                `${serverUrl}/api/order/razorpay`,
                order,
                {
                    withCredentials: true
                }
            );


            // Step 2: Open Razorpay Checkout

            const options = {

                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                // key: data.key_id,

                amount: data.razorpayOrder.amount,

                currency: "INR",

                name: "ApnaCart Store",

                description: "Order Payment",

                order_id: data.razorpayOrder.id,

                prefill: {
                    name: `${form.firstName} ${form.lastName}`,
                    email: form.email,
                    contact: form.phone
                },

                theme: {
                    color: "#f97316"
                },


                // Step 3: Verify payment

                handler: async function (payment) {

                    try {

                        const { data } = await axios.post(
                            `${serverUrl}/api/order/razorpay/verify`,
                            payment,
                            {
                                withCredentials: true
                            }
                        );

                        if (data.success) {

                            setCartItems({});
                            navigate("/orders");

                        } else {

                            setError("Payment verification failed");
                        }

                    } catch (err) {

                        setError(
                            err.response?.data?.message ||
                            "Payment verification failed"
                        );

                    } finally {

                        setLoading(false);
                    }
                },


                // If user closes payment popup

                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }

            };


            // Create Razorpay instance

            const razorpay = new window.Razorpay(options);


            // Payment failure

            razorpay.on("payment.failed", function (response) {

                setError(
                    response.error?.description || "Payment failed"
                );

                setLoading(false);
            });


            // Open payment popup

            razorpay.open();


        } catch (err) {

            console.log("Order Error:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );

            setLoading(false);
        }

    };


    // Empty cart

    if (rows.length === 0) {

        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">

                <h2 className="text-2xl font-bold text-slate-800">
                    Nothing to checkout
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Add something to your cart first.
                </p>

                <Link
                    to="/collections"
                    className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white"
                >
                    Continue Shopping
                </Link>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-16">

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600"
            >
                <FiArrowLeft />
                Go Back
            </button>


            <form
                onSubmit={handleSubmit}
                className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14"
            >

                {/* DELIVERY INFORMATION */}

                <section>

                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                        Checkout
                    </p>

                    <h1 className="mt-3 text-3xl font-bold text-slate-900">
                        Delivery Information
                    </h1>


                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                        <div className="grid grid-cols-2 gap-4">

                            {FIELDS.map((field) => (

                                <label
                                    key={field.name}
                                    className={
                                        field.half
                                            ? "col-span-1"
                                            : "col-span-2"
                                    }
                                >

                                    <span className="mb-1.5 block text-sm font-medium text-slate-700">
                                        {field.label}
                                    </span>

                                    <input
                                        required
                                        name={field.name}
                                        type={field.type || "text"}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />

                                </label>

                            ))}

                        </div>

                    </div>

                </section>


                {/* ORDER SUMMARY */}

                <section className="flex flex-col">

                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                        Your Order
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900">
                        Order Summary
                    </h2>


                    <div className="mt-8">
                        <Cart2 />
                    </div>


                    {/* PAYMENT METHOD */}

                    <h3 className="mb-4 mt-8 font-semibold text-slate-800">
                        Payment Method
                    </h3>


                    <div className="space-y-3">

                        {PAYMENT_METHODS.map((m) => (

                            <label
                                key={m.id}
                                className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-4 transition ${
                                    method === m.id
                                        ? "border-orange-500 ring-2 ring-orange-100"
                                        : "border-slate-200 hover:border-orange-400"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={m.id}
                                    checked={method === m.id}
                                    onChange={() => setMethod(m.id)}
                                    className="h-4 w-4 accent-orange-500"
                                />


                                <div>

                                    <p className="text-sm font-semibold text-slate-800">
                                        {m.label}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {m.hint}
                                    </p>

                                </div>

                            </label>

                        ))}

                    </div>


                    {/* ERROR MESSAGE */}

                    {error && (

                        <p
                            role="alert"
                            className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                        >
                            {error}
                        </p>

                    )}


                    {/* PLACE ORDER BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-md transition hover:bg-orange-600 disabled:opacity-50"
                    >

                        <FiLock className="text-xl" />

                        {loading
                            ? "Processing..."
                            : method === "razorpay"
                                ? "Pay Now"
                                : "Place Order"
                        }

                    </button>

                </section>

            </form>

        </div>

    );

}
