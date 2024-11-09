const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the OccupancyData Schema
const occupancyDataSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const OccupancyData = mongoose.model("OccupancyData", occupancyDataSchema);

module.exports = OccupancyData;
