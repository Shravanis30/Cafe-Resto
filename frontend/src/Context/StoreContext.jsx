// import { createContext, useEffect, useState } from "react";
// import { food_list, menu_list } from "../assets/assets";
// import axios from "axios";
// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {

//     const url = import.meta.env.VITE_API
//     const [food_list, setFoodList] = useState([]);
//     const [cartItems, setCartItems] = useState({});
//     const [token, setToken] = useState("")
//     const currency = "₹";
//     const deliveryCharge = 50;

//     const addToCart = async (itemId) => {
//         if (!cartItems[itemId]) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//         }
//         else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         }
//         if (token) {
//             await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//         }
//     }

//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
//         if (token) {
//             await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//         }
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             try {
//                 if (cartItems[item] > 0) {
//                     let itemInfo = food_list.find((product) => product._id === item);
//                     totalAmount += itemInfo.price * cartItems[item];
//                 }
//             } catch (error) {
//                 console.error("Error calculating total amount:", error);

//             }

//         }
//         return totalAmount;
//     }

//     const fetchFoodList = async () => {
//         const response = await axios.get(url + "/api/food/list");
//         setFoodList(response.data.data)
//     }

//     const loadCartData = async (token) => {
//         const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
//         setCartItems(response.data.cartData);
//     }

//     useEffect(() => {
//         async function loadData() {
//             await fetchFoodList();
//             if (localStorage.getItem("token")) {
//                 setToken(localStorage.getItem("token"))
//                 await loadCartData({ token: localStorage.getItem("token") })
//             }
//         }
//         loadData()
//     }, [])

//     const contextValue = {
//         url,
//         food_list,
//         menu_list,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         token,
//         setToken,
//         loadCartData,
//         setCartItems,
//         currency,
//         deliveryCharge
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )

// }

// export default StoreContextProvider;



















import { createContext, useEffect, useState } from "react";
import { menu_list as default_menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = import.meta.env.VITE_API; // Must be defined in your .env files

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const currency = "₹";
  const deliveryCharge = 50;

  // 🛒 Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (user?._id && token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId, userId: user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    }
  };

  // 🗑 Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (user?._id && token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId, userId: user._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Remove from cart error:", err);
      }
    }
  };

  // 💰 Total cart amount
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const item = food_list.find((food) => food._id === id);
      return item ? total + item.price * quantity : total;
    }, 0);
  };

  // 📦 Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching food list from backend:", err);
    }
  };

  // 🧺 Load cart from backend
  const loadCartData = async () => {
    if (!user?._id || !token) return;
    try {
      const res = await axios.post(
        `${url}/api/cart/get`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      } else {
        console.warn("Failed to load cart:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading cart data:", err);
    }
  };

  // 🔁 On mount: fetch food and cart
  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      await loadCartData();
    };
    init();
  }, []);

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
