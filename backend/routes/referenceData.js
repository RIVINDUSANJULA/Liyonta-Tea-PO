const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/reference-data
router.get('/', async (req, res) => {
    try {
        // Query both tables simultaneously
        const [customersRows] = await pool.query('SELECT name FROM customers ORDER BY name ASC');
        const [teaGradesRows] = await pool.query('SELECT name FROM tea_grades ORDER BY name ASC');

        // Map the rows into flat arrays for the frontend
        const customers = customersRows.map(row => row.name);
        const teaGrades = teaGradesRows.map(row => row.name);

        res.status(200).json({ customers, teaGrades });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal Server Error fetching reference data' });
    }
});

module.exports = router;