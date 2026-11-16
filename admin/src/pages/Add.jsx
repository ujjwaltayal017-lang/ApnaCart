import { useState, useContext } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";

// Dropdown aur size ke options (yahan badal sakte hain)
const categories = ["Men", "Women", "Kids"];
const subCategories = ["TopWear", "BottomWear", "WinterWear"];
const allSizes = ["S", "M", "L", "XL", "XXL"];

// Sabhi input boxes ki same style
const inputClass =
    "mt-1 w-full border border-slate-300 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-orange-500";

export default function Add() {
    let { serverUrl } = useContext(authDataContext)

    // 4 images: har ek mein file aur uska preview (shuru mein khali)
    const [images, setImages] = useState([null, null, null, null]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("TopWear");
    const [sizes, setSizes] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // { text, error }

    // Image chunne par file aur preview save karta hai
    const handleImage = (index, file) => {
        if (!file) return;
        const newImages = [...images];
        newImages[index] = { file, preview: URL.createObjectURL(file) };
        setImages(newImages);
    };

    // Size dabane par add hota hai, dobara dabane par hat jata hai
    const toggleSize = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };

    // Add Product dabane par yeh function chalta hai
    const handleSubmit = async (e) => {
        e.preventDefault(); // page reload hone se rokta hai
        setStatus(null);

        if (images.some((img) => img === null)) {
            setStatus({ text: "Please add all 4 images.", error: true });
            return;
        }
        if (sizes.length === 0) {
            setStatus({ text: "Please select at least one size.", error: true });
            return;
        }

        setLoading(true);
        try {
            // Images file hoti hain, isliye FormData mein bhejte hain
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("bestSeller", bestSeller);
            formData.append("date", Date.now());
            images.forEach((img, i) => formData.append(`image${i + 1}`, img.file));

            // Yeh route apne backend ke route se milayein
            await axios.post(`${serverUrl}/api/product/addproduct`, formData, {
                withCredentials: true,
            });

            setStatus({ text: "Product added successfully!", error: false });

            // Form khali kar do
            setImages([null, null, null, null]);
            setName("");
            setDescription("");
            setPrice("");
            setCategory("Men");
            setSubCategory("TopWear");
            setSizes([]);
            setBestSeller(false);
        } catch (err) {
            console.log(err);
            setStatus({ text: "Could not add product. Please try again.", error: true });
        }
        setLoading(false);
    };

    return (
        <div>
            {/* Sabse upar navbar */}
            <Nav />

            {/* Navbar ke neeche: left mein sidebar, right mein form */}
            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-4 sm:p-6">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-5"
                    >
                        <h1 className="text-xl font-bold text-orange-500">Add Product</h1>

                        {/* 4 images */}
                        <div>
                            <label className="block text-sm text-slate-700">Product Images (4)</label>
                            <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {images.map((img, i) => (
                                    <label
                                        key={i}
                                        className="aspect-square flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-500 cursor-pointer overflow-hidden bg-slate-50 text-sm text-slate-400"
                                    >
                                        {img ? (
                                            <img src={img.preview} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>+ Image {i + 1}</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleImage(i, e.target.files[0])}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm text-slate-700">Product Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Cotton Round Neck T-Shirt"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm text-slate-700">Description</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Write about the product"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Category, Sub Category, Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-slate-700">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-700">Sub Category</label>
                                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className={inputClass}>
                                    {subCategories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-slate-700">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    placeholder="499"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <label className="block text-sm text-slate-700">Sizes</label>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {allSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`px-4 py-1.5 rounded-lg text-sm border ${
                                            sizes.includes(size)
                                                ? "bg-orange-500 text-white border-orange-500"
                                                : "bg-white text-slate-700 border-slate-300 hover:border-orange-500"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Best seller */}
                        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={bestSeller}
                                onChange={(e) => setBestSeller(e.target.checked)}
                                className="w-4 h-4 accent-orange-500"
                            />
                            Add to Best Seller
                        </label>

                        {/* Message */}
                        {status && (
                            <p className={`text-sm ${status.error ? "text-red-600" : "text-green-600"}`}>
                                {status.text}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}