const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use("/api/parkingData", require("./routes/parkingData"));
// app.use('/api/occupancy', require('./routes/occupancy'));
// app.use('/api/durationDistribution', require('./routes/durationDistribution'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
