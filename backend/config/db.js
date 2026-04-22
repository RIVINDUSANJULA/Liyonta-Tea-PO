/**
 * @file db.js
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

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;