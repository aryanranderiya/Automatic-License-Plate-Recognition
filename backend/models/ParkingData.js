const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the ParkingData Schema
const parkingDataSchema = new Schema(
  {
    no: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    noPlate: {
      type: String,
      required: true,
    },
    timeIn: {
      type: String, // Consider changing this to Date if you're working with actual times
      required: true,
    },
    timeOut: {
      type: String, // Consider changing this to Date for consistency
      required: true,
    },
    duration: {
      type: String, // You can calculate this dynamically or store it as is
      required: true,
    },
    blockId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const ParkingData = mongoose.model("ParkingData", parkingDataSchema);

module.exports = ParkingData;
