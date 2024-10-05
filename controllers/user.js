const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /users
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").lean().exec();
  if (!users.length) {
    return res.status(404).json({ message: "No users found" });
  }
  res.status(200).json(users);
});

// @desc    Register a new user
// @route   POST /users
// @access  Public
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  console.log(req.body);
  if (
    !username ||
    !password ||
    !roles ||
    !roles.length ||
    !Array.isArray(roles)
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  const duplicateUser = await User.findOne({ username }).lean().exec();
  if (duplicateUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userObj = { username, password: hashedPassword, roles };
  const user = await User.create(userObj);
  if (user) {
    return res.status(201).json({ message: "User created successfully" });
  } else {
    return res.status(400).json({ message: "User creation failed" });
  }
});

module.exports = { getAllUsers, createNewUser };
