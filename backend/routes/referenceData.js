const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// --- GET ALL DATA ---
router.get('/', async (req, res) => {
    try {
        const [customersRows] = await pool.query('SELECT name FROM customers ORDER BY name ASC');
        const [teaGradesRows] = await pool.query('SELECT name FROM tea_grades ORDER BY name ASC');

        res.status(200).json({
            customers: customersRows.map(row => row.name),
            teaGrades: teaGradesRows.map(row => row.name)
        });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- CUSTOMERS ---
router.post('/customers', async (req, res) => {
    const { name } = req.body;
    if (!name || name.trim() === '') return res.status(400).json({ error: 'Customer name is required' });

    try {
        await pool.query('INSERT INTO customers (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Customer already exists' });
        res.status(500).json({ error: 'Failed to add customer' });
    }
});

router.delete('/customers/:name', async (req, res) => {
    try {
        await pool.query('DELETE FROM customers WHERE name = ?', [req.params.name]);
        res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

// --- TEA GRADES ---
router.post('/tea-grades', async (req, res) => {
    const { name } = req.body;
    if (!name || name.trim() === '') return res.status(400).json({ error: 'Tea grade is required' });

    try {
        await pool.query('INSERT INTO tea_grades (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Tea grade added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Tea grade already exists' });
        res.status(500).json({ error: 'Failed to add tea grade' });
    }
});

router.delete('/tea-grades/:name', async (req, res) => {
    try {
        await pool.query('DELETE FROM tea_grades WHERE name = ?', [req.params.name]);
        res.status(200).json({ message: 'Tea grade deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tea grade' });
    }
});

module.exports = router;