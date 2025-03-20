import mongoose from "mongoose";

const CropRequestSchema = new mongoose.Schema({
  location: { type: String, required: true },
  previousCrop: { type: String, required: true },
  landArea: { type: String, required: true }, // Consider using Number if appropriate
  investmentAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CropRequest = mongoose.model("CropRequest", CropRequestSchema);
export default CropRequest;
