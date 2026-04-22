const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. MIDDLEWARE MUST COME FIRST
app.use(cors());
app.use(express.json()); // This prevents the server from crashing when receiving POST data

// 2. MOUNT ROUTES SECOND
const referenceDataRoute = require('./routes/referenceData');
app.use('/api/reference-data', referenceDataRoute);

// 3. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Enterprise Backend API running securely on port ${PORT}`);
});