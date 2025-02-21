// config/cors.js
const cors = require("cors");
require("dotenv").config()
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],  
  allowedHeaders: ["Content-Type", "Authorization"], 
};

module.exports = cors(corsOptions);