const express = require("express");
const router = express.Router();

const { getAllBusinesses, createBusiness, deleteBusiness } = require("../controllers/businessController");
const validateBusiness = require("../middleware/validateBusiness");

// GET /api/business
router.get("/", getAllBusinesses);

// POST /api/business
router.post("/", validateBusiness, createBusiness);

// DELETE /api/business/:placeId
router.delete("/:placeId", deleteBusiness);

module.exports = router;
