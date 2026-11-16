import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// Add a new product to MongoDB
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Handle files if uploaded via multer (e.g. req.files) or fallback to URLs in req.body
    const image1File = req.files?.image1?.[0];
    const image2File = req.files?.image2?.[0];
    const image3File = req.files?.image3?.[0];
    const image4File = req.files?.image4?.[0];

    let image1 = req.body.image1 || "";
    let image2 = req.body.image2 || "";
    let image3 = req.body.image3 || "";
    let image4 = req.body.image4 || "";

    if (image1File) {
      const upload1 = await cloudinary.uploader.upload(image1File.path, { resource_type: "image" });
      image1 = upload1.secure_url;
    }
    if (image2File) {
      const upload2 = await cloudinary.uploader.upload(image2File.path, { resource_type: "image" });
      image2 = upload2.secure_url;
    }
    if (image3File) {
      const upload3 = await cloudinary.uploader.upload(image3File.path, { resource_type: "image" });
      image3 = upload3.secure_url;
    }
    if (image4File) {
      const upload4 = await cloudinary.uploader.upload(image4File.path, { resource_type: "image" });
      image4 = upload4.secure_url;
    }

    if (!name || !price || !category || !subCategory || !image1) {
      return res.status(400).json({
        success: false,
        message: "Name, price, category, subCategory, and primary image (image1) are required.",
      });
    }

    let parsedSizes = sizes;
    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes.split(",").map((s) => s.trim());
      }
    }

    const product = new Product({
      name,
      description: description || "",
      price: Number(price),
      category,
      subCategory,
      sizes: Array.isArray(parsedSizes) ? parsedSizes : [],
      bestSeller: bestSeller === true || bestSeller === "true",
      image1,
      image2: image2 || "",
      image3: image3 || "",
      image4: image4 || "",
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
    });
  }
};

// List all products
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

// Get single product details
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product details",
    });
  }
};

// Remove a product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to remove product",
    });
  }
};