// routes/index.js
const express = require("express");
const authRoutes = require("./Auth");
const userRoutes = require("./user");
const chatRoutes=require("./chat")

const scanRoutes = require("./scan");
// const aiRoutes = require("./ai");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/chat",chatRoutes);

router.use("/scan", scanRoutes);
// router.use("/ai", aiRoutes);

module.exports = router;