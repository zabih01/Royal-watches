import userModel from "../models/userModel.js"

// Add product to user cart........
// controllers/cartController.js
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cartData
    let cartData = userData.cartData || {};

    // Update quantity
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    // ✅ FIX: Mark as modified so Mongoose saves it
    userData.cartData = cartData;
    userData.markModified('cartData');  // ✅ ADD THIS LINE!
    
    await userData.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cartData: userData.cartData
    });

  } catch (error) {
    console.log("Error in addToCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update user cart data........
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId]; // remove item if quantity is 0
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get userCart data...............
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({
      success: true,
      message: "Cart data fetched successfully",
      cartData
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export { addToCart, updateCart, getUserCart };