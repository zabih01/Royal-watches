import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    // let cartData = structuredClone(cartItems);

    // if (cartData[itemId]) {
    //   cartData[itemId] += 1;
    // } else {
    //   cartData[itemId] = 1;
    // }

    // setCartItems(cartData);

    const addToCart = async (itemId) => {
      if (!token) return;

      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setCartItems(response.data.cartData); // ALWAYS FROM DB
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    try {
      // Optimistic update (optional)
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));

      const response = await axios.post(
        backendUrl + "/api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        setCartItems(response.data.cartData); // Sync with DB
        toast.success("Added to cart");
      }
    } catch (error) {
      console.log("API Error:", error);
      toast.error("Failed to add to cart");
      // Revert optimistic update if needed
    }
  };
  // Get cart data..............

  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.get(backendUrl + "/api/cart/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log("Cart fetch error:", error.message);
    }
  };

  // ✅ GET TOTAL ITEMS COUNT
  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }

    return totalCount;
  };

  // ✅ UPDATE QUANTITY (NO SIZE)
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId]; // remove item
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ GET TOTAL PRICE
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      const itemInfo = products.find((product) => product._id === item);

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    setCartItems,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
