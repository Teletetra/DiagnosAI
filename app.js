// app.js
require("dotenv").config()
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));