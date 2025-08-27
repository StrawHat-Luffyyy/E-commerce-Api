import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate Token
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });

  return token;
};

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if the values exists
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    const token = generateToken(res, user._id);
    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: "Server error" });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(password || email)) {
      return res
        .status(401)
        .json({ message: "Please provide the following credentials" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await user.comparePassword(password);
    console.log(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(res, user._id);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, logoutUser };
