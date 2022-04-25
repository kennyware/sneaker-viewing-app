const express = require("express");
const router = express.Router();

const {
  getSneakers,
  getBrands,
  getSneakerById,
} = require("../controllers/sneakerController");

router.get("/", getSneakers);
router.get("/brands", getBrands);
router.get("/:id", getSneakerById);

module.exports = router;
