let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Expenses = require('../models/expenses');

// READ all expenses
router.get('/', async (req, res, next) => {
    try {
        const expenseList = await Expenses.find();
        console.log(expenseList);

        // send list to browser
        res.json(expenseList);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error reading expenses");
    }
});

module.exports = router;
