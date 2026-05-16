import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized to login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ proper role check
    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Not authorized",
      });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;