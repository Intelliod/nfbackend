import mongoose from "mongoose";

const LandParcelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  parcelId: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  soilType: { type: String, required: true },
  crops: { type: String },
});

// ✅ Use ES module export
const LandParcel = mongoose.model("LandParcel", LandParcelSchema);
export default LandParcel;

