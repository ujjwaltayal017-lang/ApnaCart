import User from "../models/user.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "Item ID and size are required",
      });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Added to cart successfully",
      cartData,
    });
  } catch (err) {
    console.error("addToCart error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

// Update item quantity in cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Item ID, size, and quantity are required",
      });
    }

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartData = userData.cartData || {};

    if (Number(quantity) <= 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = Number(quantity);
    }

    await User.findByIdAndUpdate(userId, { cartData });

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData,
    });
  } catch (err) {
    console.error("updateCart error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

// Fetch user's cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData || {};

    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (err) {
    console.error("getUserCart error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};