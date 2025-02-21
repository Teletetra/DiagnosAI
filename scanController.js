const Scan = require("../models/Scan");

const uploadScan = async (req, res) => {
  try {
    const uploadedBy = req.user._id;

    if (!req.file) {
      return res.status(400).json({ error: "Scan file is required" });
    }

    const scan = new Scan({
      uploadedBy,
      scanFile: req.file.path, // Cloudinary URL
      aiResults: {},
    });

    await scan.save();
    res.status(201).json({ message: "Scan uploaded successfully", scan });
  } catch (error) {
    console.error("Error uploading scan:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getScans = async (req, res) => {
  try {
    const scans = await Scan.find({ uploadedBy: req.user._id });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getScanDetails = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.scanId);
    if (!scan) return res.status(404).json({ error: "Scan not found" });
    res.json(scan);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { uploadScan, getScans, getScanDetails };
