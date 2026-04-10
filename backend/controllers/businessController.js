const Business = require("../models/Business");

// GET /api/business
const getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
  } catch (err) {
    next(err);
  }
};

// POST /api/business
const createBusiness = async (req, res, next) => {
  const { placeId, name, address, rating, category } = req.body;

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
    next(err);
  }
};

// DELETE /api/business/:placeId
const deleteBusiness = async (req, res, next) => {
  try {
    const result = await Business.findOneAndDelete({ placeId: req.params.placeId });
    if (!result) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBusinesses, createBusiness, deleteBusiness };
