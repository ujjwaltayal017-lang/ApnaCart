import express from "express";
import upload from "../middleware/multer.js";
import {
  addProduct,
  listProducts,
  getProductById,
  removeProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRoutes.get("/list", listProducts);
productRoutes.get("/:id", getProductById);
productRoutes.delete("/remove/:id", adminAuth, removeProduct);

export default productRoutes;