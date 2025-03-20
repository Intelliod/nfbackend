import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  farmName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cropType: { type: String, required: true },
  farmArea: { type: Number, required: true },
  address: { type: String, required: true },
  serviceTypes: { type: [String], required: true }, 
}, { timestamps: true });

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
