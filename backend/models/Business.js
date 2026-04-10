const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    placeId:  { type: String, required: true, unique: true },
    name:     { type: String, required: true },
    address:  { type: String, default: "" },
    rating:   { type: Number, default: 0 },
    category: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
