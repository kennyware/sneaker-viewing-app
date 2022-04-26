const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  getSavedItems,
  saveItem,
  deleteItem,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/saved", protect, getSavedItems);
router.post("/saved", protect, saveItem);
router.delete("/saved/:id", protect, deleteItem);

module.exports = router;
