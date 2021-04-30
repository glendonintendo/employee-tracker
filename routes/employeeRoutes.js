const express = require('express');
const db = require('../db/connection.js');
const inputCheck = require('../utils/inputCheck.js');
const router = express.Router();

// view all employees
router.get('/employees', (req, res) => {
    let sql = `
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS full_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees m ON e.manager_id = m.id
    `;

    if (req.query.manager_id) {
        sql += `WHERE e.manager_id = ${req.query.manager_id}`;
    } else if (req.query.department_id) {
        sql += `WHERE department_id = ${req.query.department_id}`;
    }

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// view employees who are managers
router.get('/employees/managers', (req, res) => {
    const sql = `
        SELECT id, CONCAT(first_name, ' ', last_name) AS full_name 
        FROM EMPLOYEES
        WHERE id IN (
            SELECT DISTINCT manager_id
            FROM employees
            WHERE manager_id IS NOT NULL
        );
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// add employee
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

// update employee by id
router.put('/employee/:id', (req, res) => {    
    let sql;
    let params;

    if (req.body.role_id) {
        sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        params = [req.body.role_id, req.params.id];
    } else {
        sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
        params = [req.body.manager_id, req.params.id];
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// delete employee by id
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id,
                full_name: req.body.full_name
            });
        }
    });
});

module.exports = router;