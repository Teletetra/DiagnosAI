
const express = require("express");
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

// bhai ye Send krega message Gemini ko
router.post("/send", auth, chatController.sendMessage);

module.exports = router;