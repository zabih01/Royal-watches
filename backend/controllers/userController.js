import userModel from '../models/userModel.js'; 
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Optional: add expiry
}


// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: 'User already exists'
      });
    }

    // Corrected: validator.isEmail expects a string, not an object
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email'
      });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Creating token
    const token = createToken(user._id);

    res.json({ success: true, message: "You are register successfully", token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Route for user login
const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body

  const user = await userModel.findOne({email})

  if(!user){
    return res.json({
      success: false,
      message: "User doesn't exist",
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(isMatch){
    const token = createToken(user._id)
    res.json({success:true, message: "You're logged in successfully", token})
  }else{
    res.json({success: false, message: 'invalid credencials'})

  }
  } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
  }
  
}

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign(
        { email, role: "admin" },   // ✅ structured payload
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Admin login successfully",
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credential",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export { loginUser, registerUser, adminLogin };