import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";

const router = express.Router();

router.post("/ser_request", async (req, res) => {
    try {
      const { name, farmName, email, phone, cropType, farmArea, address, serviceTypes } = req.body;
  
      if (!name || !farmName || !email || !phone || !cropType || !farmArea || !address || !serviceTypes.length) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newRequest = new ServiceRequest({
        name, farmName, email, phone, cropType, farmArea, address, serviceTypes,
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Service request submitted successfully", request: newRequest });
  
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });


  router.get("/ser_request", async (req, res) => {
    try {
      const serviceRequests = await ServiceRequest.find();
  
      const formattedRequests = serviceRequests.map((request) => ({
        id: request._id,
        name: request.name,
        MobileNo: request.phone,
        address: request.address,
        landArea: request.farmArea,
        services: request.serviceTypes,
        crop: request.cropType,
        soilType: request.soilType || "Unknown", // Add soil type if stored
        status: request.status || "pending", // Default to pending if not set
        requestDate: request.createdAt?.toISOString().split("T")[0], // Format the request date
        notes: request.notes || "",
        previousService: request.previousService ? "Yes" : "No",
        preferredDate: request.preferredDate || null,
        location: request.location || { lat: 0, lng: 0 }, // Default location
        assignedEquipment: request.assignedEquipment || null,
        scheduledDate: request.scheduledDate || null,
      }));
  
      res.json(formattedRequests);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });


export default router;
