const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const parkingDataRoutes = require("./routes/parkingRoutes");
const occupancyDataRoutes = require("./routes/occupancyRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use("/api/parkingData", parkingDataRoutes);
app.use("/api/occupancy", occupancyDataRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
