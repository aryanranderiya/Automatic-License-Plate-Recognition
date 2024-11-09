const express = require("express");
const router = express.Router();
const ParkingData = require("../models/ParkingData");

router.get("/", async (req, res) => {
  try {
    const parkingData = await ParkingData.find().sort({ timeIn: -1 }).limit(20);
    res.json(parkingData);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Failed to retrieve parking data" });
  }
});

module.exports = router;
