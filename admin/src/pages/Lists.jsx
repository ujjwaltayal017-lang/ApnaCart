import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";

export default function Lists() {
    const { serverUrl } = useContext(authDataContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    // Get all products
    const getProducts = async () => {
        try {
            setLoading(true);

            const result = await axios.get(
                `${serverUrl}/api/product/list`,
                {
                    withCredentials: true,
                }
            );

            console.log("API Response:", result.data);

            // Handle different API response formats
            const responseData = result.data;

            if (Array.isArray(responseData)) {
                setProducts(responseData);
            } 
            else if (Array.isArray(responseData.products)) {
                setProducts(responseData.products);
            } 
            else if (Array.isArray(responseData.data)) {
                setProducts(responseData.data);
            } 
            else {
                console.log("Unexpected API response:", responseData);
                setProducts([]);
            }

        } catch (error) {
            console.log("Get Products Error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            setDeletingId(id);

            const result = await axios.delete(
                `${serverUrl}/api/product/remove/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (result.data) {
                await getProducts();
                alert("Product deleted successfully!");
            }

        } catch (error) {
            console.log("Delete Product Error:", error);

            alert(
                error.response?.data?.message ||
                "Could not delete product."
            );
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            {/* Navbar */}
            <Nav />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-4 sm:p-6">

                    <h1 className="text-xl font-bold text-orange-500 mb-6">
                        All Products
                    </h1>

                    {loading ? (
                        <p className="text-gray-500">
                            Loading products...
                        </p>
                    ) : products.length === 0 ? (
                        <p className="text-gray-500">
                            No products found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                            {products.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white border rounded-xl shadow-sm p-3 hover:shadow-md transition"
                                >

                                    {/* Product Image */}
                                    <img
                                        src={item.image1}
                                        alt={item.name}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />

                                    {/* Product Details */}
                                    <h2 className="font-semibold mt-3 text-gray-800">
                                        {item.name}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.category} / {item.subCategory}
                                    </p>

                                    <p className="font-bold text-orange-500 mt-2">
                                        ₹{item.price}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        Sizes: {
                                            Array.isArray(item.sizes)
                                                ? item.sizes.join(", ")
                                                : "N/A"
                                        }
                                    </p>

                                    <p className="text-sm mt-2">
                                        Best Seller:{" "}
                                        <span
                                            className={
                                                item.bestSeller
                                                    ? "text-green-600"
                                                    : "text-gray-500"
                                            }
                                        >
                                            {item.bestSeller ? "Yes" : "No"}
                                        </span>
                                    </p>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() =>
                                            deleteProduct(item._id)
                                        }
                                        disabled={deletingId === item._id}
                                        className="w-full mt-4 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg"
                                    >
                                        {deletingId === item._id
                                            ? "Deleting..."
                                            : "Delete Product"}
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}