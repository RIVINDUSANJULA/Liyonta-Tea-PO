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
const router = express.Router();
const pool = require('../config/db');

// GET ALL DATA
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

// POST: Add a new Customer
router.post('/customers', async (req, res) => {
    if (!req.body) return res.status(400).json({ error: 'Request body missing. Check express.json() in server.js' });

    const { name } = req.body;
    if (!name || name.trim() === '') return res.status(400).json({ error: 'Customer name is required' });

    try {
        await pool.query('INSERT INTO customers (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Customer already exists' });
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Failed to add customer' });
    }
});

// DELETE: Remove a Customer
router.delete('/customers/:name', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM customers WHERE name = ?', [req.params.name.trim()]);

        // Ensure MySQL actually found and deleted the row
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found in database. It may contain hidden spaces.' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

// POST: Add a Tea Grade
router.post('/tea-grades', async (req, res) => {
    if (!req.body) return res.status(400).json({ error: 'Request body missing.' });

    const { name } = req.body;
    if (!name || name.trim() === '') return res.status(400).json({ error: 'Tea grade is required' });

    try {
        await pool.query('INSERT INTO tea_grades (name) VALUES (?)', [name.trim()]);
        res.status(201).json({ message: 'Tea grade added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Tea grade already exists' });
        console.error('Insert error:', error);
        res.status(500).json({ error: 'Failed to add tea grade' });
    }
});

// DELETE: Remove a Tea Grade
router.delete('/tea-grades/:name', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tea_grades WHERE name = ?', [req.params.name.trim()]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tea grade not found in database.' });
        }
        res.status(200).json({ message: 'Tea grade deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete tea grade' });
    }
});

module.exports = router;