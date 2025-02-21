const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  scanFile: { type: String, required: true }, 
  scanDate: { type: Date, default: Date.now },

  aiResults: {
    disease: String, 
    confidence: Number, 
    notes: String, 
  },
  doctorNotes: { type: String }, 
});

module.exports = mongoose.model("Scan", scanSchema);
