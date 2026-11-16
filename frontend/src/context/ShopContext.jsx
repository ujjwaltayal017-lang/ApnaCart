import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { UserDataContext } from "./UserContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const local = localStorage.getItem("cartItems");
      return local ? JSON.parse(local) : {};
    } catch {
      return {};
    }
  });

  const { serverUrl } = useContext(AuthContext);
  const { userData } = useContext(UserDataContext) || {};

  const currency = "₹";
  const delivery_fee = 40;

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch product list
  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      if (Array.isArray(result.data)) {
        setProducts(result.data);
      } else if (Array.isArray(result.data.products)) {
        setProducts(result.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (itemId, size) => {
    const cartData = structuredClone(cartItems);

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

    setCartItems(cartData);

    if (userData && serverUrl) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId, size },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error syncing cart to server:", error);
      }
    }
  };

  // Update item count directly
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      if (cartData[itemId]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (userData && serverUrl) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error updating cart quantity on server:", error);
      }
    }
  };

  // Calculate total badge count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };

  // Fetch user cart on authentication
  const getUserCart = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/cart/get`, {
        withCredentials: true,
      });
      if (response.data.success && response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [serverUrl]);

  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData, serverUrl]);

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    loading,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;