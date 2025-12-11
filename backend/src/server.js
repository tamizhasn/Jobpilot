const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");   // <-- IMPORT USER ROUTES
const companyRoutes = require("./routes/companyRoutes");  // <-- IMPORT COMPANY ROUTES
const pool = require("./config/db");                // <-- DB CONNECTION

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Register Routes
app.use("/api/auth", authRoutes);  // <-- USER ROUTE IS REGISTERED HERE
app.use("/api/company", companyRoutes); // <-- COMPANY ROUTE IS REGISTERED HERE

// Test Route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW();");
    res.json({ success: true, server_time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
