require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const businessRoutes = require("./routes/business");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/business", businessRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
