import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  // ✅ Extract token from multiple possible sources
  let token = null;

  // Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  
  // Fallback to 'token' header if Authorization not present
  if (!token && req.headers.token) {
    token = req.headers.token;
  }

  if (!token) {
    console.log("No token found in headers:", req.headers);
    return res.json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    console.log("Auth success, userId:", req.userId);
    next();
  } catch (error) {
    console.log("JWT Verify Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;