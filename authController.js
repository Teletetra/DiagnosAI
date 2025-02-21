const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { generateToken } = require("../config/jwt");

const register = async (req, res) => {
  const { name, email, password } = req.body;


  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({ name, email, password, role: "doctor" });


    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const matchQ = await user.comparePassword(password);
    if (!matchQ) {
      return res.status(400).json({ error: "pass is wrong" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };