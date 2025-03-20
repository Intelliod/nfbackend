import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  contactInfo: { type: String, required: true },
});

// ✅ Use ES module export
const Owner = mongoose.model("Owner", OwnerSchema);
export default Owner;
