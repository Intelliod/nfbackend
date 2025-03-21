import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import landRoutes from "./routes/landRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js" 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.use("/api/land", landRoutes),
app.use("/api/crop",cropRoutes),
app.use("/api/service",serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
