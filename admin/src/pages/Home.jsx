// import React from 'react'
// import Nav from "../components/Nav.jsx"
// import Sidebar from "../components/Sidebar.jsx"

// function Home() {
//   return (
//     <>
//       <Nav />
//       <Sidebar />

      
//     </>
//   )
// }

// export default Home



import { Link } from "react-router-dom";
import {
    FiPackage,
    FiShoppingBag,
    FiPlusCircle,
    FiList,
    FiArrowRight,
    FiHome
} from "react-icons/fi";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-5 md:p-8">

            {/* Welcome Section */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-lg">
                <p className="text-sm font-medium text-orange-100">
                    ApnaCart Admin Panel
                </p>

                <h1 className="mt-2 text-3xl font-bold">
                    Welcome Back, Admin!
                </h1>

                <p className="mt-2 text-orange-100">
                    Manage your store, products and customer orders.
                </p>
            </div>

            {/* Dashboard Cards */}
            <h2 className="mb-5 text-xl font-bold text-gray-800">
                Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Manage Products
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-gray-800">
                                Products
                            </h3>
                        </div>

                        <div className="rounded-xl bg-orange-100 p-4 text-orange-600">
                            <FiPackage size={25} />
                        </div>
                    </div>

                    <Link
                        to="/lists"
                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                    >
                        View Products <FiArrowRight />
                    </Link>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Customer Orders
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-gray-800">
                                Orders
                            </h3>
                        </div>

                        <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
                            <FiShoppingBag size={25} />
                        </div>
                    </div>

                    <Link
                        to="/orders"
                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        View Orders <FiArrowRight />
                    </Link>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Add New Product
                            </p>
                            <h3 className="mt-2 text-xl font-bold text-gray-800">
                                Add Product
                            </h3>
                        </div>

                        <div className="rounded-xl bg-green-100 p-4 text-green-600">
                            <FiPlusCircle size={25} />
                        </div>
                    </div>

                    <Link
                        to="/add"
                        className="mt-6 flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
                    >
                        Add Product <FiArrowRight />
                    </Link>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">
                    Quick Actions
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Quickly manage your ApnaCart store.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <Link
                        to="/add"
                        className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-orange-400 hover:bg-orange-50"
                    >
                        <FiPlusCircle className="text-2xl text-orange-500" />
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Add New Product
                            </h3>
                            <p className="text-sm text-gray-500">
                                Add products to your store.
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/orders"
                        className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-orange-400 hover:bg-orange-50"
                    >
                        <FiList className="text-2xl text-orange-500" />
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                Manage Orders
                            </h3>
                            <p className="text-sm text-gray-500">
                                Check and update customer orders.
                            </p>
                        </div>
                    </Link>

                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-500">
                © 2026 ApnaCart. All rights reserved.
            </div>

        </div>
    );
}

export default Home;
