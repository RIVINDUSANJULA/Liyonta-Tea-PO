/**
 * @file page.tsx
 * @copyright 2026 Rivindu Sanjula. All Rights Reserved.
 * @license Proprietary Commercial Software
 * * Prepared exclusively for Liyonta Tea.
 * This software is provided under a commercial agreement. The source code, 
 * database schemas, and proprietary business logic contained within this 
 * file are the confidential and proprietary information of Liyonta Tea 
 * and its authorized developers.
 * * Unauthorized copying, distribution, or modification of this codebase, 
 * via any medium, is strictly prohibited. This is closed-source software. 
 * No open-source license is granted.
 */

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