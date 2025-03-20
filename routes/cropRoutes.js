import express from "express";
import CropRequest from "../models/CropRequest.js";

const router = express.Router();

// Route to handle crop prediction request submission
router.post("/request", async (req, res) => {
  try {
    const { location, previousCrop, landArea, investmentAmount } = req.body;

    if (!location || !previousCrop || !landArea || !investmentAmount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRequest = new CropRequest({
      location,
      previousCrop,
      landArea,
      investmentAmount
    });

    await newRequest.save();
    res.status(201).json({ message: "Crop request submitted successfully!", request: newRequest });
  } catch (error) {
    console.error("Error saving crop request:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/requests", async (req, res) => {
  try {
    const requests = await CropRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching crop requests:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
