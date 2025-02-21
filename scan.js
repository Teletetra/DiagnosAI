const express = require("express");
const { processScan } = require("../AI/controller/GeminiController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const onnxMiddleware = require("../AI/middleware/onnxMiddleware");

const router = express.Router();

// Upload scan → Run ONNX  → Send  Gemini
router.post("/upload", auth, upload.single("scan"), onnxMiddleware, processScan);

module.exports = router;
