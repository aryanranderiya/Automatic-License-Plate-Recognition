const express = require("express");
const router = express.Router();
const OccupancyData = require("../models/OccupancyData");

router.post("/insert", async (req, res) => {
  try {
    const { time, value } = req.body;

    // Create a new occupancy data entry
    const newOccupancyData = new OccupancyData({
      time,
      value,
    });

    // Save the data to the database
    await newOccupancyData.save();

    res.status(201).json({
      message: "Occupancy data inserted successfully!",
      data: newOccupancyData,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Failed to insert occupancy data" });
  }
});

// GET route to fetch all occupancy data
router.get("/", async (req, res) => {
  try {
    // Fetch all occupancy data from the database
    const occupancyData = await OccupancyData.find().sort({ time: 1 }); // Sort by time

    res.json(occupancyData);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Failed to fetch occupancy data" });
  }
});

module.exports = router;
