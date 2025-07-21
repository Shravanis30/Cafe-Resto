
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { menu_list as default_menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
const url = import.meta.env.VITE_API || "https://cafe-resto-production.up.railway.app";

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const currency = "₹";
  const deliveryCharge = 50;

  // Load token and user from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Add item to cart
  const addToCart = async (itemId) => {
    const updatedCart = {
      ...cartItems,
      [itemId]: (cartItems[itemId] || 0) + 1,
    };
    setCartItems(updatedCart);

    if (user?._id && token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId, userId: user._id }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId] > 1) {
      updatedCart[itemId] -= 1;
    } else {
      delete updatedCart[itemId];
    }
    setCartItems(updatedCart);

    if (user?._id && token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId, userId: user._id }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Remove from cart error:", err);
      }
    }
  };

  // Total amount calculation
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const item = food_list.find((food) => food._id === id);
      return item ? total + item.price * quantity : total;
    }, 0);
  };

  // Fetch food list
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  // Load user cart
  const loadCartData = async () => {
    if (!user?._id || !token) return;
    try {
      const res = await axios.post(`${url}/api/cart/get`, { userId: user._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      } else {
        console.warn("Cart load failed:", res.data.message);
      }
    } catch (err) {
      console.error("Cart load error:", err);
    }
  };

  // On mount: Fetch food and cart
  useEffect(() => {
    fetchFoodList();
    loadCartData();
  }, [token, user?._id]);

  return (
    <StoreContext.Provider
      value={{
        url,
        food_list,
        menu_list: default_menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        user,
        setUser,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
