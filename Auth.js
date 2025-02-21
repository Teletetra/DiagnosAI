const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const authMiddleware = require("../middleware/auth");

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "All fields are required." });

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) return res.status(400).json({ error: "Doctor already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ email, password: hashedPassword });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully." });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });
        if (!doctor) return res.status(400).json({ error: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });

        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Server error." });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.id).select("-password");
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
