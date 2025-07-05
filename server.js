import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import landRoutes from "./routes/landRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js" 
import axios from "axios";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
const FARM_ID = process.env.FARM_ID;

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
// Existing crop stage endpoint
app.get("/api/crop-stage", async (req, res) => {
  try {
    const response = await axios.get("https://api.mapmycrop.com/crop/crop_stage", {
      params: {
        api_key: API_KEY,
        farm_id: FARM_ID,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching crop stage data:", error.message);
    res.status(500).json({ error: "Failed to fetch crop stage data" });
  }
});

// ✅ New irrigation requirement endpoint
app.post("/api/irrigation-requirements", async (req, res) => {
  const { crop_name, sowing_date, irrigation_method, soil_type } = req.body;

  try {
    const response = await axios.post(
      `https://api.mapmycrop.com/irrigation_new/calculate_crop_water_requirements`,
      {
        crop_name,
        sowing_date,
        irrigation_method,
        soil_type,
      },
      {
        params: {
          api_key: API_KEY,
          farm_id: FARM_ID,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error calculating irrigation requirements:", error.message);
    res.status(500).json({ error: "Failed to calculate irrigation requirements" });
  }
});
// ✅ Weather forecast endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const response = await axios.get("https://api.mapmycrop.com/weather/weather-forecast", {
      params: {
        api_key: API_KEY,
        farm_id: FARM_ID,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
