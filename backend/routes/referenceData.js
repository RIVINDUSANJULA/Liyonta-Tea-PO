const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET: Fetch all customers and tea grades (Used by your PO Form)
router.get('/', async (req, res) => {
    try {
        const [customersRows] = await pool.query('SELECT name FROM customers ORDER BY name ASC');
        const [teaGradesRows] = await pool.query('SELECT name FROM tea_grades ORDER BY name ASC');

        const customers = customersRows.map(row => row.name);
        const teaGrades = teaGradesRows.map(row => row.name);

        res.status(200).json({ customers, teaGrades });
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST: Add a new Customer
router.post('/customers', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Customer name is required' });
    }

    try {
        await pool.query('INSERT INTO customers (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        // Handle duplicate entries (since 'name' is UNIQUE in our database)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'This customer already exists' });
        }
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Failed to add customer' });
    }
});

// DELETE: Remove a Customer by Name
router.delete('/customers/:name', async (req, res) => {
    const customerName = req.params.name;

    try {
        await pool.query('DELETE FROM customers WHERE name = ?', [customerName]);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

module.exports = router;