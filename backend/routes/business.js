const express = require("express");
const router = express.Router();
const Business = require("../models/Business");

// GET /api/business — return all saved businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/business — save a new business
router.post("/", async (req, res) => {
  const { placeId, name, address, rating, category } = req.body;

  if (!placeId || !name) {
    return res.status(400).json({ message: "placeId and name are required" });
  }

  try {
    const existing = await Business.findOne({ placeId });
    if (existing) {
      return res.status(409).json({ message: "Business already exists" });
    }

    const business = await Business.create({ placeId, name, address, rating, category });
    res.status(201).json(business);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Business already exists" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/business/:placeId — remove a business
router.delete("/:placeId", async (req, res) => {
  try {
    const result = await Business.findOneAndDelete({ placeId: req.params.placeId });
    if (!result) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
