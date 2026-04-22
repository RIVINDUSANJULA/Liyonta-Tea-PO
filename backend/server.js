const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend to talk to this API
app.use(express.json());

// Import Routes
const referenceDataRoute = require('./routes/referenceData');

// Mount Routes
app.use('/api/reference-data', referenceDataRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Enterprise Backend API running securely on port ${PORT}`);
});