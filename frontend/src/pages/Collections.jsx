
import React, { useContext, useMemo, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";

function Collections() {
    const { products, currency, loading } = useContext(shopDataContext);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    //   const [search, setSearch] = useState("");

    const categories = ["Men", "Women", "Kids"];
    const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategories((prev) =>
            prev.includes(subCategory)
                ? prev.filter((item) => item !== subCategory)
                : [...prev, subCategory]
        );
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategories.length > 0) {
            result = result.filter((item) =>
                selectedCategories.includes(item.category)
            );
        }

        if (selectedSubCategories.length > 0) {
            result = result.filter((item) =>
                selectedSubCategories.includes(item.subCategory)
            );
        }

        if (search.trim()) {
            result = result.filter((item) =>
                item.name?.toLowerCase().includes(search.trim().toLowerCase())
            );
        }

        if (sortBy === "low-high") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "high-low") {
            result.sort((a, b) => Number(b.price) - Number(a.price));
        }

        return result;
    }, [
        products,
        selectedCategories,
        selectedSubCategories,
        sortBy,
        search,
    ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8 lg:px-12">
            {/* Page Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Our <span className="text-orange-500">Collection</span>
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Explore products made for your style.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
                {/* Filters */}
                <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-5 text-lg font-semibold text-gray-900">
                        Filters
                    </h2>

                    {/* Category */}
                    <div className="mb-6">
                        <h3 className="mb-3 font-medium text-gray-800">Category</h3>

                        {categories.map((category) => (
                            <label
                                key={category}
                                className="mb-3 flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                    className="h-4 w-4 accent-orange-500"
                                />
                                {category}
                            </label>
                        ))}
                    </div>

                    <div className="mb-6 border-t border-gray-100 pt-5">
                        <h3 className="mb-3 font-medium text-gray-800">
                            Subcategory
                        </h3>

                        {subCategories.map((subCategory) => (
                            <label
                                key={subCategory}
                                className="mb-3 flex cursor-pointer items-center gap-3 text-sm text-gray-600"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedSubCategories.includes(subCategory)}
                                    onChange={() => handleSubCategoryChange(subCategory)}
                                    className="h-4 w-4 accent-orange-500"
                                />
                                {subCategory}
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setSelectedCategories([]);
                            setSelectedSubCategories([]);
                            setSortBy("relevant");
                            setSearchParams({});
                        }}
                        className="w-full rounded-lg border border-orange-500 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-500 hover:text-white"
                    >
                        Clear Filters
                    </button>
                </aside>

                {/* Products */}
                <section>
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                All Products
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {filteredProducts.length} products found
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-orange-500"
              /> */}

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-orange-500"
                            >
                                <option value="relevant">Sort: Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map((item) => (
                                <Card
                                    key={item._id}
                                    id={item._id}
                                    image={item.image1 || item.image}
                                    name={item.name}
                                    price={item.price}
                                    currency={currency || "₹"}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
                            <p className="text-lg font-medium text-gray-700">
                                No products found
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your filters or search.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Collections;
