const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

let shoes;

const getItems = async () => {
  try {
    const {
      data: { results: items },
    } = await axios.get("https://v1-sneakers.p.rapidapi.com/v1/sneakers", {
      params: {
        limit: 100,
      },
      headers: {
        "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.API_KEY,
      },
    });

    shoes = items;
  } catch (error) {
    console.log(error);
  }
};

const filterItems = (savedItems, dbItems) => {
  const items = [];
  for (let i = 0; i < savedItems.length; i++) {
    for (let j = 0; j < dbItems.length; j++) {
      if (savedItems[i] === dbItems[j].id) {
        items.push(dbItems[j]);
      }
    }
  }

  return items;
};

getItems();

// @desc Create User
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  const userExists = await User.findOne({ email });

  // Check if user is already registered
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @desc Authenticate User
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(201).json({ users });
});

// @desc Get user's saved items
// @route GET /api/users/saved
// @access Private

const getSavedItems = asyncHandler(async (req, res) => {
  const { savedItems } = await User.findOne({ email: req.user.email }).select(
    "savedItems -_id"
  );

  if (shoes.length > 0) {
    const items = filterItems(savedItems, shoes);
    return res.status(200).json(items);
  } else {
    res.status(400);
    throw new Error("Fail");
  }
});

// @desc Save item
// @route POST /api/users/saved
// @access Private

const saveItem = asyncHandler(async (req, res) => {
  const item = req.body.itemId;

  if (!item) {
    res.status(400);
    throw new Error("Please provide an item id string");
  }

  const saveCheck = await User.findOne({ savedItems: item });

  if (saveCheck) {
    return res.status(400).json({ message: "Item already saved." });
  }

  const savedItem = await User.updateOne(
    { email: req.user.email },
    {
      $push: {
        savedItems: item,
      },
    }
  );

  if (savedItem) {
    const { savedItems } = await User.findOne({ email: req.user.email }).select(
      "savedItems -_id"
    );

    if (shoes.length > 0) {
      const items = filterItems(savedItems, shoes);
      return res.status(200).json(items);
    } else {
      res.status(400);
      throw new Error("Fail. No items to match against.");
    }
  } else {
    res.status(400);
    throw new Error("Fail");
  }
});

// @desc Delete saved item
// @route DELETE /api/users/saved/:id
// @access Private

const deleteItem = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Please provide an item id string");
  }
  const deleted = await User.updateOne(
    { email: req.user.email },
    { $pull: { savedItems: req.params.id } }
  );

  if (deleted) {
    const { savedItems } = await User.findOne({ email: req.user.email }).select(
      "savedItems -_id"
    );

    if (shoes.length > 0) {
      const items = filterItems(savedItems, shoes);
      return res.status(200).json(items);
    } else {
      res.status(400);
      throw new Error("Fail. No items to match against.");
    }
  } else {
    res.status(400);
    throw new Error("No item found with that string");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  getSavedItems,
  saveItem,
  deleteItem,
};
