import express from "express";
import Owner from "../models/Owner.js";
import LandParcel from "../models/LandParcel.js";

const router = express.Router();

// 🟢 Register Land and Owner
router.post("/register", async (req, res) => {
  try {
    const { ownerName, contactInfo, parcels } = req.body;

    // Create Owner
    const owner = new Owner({ ownerName, contactInfo });
    await owner.save();

    // Create Land Parcels
    const landParcels = parcels.map((parcel) => ({
      owner: owner._id,
      parcelId: parcel.parcelId,
      location: parcel.location,
      size: parcel.size,
      soilType: parcel.soilType,
      crops: parcel.crops,
    }));

    await LandParcel.insertMany(landParcels);

    res.status(201).json({ message: "Land registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 Get All Land Registrations
router.get("/land", async (req, res) => {
  try {
    const data = await LandParcel.find().populate("owner");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving land data" });
  }
});

// 🟢 Get Specific Land Registration
router.get("/land/:id", async (req, res) => {
  try {
    const land = await LandParcel.findById(req.params.id).populate("owner");
    if (!land) return res.status(404).json({ message: "Not found" });
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving land" });
  }
});

// 🟢 Delete Land Registration
router.delete("/land/:id", async (req, res) => {
  try {
    await LandParcel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Land deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting land" });
  }
});

// ✅ Export the router as default (ES Module Syntax)
export default router;
